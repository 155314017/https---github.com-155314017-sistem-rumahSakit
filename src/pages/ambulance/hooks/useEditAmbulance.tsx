/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import 'dayjs/locale/id'
import { useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { getAmbulanceByIdService } from '../../../services/Admin Tenant/ManageAmbulance/GetAmbulanceByIdService'
import { GetScheduleByTypeId } from '../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices'
import { createSchedules, KalenderData, validateInput } from '../../../services/Admin Tenant/ManageSchedule/ScheduleUtils'
import { createExclusions } from '../../../services/Admin Tenant/ManageSchedule/ScheduleUtils'
import { ScheduleDataItem } from '../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices'
import { ExclusionDataItem, GetExclusionByTypeId } from '../../../services/Admin Tenant/ManageSchedule/GetExclusionByTypeIdServices'
import { EditAmbulanceServices } from '../../../services/Admin Tenant/ManageAmbulance/EditAmbulanceServices'
import { editImages } from '../../../services/Admin Tenant/ManageImage/ImageUtils'


type AmbulanceDataItem = {
  id: string;
  number: string;
  status: string;
  additionalInfo: string;
  createdBy: string;
  createdDateTime: number;
  updatedBy: string | null;
  updatedDateTime: number | null;
  deletedBy: string | null;
  deletedDateTime: number | null;
  cost: number;
}

type ImageData = {
  imageName: string;
  imageType: string;
  imageData: string;
}

export default function useEditAmbulance() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [imagesData, setImagesData] = useState<ImageData[]>([])
  const [errorAlert, setErrorAlert] = useState(false)
  const kalenderRef = useRef<{ getData: () => KalenderData }>(null);
  const { id } = useParams()
  const [ambulanceData, setAmbulanceData] = useState<AmbulanceDataItem | null>(null);
  const [scheduleDataPraktek, setScheduleDataPraktek] = useState<ScheduleDataItem[] | null>(null);
  const [scheduleDataPengecualian, setScheduleDataPengecualian] = useState<ExclusionDataItem[] | null>(null);


  const navigate = useNavigate()

  interface FormValues {
    operationalCost: number
  }


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ambulanceResponse = await getAmbulanceByIdService(id); 
        const scheduleResponse = await GetScheduleByTypeId(id || "");
        const exclusionResponse = await GetExclusionByTypeId(id || "");
        console.log("Schedule Response from API:", scheduleResponse);
        console.log("Exclusion Response from API:", exclusionResponse);

        if (ambulanceResponse) {
          setAmbulanceData(ambulanceResponse);
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


  const showTemporaryAlertError = async () => {
    setErrorAlert(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setErrorAlert(false)
  }
  

  const formik = useFormik<FormValues>({
    initialValues: {
      operationalCost: ambulanceData?.cost || 0
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      operationalCost: Yup.number()
        .required('Operational Cost is required')
        .positive('Must be a positive number')
    }),
    onSubmit: async (values) => {
      console.log(values);
    }
  })
  

  const handleImageChange = (images: ImageData[]) => {
    setImagesData(images)
  }

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

  const handleEditAmbulance = async () => {
    try {
      const kalenderData = kalenderRef.current?.getData() || { praktek: [], exclusion: [] };
      console.log("kalenderData: ", kalenderData);
      // Validasi input schedule
      validateInput(kalenderData);

      // Data untuk EditAmbulanceService
      const ambulanceData = {
        number: '12345',
        status: 'ACTIVE',
        additionalInfo: '',
        cost: formik.values.operationalCost,
        ambulanceId: id || ''
      };

      // Edit ambulance
      const { data: { id: ambulanceId } } = await EditAmbulanceServices(ambulanceData);
      if (!ambulanceId) throw new Error('Ambulance ID tidak ditemukan');

      await editImages(ambulanceId, imagesData);
      // Pisahkan data praktek yang baru (yang memiliki id dengan format 'session-')
      const newPraktekData = kalenderData.praktek.filter(item => item.id.startsWith('session-'));
      
      // Pisahkan data exclusion yang baru (yang memiliki id dengan format 'exclusion-')
      const newExclusionData = kalenderData.exclusion.filter(item => item.id.startsWith('exclusion-'));

      // Proses data baru secara parallel jika ada
      const promises = [];
      
      if (newPraktekData.length > 0) {
        console.log('Creating new praktek schedules:', newPraktekData);
        promises.push(createSchedules(ambulanceId, newPraktekData));
      }

      if (newExclusionData.length > 0) {
        console.log('Creating new exclusion schedules:', newExclusionData);
        promises.push(createExclusions(ambulanceId, newExclusionData));
      }

      // Tunggu semua proses selesai
      if (promises.length > 0) {
        await Promise.all(promises);
      }

      // Reset state dan redirect
      formik.resetForm();
      setImagesData([]);
      
      navigate('/ambulance', {
        state: {
          successAdd: true,
          message: 'Ambulance berhasil diperbarui!'
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


  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Ambulance', href: '/ambulance' },
    { label: 'Edit Ambulance', href: `/editAmbulance/${id}` }
  ]
  
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
    handleEditAmbulance,
    kalenderRef,
    ambulanceData,
    scheduleDataPraktek,
    scheduleDataPengecualian
  }
}



