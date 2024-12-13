import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import GetPatientByNIKServices from '../../../../services/Patient Tenant/GetPatientByNIKServices';
import 'react-phone-input-2/lib/style.css';
import { styled } from '@mui/material/styles';
import { Radio } from '@mui/material';
import { RadioProps } from '@mui/material/Radio';

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
    nik: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    gender: string | undefined;
    fullname: string | undefined;
    address: string | undefined;
    birthDate: string | undefined;
    birthPlace: string | undefined;
}

type Clinic = {
    id: string;
    name: string;
};

type dataTicket = {
    // nomorAntrian: any | undefined;
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
            typeGuardian: '',
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
                .min(12, 'NIK minimal 12 digit')
                .max(14, 'NIK maksimal 14 digit')
                .required('NIK wajib diisi'),
            // phonePasien: Yup.string().required('No. Handphone Pasien is required'),
            caraDatang: Yup.string().required('Cara datang is required'),
            jenisKunjungan: Yup.string().required('Jenis Kunjungan is required'),
            poli: Yup.string().required('Poli yang dituju is required'),
            doctor: Yup.string().required('Pilih Dokter is required'),
            keluhan: Yup.string().required('Keluhan pasien is required'),
            riwayatPenyakit: Yup.string().required('Riwayat penyakit is required'),
            alergi: Yup.string().required('Alergi is required'),
            nikGuardian: Yup.string().required('harus diisi is required'),
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

    const changePage2 = () => {
        const dataPatient = {
            nik: formik.values.nik,
            email: formik.values.email,
            phone: formik.values.phone,
            gender: formik.values.gender,
            fullname: formik.values.fullname,
            address: formik.values.address,
            birthDate: formik.values.birthDatePatient,
            birthPlace: formik.values.birthPlacePatient
        }
        setDataPasien(dataPatient)
        console.log("tes data kirim", dataPatient);
        setCurrentPage(2)
    }

    const handleDropdownPoli = (value: string, label: string) => {
        console.log(`Selected Value: ${value}, Selected Label: ${label}`);
        setIdClinic(value)
        setClinicName(label);
        console.log(clinicName);
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

    const findPatientByNik = async (nik: string) => {
        try {
            const response = await GetPatientByNIKServices(nik);
            console.log(response?.data);


            setPatientData(response?.data as ResponsePatient);
            const birthDateProcess = response?.data.birthDateAndPlace.split(',')[1].trim();
            const birthPlaceProcess = response?.data.birthDateAndPlace.split(',')[0];
            setBirthDate(birthDateProcess ? birthDateProcess : "Data tidak ada")
            setBirthPlace(birthPlaceProcess ? birthPlaceProcess : "Data tidak ada")
            console.log(birthDate, birthPlace);
            setPatientFullsPage(false);
        } catch (error) {
            console.error("Error fetching", error);
        }
    }

    const putGuard = async () => {
        // try {
        //     const tes = {
        //         patientId: patientData.id,
        //         guardianIdentityNumber: formik.values.nikGuardian,
        //         guardianName: formik.values.fullnameGuardian,
        //         guardianPhone: formik.values.phoneGuardian,
        //         guardianEmail: formik.values.emailGuardian,
        //         guardianGender: formik.values.genderGuardian,
        //         guardianAddress: formik.values.addressGuardian,
        //         guardianType: 'guardianType',
        //         guardianRelation: formik.values.typeGuardian,
        //         guardianBirthPlace: formik.values.birthPlaceGuardian,
        //         guardianBirthDate: formik.values.birthDateGuardian,
        //     }

        //     const response = await UpdatePatientGuards(tes)
        //     console.log(response)
        //     console.log("Data: ", tes)
        setCurrentPage(3)
        // } catch (error) {
        //     console.log(error)
        // }
    }


    const handleDropdownDocter = (value: string, label: string) => {
        console.log(`Selected Value: ${value}, Selected Label: ${label}`);
        setIdDoctor(value);
        console.log(idDoctor);
        setDocterName(label);
        console.log(docterName);
    };

    const handleScheduleChange = (scheduleId: string, schedule: string) => {
        setSelectedScheduleId(scheduleId);
        setSelectedSchedule(schedule);
        console.log(selectedSchedule)
        console.log('Jadwal Terpilih:', schedule);
        console.log('ID Jadwal Terpilih:', scheduleId);
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
        const data = {
            patientId: patientData?.id,
            typeOfVisit: formik.values.jenisKunjungan,
            clinicId: idClinic,
            doctorId: idDoctor,
            scheduleId: selectedScheduleId ? selectedScheduleId : '',
            symptoms: formik.values.keluhan,
            referenceDoc: formik.values.docs,
        }
        try {
            console.log(data);
            // const response = await CreateAppointment(data)
            // const createdDateTimeFormatted = dayjs.unix(response.data.queueDatum.createdDateTime).format('DD/MMM/YYYY, HH:mm');
            // const dataSent = {
            //     // nomorAntrian: response.data.queueDatum.queueNumber,
            //     namaDokter: docterName,
            //     clinic: clinicName,
            //     tanggalReservasi: createdDateTimeFormatted,
            //     jadwalKonsul: selectedSchedule,
            //     bookingCode: response.data.bookingCode
            // }
            // console.log(dataSent);
            // setDataTickets(dataSent)
            console.log('sukses')
            setMainPages(false)
            setCurrentPage(3);
        } catch (err) {
            console.log("tes")
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
            return formik.values.nikGuardian && formik.values.fullnameGuardian && formik.values.emailGuardian && formik.values.addressGuardian && formik.values.birthPlaceGuardian;
        } else if (currentPage === 3) {
            return formik.values.phoneGuardian && formik.values.jenisKunjungan && formik.values.poli && formik.values.doctor && formik.values.keluhan && formik.values.riwayatPenyakit && formik.values.alergi;
        }
        return false;
    };

    const handleSwitchChange = (value: boolean) => {
        setSwitchValue(value);
        console.log('Switch value:', value);
    };

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
        birthPlace
    }
}
