/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
    CardMedia,
    Typography,
    Button,
    FormControl,
    TextField,
    FormLabel,
    FormControlLabel,
    Checkbox,
    RadioProps,
    Radio,
    RadioGroup,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import patientImage from "../../../assets/img/registrationImg.jpg";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import PhoneInput from "react-phone-input-2";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CardRawatJalan from "../../../components/small/card/CardRawatJalan";
import CustomCalendar from "../../../components/medium/CustomCalender";
import DropdownListAPI from "../../../components/small/dropdownlist/DropdownListAPI";
import CardAntrianCounter from "../../../components/small/card/CardAntrianCounter";
import InformasiTicketAPI from "../../../components/small/InformasiTicketAPI";
import axios from "axios";
import GetPatientByNIKServices from "../../../services/Patient Tenant/GetPatientByNIKServices";

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

export default function RegistrationOnline() {
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
        phoneStep4: "",
        emailStep4: "",
        complaintType: "",
        clinic: "",
        doctor: "",
        schedule: "",
        complaint: "",
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

    const checkIdentityNumber = async (nik: string) => {
        try {
            const response = await GetPatientByNIKServices(nik);
            console.log('response cari: ', response)
            if (response?.responseCode === '200') {
                setCurrentPage(2);
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

    return (
        <>
            <style>
                {`
          :root {
            background-color: #ffff;
          }
        `}
            </style>

            <Box sx={{ display: "flex", height: "auto" }}>
                <Box position="absolute" minWidth="50%" maxWidth="50%">
                    <Box sx={{ position: "relative" }}>
                        <CardMedia
                            component="img"
                            sx={{
                                width: "50%",
                                height: "100vh",
                                objectFit: "cover",
                                position: "fixed",
                                top: 0,
                                left: 0,
                            }}
                            image={patientImage}
                            alt="Example Image"
                        />
                    </Box>
                    <Box
                        sx={{
                            position: "fixed",
                            bgcolor: "rgba(0, 0, 0, 0.5)",
                            width: "50%",
                            height: "100vh",
                            top: 0,
                            left: 0,
                        }}
                    />
                    <Box
                        sx={{
                            position: "fixed",
                            zIndex: 9999,
                            width: "40%",
                            left: "23%",
                            bottom: "0%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "56px",
                                fontWeight: "700",
                                lineHeight: "60px",
                                color: "white",
                            }}
                        >
                            Mulai permintaan janji temu Anda di sini.
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        ml: "auto",
                        minWidth: "45%",
                        maxWidth: "45%",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        minHeight: "91vh",
                        p: 4,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {showNeedAdminPage ? (
                        <Box marginLeft="5%" zIndex={1500}>
                            <CardAntrianCounter
                                nomorAntrian="1"
                                onClose={() => {
                                    setShowNeedAdminPage(false);
                                    setCurrentPage(3);
                                }}
                            />
                        </Box>
                    ) : (
                        <Formik
                            initialValues={initialValues}
                            validationSchema={getValidationSchema(currentPage)}
                            onSubmit={(values) => {
                                switch (currentPage) {
                                    case 1:
                                        // checkIdentityNumber(values.nik)
                                        return setCurrentPage(2);
                                    case 2:
                                        if (needAdmin) {
                                            return setShowNeedAdminPage(true);
                                        } else {
                                            return setCurrentPage(3);
                                        };
                                    case 4:
                                        return setCurrentPage(5);
                                }
                            }
                            }
                            validateOnMount
                            validateOnChange
                            validateOnBlur
                        >
                            {({
                                errors,
                                touched,
                                values,
                                handleChange,
                                setFieldValue,
                                handleSubmit,
                                isValid,
                            }) => (
                                <Form onSubmit={handleSubmit}>
                                    {(currentPage === 1 || currentPage === 2 || currentPage === 3) && (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                flexDirection: "column",
                                            }}
                                            mb={3}
                                        >
                                            {(currentPage === 1 || currentPage === 2) && (
                                                <Box mb={2} ml={5}>
                                                    <Typography
                                                        fontSize="32px"
                                                        fontWeight={600}
                                                        lineHeight="34px"
                                                    >
                                                        Selamat datang
                                                    </Typography>
                                                    <Typography
                                                        fontSize="18px"
                                                        fontWeight={400}
                                                        lineHeight="20px"
                                                        color="#747487"
                                                    >
                                                        Silakan masukkan nomor NIK (Nomor induk kependudukan)
                                                        Pasien.
                                                    </Typography>
                                                </Box>
                                            )}
                                            {currentPage === 3 && (
                                                <Box mb={2} ml="6%">
                                                    <Typography
                                                        fontWeight={600}
                                                        fontSize="20px"
                                                        lineHeight="22px"
                                                    >
                                                        Pilih kategori pasien
                                                    </Typography>
                                                    <Typography
                                                        maxWidth="90%"
                                                        fontWeight={400}
                                                        fontSize="16px"
                                                        lineHeight="18px"
                                                        color="#747487"
                                                    >
                                                        Membantu tenaga medis dalam memberikan perawatan yang
                                                        lebih terorganisir, sesuai dengan tingkat kebutuhan
                                                        pasien.
                                                    </Typography>
                                                </Box>
                                            )}
                                            <Box display="flex" flexDirection="row">
                                                <Box display="flex" flexDirection="row" width="290px">
                                                    <Button
                                                        type="button"
                                                        onClick={() => setCurrentPage(1)}
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            alignItems: "center",
                                                            mx: 5,
                                                            ...getPageStyle(1),
                                                            "&:hover": {
                                                                backgroundColor: "inherit",
                                                            },
                                                        }}
                                                    >
                                                        <Box sx={getBorderStyle(1)}>1</Box>
                                                        <Typography sx={{ ml: 1, textTransform: "none" }}>
                                                            Data diri pasien
                                                        </Typography>
                                                    </Button>
                                                </Box>
                                                <Box display="flex" flexDirection="row" width="400px">
                                                    <Button
                                                        type="button"
                                                        onClick={() => setCurrentPage(2)}
                                                        disabled={currentPage < 2}
                                                        sx={{
                                                            ...getPageStyle(2),
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            alignItems: "center",
                                                            mx: 2,
                                                            "&:hover": {
                                                                backgroundColor: "inherit",
                                                            },
                                                        }}
                                                    >
                                                        <Box sx={getBorderStyle(2)}>2</Box>
                                                        <Typography sx={{ ml: 1, textTransform: "none" }}>
                                                            Jenis Kunjungan dan Keluhan
                                                        </Typography>
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )}

                                    {currentPage === 1 && (
                                        <Box sx={{ textAlign: "left", width: "100%", maxWidth: "600px", ml: '5%' }} >
                                            <Typography
                                                mb={2}
                                                fontSize="20px"
                                                fontWeight={600}
                                                lineHeight="22px"
                                            >
                                                Isi data pasien
                                            </Typography>
                                            <FormControl fullWidth>
                                                <Typography>NIK (Nomor induk kependudukan) Pasien</Typography>
                                                <Field
                                                    as={TextField}
                                                    name="nik"
                                                    placeholder="Masukkan NIK"
                                                    variant="outlined"
                                                    sx={{
                                                        mb: 1,
                                                        "& .MuiOutlinedInput-root": {
                                                            borderRadius: "8px",
                                                        },
                                                    }}
                                                    error={touched.nik && Boolean(errors.nik)}
                                                    helperText={touched.nik && errors.nik}
                                                />
                                            </FormControl>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                disabled={!isValid}
                                                sx={{
                                                    mt: 2,
                                                    width: "100%",
                                                    backgroundColor: "#8F85F3",
                                                    ":hover": { backgroundColor: "#D5D1FB" },
                                                }}
                                            >

                                                Lanjutkan
                                            </Button>
                                        </Box>
                                    )}

                                    {currentPage === 2 && (
                                        <Box sx={{ textAlign: "left", width: "90%", ml: "5%" }}>
                                            <Typography
                                                fontSize="20px"
                                                fontWeight={600}
                                                mb="1%"
                                            >
                                                Konfirmasi data diri pasien
                                            </Typography>
                                            <Box
                                                bgcolor="#F1F0FE"
                                                border="2px solid #8F85F3"
                                                borderRadius="8px"
                                                padding="8px 16px"
                                                display="flex"
                                                flexDirection="row"
                                                gap="6px"
                                                alignItems="center"
                                                mb={2}
                                            >
                                                <ErrorOutlineOutlinedIcon
                                                    sx={{ color: "#7367F0", width: 20, height: 20 }}
                                                />
                                                <Typography color="#7367F0" fontWeight={400} fontSize="16px">
                                                    Harap periksa kembali data diri Anda, jika ada data yang
                                                    tidak sesuai dapat dirubah di Admin dengan klik “ubah
                                                    data”.
                                                </Typography>
                                            </Box>
                                            <FormLabel>NIK (Nomor induk kependudukan) Pasien</FormLabel>
                                            <Field
                                                as={TextField}
                                                name="nik"
                                                placeholder="Masukkan NIK"
                                                variant="outlined"
                                                fullWidth
                                                sx={{
                                                    mb: 2,
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "8px",
                                                        bgcolor: "#EEEEF2",
                                                        border: "1px solid #A8A8BD",
                                                    },
                                                }}
                                                error={touched.nik && Boolean(errors.nik)}
                                                helperText={touched.nik && errors.nik}
                                            />
                                            <FormLabel>Email</FormLabel>
                                            <Field
                                                as={TextField}
                                                name="email"
                                                placeholder="Masukkan Email"
                                                variant="outlined"
                                                fullWidth
                                                sx={{
                                                    mb: 2,
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "8px",
                                                        bgcolor: "#EEEEF2",
                                                        border: "1px solid #A8A8BD",
                                                    },
                                                }}
                                                error={touched.email && Boolean(errors.email)}
                                                helperText={touched.email && errors.email}
                                            />
                                            <Typography>
                                                No. Handphone Pasien <span style={{ color: "#d32f2f" }}>*</span>
                                            </Typography>
                                            <PhoneInput
                                                country="id"
                                                countryCodeEditable={false}
                                                inputStyle={{
                                                    height: "48px",
                                                    borderRadius: "8px",
                                                    border: "1px solid #ccc",
                                                    padding: "10px 40px 10px 60px",
                                                    backgroundColor: "#EEEEF2",
                                                    fontSize: "16px",
                                                    width: "100%",
                                                    marginTop: "10px",
                                                    cursor: "default",
                                                }}
                                                buttonStyle={{
                                                    borderRadius: "8px 0 0 8px",
                                                    border: "1px solid #ccc",
                                                }}
                                                containerStyle={{
                                                    marginBottom: "10px",
                                                    width: "100%",
                                                }}
                                                value={values.phone}
                                                onChange={(phone) => {
                                                    // PhoneInput onChange: string => setState
                                                    // Jalankan setFieldValue agar formik simpan nilainya
                                                    // Sebab 'phone' field di initialValues
                                                    // pastikan name="phone" agar match
                                                    return setFieldValue("phone", phone);
                                                }}
                                            />
                                            {touched.phone && errors.phone && (
                                                <Typography variant="caption" color="error">
                                                    {errors.phone}
                                                </Typography>
                                            )}
                                            <FormLabel>Nama lengkap Pasien</FormLabel>
                                            <TextField
                                                placeholder="Masukkan nama lengkap"
                                                variant="outlined"
                                                fullWidth
                                                sx={{
                                                    mb: 2,
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "8px",
                                                        bgcolor: "#EEEEF2",
                                                        border: "1px solid #A8A8BD",
                                                    },
                                                }}
                                            />
                                            <Box display="flex" justifyContent="space-between" gap={2}>
                                                <FormControl sx={{ width: "50%" }}>
                                                    <FormLabel>Tempat Lahir</FormLabel>
                                                    <Field
                                                        as={TextField}
                                                        name="birthPlace"
                                                        placeholder="Tempat Lahir"
                                                        variant="outlined"
                                                        sx={{
                                                            "& .MuiOutlinedInput-root": {
                                                                borderRadius: "8px",
                                                                bgcolor: "#EEEEF2",
                                                                border: "1px solid #A8A8BD",
                                                            },
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormControl sx={{ width: "50%" }}>
                                                    <FormLabel>Tanggal Lahir</FormLabel>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            value={values.birthDate ? dayjs(values.birthDate) : null}
                                                            onChange={(date) => setFieldValue("birthDate", date)}
                                                            slotProps={{
                                                                textField: {
                                                                    placeholder: "Tanggal Lahir",
                                                                    sx: {
                                                                        bgcolor: "#EEEEF2",
                                                                        borderRadius: "8px",
                                                                        border: "1px solid #A8A8BD",
                                                                    },
                                                                },
                                                            }}
                                                        />
                                                    </LocalizationProvider>
                                                </FormControl>
                                            </Box>
                                            <Typography sx={{ mt: 2 }}>
                                                Jenis kelamin Pasien <span style={{ color: "#d32f2f" }}>*</span>
                                            </Typography>
                                            <Box
                                                bgcolor="#EEEEF2"
                                                border="1px solid #A8A8BD"
                                                display="flex"
                                                flexDirection="row"
                                                padding={1}
                                                borderRadius="12px"
                                                pl={3}
                                            >
                                                <FormControl
                                                    component="fieldset"
                                                    error={touched.gender && Boolean(errors.gender)}
                                                >
                                                    <RadioGroup
                                                        aria-labelledby="gender-label"
                                                        name="gender"
                                                        value={values.gender}
                                                        onChange={(e) => setFieldValue("gender", e.target.value)}
                                                        row
                                                    >
                                                        <FormControlLabel
                                                            value="WOMEN"
                                                            control={<BpRadio />}
                                                            label="Female"
                                                        />
                                                        <FormControlLabel
                                                            value="MEN"
                                                            control={<BpRadio />}
                                                            label="Male"
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Box>
                                            <Typography>
                                                Alamat tempat tinggal Pasien <span style={{ color: "red" }}>*</span>
                                            </Typography>
                                            <TextField
                                                placeholder="Masukkan tempat tinggal"
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                rows={2}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "8px",
                                                        bgcolor: "#EEEEF2",
                                                        border: "1px solid #A8A8BD",
                                                    },
                                                }}
                                                value={values.address}
                                                onChange={handleChange}
                                                name="address"
                                            />
                                            <Box
                                                sx={{
                                                    padding: "8px 24px",
                                                    borderRadius: "12px",
                                                    border: "1px solid #A8A8BD",
                                                    mt: 3,
                                                }}
                                            >
                                                <FormControlLabel
                                                    sx={{ color: "#747487", fontWeight: 400, fontSize: "16px" }}
                                                    control={
                                                        <Checkbox
                                                            sx={{
                                                                color: "#A8A8BD",
                                                                borderRadius: "4px",
                                                                "&.Mui-checked": {
                                                                    color: "#7367F0",
                                                                },
                                                            }}
                                                            onChange={(e) => setNeedAdmin(e.target.checked)}
                                                        />
                                                    }
                                                    label="Data diri tidak sesuai"
                                                />
                                            </Box>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{
                                                    width: "100%",
                                                    height: "48px",
                                                    marginTop: "20px",
                                                    backgroundColor: "#8F85F3",
                                                    ":hover": { backgroundColor: "#D5D1FB" },
                                                }}
                                            >
                                                Lanjutkan
                                            </Button>
                                        </Box>
                                    )}

                                    {currentPage === 3 && (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "24px",
                                                maxWidth: "600px",
                                                ml: '5%'
                                            }}
                                        >
                                            <CardRawatJalan
                                                onClick={() => setCurrentPage(4)}
                                                title="Pasien Umum"
                                                text="Pasien yang berobat di rumah sakit dengan membayar sendiri seluruh biaya."
                                            />
                                            <CardRawatJalan
                                                onClick={() => navigate("/rawatjalan/bpjs")}
                                                title="Pasien Asuransi"
                                                text="Terdaftar di program BPJS, berhak mendapatkan pelayanan kesehatan."
                                            />
                                        </Box>
                                    )}

                                    {currentPage === 4 && (
                                        <Box sx={{ width: "95%", mb: 5, maxWidth: "95%" }}>
                                            <Typography
                                                sx={{
                                                    fontSize: "20px",
                                                    fontWeight: "600",
                                                    lineHeight: "22px",
                                                    mt: 2,
                                                }}
                                            >
                                                Formulir pendaftaran pasien Umum
                                            </Typography>
                                            <Typography
                                                mb={2}
                                                fontWeight={400}
                                                fontSize="16px"
                                                lineHeight="18px"
                                                color="#A8A8BD"
                                            >
                                                Pasien yang berobat di rumah sakit dengan membayar sendiri
                                                seluruh biaya perawatan.
                                            </Typography>
                                            <Box display="flex" flexDirection="column" gap={2}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        border: "1px solid gray",
                                                        borderRadius: "16px",
                                                        p: 2,
                                                    }}
                                                >
                                                    <Typography fontWeight="bold" mb={1}>
                                                        Kontak info
                                                    </Typography>
                                                    <FormControl sx={{ mb: 2 }}>
                                                        <Typography>No. Handphone</Typography>
                                                        <PhoneInput
                                                            country="id"
                                                            countryCodeEditable={false}
                                                            inputStyle={{
                                                                height: "48px",
                                                                borderRadius: "8px",
                                                                padding: "10px 40px 10px 60px",
                                                                fontSize: "16px",
                                                                width: "100%",
                                                                marginTop: "10px",
                                                            }}
                                                            buttonStyle={{
                                                                borderRadius: "8px 0 0 8px",
                                                                border: "1px solid #ccc",
                                                            }}
                                                            containerStyle={{
                                                                marginBottom: "10px",
                                                                width: "100%",
                                                            }}
                                                            value={values.phoneStep4}
                                                            onChange={(val) => setFieldValue("phoneStep4", val)}
                                                        />
                                                        {touched.phoneStep4 && errors.phoneStep4 && (
                                                            <Typography variant="caption" color="error">
                                                                {errors.phoneStep4}
                                                            </Typography>
                                                        )}
                                                    </FormControl>
                                                    <FormControl>
                                                        <Typography>Email</Typography>
                                                        <Field
                                                            as={TextField}
                                                            name="emailStep4"
                                                            placeholder="Masukkan email"
                                                            variant="outlined"
                                                            sx={{
                                                                width: "100%",
                                                                borderRadius: "8px",
                                                                mt: 1,
                                                                "& .MuiOutlinedInput-root": {
                                                                    height: "44px",
                                                                    padding: "0 12px",
                                                                    border: "1px solid #A8A8BD",
                                                                    "&.Mui-focused fieldset": {
                                                                        borderColor: "#6B63D1",
                                                                    },
                                                                },
                                                            }}
                                                            error={touched.emailStep4 && Boolean(errors.emailStep4)}
                                                            helperText={touched.emailStep4 && errors.emailStep4}
                                                        />
                                                    </FormControl>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        border: "1px solid gray",
                                                        borderRadius: "16px",
                                                        p: 2,
                                                    }}
                                                >
                                                    <Typography fontWeight="bold" mb={1}>
                                                        Keluhan Pasien
                                                    </Typography>
                                                    <FormControl sx={{ mb: 2 }}>
                                                        <Typography>Jenis Kunjungan</Typography>
                                                        <Field
                                                            as={TextField}
                                                            name="complaintType"
                                                            placeholder="Masukkan jenis kunjungan"
                                                            variant="outlined"
                                                            sx={{
                                                                width: "100%",
                                                                borderRadius: "8px",
                                                                mt: 1,
                                                                "& .MuiOutlinedInput-root": {
                                                                    height: "44px",
                                                                    border: "1px solid #A8A8BD",
                                                                    "&.Mui-focused fieldset": {
                                                                        borderColor: "#6B63D1",
                                                                    },
                                                                },
                                                            }}
                                                            error={touched.complaintType && Boolean(errors.complaintType)}
                                                            helperText={touched.complaintType && errors.complaintType}
                                                        />
                                                    </FormControl>
                                                    <Typography>Poli yang dituju</Typography>

                                                    <DropdownListAPI
                                                        options={clinicOptions.map(({ id, name }) => ({ value: id, label: name }))}
                                                        placeholder="Pilih Fasilitas Induk"
                                                        onChange={handleDropdownPoli}
                                                        loading={false}
                                                    />

                                                    {touched.clinic && errors.clinic && (
                                                        <Typography variant="caption" color="error">
                                                            {errors.clinic as string}
                                                        </Typography>
                                                    )}
                                                    <Box
                                                        display="flex"
                                                        flexDirection="row"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        sx={{ width: "100%", mt: 2 }}
                                                    >
                                                        <FormControl sx={{ width: "50%" }} size="small">
                                                            <Typography>Dokter yang bertugas</Typography>
                                                            <DropdownListAPI
                                                                placeholder='Pilih dokter'
                                                                options={doctorOptions.map(({ id, name }) => ({ value: id, label: name }))}
                                                                onChange={handleDropdownDocter}
                                                                loading={false}
                                                            />
                                                            {touched.doctor && errors.doctor && (
                                                                <Typography variant="caption" color="error">
                                                                    {errors.doctor as string}
                                                                </Typography>
                                                            )}
                                                        </FormControl>
                                                        <Box sx={{ ml: 2, width: "50%" }}>
                                                            <Typography>Tanggal & Jam Operasional</Typography>
                                                            <CustomCalendar
                                                                key={calendarKey}
                                                                typeId={values.doctor}
                                                                onChange={(scheduleId, schedule) => {
                                                                    setFieldValue("schedule", scheduleId);
                                                                    handleScheduleChange(scheduleId, schedule);
                                                                }}
                                                            />
                                                            {touched.schedule && errors.schedule && (
                                                                <Typography variant="caption" color="error">
                                                                    {errors.schedule as string}
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                    </Box>
                                                    <FormControl sx={{ mt: 2 }}>
                                                        <Typography>Keluhan Pasien</Typography>
                                                        <Field
                                                            as={TextField}
                                                            name="complaint"
                                                            multiline
                                                            rows={4}
                                                            variant="outlined"
                                                            sx={{
                                                                width: "100%",
                                                                mt: 1,
                                                                "& .MuiOutlinedInput-root": {
                                                                    border: "1px solid #A8A8BD",
                                                                    "&.Mui-focused fieldset": {
                                                                        borderColor: "#6B63D1",
                                                                    },
                                                                },
                                                            }}
                                                            error={touched.complaint && Boolean(errors.complaint)}
                                                            helperText={touched.complaint && errors.complaint}
                                                        />
                                                    </FormControl>
                                                </Box>
                                            </Box>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{
                                                    width: "100%",
                                                    height: "48px",
                                                    marginTop: "20px",
                                                    backgroundColor: "#8F85F3",
                                                    ":hover": { backgroundColor: "#D5D1FB" },
                                                }}
                                            >
                                                Selesai
                                            </Button>
                                        </Box>
                                    )}

                                    {currentPage === 5 && (
                                        <Box zIndex={1500}>

                                            <InformasiTicketAPI
                                                clinic="clinic"
                                                jadwalKonsul={'senin, 04 januari 2025'}
                                                namaDokter="udin"
                                                tanggalReservasi="senin, 04 januari 2025"
                                                bookingCode=""
                                                onClose={() => setCurrentPage(1)}
                                            // clinic={dataTickets?.clinic || "Unknown Clinic"}
                                            // jadwalKonsul={dataTickets?.jadwalKonsul || "Unknown Date"}
                                            // namaDokter={dataTickets?.namaDokter || "Unknow Doctor"}
                                            // // nomorAntrian={dataTickets?.nomorAntrian || "Unknown"}
                                            // tanggalReservasi={dataTickets?.tanggalReservasi || "Unknown Date"}
                                            />
                                        </Box>
                                    )}
                                </Form>
                            )}
                        </Formik>
                    )}
                </Box >
            </Box >
        </>
    );
}
