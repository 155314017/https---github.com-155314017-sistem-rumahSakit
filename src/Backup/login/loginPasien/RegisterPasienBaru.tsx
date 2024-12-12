import { Box, CardMedia, FormLabel, TextField, Typography, Button, FormControlLabel, Radio, FormControl, RadioGroup, FormHelperText, CircularProgress, } from "@mui/material";
import React, { useEffect, useState } from "react";
import patientImage from "../../../assets/img/registrationImg.jpg";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AlertWarning from "../../../components/small/AlertWarning";
import AlertSuccess from "../../../components/small/AlertSuccess";
import OtpInput from 'react-otp-input';
import 'react-phone-input-2/lib/style.css';
import { useLocation } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";
import RegisterPatient from "../../../services/Patient Tenant/RegisterPatient";
import VerifyOTPPatient from "../../../services/Patient Tenant/VerifyOTPPatient";
import { styled } from '@mui/material/styles';
import { RadioProps } from '@mui/material/Radio';

const validationSchema = Yup.object({
    nik: Yup.string()
        .matches(/^[0-9]+$/, 'NIK harus berupa angka')
        .min(12, 'NIK minimal 12 digit')
        .max(14, 'NIK maksimal 14 digit')
        .required('NIK wajib diisi'),
    email: Yup.string().required('Email wajib diisi'),
    address: Yup.string().required('Email wajib diisi')
        .matches(/^[A-Za-z\s]+$/, "Nama hanya boleh berisi huruf"),
    phone: Yup.string()
        .required('Isi nomor telepon')
        .matches(/^[0-9]{10,15}$/, 'Nomor telepon tidak valid'),
    fullname: Yup.string().required('Wajib diisi')
        .matches(/^[A-Za-z\s]+$/, "Nama hanya boleh berisi huruf"),
    gender: Yup.string().required('JenisK kelamin harus dipilih'),
});

interface FormValues {
    nik: string;
    email: string;
}

interface DataKirim {
    identityNumber: string;
    name: string;
    phone: string;
    email: string;
    gender: string;
    address: string;
}

interface DataAwal {
    nik: string;
    email: string;
}

