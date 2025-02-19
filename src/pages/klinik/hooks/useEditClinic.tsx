/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from 'dayjs';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import "dayjs/locale/id";
import { EditClinicServices } from '../../../services/Admin Tenant/ManageClinic/EditClinic';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ExclusionDataItem, GetExclusionByTypeId } from '../../../services/Admin Tenant/ManageSchedule/GetExclusionByTypeIdServices';
import { createExclusions, createSchedules, KalenderData, validateInput } from '../../../services/Admin Tenant/ManageSchedule/ScheduleUtils';
import { GetScheduleByTypeId, ScheduleDataItem } from '../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices';
import {  getClinicByIdService } from '../../../services/Admin Tenant/ManageClinic/GetClinicByIdService';
import { editImages } from '../../../services/Admin Tenant/ManageImage/ImageUtils';
import { ClinicDataItem } from '../../../types/clinic.types';
import { useFetchData } from '../../../hooks/useFetchData';

dayjs.extend(customParseFormat);

type ImageData = {
  imageName: string;
  imageType: string;
  imageData: string;
};

export default function useEditClinic() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [imagesData, setImagesData] = useState<ImageData[]>([])
  const [errorAlert, setErrorAlert] = useState(false)
  const kalenderRef = useRef<{ getData: () => KalenderData }>(null);
  const { id } = useParams()
  const [scheduleDataPraktek, setScheduleDataPraktek] = useState<ScheduleDataItem[] | null>(null);
  const [scheduleDataPengecualian, setScheduleDataPengecualian] = useState<ExclusionDataItem[] | null>(null);
  const [clinicData, setClinicData] = useState<ClinicDataItem | null>(null);


  const navigate = useNavigate();

  const { data: clinicDataResponse, refetch: refetch } = useFetchData<ClinicDataItem>(
      getClinicByIdService,
      [id],
      true
    );
  
  
    const { data: scheduleResponse } = useFetchData(
      GetScheduleByTypeId,
      [id],
      true
    );
  
    const { data: scheduleExclusionResponse } = useFetchData(
      GetExclusionByTypeId,
      [id],
      true
    );

    const hasFetched = useRef(false);
  useEffect(() => {
    if (!hasFetched.current) {
      refetch();
      hasFetched.current = true;
    }
  }, [refetch]);

  useEffect(() => {
    if (clinicDataResponse) {
      setClinicData(clinicDataResponse);
    }
    if (scheduleResponse) {
      setScheduleDataPraktek(Array.isArray(scheduleResponse) ? scheduleResponse : []);
    }
    if (scheduleExclusionResponse) {
      setScheduleDataPengecualian(Array.isArray(scheduleExclusionResponse) ? scheduleExclusionResponse : []);
    }
  })

  const getPageStyle = (page: number) => {
    if (page === currentPage) {
      return { color: "#8F85F3", cursor: "pointer", fontWeight: "bold" };
    } else if (page < currentPage) {
      return { color: "#8F85F3", cursor: "pointer" };
    } else {
      return { color: "black", cursor: "pointer" };
    }
  };

  const getBorderStyle = (page: number) => {
    if (page === currentPage) {
      return {
        display: "flex",
        border: "1px solid #8F85F3",
        width: "38px",
        height: "38px",
        borderRadius: "8px",
        justifyContent: "center",
        alignItems: "center",
      };
    } else if (page < currentPage) {
      return {
        display: "flex",
        border: "1px solid #8F85F3",
        width: "38px",
        height: "38px",
        borderRadius: "8px",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#8F85F3",
        color: "white",
      };
    } else {
      return {
        display: "flex",
        border: "1px solid #8F85F3",
        width: "38px",
        height: "38px",
        borderRadius: "8px",
        justifyContent: "center",
        alignItems: "center",
        color: "#8F85F3",
      };
    }
  };

  


  const handleImageChange = (images: ImageData[]) => {
    setImagesData(images);
  };

  const showTemporaryAlertError = async () => {
    setErrorAlert(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setErrorAlert(false);
  };

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Klinik", href: "/klinik" },
    { label: "Edit Klinik", href: "/EditClinic:id" },
  ];

  const formik = useFormik({
    initialValues: {
      namaKlinik: clinicData?.name || "",
      kodeKlinik: clinicData?.code || "",
      deskripsiKlinik: clinicData?.description || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      namaKlinik: Yup.string().required('Nama Klinik is required'),
      kodeKlinik: Yup.string().required('Kode Klinik is required'),
      deskripsiKlinik: Yup.string().required('Deskripsi Klinik is required'),
    }),
    onSubmit: async (values) => {
     console.log(values);
    },
  });

  const handleEditClinic = async () => {
    try {
      const kalenderData = kalenderRef.current?.getData() || { praktek: [], exclusion: [] };
      // Validasi input schedule
      validateInput(kalenderData);

      // Data untuk EditAmbulanceService
      const clinicData = {
        name: formik.values.namaKlinik,
        description: formik.values.deskripsiKlinik,
        additionalInfo: '',
        code: formik.values.kodeKlinik,
        clinicId: id || ''

      };

      // Edit ambulance
      const { data: { id: clinicId } } = await EditClinicServices(clinicData);
      if (!clinicId) throw new Error('Clinic ID tidak ditemukan');

      await editImages(clinicId, imagesData);
      // Pisahkan data praktek yang baru (yang memiliki id dengan format 'session-')
      const newPraktekData = kalenderData.praktek.filter(item => item.id.startsWith('session-'));
      
      // Pisahkan data exclusion yang baru (yang memiliki id dengan format 'exclusion-')
      const newExclusionData = kalenderData.exclusion.filter(item => item.id.startsWith('exclusion-'));

      // Proses data baru secara parallel jika ada
      const promises = [];
      
      if (newPraktekData.length > 0) {
        promises.push(createSchedules(clinicId, newPraktekData));
      }

      if (newExclusionData.length > 0) {
        promises.push(createExclusions(clinicId, newExclusionData));
      }

      // Tunggu semua proses selesai
      if (promises.length > 0) {
        await Promise.all(promises);
      }

      // Reset state dan redirect
      formik.resetForm();
      setImagesData([]);
      
      navigate('/klinik', {
        state: {
          successAdd: true,
          message: 'Klinik berhasil diperbarui!'
        }
      });
    } catch (error) {
      console.error('[DEBUG] Error saat menyimpan ambulance:', error);
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;
        console.error('[DEBUG] Detail error dari server:', responseData || error.message);
      }
      showTemporaryAlertError();
    }
  };

  return {
    handleImageChange,
    breadcrumbItems,
    formik,
    setCurrentPage,
    getPageStyle,
    getBorderStyle,
    currentPage,
    handleEditClinic,
    kalenderRef,
    id,
    scheduleDataPraktek,
    scheduleDataPengecualian,
    errorAlert
  }
}
