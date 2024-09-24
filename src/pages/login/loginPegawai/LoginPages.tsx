import { Box, CardMedia, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, TextField, Typography, Checkbox, Link, Button, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import my from "../../../img/loginImg.png";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AlertWarning from "../../../components/small/AlertWarning";
import AlertSuccess from "../../../components/small/AlertSuccess";
import CustomButton from "../../../components/small/CustomButton";
import LabelHandler from "../../../components/small/LabelHandler";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Email tidak valid')
        .required('Email wajib diisi'),
    password: Yup.string()
        .min(6, 'Kata sandi harus terdiri dari minimal 6 karakter')
        .required('Kata sandi wajib diisi'),
});

interface FormValues {
    email: string;
    password: string;
}

export default function Login() {
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

    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const forgotPass = () => {
        setShowLogin(false);
        setEmailError(false);
        setPasswordError(false);
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


    const loginComponent = () => {
        setShowLogin(true);
    }

    const validationCheck = async (values: FormValues) => {
        const { email, password } = values;

        const emailIsValid = email === "admin@mail.com";
        const passwordIsValid = password === "admin123";
        setEmailError(!emailIsValid);
        setPasswordError(!passwordIsValid);

        if (!emailIsValid || !passwordIsValid) {
            await showTemporaryAlert();
            return false;
        }
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
        <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: '5%' }}>
            <CardMedia
                component="img"
                height="864"
                sx={{ width: '793px', objectFit: 'cover', marginTop: '40px' }}
                image={my}
                alt="Example Image"
            />
            {showLogin && (
                <>
                    {showAlert && (
                        <AlertWarning teks="Email atau kata sandi yang Anda masukkan salah, silahkan coba lagi." />
                    )}

                    <Box sx={{ marginLeft: '50px', marginTop: 'auto', marginBottom: 'auto' }}>
                        <Typography sx={{ fontSize: '32px', fontWeight: '600' }}>
                            Selamat Datang
                        </Typography>
                        <Typography sx={{ color: 'gray', fontSize: '18px', marginBottom: '30px' }}>
                            Silakan masukkan detail akun Anda untuk melanjutkan
                        </Typography>

                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={validationSchema}
                            onSubmit={async (values) => {
                                if (await validationCheck(values)) {
                                    console.log(values);
                                    await showTemporarySuccessLogin();
                                }
                            }}

                        >
                            {({ errors, touched, handleChange, handleBlur, values, isValid, dirty }) => (
                                <Form>
                                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <FormLabel sx={{ fontSize: '18px' }}>Email</FormLabel>
                                        <Field
                                            name="email"
                                            as={TextField}
                                            placeholder="Masukkan email, username, atau NIP"
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
                                            value={values.email}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                        />
                                        <FormLabel sx={{ fontSize: '18px', marginTop: '20px' }}>Kata Sandi</FormLabel>
                                        <FormControl variant="outlined" fullWidth sx={{ width: '410px', height: '48px', marginTop: '10px' }}>
                                            <Field
                                                name="password"
                                                as={TextField}
                                                placeholder="Masukkan kata sandi"
                                                variant="outlined"
                                                type={showPassword ? 'text' : 'password'}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={handleClickShowPassword}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{
                                                    height: '48px',
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                        backgroundColor: passwordError ? '#ffcccc' : 'inherit',
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
                                                value={values.password}
                                                error={touched.password && Boolean(errors.password)}
                                                helperText={touched.password && errors.password}
                                            />
                                        </FormControl>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginTop: '10px',
                                                maxWidth: '92%'
                                            }}
                                        >
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label="Ingat kata sandi"
                                                sx={{ marginRight: 'auto' }}
                                            />
                                            <LabelHandler onClick={forgotPass} href="#" label="Lupa kata sandi?" />
                                        </Box>
                                        <Button
                                            onClick={() => navigate("/dashboard")}
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            sx={{
                                                width: '410px',
                                                height: '48px',
                                                marginTop: '20px',
                                                backgroundColor: '#8F85F3',
                                                ":hover": { backgroundColor: '#D5D1FB' }
                                            }}
                                            disabled={!isValid || !dirty}
                                        >
                                            Login
                                        </Button>

                                        {loginSuccess && (
                                            <AlertSuccess label="Login Succeeded!" />
                                        )}
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
                                <Typography sx={{ fontSize: '32px', fontWeight: '600', maxWidth: '410px' }}>
                                    Masukkan alamat Email Anda
                                </Typography>
                                <Typography sx={{ color: '#A8A8BD', fontSize: '18px', marginBottom: '30px', maxWidth: '410px', fontWeight: '400' }}>
                                    Untuk mengatur ulang kata sandi Anda, masukkan alamat email yang Anda gunakan.
                                </Typography>

                                <Formik
                                    initialValues={{ email: '' }}
                                    validationSchema={Yup.object({
                                        email: Yup.string()
                                            .email('Email tidak valid')
                                            .required('Email wajib diisi'),
                                    })}
                                    validateOnChange={true}
                                    validateOnBlur={true}
                                    onSubmit={(values) => {
                                        console.log(values);
                                    }}
                                >
                                    {({ errors, touched, handleChange, handleBlur, values, isValid, dirty }) => (
                                        <Form>
                                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                                <FormLabel sx={{ fontSize: '18px' }}>Email</FormLabel>
                                                <Field
                                                    name="email"
                                                    as={TextField}
                                                    placeholder="example@mail.com"
                                                    variant="outlined"
                                                    fullWidth
                                                    sx={{
                                                        width: '410px',
                                                        height: '48px',
                                                        marginTop: '10px',
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '8px',
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
                                                    helperText={touched.email && errors.email}
                                                />
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => setShowEmailChanged(false)}
                                                    fullWidth
                                                    sx={{
                                                        width: '410px',
                                                        height: '48px',
                                                        marginTop: '20px',
                                                        backgroundColor: '#8F85F3',
                                                        ":hover": { backgroundColor: '#D5D1FB' }
                                                    }}
                                                    disabled={!isValid || !dirty}
                                                >
                                                    Setel ulang kata sandi
                                                </Button>

                                                <CustomButton onClick={loginComponent} label="Kembali ke halaman masuk" />

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
                                        ":hover": { backgroundColor: '#D5D1FB' }
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
        </Box >
    );
}
