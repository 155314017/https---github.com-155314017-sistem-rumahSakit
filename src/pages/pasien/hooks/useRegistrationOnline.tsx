/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
    RadioProps,
    Radio,
} from "@mui/material";
import { styled } from "@mui/system";
import * as Yup from "yup";
import axios from "axios";
import GetPatientByUserIdServices from "../../../services/Patient Tenant/GetPatientByUserIdServices";
import GetUserByNIK from "../../../services/Admin Tenant/ManageUser/GetUserByNIK";
import dayjs from "dayjs";

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
    const [currentPage, setCurrentPage] = useState(1);
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
    const [tanggalReserve, setTanggalReserve] = useState('');
    const [bookingCode, setBookingCode] = useState('');
    const [dataPatient, setDataPatient] = useState<any>({});
    const [registrationId, setRegistrationId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
        setClinicName(label)
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
        nik: patientData?.nik || "",
        fullname: patientData?.fullname || "",
        email: patientData?.email || "",
        phone: patientData?.phone || "",
        address: patientData?.address || "",
        birthPlace: patientData?.birthPlace || "",
        birthDate: patientData?.birthDate || "",
        gender: patientData?.gender || "",
        phoneCp: patientData?.phone || "",
        emailCp: patientData?.email || "",
        typeOfVisit: "",
        referenceDoc: "",
        // clinic: "",
        // doctor: "",
        schedule: "",
        symptoms: "",
    };

    const getValidationSchema = (page: number) => {
        switch (page) {
            case 1:
                return Yup.object().shape({});
            case 2:
                return Yup.object().shape({
                    nik: Yup.string()
                        .required("NIK wajib diisi")
                        .matches(/^[0-9]+$/, "NIK harus berupa angka")
                });
            case 3:
                return Yup.object().shape({
                    phone: Yup.string().required("No. Handphone wajib diisi"),
                    email: Yup.string().email("Format email tidak valid"),
                });
            case 4:
                return Yup.object().shape({
                    phoneCp: Yup.string().required("No. Handphone wajib diissi"),
                    emailCp: Yup.string()
                        .email("Format email tidak valid")
                        .required("Email wajib diisi"),
                    typeOfVisit: Yup.string().required("Jenis kunjungan wajib diisi"),
                    schedule: Yup.string().required("Pilih jadwal terlebih dahulu"),
                    symptoms: Yup.string().required("Keluhan pasien wajib diisi"),
                });
            default:
                return Yup.object().shape({});
        }
    };

    const registrationPatient = async (data: any) => {
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
            console.log('regis: ', response)
            setTanggalReserve(dayjs.unix(response.data.data.createdDateTime).format('dddd, D MMMM YYYY HH:mm:ss'));
            setBookingCode(response.data.data.bookingCode);
            setRegistrationId(response.data.data.id);
            setCurrentPage(5);
        } catch (err: any) {
            console.log(err);
        }
    }

    const checkIdentityNumber = async (nik: string) => {
        setIsLoading(true);
        try {
            const responseUser = await GetUserByNIK(nik);
            console.log(responseUser);
            if (responseUser?.responseCode === '200') {
                if (responseUser?.data != null) {
                    const fullname = responseUser?.data.firstName + ' ' + responseUser?.data.lastName;
                    const response = await GetPatientByUserIdServices(responseUser?.data.id || '');
                    const birthDateProcess = response?.data.birthDate[0] + '-' + response?.data.birthDate[1] + '-' + response?.data.birthDate[2];
                    const dataGet = {
                        id: responseUser?.data.id || '',
                        nik: nik,
                        email: responseUser?.data.email,
                        phone: responseUser?.data.phone,
                        fullname: fullname,
                        address: response?.data.address,
                        gender: response?.data.gender,
                        birthDate: birthDateProcess,
                        birthPlace: response?.data.birthPlace
                    }
                    setPatientData(dataGet);
                    // setIsLoading(false);
                    setCurrentPage(3);
                } else if (responseUser?.data === null) {
                    setIdPatient(null);
                    setNeedAdmin(true);
                    setCurrentPage(4);
                }
            }
        } catch (err: any) {
            if (err.response?.status === 404) {
                const data = {
                    id: null,
                    needAdmin: true,
                };
                console.log('data data: ', data);
                setCurrentPage(3);
            } else {
                console.error('Unexpected error:', err);
            }
        } finally {
            setIsLoading(false);
        }
    };


    return {
        BpRadio,
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
        registrationPatient,
        idPatient,
        tanggalReserve,
        bookingCode,
        setDataPatient,
        dataPatient,
        registrationId,
        isLoading
    }
}

