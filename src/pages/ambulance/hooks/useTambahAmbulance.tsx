import axios from 'axios'
import 'dayjs/locale/id'
import { useFormik } from 'formik'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { CreateAmbulanceService } from '../../../services/Admin Tenant/ManageAmbulance/CreateAmbulanceService'
import { uploadImages } from '../../../services/Admin Tenant/ManageImage/ImageUtils'
import { createExclusions, createSchedules, KalenderData, validateInput } from '../../../services/Admin Tenant/ManageSchedule/ScheduleUtils'

type ImageData = {
  imageName: string
  imageType: string
  imageData: string
}

export default function useTambahAmbulance() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [imagesData, setImagesData] = useState<ImageData[]>([])
  const [errorAlert, setErrorAlert] = useState(false)
  const kalenderRef = useRef<{ getData: () => KalenderData }>(null);

  const navigate = useNavigate()


  interface FormValues {
    operationalCost: number
  }

  const showTemporaryAlertError = async () => {
    setErrorAlert(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setErrorAlert(false)
  }

  const handleImageChange = (images: ImageData[]) => {
    setImagesData(images)
  }

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Ambulance', href: '/ambulance' },
    { label: 'Tambah Ambulance', href: '/tambahAmbulance' }
  ]

  const formik = useFormik<FormValues>({
    initialValues: {
      operationalCost: 0
    },
    validationSchema: Yup.object({
      operationalCost: Yup.number()
        .required('Operational Cost is required')
        .positive('Must be a positive number')
    }),
    onSubmit: async values => {
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

  const handleSaveAmbulance = async () => {
    try {
      const kalenderData = kalenderRef.current?.getData() || { praktek: [], exclusion: [] };

      // Validasi input schedule
      validateInput(kalenderData);

      // Data untuk CreateAmbulanceService
      const ambulanceData = {
        number: '12345', // Sebaiknya ini dari form atau auto-generate
        status: 'ACTIVE',
        additionalInfo: '',
        cost: formik.values.operationalCost
      };

      // Buat ambulance baru
      const { data: { id: ambulanceId } } = await CreateAmbulanceService(ambulanceData);
      if (!ambulanceId) throw new Error('Ambulance ID tidak ditemukan');

      console.log("here exclusion: ");
      console.log(kalenderData.exclusion);
      // Proses secara parallel untuk optimasi
      await Promise.all([
        createSchedules(ambulanceId, kalenderData.praktek),
        createExclusions(ambulanceId, kalenderData.exclusion),
        uploadImages(ambulanceId, imagesData)
      ]);

      // Reset state dan redirect
      formik.resetForm();
      setImagesData([]);
      
      navigate('/ambulance', {
        state: {
          successAdd: true,
          message: 'Ambulance berhasil ditambahkan!'
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
    errorAlert,
    handleImageChange,
    breadcrumbItems,
    formik,
    currentPage,
    setCurrentPage,
    getPageStyle,
    getBorderStyle,
    handleSaveAmbulance,
    kalenderRef
  }

}
