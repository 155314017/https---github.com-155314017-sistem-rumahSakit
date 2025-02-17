/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import 'dayjs/locale/id'
import { useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { getAmbulanceByIdService } from '../../../services/Admin Tenant/ManageAmbulance/GetAmbulanceByIdService'
import { EditAmbulanceServices } from '../../../services/Admin Tenant/ManageAmbulance/EditAmbulanceServices'
import { editImages } from '../../../services/Admin Tenant/ManageImage/ImageUtils'
import { AmbulanceDataItem } from '../../../types/ambulance.types'
import { useFetchData } from '../../../hooks/useFetchData'
import { useSuccessNotification } from '../../../hooks/useSuccessNotification'
import { GetScheduleByTypeId } from '../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices'
import { createSchedules, KalenderData, validateInput } from '../../../services/Admin Tenant/ManageSchedule/ScheduleUtils'
import { createExclusions } from '../../../services/Admin Tenant/ManageSchedule/ScheduleUtils'
import { ScheduleDataItem } from '../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices'
import { ExclusionDataItem, GetExclusionByTypeId } from '../../../services/Admin Tenant/ManageSchedule/GetExclusionByTypeIdServices'


type ImageData = {
  imageName: string;
  imageType: string;
  imageData: string;
};

interface FormValues {
  operationalCost: number
}


export default function useEditAmbulance() {
  const [imagesData, setImagesData] = useState<ImageData[]>([])
  const { id } = useParams()
  const [operationalCost, setOperationalCost] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate()
  const kalenderRef = useRef<{ getData: () => KalenderData }>(null);

  const [scheduleDataPraktek, setScheduleDataPraktek] = useState<ScheduleDataItem[]>([]);
  const [scheduleDataPengecualian, setScheduleDataPengecualian] = useState<ExclusionDataItem[]>([]);


 


  
  const { data: ambulanceData } = useFetchData<AmbulanceDataItem>(
          getAmbulanceByIdService,
          [id],
          true,
          // true
      );


      useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
              
              const scheduleResponse = await GetScheduleByTypeId(id || "");
              const exclusionResponse = await GetExclusionByTypeId(id || "");

              

              if (scheduleResponse) { 
                // Transform API data ke format yang sesuai dengan getKalenderData  
                setScheduleDataPraktek(scheduleResponse);
              }

              if (exclusionResponse) {
                setScheduleDataPengecualian(exclusionResponse);
              }
               setOperationalCost(ambulanceData.cost)
            } catch (error) {
                console.error('Error saat menghapus data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [ambulanceData.cost]);

    const handleImageChange = (images: ImageData[]) => {
            setImagesData(images);
        };
        const { isSuccess, message, showAlert } = useSuccessNotification();


  
  

  const formik = useFormik<FormValues>({
    initialValues: {
      operationalCost: operationalCost || 0
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
        console.error('Error submitting form:', error);
        if (axios.isAxiosError(error)) {
            console.error('Axios error message:', error.message);
            console.error('Response data:', error.response?.data);
            if (error.response) {
                console.error('Response status:', error.response.status);
            } else {
                console.error('Error message:', error.message);
            }
            showAlert("Error editing building", 3000);
        } else {
            console.error('Unexpected error:', error);
        }
    }
};
  

  


  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Ambulance', href: '/ambulance' },
    { label: 'Edit Ambulance', href: `/editAmbulance/${id}` }
  ]
  
  return {
    breadcrumbItems,
    formik,
    imagesData,
    handleImageChange,
    loading,
    id,
    message,
    isSuccess,
    scheduleDataPraktek,
    scheduleDataPengecualian,
    setCurrentPage,
    currentPage,
    getPageStyle,
    getBorderStyle,
    handleEditAmbulance,
    ambulanceData,
    kalenderRef

  }
}



