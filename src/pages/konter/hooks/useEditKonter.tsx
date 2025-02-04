import { useEffect, useState, useRef } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import "dayjs/locale/id";
import { useNavigate, useParams } from 'react-router-dom';
import { CounterDataItem, GetCounterByIdServices } from '../../../services/Admin Tenant/ManageCounter/GetCounterById';
import { ExclusionDataItem, GetExclusionByTypeId } from '../../../services/Admin Tenant/ManageSchedule/GetExclusionByTypeIdServices';
import { createExclusions, createSchedules, KalenderData, validateInput } from '../../../services/Admin Tenant/ManageSchedule/ScheduleUtils';
import { GetScheduleByTypeId, ScheduleDataItem } from '../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices';
import { editImages, ImageData } from '../../../services/Admin Tenant/ManageImage/ImageUtils';
import { EditCounterServices } from '../../../services/Admin Tenant/ManageCounter/EditCounterService';


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
   
  useEffect(() => {
    const fetchData = async () => {
      try {
        const counterResponse = await  GetCounterByIdServices(id); 
        const scheduleResponse = await GetScheduleByTypeId(id || "");
        const exclusionResponse = await GetExclusionByTypeId(id || "");
        console.log("Schedule Response from API:", scheduleResponse);
        console.log("Exclusion Response from API:", exclusionResponse);

        if (counterResponse) {
          setCounterData(counterResponse);
        }

        if (scheduleResponse) { 
          // Transform API data ke format yang sesuai dengan getKalenderData  
          setScheduleDataPraktek(scheduleResponse);
        }

        if (exclusionResponse) {
          setScheduleDataPengecualian(exclusionResponse);
        }

      } catch (error) {
        console.error('Error:', error);
      }

    };
    fetchData();
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
            namaKonter: Yup.string().required('Nama Konter is required'),
            lokasiKonter: Yup.string().required('Deskripsi Konter is required'),
        }),
        onSubmit: async (values) => {
          console.log(values);
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

  const handleEditCounter = async () => {
    try {
      const kalenderData = kalenderRef.current?.getData() || { praktek: [], exclusion: [] };
      console.log("kalenderData: ", kalenderData);
      // Validasi input schedule
      validateInput(kalenderData);

      // Data untuk EditAmbulanceService
      const counterData = {
        name: formik.values.namaKonter,
        location: formik.values.lokasiKonter,
        additionalInfo: '',
        counterId: id || ''
      };

      // Edit ambulance
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
        console.log('Creating new praktek schedules:', newPraktekData);
        promises.push(createSchedules(counterId, newPraktekData));
      }

      if (newExclusionData.length > 0) {
        console.log('Creating new exclusion schedules:', newExclusionData);
        promises.push(createExclusions(counterId, newExclusionData));
      }

      // Tunggu semua proses selesai
      if (promises.length > 0) {
        await Promise.all(promises);
      }

      // Reset state dan redirect
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
    handleEditCounter,
    kalenderRef,
    counterData,
    scheduleDataPraktek,
    scheduleDataPengecualian
  }
}
