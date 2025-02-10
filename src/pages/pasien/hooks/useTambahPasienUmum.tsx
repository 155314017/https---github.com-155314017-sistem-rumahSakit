/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import 'react-phone-input-2/lib/style.css';
import { styled } from '@mui/material/styles';
import { Radio } from '@mui/material';
import { RadioProps } from '@mui/material/Radio';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import GetUserByNIK from '../../../services/Admin Tenant/ManageUser/GetUserByNIK';
import GetPatientByUserIdServices from '../../../services/Patient Tenant/GetPatientByUserIdServices';
type Doctor = {
    id: string;
    name: string;
};

type PatientData =
    {
        id: string | undefined;
        nik: string | undefined;
        email: string | undefined;
        phone: string | undefined;
        fullname: string | undefined;
        address: string | undefined;
        gender: string | undefined;
        birthDate: string | undefined;
        birthPlace: string | undefined;
    };

type queueData = {
    id: string;
    registrationDataId: string;
    createdBy: string;
    createdDateTime: number;
    updatedBy: string | null;
    updatedDateTime: number | null;
    deletedBy: string | null;
    deletedDateTime: number | null;
    queueNumber: number;
    clinicId: string;
    status: string | null;
}

type Clinic = {
    id: string;
    name: string;
};

type dataTicket = {
    nomorAntrian: any | undefined;
    namaDokter: string;
    clinic: string;
    tanggalReservasi: string;
    jadwalKonsul: string | null;
    bookingCode: string
}


const validationSchema = Yup.object().shape({
});

