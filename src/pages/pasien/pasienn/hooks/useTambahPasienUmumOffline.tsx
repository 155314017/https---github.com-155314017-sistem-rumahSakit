/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import GetPatientByNIKServices from '../../../../services/Patient Tenant/GetPatientByNIKServices';
import 'react-phone-input-2/lib/style.css';
import { styled } from '@mui/material/styles';
import { Radio } from '@mui/material';
import { RadioProps } from '@mui/material/Radio';
import dayjs from 'dayjs';
import CreateAppointmentOffline from '../../../../services/ManagePatient/CreateAppoinmentOffline';
import UpdatePatientGuards from '../../../../services/Patient Tenant/UpdatePatientGuard';
import { getGuardianData } from '../../../../services/ManagePatient/getGuardianByPatientId';
import { useNavigate } from 'react-router-dom';
// import RegisterPatient from '../../../../services/Patient Tenant/RegisterPatient';

type Doctor = {
    id: string;
    name: string;
};

type ResponsePatient = {
    id: string;
    identityNumber: string,
    fullName: string,
    gender: string,
    email: string,
    birthDateAndPlace: string,
    phoneNumber: string,
    address: string,
}

type dataPasien = {
    nik: string;
    email: string;
    phone: string;
    gender: string;
    fullname: string;
    address: string;
    birthDate: string;
    birthPlace: string;
}

