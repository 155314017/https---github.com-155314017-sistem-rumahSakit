import { useEffect, useRef, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id');
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FacilityData, getFacilityByIdService } from '../../../services/Admin Tenant/ManageFacility/GetFacilityByIdService';
import { createExclusions, createSchedules, KalenderData, validateInput } from '../../../services/Admin Tenant/ManageSchedule/ScheduleUtils';
import { GetScheduleByTypeId, ScheduleDataItem } from '../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices';
import { ExclusionDataItem, GetExclusionByTypeId } from '../../../services/Admin Tenant/ManageSchedule/GetExclusionByTypeIdServices';
import { editImages, ImageData } from '../../../services/Admin Tenant/ManageImage/ImageUtils';
import { EditFacilityServices, EditFacilityRequest } from '../../../services/Admin Tenant/ManageFacility/EditFacilityService';
import { Building } from '../../../services/Admin Tenant/ManageBuilding/Building';

type Building = {
  id: string;
  name: string;
};

export default function useEditFasilitas() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [imagesData, setImagesData] = useState<ImageData[]>([])
  const [errorAlert, setErrorAlert] = useState(false)
  const kalenderRef = useRef<{ getData: () => KalenderData }>(null);
  const { id } = useParams()
  const [fasilitasData, setFasilitasData] = useState<FacilityData | null>(null);
  const [scheduleDataPraktek, setScheduleDataPraktek] = useState<ScheduleDataItem[] | null>(null);
  const [scheduleDataPengecualian, setScheduleDataPengecualian] = useState<ExclusionDataItem[] | null>(null);
  const [gedungOptions, setGedungOptions] = useState<Building[]>([]);

  const navigate = useNavigate()

  interface FormValues {
    namaFasilitas: string;
    masterBuildingId: string;
    deskripsiKlinik: string;
    operationalCost: number;
  }

  useEffect(() => {
    const fetchDataFacility = async () => {
      try {
        const fasilitasResponse = await getFacilityByIdService(id);
        const scheduleResponse = await GetScheduleByTypeId(id || "");
        const exclusionResponse = await GetExclusionByTypeId(id || "");
        const response = await Building();
        setGedungOptions(response.map((item: Building) => ({
          id: item.id,
          name: item.name,
        })));
        console.log("Schedule Response from API:", scheduleResponse);
        console.log("Exclusion Response from API:", exclusionResponse);
        if (fasilitasResponse) {
          setFasilitasData(fasilitasResponse);
        }

        if (scheduleResponse) {
          setScheduleDataPraktek(scheduleResponse);
        }

        if (exclusionResponse) {
          setScheduleDataPengecualian(exclusionResponse);
        }


      } catch (error) {
        console.error('Error:', error);
      }

    };
    fetchDataFacility();
  }, [id]);

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
    { label: "Fasilitas", href: "/fasilitas" },
    { label: "Edit Fasilitas", href: "/editFasilitas/:id" },
  ];

  const formik = useFormik<FormValues>({
    initialValues: {
      namaFasilitas: fasilitasData?.name || "",
      masterBuildingId: fasilitasData?.masterBuildingId || "",
      deskripsiKlinik: fasilitasData?.description || "",
      operationalCost: fasilitasData?.cost || 0,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      namaFasilitas: Yup.string().required('Nama fasilitas wajib diisi'),
      masterBuildingId: Yup.string().required('Gedung wajib dipilih'),
      deskripsiKlinik: Yup.string().required('Deskripsi Klinik wajib diisi'),
      operationalCost: Yup.number().required('Biaya penanganan wajib diisi').positive('Nilai harus positif'),
    }),
    onSubmit: async () => {
    }
  });


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

  const handleEditFasilitas = async () => {
    try {
      const kalenderData = kalenderRef.current?.getData() || { praktek: [], exclusion: [] };
      validateInput(kalenderData);
      const fasilitasData: EditFacilityRequest = {
        facilityId: id || "",
        name: formik.values.namaFasilitas,
        description: formik.values.deskripsiKlinik,
        cost: formik.values.operationalCost,
        additionalInfo: "",
        masterBuildingId: formik.values.masterBuildingId,
      };

      const { data: { id: fasilitasId } } = await EditFacilityServices(fasilitasData);
      if (!fasilitasId) throw new Error('Fasilitas ID tidak ditemukan');

      await editImages(fasilitasId, imagesData);
      // Pisahkan data praktek yang baru (yang memiliki id dengan format 'session-')
      const newPraktekData = kalenderData.praktek.filter(item => item.id.startsWith('session-'));

      // Pisahkan data exclusion yang baru (yang memiliki id dengan format 'exclusion-')
      const newExclusionData = kalenderData.exclusion.filter(item => item.id.startsWith('exclusion-'));

      // Proses data baru secara parallel jika ada
      const promises = [];

      if (newPraktekData.length > 0) {
        promises.push(createSchedules(fasilitasId, newPraktekData));
      }

      if (newExclusionData.length > 0) {
        promises.push(createExclusions(fasilitasId, newExclusionData));
      }

      if (promises.length > 0) {
        await Promise.all(promises);
      }

      formik.resetForm();
      setImagesData([]);

      navigate('/fasilitas', {
        state: {
          successAdd: true,
          message: 'Fasilitas berhasil diperbarui!'
        }
      });
    } catch (error) {
      console.error('[DEBUG] Error saat menyimpan fasilitas:', error);
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;
        console.error('[DEBUG] Detail error dari server:', responseData || error.message);
      }
      showTemporaryAlertError();
    }
  };


  return {
    formik,
    handleImageChange,
    imagesData,
    errorAlert,
    breadcrumbItems,
    id,
    currentPage,
    setCurrentPage,
    getPageStyle,
    getBorderStyle,
    handleEditFasilitas,
    kalenderRef,
    fasilitasData,
    scheduleDataPraktek,
    scheduleDataPengecualian,
    gedungOptions



  }
}
