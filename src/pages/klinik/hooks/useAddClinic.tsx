import axios from "axios";
import { useFormik } from "formik";
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { createClinic } from '../../../services/Admin Tenant/ManageClinic/CreateClinic';
import { ImageData, uploadImages } from '../../../services/Admin Tenant/ManageImage/ImageUtils';
import { createExclusions, createSchedules, KalenderData, validateInput } from '../../../services/Admin Tenant/ManageSchedule/ScheduleUtils';
import { useSuccessNotification } from "../../../hooks/useSuccessNotification";


export default function useAddClinic() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [imagesData, setImagesData] = useState<ImageData[]>([]);
  const [operationalTime] = useState<string | null>(null);
  const kalenderRef = useRef<{ getData: () => KalenderData }>(null);
  const navigate = useNavigate();
  const { isSuccess, message, showAlert } = useSuccessNotification();

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Klinik", href: "/klinik" },
    { label: "Tambah Klinik", href: "/AddClinic" },
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

  const handleSaveKlinik = async () => {
    try {
      const kalenderData = kalenderRef.current?.getData() || { praktek: [], exclusion: [] };

      // Validasi input schedule
      validateInput(kalenderData);

      // Data untuk CreateClinic
      const klinikData = {
        name: formik.values.namaKlinik,
        description: formik.values.deskripsiKlinik,
        additionalInfo: '',
        code: formik.values.code
      };

      // Buat klinik baru
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
      showAlert("Error Adding Clinic", 3000)
    }
  };

  const tabs = [
    { pageNumber: 1, label: 'Informasi Klinik' },
    { pageNumber: 2, label: 'Jam Operasional' },
  ];

  return {
    breadcrumbItems,
    formik,
    handleImageChange,
    setCurrentPage,
    currentPage,
    kalenderRef,
    handleSaveKlinik,
    operationalTime,
    isSuccess,
    message,
    tabs
  }
}
