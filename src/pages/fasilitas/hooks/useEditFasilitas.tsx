import { useEffect, useRef, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id');
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { getFacilityByIdService } from '../../../services/Admin Tenant/ManageFacility/GetFacilityByIdService';
import { createExclusions, createSchedules, KalenderData, validateInput } from '../../../services/Admin Tenant/ManageSchedule/ScheduleUtils';
import { GetScheduleByTypeId, ScheduleDataItem } from '../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices';
import { ExclusionDataItem, GetExclusionByTypeId } from '../../../services/Admin Tenant/ManageSchedule/GetExclusionByTypeIdServices';
import { editImages, ImageData } from '../../../services/Admin Tenant/ManageImage/ImageUtils';
import { EditFacilityServices } from '../../../services/Admin Tenant/ManageFacility/EditFacilityService';
import { Building } from '../../../services/Admin Tenant/ManageBuilding/Building';
import { EditFacilityRequest, FacilityDataItem } from '../../../types/Facility.types';
import { useFetchData } from '../../../hooks/useFetchData';
import { useSuccessNotification } from '../../../hooks/useSuccessNotification';

type Building = {
  id: string;
  name: string;
};

export default function useEditFasilitas() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [imagesData, setImagesData] = useState<ImageData[]>([])
  const kalenderRef = useRef<{ getData: () => KalenderData }>(null);
  const { id } = useParams()
  const [fasilitasData, setFasilitasData] = useState<FacilityDataItem | null>(null);
  const [scheduleDataPraktek, setScheduleDataPraktek] = useState<ScheduleDataItem[] | null>(null);
  const [scheduleDataPengecualian, setScheduleDataPengecualian] = useState<ExclusionDataItem[] | null>(null);
  const [gedungOptions, setGedungOptions] = useState<Building[]>([]);
  const { isSuccess, message, showAlert } = useSuccessNotification();

  const navigate = useNavigate()

  interface FormValues {
    namaFasilitas: string;
    masterBuildingId: string;
    deskripsiKlinik: string;
    operationalCost: number;
  }

  const { data: facilityDataResponse, refetch: refetch } = useFetchData<FacilityDataItem>(
    getFacilityByIdService,
    [id],
    true
  );

  const { data: buildingData, refetch: refetchBuilding } = useFetchData<Building[]>(
    Building,
    [],
    false
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
      refetchBuilding();
      hasFetched.current = true;
    }
  }, [refetch]);

  useEffect(() => {
    if (facilityDataResponse) {
      setFasilitasData(facilityDataResponse);
      setGedungOptions(buildingData.map((item: Building) => ({
        id: item.id,
        name: item.name,
      })));
    }
    if (scheduleResponse) {
      setScheduleDataPraktek(Array.isArray(scheduleResponse) ? scheduleResponse : []);
    }
    if (scheduleExclusionResponse) {
      setScheduleDataPengecualian(Array.isArray(scheduleExclusionResponse) ? scheduleExclusionResponse : []);
    }
  }, [])


  const handleImageChange = (images: ImageData[]) => {
    setImagesData(images);
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
      showAlert("Fasilitas failed to update!", 3000);
    }
  };

  const tabs = [
    { pageNumber: 1, label: 'Informasi Failitas' },
    { pageNumber: 2, label: 'Jam Operasional' },
  ];

  return {
    formik,
    handleImageChange,
    imagesData,
    showAlert,
    message,
    isSuccess,
    breadcrumbItems,
    id,
    currentPage,
    setCurrentPage,
    handleEditFasilitas,
    kalenderRef,
    fasilitasData,
    scheduleDataPraktek,
    scheduleDataPengecualian,
    gedungOptions,
    tabs
  }
}
