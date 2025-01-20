/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
    RadioProps,
    Radio,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import GetPatientByNIKServices from "../../../services/Patient Tenant/GetPatientByNIKServices";

type PatientData =
    {
        id: string;
        nik: string;
        email: string;
        phone: string;
        fullname: string;
        address: string;
        gender: string;
        birthDate: string;
        birthPlace: string;
    };


type Clinic = {
    id: string;
    name: string;
};

type Doctor = {
    id: string;
    name: string;
};

const BpIcon = styled("span")(() => ({
    borderRadius: "50%",
    width: 24,
    height: 24,
    boxShadow:
        "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
}));

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "#7367F0",
    backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&::before": {
        display: "block",
        width: 24,
        height: 24,
        backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
        content: '""',
    },
    "input:hover ~ &": {
        backgroundColor: "#7367F0",
    },
});

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
export default function useRegistrationOnline() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [showNeedAdminPage, setShowNeedAdminPage] = useState(false);
    const [clinicOptions, setClinicOptions] = useState<Clinic[]>([]);
    const [doctorOptions, setDoctorOptions] = useState<Doctor[]>([]);
    const [calendarKey, setCalendarKey] = useState<number>(0);
    const [idDoctor, setIdDoctor] = useState('');
    const [idClinic, setIdClinic] = useState('');
    const [clinicName, setClinicName] = useState('');
    const [docterName, setDocterName] = useState('');
    const [selectedScheduleId, setSelectedScheduleId] = useState("");
    const [selectedSchedule, setSelectedSchedule] = useState("");
    const [needAdmin, setNeedAdmin] = useState(false);
    const [patientData, setPatientData] = useState<PatientData>();
    const [idPatient, setIdPatient] = useState<string | null>('');

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
        } else if (page < currentPage ) {
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
                border: "none",
                width: "38px",
                height: "38px",
                borderRadius: "8px",
                justifyContent: "center",
                alignItems: "center",
                color: "#A8A8BD",
                bgcolor: '#EEEEF2 !important',
            };
        }
    };

    const getPageStyle = (page: number) => {
        if (page === currentPage) return { color: "#8F85F3", cursor: "pointer" };
        if (page < currentPage) return { color: "#8F85F3", cursor: "pointer" };
        return { color: "black", cursor: "pointer" };
    };

    const initialValues = {
        nik: "",
        email: "",
        phone: "",
        address: "",
        birthPlace: "",
        birthDate: null as Date | null,
        gender: "",
        phoneCp: "",
        emailCp: "",
        typeOfVisit: "",
        clinic: "",
        doctor: "",
        schedule: "",
        symptoms: "",
    };

    const getValidationSchema = (page: number) => {
        switch (page) {
            case 1:
                return Yup.object().shape({
                    nik: Yup.string()
                        .required("NIK wajib diisi")
                        .matches(/^[0-9]+$/, "NIK harus berupa angka")
                        .length(16, 'NIK harus 16 digit'),
                });
            case 2:
                return Yup.object().shape({
                    phone: Yup.string().required("No. Handphone wajib diisi"),
                    email: Yup.string().email("Format email tidak valid"),
                });
            case 3:
                return Yup.object().shape({});
            case 4:
                return Yup.object().shape({
                    phoneStep4: Yup.string().required("No. Handphone wajib diisi"),
                    emailStep4: Yup.string()
                        .email("Format email tidak valid")
                        .required("Email wajib diisi"),
                    complaintType: Yup.string().required("Jenis kunjungan wajib diisi"),
                    // clinic: Yup.string().required("Poli yang dituju wajib diisi"),
                    // doctor: Yup.string().required("Dokter wajib dipilih"),
                    schedule: Yup.string().required("Pilih jadwal terlebih dahulu"),
                    complaint: Yup.string().required("Keluhan pasien wajib diisi"),
                });
            default:
                return Yup.object().shape({});
        }
    };

    const registrationPatient = async (data: any) => {
        const response = await axios.post(
            `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/patient/check-in`,
            { data: data },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log(response);
    }

    const checkIdentityNumber = async (nik: string) => {
        try {
            const response = await GetPatientByNIKServices(nik);
            console.log('response cari: ', response)
            if (response?.data != null) {
                const birthDateProcess = response?.data.birthDateAndPlace.split(',')[1].trim();
                const birthPlaceProcess = response?.data.birthDateAndPlace.split(',')[0];
                const dataGet = {
                    id: response.data.id,
                    nik: response?.data.identityNumber,
                    email: response?.data.email,
                    phone: response?.data.phoneNumber,
                    fullname: response?.data.fullName,
                    address: response?.data.address,
                    gender: response?.data.gender,
                    birthDate: birthDateProcess,
                    birthPlace: birthPlaceProcess
                }
                console.log('dataGet: ', dataGet)
                setPatientData(dataGet);
                setCurrentPage(2);
            } else if (response?.data === null) {
                console.log('takde')
                setIdPatient(null);
                setNeedAdmin(true);
                setShowNeedAdminPage(true);
                // setCurrentPage(3);
            }
        } catch (err: any) {
            if (err.response.status === 404) {
                const data = {
                    id: null,
                    needAdmin: true,
                }
                console.log('data data: ', data)
                // navigate('/kategori/pasien', { state: { dataPatient: data, newPatient: true } })
                setCurrentPage(3);

            }
        }
    }

    return {
        navigate,
        BpRadio,
        setShowNeedAdminPage,
        showNeedAdminPage,
        clinicOptions,
        doctorOptions,
        calendarKey,
        idDoctor,
        idClinic,
        clinicName,
        docterName,
        selectedScheduleId,
        selectedSchedule,
        setNeedAdmin,
        needAdmin,
        handleScheduleChange,
        handleDropdownPoli,
        handleDropdownDocter,
        getBorderStyle,
        getPageStyle,
        initialValues,
        getValidationSchema,
        checkIdentityNumber,
        setCurrentPage,
        currentPage,
        patientData,
        registrationPatient
    }
}