const validationSchema1 = Yup.object().shape({
    phone: Yup.string()
        .required('No Handphone pasien is required')
        .matches(/^[0-9]+$/, 'No Handphone pasien must be a number')
        .min(10, 'No Handphone pasien must be at least 10 digits')
        .max(15, 'No Handphone pasien must be at most 15 digits'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    jenisKunjungan: Yup.string()
        .required('Jenis Kunjungan is required'),
    complaint: Yup.string()
        .required('Keluhan Pasien is required'),
});



export default function useTambahPasienUmum() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [guardFullPage, setGuardFullPage] = useState(true);
    const [patientFullPage, setPatientFullsPage] = useState(true);
    const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);
    const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);
    const [doctorOptions, setDoctorOptions] = useState<Doctor[]>([]);
    const [dataTickets, setDataTickets] = useState<dataTicket>();
    const [needAdmin, setNeedAdmin] = useState(false);
    const [NIK, setNIK] = useState('');
    const [idClinic, setIdClinic] = useState('');
    const [idDoctor, setIdDoctor] = useState('');
    const [docterName, setDocterName] = useState('');
    const [mainPages, setMainPages] = useState(true);
    const [clinicOptions, setClinicOptions] = useState<Clinic[]>([]);
    const [clinicName, setClinicName] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [birth, setBirth] = useState('');
    const [idPatient, setIdPatient] = useState<string | undefined>('');
    const [patientData, setPatientData] = useState<PatientData>();
    const [fileName, setFileName] = useState("");
    const [tanggalReserve, setTanggalReserve] = useState('');
    const [registrationCode, setRegistrationCode] = useState('');
    const [bookingCode, setBookingCode] = useState('');
    const [queueNumber,] = useState('');
    const [queueData, setQueueData] = useState<queueData>();
    const [pasienBaru, setPasienBaru] = useState(false);

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    };


    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Pasien", href: "/pasien" },
        { label: "Tambah Pasien", href: "/tambahPasien/Umum" },
    ];


    const formik = useFormik({
        initialValues: {
            nikCari: '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            nik: Yup.string().matches(/^[0-9]+$/, 'NIK harus berupa angka')
                .min(16, 'NIK minimal 16 digit')
                .max(16, 'NIK maksimal 16 digit')
                .required('NIK wajib diisi'),
            nikCari: Yup.string()
                .matches(/^[0-9]+$/, 'NIK harus berupa angka')
                .min(16, 'NIK minimal 16 digit')
                .max(16, 'NIK maksimal 16 digit')
                .required('NIK wajib diisi'),
        }),
        onSubmit: (values) => {
            setNIK(values.nikCari);
            console.log('NIK:', values.nikCari);
            console.log('Form submitted:', values);
        },
    });

    const BpIcon = styled('span')(({ theme }) => ({
        borderRadius: '50%',
        width: 24,
        height: 24,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '.Mui-focusVisible &': {
            outline: '2px auto red',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
            ...theme.applyStyles('dark', {
                backgroundColor: '#30404d',
            }),
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
            ...theme.applyStyles('dark', {
                background: 'rgba(57,75,89,.5)',
            }),
        },
        ...theme.applyStyles('dark', {
            boxShadow: '0 0 0 1px rgb(16 22 26 / 40%)',
            backgroundColor: '#394b59',
            backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))',
        }),
    }));

    const BpCheckedIcon = styled(BpIcon)({
        backgroundColor: '#7367F0',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&::before': {
            display: 'block',
            width: 24,
            height: 24,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#7367F0',
        },
    });

    const changePage2 = async () => {
        console.log("change page 2");
        if (needAdmin === true) {
            setMainPages(false);
        } else {
            setCurrentPage(2);
        }

    }

    function BpRadio(props: RadioProps) {
        return (
            <Radio
                disableRipple
                color="default"
                checkedIcon={<BpCheckedIcon />}
                icon={<BpIcon />}
                {...props}
            />
        );
    }

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/doctor/?pageNumber=0&pageSize=10&orderBy=id=asc`, {
                    timeout: 10000
                });
                setDoctorOptions(response.data.data.content.map((item: Doctor) => ({
                    id: item.id,
                    name: item.name,
                })));
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("Axios error:", error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            }
        };
        fetchDoctorData();
    }, []);

    const showTemporaryAlert = async () => {
        setShowAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setShowAlert(false);
    };

    const findPatientByNik = async (nik: string) => {
        try {
            setNIK(nik);
            const responsePatient = await GetUserByNIK(nik);



            // Validasi response
            if (responsePatient?.responseCode === "200") {
                if (responsePatient?.data === null) {
                    setPasienBaru(true);
                    setPatientFullsPage(false);
                    console.log("pasien baru", pasienBaru);
                } else {
                    setNIK(nik);
                    setIdPatient(responsePatient?.data.id);
                    const response = await GetPatientByUserIdServices(responsePatient.data.id || '');
                    const birthDateArray = response?.data.birthDate || [];
                    const formattedBirthDate = birthDateArray.length === 3
                        ? `${String(birthDateArray[1]).padStart(2, '0')}/${String(birthDateArray[2]).padStart(2, '0')}/${birthDateArray[0]}`
                        : '';
                    const dataGet = {
                        id: responsePatient.data.id,
                        nik: response?.data.identityNumber,
                        email: responsePatient.data.email,
                        phone: responsePatient.data.phone,
                        fullname: responsePatient?.data.firstName + ' ' + responsePatient?.data.lastName,
                        address: response?.data.address,
                        gender: response?.data.gender,
                        birthDate: formattedBirthDate,
                        birthPlace: response?.data.birthPlace
                    }
                    setBirth(dataGet?.birthDate || '');
                    setPatientData(dataGet);
                    console.log(birth);
                    setPatientFullsPage(false);
                }
            } else {
                showTemporaryAlert();
            }

        } catch (err: any) {

            if (err.response?.status === 404) {
                console.error("Pasien tidak ditemukan (404).");
            } else {
                console.error("Terjadi kesalahan saat memproses data:", err.message);
            }
        }
    };

    useEffect(() => {
        console.log("pasien baru", pasienBaru);
    }, [pasienBaru]);

    useEffect(() => {
        const fetchClinicData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/clinic/?pageNumber=0&pageSize=10&orderBy=createdDateTime=asc`, {
                    timeout: 10000
                });
                setClinicOptions(response.data.data.content.map((item: Clinic) => ({
                    id: item.id,
                    name: item.name,
                })));
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("Axios error:", error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            }
        };
        fetchClinicData();
    }, []);

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/doctor/?pageNumber=0&pageSize=10&orderBy=id=asc`, {
                    timeout: 10000
                });
                setDoctorOptions(response.data.data.content.map((item: Doctor) => ({
                    id: item.id,
                    name: item.name,
                })));
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("Axios error:", error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            }
        };
        fetchDoctorData();
    }, []);

    const handleScheduleChange = (scheduleId: string, schedule: string) => {
        setSelectedScheduleId(scheduleId);
        setSelectedSchedule(schedule);
    };

    const handleDropdownPoli = (value: string, label: string) => {
        setIdClinic(value)
        setClinicName(label);
    };


    const handleDropdownDocter = (value: string, label: string) => {
        setIdDoctor(value)
        setDocterName(label);
    };

    const handleCreateUser = async (values: {
        nik: string;
        email: string | undefined;
        phone: string | undefined;
        fullname: string | undefined;
        gender: string | undefined;
        address: string | undefined;
        birthPlace: string | undefined;
        birthDate: string;
      }) => {
        console.log('Values:', values);
        try {
          // Menyusun data untuk dikirim ke API pertama
          const userData = {
            email: values.email || '',
            firstName: values.fullname?.split(' ')[0] || '', // Ambil nama depan dari fullname
            lastName: values.fullname?.split(' ')[1] || '', // Ambil nama belakang dari fullname
            nickname: values.fullname?.split(' ')[0] || '', // Menggunakan nama depan sebagai nickname, bisa disesuaikan
            phoneNumber: values.phone || '',
            maritalStatus: 'SINGLE', // Misalnya, ini bisa diambil dari input
            gender: values.gender || '',
            address: values.address || '',
            identityNumber: values.nik || '', // Menggunakan NIK untuk identityNumber
          };
      
          // Mengirimkan data ke API user pertama
          const response = await axios.post(
            `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/user/`,
            userData,
            {
              headers: {
                'Content-Type': 'application/json',
                // Jika ada token atau header lain, bisa ditambahkan di sini
                // 'Authorization': `Bearer ${yourToken}`,
              }
            }
          );
      
          // Mengecek response dari API user pertama
          if (response.status === 200) {
            console.log('User data created successfully:', response.data);
            const formattedBirthDate = dayjs(values.birthDate).format('YYYY-MM-DD');
      
            // Mengirimkan data ke API pasien
            const patientData = {
              masterUserId: response.data.data.id, // Pastikan response API user pertama memberikan `id` atau identifier lain
              name: values.fullname || '',
              birthDate: formattedBirthDate || '',
              birthPlace: values.birthPlace || '',
              gender: values.gender || '',
              address: values.address || '',
            };
      
            try {
              const patientResponse = await axios.post(
                `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/patient/`,
                patientData,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    // Jika ada token atau header lain, bisa ditambahkan di sini
                    // 'Authorization': `Bearer ${yourToken}`,
                  }
                }
              );
              
              // Mengecek response dari API pasien
              if (patientResponse.status === 200) {
                console.log('Patient data created successfully:', patientResponse.data);
                // Lakukan tindakan lain yang diperlukan setelah data berhasil dikirim (misalnya, navigasi atau notifikasi)
              } else {
                console.error('Failed to create patient data:', patientResponse.data);
              }
            } catch (error) {
              console.error('Error while creating patient data:', error);
            }
      
          } else {
            console.error('Failed to create user data:', response.data);
          }
        } catch (error) {
          console.error('Error while creating user data:', error);
        }
      };
      

    

    const getPageStyle = (page: number) => {
        if (page === currentPage) {
            return { color: "#8F85F3", cursor: "pointer", };
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
                border: "1px solid #EEEEF2",
                bgcolor: '#EEEEF2',
                width: "38px",
                height: "38px",
                borderRadius: "8px",
                justifyContent: "center",
                alignItems: "center",
                color: "#A8A8BD",
            };
        }
    };

    const createTicket = async (dataPatient: dataTicket) => {
        setIsLoading(true)
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/registration/`,
                dataPatient,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const createdDateTimeFormatted = dayjs.unix(response.data.scheduleDatum.createdDateTime).format('DD/MMM/YYYY, HH:mm');
            const dataSent = {
                nomorAntrian: response.data.queueDatum.queueNumber,
                namaDokter: docterName,
                clinic: clinicName,
                tanggalReservasi: createdDateTimeFormatted,
                jadwalKonsul: selectedSchedule,
                bookingCode: response.data.bookingCode
            }
            setDataTickets(dataSent)
            setMainPages(false)
            // setCurrentPage(3);
        } catch (err: any) {
            setMainPages(false)
            setCurrentPage(3);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const fetchClinicData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/clinic/?pageNumber=0&pageSize=10&orderBy=createdDateTime=asc`, {
                    timeout: 10000
                });
                setClinicOptions(response.data.data.content.map((item: Clinic) => ({
                    id: item.id,
                    name: item.name,
                })));
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("Axios error:", error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            }
        };
        fetchClinicData();
    }, []);

   
    const registrationPatient = async (data: any) => {
        setIsLoading(true)
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/registration/`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("response Booking code : ", response.data.data.bookingCode);
            setBookingCode(response.data.data.bookingCode);
            setTanggalReserve(dayjs.unix(response.data.data.createdDateTime).format(' DD/MMM/YYYY, HH:mm'));
            setRegistrationCode(response.data.data.id);
            const queueData = {
                registrationId: response.data.data.id,
                needAdmin: response.data.data.needAdmin,
                clinicId: response.data.data.masterClinicId

            }

            const queue = await axios.post(
                `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/queue/generated`,
                queueData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );


            setQueueData(queue.data.data)
            setMainPages(false)
        } catch (err: any) {
            setMainPages(false)
            setShowAlert(true);
            setCurrentPage(3);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        console.log("data tickets : ", dataTickets)
    }, [dataTickets])

    const handleGoBack = () => {
        if (currentPage === 1) {
            if (patientFullPage == true) {
                navigate(-1)
            } else if (patientFullPage == false) {
                setPatientFullsPage(true);
            }
        } else if (currentPage === 2) {
            if (guardFullPage == true) {
                setCurrentPage(currentPage - 1);
            } else if (guardFullPage == false) {
                setGuardFullPage(true);
            }
        } else if (currentPage === 3) {
            if (mainPages == false) {
                setCurrentPage(1);
            } else if (mainPages == true) {
                setCurrentPage(currentPage - 1);
            }
        } else {
            // window.history.back();
        }
    }

    


    return {
        validationSchema,
        currentPage,
        setCurrentPage,
        getPageStyle,
        getBorderStyle,
        mainPages,
        patientFullPage,
        handleScheduleChange,
        doctorOptions,
        idDoctor,
        handleDropdownDocter,
        findPatientByNik,
        patientData,
        BpRadio,
        changePage2,
        clinicOptions,
        handleDropdownPoli,
        dataTickets,
        showAlert,
        breadcrumbItems,
        formik,
        setNeedAdmin,
        needAdmin,
        NIK,
        birth,
        setPatientData,
        validationSchema1,
        navigate,
        idClinic,
        registrationPatient,
        selectedScheduleId,
        selectedSchedule,
        clinicName,
        docterName,
        tanggalReserve,
        registrationCode,
        queueNumber,
        queueData,
        pasienBaru,
        handleCreateUser
    }
}
