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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate()
  const kalenderRef = useRef<{ getData: () => KalenderData }>(null);
  const [ambulanceData, setAmbulanceData] = useState<AmbulanceDataItem | null>(null);

  const [scheduleDataPraktek, setScheduleDataPraktek] = useState<ScheduleDataItem[]>([]);
  const [scheduleDataPengecualian, setScheduleDataPengecualian] = useState<ExclusionDataItem[]>([]);

  const { data: ambulanceDataResponse, refetch } = useFetchData<AmbulanceDataItem>(
    getAmbulanceByIdService,
    [id],
    true,
    // true
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
    if (ambulanceDataResponse) {
      setAmbulanceData(ambulanceDataResponse);
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
  const { isSuccess, message, showAlert } = useSuccessNotification();





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
          message: 'Ambulance berhasi l diperbarui!'
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

  const tabs = [
    { pageNumber: 1, label: 'Informasi Ambulance' },
    { pageNumber: 2, label: 'Jam Operasional' },
  ];

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
    id,
    message,
    isSuccess,
    scheduleDataPraktek,
    scheduleDataPengecualian,
    setCurrentPage,
    currentPage,
    handleEditAmbulance,
    ambulanceData,
    kalenderRef,
    tabs

  }
}



