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
import GetUserByNIK from '../../../../services/Admin Tenant/ManageUser/GetUserByNIK';
import GetPatientByUserIdServices from '../../../../services/Patient Tenant/GetPatientByUserIdServices';
// import RegisterPatient from '../../../../services/Patient Tenant/RegisterPatient';
import Cookies from 'js-cookie';
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

// type dataPasien = {
//     id: string;
//     additionalInfo: string | null;
//     address: string;
//     birthDate: string; // [year, month, day]
//     gender: string;
//     masterUserId: string;
//     name: string;
//     phone: string;
// }

// type GuardianData = {
//     guardianType: string
//     guardianName: string
//     guardianRelation: string
//     guardianIdentityNumber: string
//     guardianPhone: string
//     guardianEmail: string
//     guardianAddress: string
//     guardianGender: string
// }

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

    // patientId?: string | undefined;
    // typeOfVisit: string;
    // clinicId: string;
    // doctorId: string;
    // scheduleIntervalId: string | null;
    // scheduleDate: string;
    // symptoms: string;
    // needAdmin: boolean;
    // offline: boolean;
}


const validationSchema = Yup.object().shape({
    // nik: Yup.string().required('NIK harus diisi'),
    // email: Yup.string().email('Email tidak valid').required('Email harus diisi'),

    // nik: Yup.string()
    //     .matches(/^[0-9]+$/, 'NIK harus berupa angka')
    //     .min(12, 'NIK minimal 12 digit')
    //     .max(16, 'NIK maksimal 14 digit')
    //     .required('NIK wajib diisi'),
    //     email: Yup.string().required('Email wajib diisi'),
    //       phone: Yup.string()
    //         .required('Isi nomor telepon')
    //         .matches(/^[0-9]{10,15}$/, 'Nomor telepon tidak valid')
    //         .min(10, 'Nomor telepon minimal 10 digit')
    //         .max(14, 'Nomor telepon maksimal 14 digit'),
    //       fullname: Yup.string().required('Nama lengkap wajib diisi'),
    //       gender: Yup.string().required('JenisK kelamin harus dipilih'),
    //       birthPlace: Yup.string().required('Tempat lahir harus diisi'),
    //       address: Yup.string().required('Tempat lahir harus diisi')

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



export default function useTambahPasienUmumOffline() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [guardFullPage, setGuardFullPage] = useState(true);
    const [patientFullPage, setPatientFullsPage] = useState(true);
    const [switchValue, setSwitchValue] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);
    const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [doctorOptions, setDoctorOptions] = useState<Doctor[]>([]);
    const [dataTickets, setDataTickets] = useState<dataTicket>();
    // const [dataGuards, setDataGuards] = useState<GuardianData>();
    const [calendarKey, setCalendarKey] = useState<number>(0);
    const [needAdmin, setNeedAdmin] = useState(false);
    const [NIK, setNIK] = useState('');
    // const [patientData, setPatientData] = useState<ResponsePatient | undefined>();
    // const [patientData, setPatientData] = useState<ResponsePatient>({
    //     id: '',
    //     name: '',
    //     gender: '',
    //     email: '',
    //     birthDate: '',
    //     birthPlace: '',
    //     phone: '',
    //     address: '',
    // });


    const [dataPasien, setDataPasien] = useState<PatientData>();
    const [idClinic, setIdClinic] = useState('');
    const [idDoctor, setIdDoctor] = useState('');
    const [docterName, setDocterName] = useState('');
    const [birthPlace, setBirthPlace] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [mainPages, setMainPages] = useState(true);
    const [clinicOptions, setClinicOptions] = useState<Clinic[]>([]);
    const [clinicName, setClinicName] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [birth, setBirth] = useState('');
    const [ idPatient,setIdPatient] = useState<string | undefined>('');
    const [patientData, setPatientData] = useState<PatientData>();

    const [fileName, setFileName] = useState("");
    const [tanggalReserve, setTanggalReserve] = useState('');
    const [registrationCode, setRegistrationCode] = useState('');
    const [bookingCode, setBookingCode] = useState('');
    const [queueNumber,] = useState('');
    const [queueData, setQueueData] = useState<queueData>();



    // const dummyData = {
    //     responseCode: "200",
    //     message: "Success",
    //     data: [
    //         {
    //             id: "1",
    //             additionalInfo: "Penyakit bawaan: Asma",
    //             address: "Jl. Sudirman No. 45, Jakarta",
    //             birthDate: [1990, 5, 15], // 15 Mei 1990
    //             createdBy: "admin123",
    //             createdDateTime: 1672545600000, // 1 Januari 2023, dalam epoch timestamp
    //             deletedBy: null,
    //             deletedDateTime: null,
    //             gender: "MEN",
    //             masterUserId: "M123",
    //             name: "John Doe",
    //             phone: "081234567890",
    //             updatedBy: "admin456",
    //             updatedDateTime: 1695148800000, // 20 September 2023
    //             birthPlace: "Bandung",
    //         },
    //         {
    //             id: "2",
    //             additionalInfo: null,
    //             address: "Jl. Malioboro No. 10, Yogyakarta",
    //             birthDate: [1985, 12, 25], // 25 Desember 1985
    //             createdBy: "admin123",
    //             createdDateTime: 1656662400000, // 1 Juli 2022
    //             deletedBy: "admin789",
    //             deletedDateTime: 1696454400000, // 4 Oktober 2023
    //             gender: "Female",
    //             masterUserId: "M124",
    //             name: "Jane Smith",
    //             phone: "085678123456",
    //             updatedBy: null,
    //             updatedDateTime: null,
    //             birthPlace: "Surabaya",
    //         },
    //         {
    //             id: "3",
    //             additionalInfo: "Penyakit bawaan: Diabetes",
    //             address: "Jl. Gajah Mada No. 77, Semarang",
    //             birthDate: [1995, 7, 20], // 20 Juli 1995
    //             createdBy: "admin234",
    //             createdDateTime: 1664582400000, // 1 Oktober 2022
    //             deletedBy: null,
    //             deletedDateTime: null,
    //             gender: "Male",
    //             masterUserId: "M125",
    //             name: "Michael Johnson",
    //             phone: "089876543210",
    //             updatedBy: "admin123",
    //             updatedDateTime: 1689475200000, // 15 Juli 2023
    //             birthPlace: "Medan",
    //         },
    //     ],
    // };

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    };


    const breadcrumbItems = [
        { label: "Pasien Lama", href: "/tes" },
        // { label: "Pasien", href: "/pasien" },
        // { label: "Tambah Pasien", href: "/tambahPasien/Umum" },
    ];

    const formik = useFormik({
        initialValues: {
            nikCari: '',
            // phone: patientData?.phone,
            // gender: patientData?.gender,
            // fullname: patientData?.fullname,
            // birthDatePatient: birthDate,
            // birthPlacePatient: birthPlace,
            // phonePasien: '',
            // nikGuardian: switchValue ? dataPasien?.nik : '',
            // typeGuardian: switchValue ? 'SENDIRI' : '',
            // caraDatang: '',
            // fullnameGuardian: switchValue ? dataPasien?.fullname : '',
            // emailGuardian: switchValue ? dataPasien?.email : '',
            // genderGuardian: switchValue ? dataPasien?.gender : '',
            // addressGuardian: switchValue ? dataPasien?.address : '',
            // phoneGuardian: switchValue ? dataPasien?.phone : '62',
            // birthPlaceGuardian: switchValue ? dataPasien?.birthPlace : '',
            // birthDateGuardian: switchValue ? dataPasien?.birthDate : '',
            // docs: '',
            // asuranceDocs: '',
            // // create appointment
            // jenisKunjungan: '',
            // poli: '',
            // doctor: '',
            // keluhan: '',
            // riwayatPenyakit: '',
            // alergi: '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            nik: Yup.string().matches(/^[0-9]+$/, 'NIK harus berupa angka')
            .min(16, 'NIK minimal 16 digit')
            .max(16, 'NIK maksimal 16 digit')
            .required('NIK wajib diisi'),
            // address: Yup.string().required('tes'),
            nikCari: Yup.string()
                .matches(/^[0-9]+$/, 'NIK harus berupa angka')
                .min(16, 'NIK minimal 16 digit')
                .max(16, 'NIK maksimal 16 digit')
                .required('NIK wajib diisi'),
            // phonePasien: Yup.string().required('No. Handphone Pasien is required'),
            // caraDatang: Yup.string().required('Cara datang is required'),
            // jenisKunjungan: Yup.string().required('Jenis Kunjungan is required'),
            // poli: Yup.string().required('Poli yang dituju is required'),
            // doctor: Yup.string().required('Pilih Dokter is required'),
            // keluhan: Yup.string().required('Keluhan pasien is required'),
            // riwayatPenyakit: Yup.string().required('Riwayat penyakit is required'),
            // alergi: Yup.string().required('Alergi is required'),
            // nikGuardian: Yup.string()
            //     .matches(/^[0-9]+$/, 'NIK harus berupa angka')
            //     .min(16, 'NIK minimal 16 digit')
            //     .max(16, 'NIK maksimal 16 digit')
            //     .required('NIK wajib diisi'),
            // emailGuardian: Yup.string().required('EmailGuardian is required'),
            // fullnameGuardian: Yup.string().required('EmailGuardian is required'),
            // genderGuardian: Yup.string().required('EmailGuardian is required'),
            // addressGuardian: Yup.string().required('EmailGuardian is required'),
            // phoneGuardian: Yup.string().required('EmailGuardian is required'),
        }),
        onSubmit: (values) => {
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
            const responsePatient = await GetUserByNIK(nik);
            


            // Validasi response
            if (responsePatient?.responseCode === "200") {
                if(responsePatient?.data === null) {
                    
                    setCurrentPage(2);
                    setNeedAdmin(true);
                }else{
                setNIK(nik);
                setIdPatient(responsePatient?.data.id);
                // Mencari pasien berdasarkan NIK di data dummy
                const response = await GetPatientByUserIdServices(responsePatient.data.id || '');
                // const birthDateProcess = response?.data.birthDateAndPlace.split(',')[1].trim();
                // const birthPlaceProcess = response?.data.birthDateAndPlace.split(',')[0];
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

                // Set state dengan data yang terproses
                setDataPasien(dataGet);
                setBirth(dataGet?.birthDate || '');
                setPatientData(dataGet);
                console.log(birth);
                setPatientFullsPage(false);
            }
            } else {
                // Jika pasien dengan NIK tidak ditemukan
                // setNeedAdmin(false);
                // setCurrentPage(2);
                showTemporaryAlert(); // Tampilkan alert untuk user
            }

        } catch (err: any) {
            
            
            // Error handling
            if (err.response?.status === 404) {
                
                console.error("Pasien tidak ditemukan (404).");
            } else {
                console.error("Terjadi kesalahan saat memproses data:", err.message);
            }
            // showTemporaryAlert(); // Tampilkan alert untuk user
        }
    };

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
        setCalendarKey((prevKey) => prevKey + 1);
    };



    // const putGuard = async () => {
    //     try {
    //         const tes = {
    //             patientId: patientData.id,
    //             guardianIdentityNumber: formik.values.nikGuardian,
    //             guardianName: formik.values.fullnameGuardian,
    //             guardianPhone: formik.values.phoneGuardian,
    //             guardianEmail: formik.values.emailGuardian,
    //             guardianGender: formik.values.genderGuardian,
    //             guardianAddress: formik.values.addressGuardian,
    //             guardianType: formik.values.typeGuardian,
    //             guardianRelation: formik.values.typeGuardian,
    //             guardianBirthPlace: formik.values.birthPlaceGuardian,
    //             guardianBirthDate: formik.values.birthDateGuardian,
    //         }

    //         setCurrentPage(3)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }




    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMethod(event.target.value);
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

    const isCurrentPageValid = () => {
        if (currentPage === 1) {
            return formik.values.nikCari;
        } else if (currentPage === 2) {
            // if (guardFullPage == true) {
            //     return formik.values.nikGuardian
            // } else if (guardFullPage == false) {
            //     return formik.values.nikGuardian && formik.values.emailGuardian && formik.values.phoneGuardian && formik.values.fullnameGuardian && formik.values.typeGuardian && formik.values.genderGuardian && formik.values.addressGuardian;
            // }
        } else if (currentPage === 3) {
            // return formik.values.jenisKunjungan;
        }
        return false;
    };

    const handleSwitchChange = (value: boolean) => {
        setSwitchValue(value);
    };

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
            // const createdDateTimeFormatted = dayjs.unix(response.data.scheduleDatum.createdDateTime).format('DD/MMM/YYYY, HH:mm');
            // const dataSent = {
            //     nomorAntrian: response.data.queueDatum.queueNumber,
            //     namaDokter: docterName,
            //     clinic: clinicName,
            //     tanggalReservasi: createdDateTimeFormatted,
            //     jadwalKonsul: selectedSchedule,
            //     bookingCode: response.data.bookingCode

            // }
            setTanggalReserve(dayjs.unix(response.data.data.createdDateTime).format('dddd, D MMMM YYYY HH:mm:ss'));
            setRegistrationCode(response.data.data.id);
            // console.log("Registration : ", dataTickets);
            // console.log("Tanggal Reserve : ", tanggalReserve);
            // console.log("Registration Id : ", response.data.data.id);
            // console.log("Clinic Id : ", response.data.data.masterClinicId);
            // console.log("Need Admin : ", response.data.data.needAdmin);
            const queueData = {
                registrationId: response.data.data.id,
                needAdmin: response.data.data.needAdmin,
                clinicId: response.data.data.masterClinicId
                
            }

            const token = Cookies.get('accessToken');
            const queue = await axios.post(
                `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/queue/generated`,
                queueData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "accessToken": `${token}`
                    },
                }
            );

            
            setQueueData(queue.data.data)
            // console.log("Queue Data : ", queueData);
            // console.log(queue.data.data.queueNumber);
            // console.log("Queue Number : ", queueNumber);
            
            setMainPages(false)
            // setCurrentPage(3);
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
        breadcrumbItems,
        currentPage,
        setCurrentPage,
        getPageStyle,
        getBorderStyle,
        isCurrentPageValid,
        handleSwitchChange,
        switchValue,
        selectedMethod,
        setSelectedMethod,
        mainPages,
        setMainPages,
        guardFullPage,
        setGuardFullPage,
        patientFullPage,
        setPatientFullsPage,
        handleRadioChange,
        handleScheduleChange,
        setIdClinic,
        idClinic,
        handleDropdownDocter,
        doctorOptions,
        setIdDoctor,
        idDoctor,
        findPatientByNik,
        patientData,
        BpRadio,
        // putGuard,
        changePage2,
        dataPasien,
        clinicOptions,
        handleDropdownPoli,
        createTicket,
        setDataTickets,
        dataTickets,
        birthDate,
        birthPlace,
        showAlert,
        calendarKey,
        isLoading,
        handleGoBack,
        formik,
        setNeedAdmin,
        needAdmin,
        fileName,
        handleFileChange,
        NIK,
        birth,
        setPatientData,
        validationSchema1,
        navigate,
        setBirthDate,
        setBirthPlace,
        registrationPatient,
        selectedScheduleId,
        selectedSchedule,
        clinicName,
        docterName,
        tanggalReserve,
        registrationCode,
        bookingCode,
        queueNumber,
        queueData,
        idPatient


    }
}
