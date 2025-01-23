import { useRef, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from 'dayjs';
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { createClinic } from '../../../services/Admin Tenant/ManageClinic/CreateClinic';
import { KalenderData, validateInput } from '../../../services/Admin Tenant/ManageSchedule/ScheduleUtils';
import { createExclusions } from '../../../services/Admin Tenant/ManageSchedule/ScheduleUtils';
import { ImageData, uploadImages } from '../../../services/Admin Tenant/ManageImage/ImageUtils';
import { createSchedules } from '../../../services/Admin Tenant/ManageSchedule/ScheduleUtils';


export default function useTambahKlinik() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [successAlert, setSuccessAlert] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
  const [imagesData, setImagesData] = useState<ImageData[]>([]);
  const [errorAlert, setErrorAlert] = useState(false);
  const [operationalTime] = useState<string | null>(null);
  const kalenderRef = useRef<{ getData: () => KalenderData }>(null);
  const navigate = useNavigate();

  const showTemporaryAlertError = async () => {
    setErrorAlert(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setErrorAlert(false);
  };

  const showTemporaryAlertSuccess = async () => {
    setSuccessAlert(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setSuccessAlert(false);
  };

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Klinik", href: "/klinik" },
    { label: "Tambah Klinik", href: "/tambahKlinik" },
  ];

  const formik = useFormik({
    initialValues: {
      namaKlinik: '',
      deskripsiKlinik: '',
      code: '',
    },
    validationSchema: Yup.object({
      namaKlinik: Yup.string().required('Nama Klinik is required'),
      deskripsiKlinik: Yup.string().required('Deskripsi Klinik is required'),
      code: Yup.string().required('Code Klinik is required'),
    }),
    onSubmit: async (values) => {      
      console.log(values);
    },
  });

  const handleImageChange = (images: ImageData[]) => {
    setImagesData(images);
  };

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

  const handleSaveKlinik = async () => {
    try {
      const kalenderData = kalenderRef.current?.getData() || { praktek: [], exclusion: [] };

      // Validasi input schedule
      validateInput(kalenderData);

      // Data untuk CreateAmbulanceService
      const klinikData = {
        name: formik.values.namaKlinik , // Sebaiknya ini dari form atau auto-generate
        description: formik.values.deskripsiKlinik,
        additionalInfo: '',
        code: formik.values.code
      };

      // Buat ambulance baru
      const { data: { id: klinikId } } = await createClinic(klinikData);
      if (!klinikId) throw new Error('Klinik ID tidak ditemukan');

      // Proses secara parallel untuk optimasi
      await Promise.all([
        createSchedules(klinikId, kalenderData.praktek),
        createExclusions(klinikId, kalenderData.exclusion),
        uploadImages(klinikId, imagesData)
      ]);

      // Reset state dan redirect
      formik.resetForm();
      setImagesData([]);

      navigate('/klinik', {
        state: {
          successAdd: true,
          message: 'Klinik berhasil ditambahkan!'
        }
      });
    } catch (error) {
      console.error('[DEBUG] Error saat menyimpan klinik:', error);
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;
        console.error('[DEBUG] Detail error dari server:', responseData || error.message);
      }
      showTemporaryAlertError();
    }
  };
  return {
    breadcrumbItems,
    formik,
    imagesData,
    setImagesData,
    handleImageChange,
    successAlert,
    errorAlert,
    operationalTime,
    showTemporaryAlertSuccess,
    currentPage,
    setCurrentPage,
    getPageStyle,
    getBorderStyle,
    kalenderRef,
    handleSaveKlinik
  }
}
