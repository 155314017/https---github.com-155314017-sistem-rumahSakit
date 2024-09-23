import { Box, CardMedia, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, TextField, Typography, Checkbox, Link, Button, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import logo from "../../../img/St.carolus.png";
import patientImage from "../../../img/loginPasienImage.png";
import PhoneInput from 'react-phone-input-2';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AlertWarning from "../../../components/small/AlertWarning";
import AlertSuccess from "../../../components/small/AlertSuccess";
import CustomButton from "../../../components/small/CustomButton";
import OtpInput from 'react-otp-input';
import 'react-phone-input-2/lib/style.css';
import LabelHandler from "../../../components/small/LabelHandler";

const validationSchema = Yup.object({
    nik: Yup.string()
        .matches(/^[0-9]+$/, 'NIK harus berupa angka')
        .min(12, 'NIK minimal 12 digit')
        .max(14, 'NIK maksimal 14 digit')
        .required('NIK wajib diisi'),
    phone: Yup.string().required('Nomor HP wajib diisi'),
});

interface FormValues {
    nik: string;
    phone: string;
}

const otpValidationSchema = Yup.object({
    otp: Yup.string()
        .matches(/^[0-9]+$/, 'OTP harus berupa angka')
        .min(4, 'OTP minimal 4 digit')
        .max(4, 'OTP maksimal 4 digit')
        .required('OTP wajib diisi'),
});

export default function LoginPasien() {
    const [showPassword, setShowPassword] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [showEmailChanged, setShowEmailChanged] = useState(true);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [isCounting, setIsCounting] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(60);
    const [resendSuccess, setResendSuccess] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [otp, setOtp] = useState('');

    const otpFormShown = () => {
        setShowEmailChanged(false);
        setOtp('');
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClick = () => {
        setShowLogin(true);
        setShowEmailChanged(true);
    };

    const showTemporaryAlert = async () => {
        setShowAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setShowAlert(false);
    };

    const showTemporarySuccessLogin = async () => {
        setLoginSuccess(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setLoginSuccess(false);
    };

    const showOtp = () => {
        setEmailError(false);
        setPasswordError(false);
        setShowLogin(false);
    };

    const validationCheck = async (values: FormValues) => {
        const { nik, phone } = values;
        const nikIsValid = nik === "1234567891011";
        const phoneIsValid = phone === "6289664470092";
        setEmailError(!nikIsValid);
        setPasswordError(!phoneIsValid);

        if (!nikIsValid || !phoneIsValid) {
            await showTemporaryAlert();
            return false;
        }
        showOtp()
        return true;
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
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

    const handleResendClick = () => {
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

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft:'5%' }}>
            <Box sx={{ marginTop: '-100px' }} >
                <Typography sx={{ fontSize: '56px', fontWeight: '700', lineHeight: '60px', position: 'relative', zIndex: '9999', top: '798px', left: '73px', width: '715px', height: '120px', color: 'white' }} >
                    Mulai permintaan janji temu Anda di sini.
                </Typography>
                <CardMedia
                    component="img"
                    height="864"
                    sx={{ width: '793px', objectFit: 'cover' }}
                    image={patientImage}
                    alt="Example Image"
                />
            </Box>
            {showLogin && (
                <>
                    {showAlert && <AlertWarning teks="NIK atau No Handphone yang Anda masukkan salah, silahkan coba lagi." />}

                    <Box sx={{ marginLeft: '50px', marginTop: 'auto', marginBottom: 'auto', width: '27%' }}>
                        <Typography sx={{ fontSize: '32px', fontWeight: '600' }}>Selamat Datang</Typography>
                        <Typography sx={{ color: 'gray', fontSize: '18px', marginBottom: '30px' }}>
                            Silakan masukkan nomor NIK dan nomor HP Anda untuk melanjutkan.
                        </Typography>

                        <Formik
                            initialValues={{ nik: '', phone: '' }}
                            validationSchema={validationSchema}
                            onSubmit={async (values) => {
                                if (await validationCheck(values)) {
                                    console.log(values);
                                    await showTemporarySuccessLogin();
                                }
                            }}
                        >
                            {({ errors, touched, handleChange, handleBlur, values, isValid, dirty, setFieldValue }) => (
                                <Form>
                                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                        {/* NIK Input */}
                                        <FormLabel sx={{ fontSize: '18px' }}>NIK (Nomor induk kependudukan)</FormLabel>
                                        <Field
                                            name="nik"
                                            as={TextField}
                                            placeholder="Masukkan NIK (Nomor induk kependudukan)"
                                            variant="outlined"
                                            fullWidth
                                            sx={{
                                                width: '410px',
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
                                            helperText={touched.nik && errors.nik}
                                        />

                                        <FormLabel sx={{ fontSize: '18px', marginTop: '20px' }}>Nomor HP</FormLabel>
                                        <PhoneInput
                                            country={'id'}
                                            value={values.phone}
                                            onChange={(phone) => {
                                                setFieldValue('phone', phone);
                                                setPhoneError(false);
                                            }}
                                            inputStyle={{
                                                width: '410px',
                                                height: '48px',
                                                borderRadius: '8px',
                                                border: `1px solid ${touched.phone && errors.phone ? 'red' : '#ccc'}`,
                                                padding: '10px 40px 10px 60px',
                                                fontSize: '16px',
                                                marginTop: '10px',
                                            }}
                                            buttonStyle={{
                                                borderRadius: '8px 0 0 8px',
                                                border: '1px solid #ccc',
                                            }}
                                            containerStyle={{
                                                marginBottom: '10px',
                                                width: '100%',
                                            }}
                                            inputClass="phone-input"
                                        />
                                        {touched.phone && errors.phone && (
                                            <Typography sx={{ color: 'red', fontSize: '12px' }}>
                                                {errors.phone}
                                            </Typography>
                                        )}


                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            sx={{
                                                width: '410px',
                                                height: '48px',
                                                marginTop: '20px',
                                                backgroundColor: '#8F85F3',
                                                ":hover": { backgroundColor: '#D5D1FB' },
                                            }}
                                            disabled={!isValid || !dirty}
                                        >
                                            Lanjutkan
                                        </Button>

                                        <CustomButton onClick={() => console.log("hai ")} label="Daftar pasien baru" />

                                        {/* {loginSuccess && <AlertSuccess label="Login Succeeded!" />} */}
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </>
            )}

            {
                !showLogin && (
                    <>
                        {showEmailChanged && (
                            <Box sx={{ marginLeft: '50px', marginTop: 'auto', marginBottom: 'auto' }}>
                                {loginSuccess && <AlertSuccess label="Login Succeeded!" />}
                                <Typography sx={{ fontSize: '32px', fontWeight: '600', maxWidth: '410px' }}>
                                    Verifikasi
                                </Typography>
                                <Typography sx={{ color: '#A8A8BD', fontSize: '18px', marginBottom: '30px', maxWidth: '410px', fontWeight: '400' }}>
                                    Silakan masukkan kode 4 digit yang dikirimkan ke nomor Anda .
                                </Typography>

                                <Formik
                                    initialValues={{ otp: '' }}
                                    validationSchema={otpValidationSchema}
                                    onSubmit={(values) => {
                                        console.log(values);
                                    }}
                                >
                                    {({ errors, touched, handleChange, handleBlur, values, isValid, dirty }) => (
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
                                                                width: '90.5px',
                                                                height: '48px',
                                                                textAlign: 'center',
                                                                border: `1px solid ${touched.otp && errors.otp ? 'red' : '#A8A8BD'}`,
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
                                                        maxWidth: '92%',
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
                                                    onClick={otpFormShown}
                                                    fullWidth
                                                    sx={{
                                                        width: '410px',
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
                        )}

                        {!showEmailChanged && (
                            <Box sx={{ marginLeft: '50px', marginTop: 'auto', marginBottom: 'auto' }}>
                                <Typography sx={{ fontSize: '32px', fontWeight: '600', maxWidth: '410px' }}>
                                    Email pengaturan ulang kata sandi telah terkirim.
                                </Typography>
                                <Typography sx={{ color: '#16161D', fontSize: '18px', marginBottom: '30px', maxWidth: '410px', fontWeight: '400' }}>
                                    Kami telah mengirimkan tautan untuk mengatur ulang kata sandi Anda. Tidak mendapat email?
                                </Typography>
                                <Button
                                    onClick={handleResendClick}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={isCounting}
                                    sx={{
                                        width: '410px',
                                        height: '48px',
                                        backgroundColor: isCounting ? '#ccc' : '#8F85F3',
                                        ":hover": { backgroundColor: '#D5D1FB' },
                                    }}
                                >
                                    {isCounting ? `Kirim ulang dalam ${formatTime()}` : 'Kirim ulang tautan'}
                                </Button>
                                <CustomButton onClick={handleClick} label="Kembali ke halaman masuk" />

                                {resendSuccess && (
                                    <AlertSuccess label="Link tautan berhasil dikirim ulang" />
                                )}
                            </Box>
                        )}
                    </>
                )
            }
        </Box>
    );
}