const otpValidationSchema = Yup.object({
    otp: Yup.string()
        .matches(/^[0-9]+$/, 'OTP harus berupa angka')
        .min(4, 'OTP minimal 4 digit')
        .max(4, 'OTP maksimal 4 digit')
        .required('OTP wajib diisi'),
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

export default function RegisterPasienBaru() {
    // const [showPassword, setShowPassword] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [showEmailChanged, setShowEmailChanged] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [, setPasswordError] = useState(false);
    const [data, setData] = useState<DataKirim>({ identityNumber: '', name: '', phone: '', email: '', gender: '', address: '' });
    const [showAlert, setShowAlert] = useState(false);
    const [isCounting, setIsCounting] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(60);
    const [resendSuccess, setResendSuccess] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [emailOTP, setEmailOTP] = useState('');
    const [otp, setOtp] = useState('');
    const [data1, setData1] = useState<DataAwal>({ nik: '', email: '' });
    const [patientId, setPatientId] = useState<string>('');
    const [notFound, setNotFound] = useState(true);
    const [buttonDis, setButtonDis] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const otpFormShown = () => {
        // setShowEmailChanged(false);

        setOtp('');
    }

    // const handleClick = () => {
    //     setShowLogin(true);
    //     setShowEmailChanged(true);
    // };

    // const showTemporaryAlert = async () => {
    //     setShowAlert(true);
    //     await new Promise((resolve) => setTimeout(resolve, 3000));
    //     setShowAlert(false);
    // };


    const showTemporarySuccessLogin = async () => {
        setLoginSuccess(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setLoginSuccess(false);
        console.log(loginSuccess)
    };

    const showOtp = () => {
        setEmailError(false);
        setPasswordError(false);
        setShowLogin(false);
        setShowEmailChanged(true);
    };

    // const validationCheck = async (values: FormValues) => {

    //     // showOtp()
    //     return true;
    // };

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (isCounting && secondsLeft > 0) {
            timer = setInterval(() => {
                setSecondsLeft((prev) => prev - 1);
            }, 1000);
        } else if (secondsLeft === 0) {
            setIsCounting(false);
            setSecondsLeft(60);
        }

        return () => clearInterval(timer);
    }, [isCounting, secondsLeft]);

    const handleResendClick = async () => {
        try {
            console.log('handleResendClick');
            const response = await RegisterPatient(data);
            console.log("response: ", response);
        } catch {
            console.log("error")
        }
        setIsCounting(true);
        setSecondsLeft(60);
        showTemporaryAlertSuccess();
        console.log("Resend clicked");

    };

    const showTemporaryAlertSuccess = async () => {
        setResendSuccess(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setResendSuccess(false);
    };

    const formatTime = () => {
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // const [value, setValue] = React.useState('WOMEN');
    // const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setValue((event.target as HTMLInputElement).value);
    //     console.log(value)
    // };

    useEffect(() => {
        if (location.state && location.state.succesSendData1) {
            console.log(location.state.message);
            console.log("DATA YANG DIKIRIM dari Page 1: ", location.state.data);
            setData1(location.state.data);
            // navigate(location.pathname, { replace: true, state: undefined });
        }
    }, [location.state, navigate]);

    useEffect(() => {
        console.log("Data awal yang di state kan: ", data1);

        if (data1.email === '') {
            setShowLogin(false);
            setNotFound(true);
        } else {

            setShowLogin(true);
            setNotFound(false);
        }
    }, [data1]);

    const showTemporaryAlertError = async () => {
        console.log("ALERT ERROR ! ! !")
        setErrorAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setErrorAlert(false);
    };


    return (
        <>   <style>
            {`
            :root {
            background-color: #ffff
            }
            `}
        </style>
            <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: '10%', marginTop: '1%' }}>
                <Box position={'absolute'} >
                    <Box sx={{ position: "relative" }}>
                        <CardMedia
                            component="img"
                            sx={{
                                width: "50%",
                                height: "100vh",
                                objectFit: "cover",
                                position: "fixed",
                                top: "0",
                                left: "0",
                            }}
                            image={patientImage}
                            alt="Example Image"
                        />
                    </Box>

                    {/* overlay */}
                    <Box
                        sx={{
                            position: "fixed",
                            bgcolor: "rgba(0, 0, 0, 0.5)",
                            width: "50%",
                            height: "100vh",
                            top: "0",
                            left: "0",
                        }}
                    ></Box>
                    {/* ---- */}

                    <Box
                        sx={{
                            position: "fixed",
                            zIndex: "9999",
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

                {showLogin && (
                    <>

                        {showAlert && <AlertWarning teks="NIK atau Email yang Anda masukkan salah, silahkan coba lagi." />}
                        {resendSuccess && (
                            <AlertSuccess label="Kode verifikasi berhasil dikirimkan !" />
                        )}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute",
                                right: "0",
                                top: "0",
                                width: "50%",
                                flexDirection: "column",
                                gap: 5,
                                height: "100vh",
                                bgcolor: "#fff",
                            }}
                        >

                            <Box sx={{ ml: 4, width: '85%', }}>
                                <Typography sx={{ fontSize: '32px', fontWeight: '600' }}>Selamat Datang</Typography>
                                <Typography sx={{ color: 'gray', fontSize: '18px', marginBottom: '30px', width: '100%' }}>
                                    Silahkan masukkan nomor NIK (Nomor induk kependudukan) Pasien.
                                </Typography>

                                <Formik
                                    initialValues={{ nik: data1.nik, email: data1.email, phone: '', fullname: '', gender: '', address: '' }}
                                    enableReinitialize
                                    validationSchema={validationSchema}
                                    onSubmit={async (values) => {
                                        const dataRegis = {
                                            identityNumber: values.nik,
                                            name: values.fullname,
                                            phone: values.phone,
                                            email: values.email,
                                            gender: values.gender,
                                            address: values.address
                                        }
                                        setEmailOTP(values.email)
                                        console.log("data dikirm ke API: ", dataRegis)
                                        try {
                                            setButtonDis(true);

                                            const response = await RegisterPatient(dataRegis);
                                            console.log("response: ", response);
                                            showOtp()
                                            setData(dataRegis)
                                            setPatientId(response.data.id);
                                        } catch (error) {
                                            console.log("error", error)
                                        }
                                    }}
                                >
                                    {({ errors, touched, handleChange, handleBlur, values, isValid, dirty, setFieldValue }) => (
                                        <Form>
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <Typography fontSize={'20px'} fontWeight={600} mb={'3%'}>
                                                    Isi data diri pasien
                                                </Typography>
                                                <FormLabel sx={{ fontSize: '18px' }}>NIK (Nomor induk kependudukan) Pasien</FormLabel>
                                                <Field
                                                    name="nik"
                                                    as={TextField}
                                                    placeholder="Masukkan NIK (Nomor induk kependudukan)"
                                                    variant="outlined"
                                                    fullWidth
                                                    sx={{
                                                        width: '100%',
                                                        height: '48px',
                                                        marginTop: '10px',
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '8px',
                                                            backgroundColor: emailError ? '#ffcccc' : 'inherit',
                                                        },
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                            border: '1px solid #ccc',
                                                        },
                                                        '& .MuiOutlinedInput-input': {
                                                            padding: '10px',
                                                            fontSize: '16px',
                                                        },
                                                    }}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.nik}
                                                    error={touched.nik && Boolean(errors.nik)}
                                                    // helperText={touched.nik && errors.nik}
                                                    disabled
                                                />

                                                <FormLabel sx={{ fontSize: '18px' }}>Email</FormLabel>
                                                <Field
                                                    name="email"
                                                    as={TextField}
                                                    placeholder="Masukkan Email"
                                                    variant="outlined"
                                                    fullWidth
                                                    sx={{
                                                        width: '100%',
                                                        height: '48px',
                                                        marginTop: '10px',
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '8px',
                                                            backgroundColor: 'inherit',
                                                        },
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                            border: '1px solid #ccc',
                                                        },
                                                        '& .MuiOutlinedInput-input': {
                                                            padding: '10px',
                                                            fontSize: '16px',
                                                        },
                                                    }}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email}
                                                    error={touched.email && Boolean(errors.email)}
                                                    // helperText={touched.email && errors.email}
                                                    disabled
                                                />

                                                <Typography mt={2} >
                                                    No. Handphone Pasien{" "}
                                                    <span style={{ color: "#d32f2f" }}>*</span>{" "}
                                                </Typography>
                                                <PhoneInput
                                                    country={"id"}
                                                    value={values.phone}
                                                    onChange={(phone) => setFieldValue("phone", phone)}
                                                    inputStyle={{
                                                        height: "48px",
                                                        borderRadius: "8px",
                                                        border: touched.phone && errors.phone ? "1px solid #f44336" : "1px solid #ccc",
                                                        padding: "10px 40px 10px 60px",
                                                        backgroundColor: touched.phone && errors.phone ? "#ffcccc" : 'inherit',
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
                                                    onBlur={handleBlur("phone")}
                                                />

                                                <FormLabel sx={{ fontSize: '18px' }}>Nama lengkap Pasien</FormLabel>

                                                <Field
                                                    name="fullname"
                                                    as={TextField}
                                                    placeholder="Masukka Nama lengkap penanggung jawab"
                                                    variant="outlined"
                                                    fullWidth
                                                    sx={{
                                                        width: '100%',
                                                        height: '48px',
                                                        marginTop: '10px',
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '8px',
                                                            backgroundColor: touched.fullname && errors.fullname ? "#ffcccc" : 'inherit',
                                                        },
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                            border: '1px solid #ccc',
                                                        },
                                                        '& .MuiOutlinedInput-input': {
                                                            padding: '10px',
                                                            fontSize: '16px',
                                                        },
                                                    }}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.fullname}
                                                    error={touched.fullname && Boolean(errors.fullname)}
                                                // helperText={touched.fullname && errors.fullname}
                                                />

                                                <Typography mt={2} mb={1} >
                                                    Jenis kelamin Pasien{" "}
                                                    <span style={{ color: "#d32f2f" }}>*</span>{" "}
                                                </Typography>
                                                <Box display={'flex'} flexDirection={'row'} padding={1} border={"1px solid #A8A8BD"} borderRadius={"12px"} pl={3}>
                                                    <FormControl component="fieldset" error={touched.gender && Boolean(errors.gender)}>
                                                        <RadioGroup
                                                            aria-labelledby="gender-label"
                                                            name="gender"
                                                            value={values.gender}
                                                            onChange={(e) => setFieldValue("gender", e.target.value)}
                                                            row
                                                        >
                                                            <FormControlLabel value="WOMEN" control={<BpRadio />} label="Female" />
                                                            <FormControlLabel value="MEN" control={<BpRadio />} label="Male" />
                                                        </RadioGroup>
                                                        {touched.gender && errors.gender && (
                                                            <FormHelperText error>{errors.gender}</FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Box>

                                                <Typography sx={{ fontSize: "16px", mt: 2 }}>
                                                    Alamat tempat tinggal Pasien<span style={{ color: "red" }}>*</span>
                                                </Typography>

                                                <Field
                                                    name="address"
                                                    as={TextField}
                                                    placeholder="Masukkan tempat tinggal penanggung jawab"
                                                    variant="outlined"
                                                    fullWidth
                                                    size="medium"
                                                    sx={{
                                                        width: '100%',
                                                        height: '48px',
                                                        marginTop: '10px',
                                                        marginBottom: '50px',
                                                        alignItems: 'flex-start',
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '8px',
                                                            backgroundColor: touched.address && errors.address ? "#ffcccc" : 'inherit',
                                                        },
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                            border: '1px solid #ccc',
                                                        },
                                                        '& .MuiOutlinedInput-input': {
                                                            // padding: '10px',
                                                            alignItems: 'flex-start',
                                                            fontSize: '16px',
                                                        },
                                                    }}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.address}
                                                    error={touched.address && Boolean(errors.address)}
                                                    // helperText={touched.address && errors.address}
                                                    multiline
                                                    minRows={2}
                                                />



                                                {buttonDis ? (
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                        fullWidth
                                                        sx={{
                                                            width: '100%',
                                                            height: '48px',
                                                            marginTop: '20px',
                                                            backgroundColor: '#8F85F3',
                                                            ":hover": { backgroundColor: '#D5D1FB' },
                                                        }}
                                                        disabled={true}
                                                    >
                                                        <CircularProgress size={20} />
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                        fullWidth
                                                        sx={{
                                                            width: '100%',
                                                            height: '48px',
                                                            marginTop: '20px',
                                                            backgroundColor: '#8F85F3',
                                                            ":hover": { backgroundColor: '#D5D1FB' },
                                                        }}
                                                        disabled={!isValid || !dirty}
                                                    >
                                                        Lanjutkan
                                                    </Button>
                                                )}

                                                <Button
                                                    // onClick={() => navigate('/register/penanggungJawab') }
                                                    sx={{
                                                        width: '100%',
                                                        height: '48px',
                                                        marginTop: '20px',
                                                        backgroundColor: '#ffff',
                                                        border: '1px solid #8F85F3',
                                                        color: '#8F85F3',
                                                        ":hover": { backgroundColor: '#8F85F3', color: '#ffff' },
                                                    }}
                                                >
                                                    Pasien Tanpa Identitas
                                                </Button>

                                                {/* <CustomButton onClick={() => console.log("hai ")} label="Daftar pasien baru" /> */}

                                            </Box>
                                        </Form>
                                    )}
                                </Formik>
                            </Box>
                        </Box>
                    </>
                )}

                {
                    notFound && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                p: 5,
                                position: "absolute",
                                right: "0",
                                top: "0",
                                width: "45%",
                                flexDirection: 'column',
                                // mr: "10%",
                                mt: "15%",
                            }}
                        >
                            <Box sx={{ ml: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography sx={{ fontSize: '32px', fontWeight: '600', maxWidth: '410px' }}>
                                    Data Not Found  !
                                </Typography>
                                <Typography sx={{ color: '#A8A8BD', fontSize: '18px', marginBottom: '30px', maxWidth: '410px', fontWeight: '400' }}>
                                    Are you sure you filled the field ?? Look sus !
                                </Typography>
                                <Typography sx={{ color: '#A8A8BD', fontSize: '18px', marginBottom: '30px', maxWidth: '410px', fontWeight: '400' }}>
                                    Keep playing kiddos !
                                </Typography>
                            </Box>
                        </Box>
                    )}
                {showEmailChanged && (
                    <>
                        {errorAlert && (
                            <AlertWarning teks="Kode OTP tidak valid !" />
                        )}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                p: 5,
                                position: "absolute",
                                right: "0",
                                top: "0",
                                width: "45%",
                                flexDirection: 'column',
                                // mr: "10%",
                                mt: "15%",
                            }}
                        >
                            <Box sx={{ ml: 1 }}>
                                <Typography sx={{ fontSize: '32px', fontWeight: '600', maxWidth: '410px' }}>
                                    Verifikasi
                                </Typography>
                                <Typography sx={{ color: '#A8A8BD', fontSize: '18px', marginBottom: '30px', maxWidth: '410px', fontWeight: '400' }}>
                                    Silahkan masukkan kode 4 digit yang dikirimkan ke nomor Anda .
                                </Typography>

                                <Formik
                                    initialValues={{ otp: '' }}
                                    validationSchema={otpValidationSchema}
                                    onSubmit={async (values) => {
                                        const dataOTP = {
                                            email: emailOTP,
                                            code: values.otp
                                        }
                                        console.log("DATA OTP DIKIRIM : ", dataOTP)
                                        try {
                                            const response = await VerifyOTPPatient(dataOTP)
                                            console.log("response : ", response)
                                            otpFormShown()
                                            navigate('/register/pj', { state: { successAdd: true, message: 'Gedung berhasil ditambahkan!', data: data, idPatient: patientId } })
                                        } catch {
                                            console.log("error")
                                            showTemporaryAlertError()
                                        }

                                    }}
                                >
                                    {({ errors, touched, handleChange, isValid, dirty }) => (
                                        <Form>
                                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                                <OtpInput
                                                    value={otp}
                                                    onChange={(otp) => {
                                                        setOtp(otp);
                                                        handleChange('otp')(otp);
                                                    }}
                                                    numInputs={4}
                                                    renderSeparator={<span style={{ margin: '0 4px' }}> </span>}
                                                    renderInput={(props) => (
                                                        <input
                                                            {...props}
                                                            style={{
                                                                width: '100%',
                                                                height: '48px',
                                                                textAlign: 'center',
                                                                border: `1px solid ${touched.otp && errors.otp ? 'red' : '#8F85F3'}`,
                                                                borderRadius: '8px',
                                                                fontSize: '20px',
                                                                margin: '0 4px',
                                                                outline: 'none',
                                                                padding: '14px, 12px, 14px, 12px',
                                                            }}
                                                        />
                                                    )}
                                                />
                                                {touched.otp && errors.otp && (
                                                    <Typography sx={{ color: 'red', fontSize: '12px' }}>
                                                        {errors.otp}
                                                    </Typography>
                                                )}
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        marginTop: '10px',
                                                        width: '100%',
                                                    }}
                                                >
                                                    <Typography sx={{ fontSize: '16px', lineHeight: '18px', color: '#A8A8BD' }} >Tidak mendapatkan kode? </Typography>
                                                    <Typography
                                                        onClick={!isCounting ? handleResendClick : undefined}
                                                        sx={{
                                                            cursor: isCounting ? 'default' : 'pointer',
                                                            color: isCounting ? '#ccc' : '#8F85F3',
                                                            textDecoration: isCounting ? 'none' : 'underline',
                                                            fontSize: '16px',
                                                        }}
                                                    >
                                                        {isCounting ? `${formatTime()}` : 'Kirim ulang tautan'}
                                                    </Typography>
                                                </Box>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    // onClick={otpFormShown}
                                                    fullWidth
                                                    sx={{
                                                        width: '100%',
                                                        height: '48px',
                                                        marginTop: '20px',
                                                        backgroundColor: '#8F85F3',
                                                        ":hover": { backgroundColor: '#D5D1FB' },
                                                    }}
                                                    disabled={!isValid || !dirty}
                                                >
                                                    Verifikasi
                                                </Button>
                                            </Box>
                                        </Form>
                                    )}
                                </Formik>

                            </Box>
                        </Box>
                    </>
                )}
            </Box>
        </>
    );
}