type GuardianData = {
    guardianType: string
    guardianName: string
    guardianRelation: string
    guardianIdentityNumber: string
    guardianPhone: string
    guardianEmail: string
    guardianAddress: string
    guardianGender: string
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
    const [dataGuards, setDataGuards] = useState<GuardianData>();
    const [calendarKey, setCalendarKey] = useState<number>(0);
    // const [patientData, setPatientData] = useState<ResponsePatient | undefined>();
    const [patientData, setPatientData] = useState<ResponsePatient>({
        id: '',
        identityNumber: '',
        fullName: '',
        gender: '',
        email: '',
        birthDateAndPlace: '',
        phoneNumber: '',
        address: '',
    });


    const [dataPasien, setDataPasien] = useState<dataPasien>();
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


    const breadcrumbItems = [
        { label: "Pasien Lama", href: "/tes" },
        // { label: "Pasien", href: "/pasien" },
        // { label: "Tambah Pasien", href: "/tambahPasien/Umum" },
    ];

    const formik = useFormik({
        initialValues: {
            namaKlinik: '',
            address: patientData?.address,
            nikCari: '',
            nik: patientData?.identityNumber,
            email: patientData?.email,
            phone: patientData?.phoneNumber,
            gender: patientData?.gender,
            fullname: patientData?.fullName,
            birthDatePatient: birthDate,
            birthPlacePatient: birthPlace,
            // phonePasien: '',
            nikGuardian: switchValue ? dataPasien?.nik : '',
            typeGuardian: switchValue ? 'SENDIRI' : '',
            caraDatang: '',
            fullnameGuardian: switchValue ? dataPasien?.fullname : '',
            emailGuardian: switchValue ? dataPasien?.email : '',
            genderGuardian: switchValue ? dataPasien?.gender : '',
            addressGuardian: switchValue ? dataPasien?.address : '',
            phoneGuardian: switchValue ? dataPasien?.phone : '62',
            birthPlaceGuardian: switchValue ? dataPasien?.birthPlace : '',
            birthDateGuardian: switchValue ? dataPasien?.birthDate : '',
            docs: '',
            asuranceDocs: '',
            // create appointment
            jenisKunjungan: '',
            poli: '',
            doctor: '',
            keluhan: '',
            riwayatPenyakit: '',
            alergi: '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            nik: Yup.string().required('NIK is required'),
            address: Yup.string().required('tes'),
            nikCari: Yup.string()
                .matches(/^[0-9]+$/, 'NIK harus berupa angka')
                .min(16, 'NIK minimal 16 digit')
                .max(16, 'NIK maksimal 16 digit')
                .required('NIK wajib diisi'),
            // phonePasien: Yup.string().required('No. Handphone Pasien is required'),
            caraDatang: Yup.string().required('Cara datang is required'),
            jenisKunjungan: Yup.string().required('Jenis Kunjungan is required'),
            poli: Yup.string().required('Poli yang dituju is required'),
            doctor: Yup.string().required('Pilih Dokter is required'),
            keluhan: Yup.string().required('Keluhan pasien is required'),
            riwayatPenyakit: Yup.string().required('Riwayat penyakit is required'),
            alergi: Yup.string().required('Alergi is required'),
            nikGuardian: Yup.string()
                .matches(/^[0-9]+$/, 'NIK harus berupa angka')
                .min(16, 'NIK minimal 16 digit')
                .max(16, 'NIK maksimal 16 digit')
                .required('NIK wajib diisi'),
            emailGuardian: Yup.string().required('EmailGuardian is required'),
            fullnameGuardian: Yup.string().required('EmailGuardian is required'),
            genderGuardian: Yup.string().required('EmailGuardian is required'),
            addressGuardian: Yup.string().required('EmailGuardian is required'),
            phoneGuardian: Yup.string().required('EmailGuardian is required'),
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
        setCurrentPage(2);
    }

    const handleDropdownPoli = (value: string, label: string) => {
        setIdClinic(value)
        setClinicName(label);
    };


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
                const response = await axios.get('https://hms.3dolphinsocial.com:8083/v1/manage/doctor/?pageNumber=0&pageSize=10&orderBy=id=asc', {
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
            const response = await GetPatientByNIKServices(nik);
            console.log('data pasien: ', response)
            if (response?.responseCode === "200") {
                const dataGuard = await getGuardianData(response.data.id)
                setDataGuards(dataGuard);
                setPatientData(response?.data as ResponsePatient);
                const birthDateProcess = response?.data.birthDateAndPlace.split(',')[1].trim();
                const birthPlaceProcess = response?.data.birthDateAndPlace.split(',')[0];
                setBirthDate(birthDateProcess ? birthDateProcess : "Data tidak ada")
                setBirthPlace(birthPlaceProcess ? birthPlaceProcess : "Data tidak ada")
                const dataGet = {
                    nik: response?.data.identityNumber,
                    email: response?.data.email,
                    phone: response?.data.phoneNumber,
                    fullname: response?.data.fullName,
                    address: response?.data.address,
                    gender: response?.data.gender,
                    birthDate: birthDate,
                    birthPlace: birthPlace
                }

                setDataPasien(dataGet)
                setPatientFullsPage(false);
            }

        } catch (err: any) {
            // setPatientFullsPage(false);
            if (err.response.status === 404) {
                showTemporaryAlert();
            }
        }
    }

    const putGuard = async () => {
        try {
            const tes = {
                patientId: patientData.id,
                guardianIdentityNumber: formik.values.nikGuardian,
                guardianName: formik.values.fullnameGuardian,
                guardianPhone: formik.values.phoneGuardian,
                guardianEmail: formik.values.emailGuardian,
                guardianGender: formik.values.genderGuardian,
                guardianAddress: formik.values.addressGuardian,
                guardianType: formik.values.typeGuardian,
                guardianRelation: formik.values.typeGuardian,
                guardianBirthPlace: formik.values.birthPlaceGuardian,
                guardianBirthDate: formik.values.birthDateGuardian,
            }

            setCurrentPage(3)
        } catch (error) {
            console.error(error)
        }
    }


    const handleDropdownDocter = (value: string, label: string) => {
        setIdDoctor(value);
        setDocterName(label);
        setCalendarKey((prevKey) => prevKey + 1);
    };

    const handleScheduleChange = (scheduleId: string, schedule: string) => {
        setSelectedScheduleId(scheduleId);
        setSelectedSchedule(schedule);

    };

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

    const createTicket = async () => {
        setIsLoading(true)

        const data = {
            patientId: patientData?.id,
            // patientId: "a9461920-b918-4e39-8cae-33f4f76e39cf", //nanti diganti
            typeOfVisit: formik.values.jenisKunjungan,
            clinicId: idClinic,
            doctorId: idDoctor,
            scheduleId: selectedScheduleId ? selectedScheduleId : '',
            symptoms: formik.values.keluhan,
            referenceDoc: formik.values.docs,
        };

        try {
            const response = await CreateAppointmentOffline(data)
            const createdDateTimeFormatted = dayjs.unix(response.scheduleDatum.createdDateTime).format('DD/MMM/YYYY, HH:mm');
            const dataSent = {
                nomorAntrian: response.queueDatum.queueNumber,
                namaDokter: docterName,
                clinic: clinicName,
                tanggalReservasi: createdDateTimeFormatted,
                jadwalKonsul: selectedSchedule,
                bookingCode: response.bookingCode
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
                const response = await axios.get('https://hms.3dolphinsocial.com:8083/v1/manage/clinic/?pageNumber=0&pageSize=10&orderBy=createdDateTime=asc', {
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
            if (guardFullPage == true) {
                return formik.values.nikGuardian
            } else if (guardFullPage == false) {
                return formik.values.nikGuardian && formik.values.emailGuardian && formik.values.phoneGuardian && formik.values.fullnameGuardian && formik.values.typeGuardian && formik.values.genderGuardian && formik.values.addressGuardian;
            }
        } else if (currentPage === 3) {
            return formik.values.jenisKunjungan;
        }
        return false;
    };

    const handleSwitchChange = (value: boolean) => {
        setSwitchValue(value);
    };

    const handleGoBack = () => {
        if (currentPage === 1) {
            // Logika untuk currentPage 1
            if (patientFullPage == true) {
                navigate(-1)
            } else if (patientFullPage == false) {
                setPatientFullsPage(true);
            }
        } else if (currentPage === 2) {
            // Logika untuk currentPage 2
            // setCurrentPage(currentPage - 1); // Contoh aksi
            if (guardFullPage == true) {
                setCurrentPage(currentPage - 1);
            } else if (guardFullPage == false) {
                setGuardFullPage(true);
            }
        } else if (currentPage === 3) {
            // Logika untuk currentPage 3
            if (mainPages == false) {
                setCurrentPage(1);
            } else if (mainPages == true) {
                setCurrentPage(currentPage - 1); // Contoh aksi
            }
        } else {
            // Jika tidak ada kondisi yang cocok, kembali ke halaman sebelumnya
            // window.history.back();
        }
    }

    return {
        formik,
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
        putGuard,
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
    }
}
