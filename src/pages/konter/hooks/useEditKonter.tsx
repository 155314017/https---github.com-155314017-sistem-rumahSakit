import { useEffect, useState, useRef } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import "dayjs/locale/id";
import { useNavigate, useParams } from 'react-router-dom';
import { GetCounterByIdServices } from '../../../services/Admin Tenant/ManageCounter/GetCounterById';
import { ExclusionDataItem, GetExclusionByTypeId } from '../../../services/Admin Tenant/ManageSchedule/GetExclusionByTypeIdServices';
import { createExclusions, createSchedules, KalenderData, validateInput } from '../../../services/Admin Tenant/ManageSchedule/ScheduleUtils';
import { GetScheduleByTypeId, ScheduleDataItem } from '../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices';
import { editImages, ImageData } from '../../../services/Admin Tenant/ManageImage/ImageUtils';
import { EditCounterServices } from '../../../services/Admin Tenant/ManageCounter/EditCounterService';
import { CounterDataItem } from '../../../types/counter.types';
import { useFetchData } from '../../../hooks/useFetchData';


export default function useEditKonter() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [imagesData, setImagesData] = useState<ImageData[]>([])
  const [errorAlert, setErrorAlert] = useState(false)
  const kalenderRef = useRef<{ getData: () => KalenderData }>(null);
  const { id } = useParams()
  const [counterData, setCounterData] = useState<CounterDataItem | null>(null);
  const [scheduleDataPraktek, setScheduleDataPraktek] = useState<ScheduleDataItem[] | null>(null);
  const [scheduleDataPengecualian, setScheduleDataPengecualian] = useState<ExclusionDataItem[] | null>(null);

  const navigate = useNavigate()

  interface FormValues {
    namaKonter: string;
    lokasiKonter: string;
  }

  const { data: counterDataResponse, refetch: refetch } = useFetchData<CounterDataItem>(
    GetCounterByIdServices,
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
    if (counterDataResponse) {
      setCounterData(counterDataResponse);
    }
    if (scheduleResponse) {
      setScheduleDataPraktek(Array.isArray(scheduleResponse) ? scheduleResponse : []);
    }
    if (scheduleExclusionResponse) {
      setScheduleDataPengecualian(Array.isArray(scheduleExclusionResponse) ? scheduleExclusionResponse : []);
    }
  })

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
    { label: "Konter", href: "/konter" },
    { label: "Edit Konter", href: "/editKonter/:id" },
  ];

  const formik = useFormik<FormValues>({
    initialValues: {
      namaKonter: counterData?.name || '',
      lokasiKonter: counterData?.location || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      namaKonter: Yup.string().required('Nama Konter wajib diisi'),
      lokasiKonter: Yup.string().required('Deskripsi Konter wajib diisi'),
    }),
    onSubmit: async () => {
    },
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

  const handleEditCounter = async () => {
    try {
      const kalenderData = kalenderRef.current?.getData() || { praktek: [], exclusion: [] };
      validateInput(kalenderData);
      const counterData = {
        name: formik.values.namaKonter,
        location: formik.values.lokasiKonter,
        additionalInfo: '',
        counterId: id || ''
      };

      const { data: { id: counterId } } = await EditCounterServices(counterData);
      if (!counterId) throw new Error('Counter ID tidak ditemukan');

      await editImages(counterId, imagesData);
      // Pisahkan data praktek yang baru (yang memiliki id dengan format 'session-')
      const newPraktekData = kalenderData.praktek.filter(item => item.id.startsWith('session-'));

      // Pisahkan data exclusion yang baru (yang memiliki id dengan format 'exclusion-')
      const newExclusionData = kalenderData.exclusion.filter(item => item.id.startsWith('exclusion-'));

      // Proses data baru secara parallel jika ada
      const promises = [];

      if (newPraktekData.length > 0) {
        promises.push(createSchedules(counterId, newPraktekData));
      }

      if (newExclusionData.length > 0) {
        promises.push(createExclusions(counterId, newExclusionData));
      }

      if (promises.length > 0) {
        await Promise.all(promises);
      }

      formik.resetForm();
      setImagesData([]);

      navigate('/konter', {
        state: {
          successAdd: true,
          message: 'Konter berhasil diperbarui!'
        }
      });
    } catch (error) {
      console.error('[DEBUG] Error saat menyimpan konter:', error);
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;
        console.error('[DEBUG] Detail error dari server:', responseData || error.message);
      }
      showTemporaryAlertError();
    }
  };

  const tabs = [
    { pageNumber: 1, label: 'Informasi Konter' },
    { pageNumber: 2, label: 'Jam Operasional' },
  ];

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
    tabs,
    handleEditCounter,
    kalenderRef,
    counterData,
    scheduleDataPraktek,
    scheduleDataPengecualian
  }
}
