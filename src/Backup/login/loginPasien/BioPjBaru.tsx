import { Box, CardMedia, FormLabel, TextField, Typography, Button, FormControlLabel, Radio, FormControl, OutlinedInput, Switch, RadioGroup, } from "@mui/material";
import React, { useEffect, useState } from "react";
import patientImage from "../../../assets/img/registrationImg.jpg";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AlertWarning from "../../../components/small/AlertWarning";
import AlertSuccess from "../../../components/small/AlertSuccess";
import 'react-phone-input-2/lib/style.css';
import { useLocation, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import SwitchCustom from "../../../components/small/SwitchCustom";
import Cookies from "js-cookie";
import UpdatePatientGuards from "../../../services/Patient Tenant/UpdatePatientGuard";
import { styled } from '@mui/material/styles';
import { RadioProps } from '@mui/material/Radio';

const validationSchema = Yup.object({
    nik: Yup.string()
        .matches(/^[0-9]+$/, 'NIK harus berupa angka')
        .min(12, 'NIK minimal 12 digit')
        .max(14, 'NIK maksimal 14 digit')
        .required('NIK wajib diisi'),
    email: Yup.string().required('Email wajib diisi')
});

interface FormValues {
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

interface DataKirim {
    identityNumber: string;
    email: string;
    phone: string;
    name: string;
    gender: string;
    address: string;
}

export default function BioPjBaru() {
    // const [showPassword, setShowPassword] = usseState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [showEmailChanged, setShowEmailChanged] = useState(true);
    const [emailError, setEmailError] = useState(false);
    const [, setNikError] = useState(false);
    const [, setPasswordError] = useState(false);
    const [data, setData] = useState<DataKirim>({ identityNumber: '', email: '', phone: '', name: '', gender: '', address: '' });
    const [showAlert, setShowAlert] = useState(false);
    const [isCounting, setIsCounting] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(60);
    const [resendSuccess, setResendSuccess] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [otp, setOtp] = useState('');
    const [switchValue, setSwitchValue] = useState(false);
    const [patientId, setPatientId] = useState<string>('');
    const [show, setShow] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.successSendDataPj) {
            console.log(location.state.message);
            console.log("DATA YANG DIKIRIM (Latest): ", location.state.data);
            setData(location.state.data);
            setSwitchValue(location.state.successSendDataPj)
            console.log("Data yang di state kan: ", data)
            setPatientId(location.state.idPatient)
        }
    }, [location.state, navigate]);

    useEffect(() => {
        console.log("Id Patient: ", patientId);

        if (patientId === '') {
            setShowLogin(false);
            setNotFound(true);
        } else {

            setShowLogin(true);
            setNotFound(false);
        }
    }, [patientId]);

    const otpFormShown = () => {
        // setShowEmailChanged(false);

        setOtp('');
    }

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

    const validationCheck = async (values: DataKirim) => {
        // showOtp()
        console.log("Data siap kirim", values)

        return true;
    };

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

    const [value, setValue] = React.useState('female');
    const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
        console.log(value)
    };

    const handleSwitchChange = (value: boolean) => {
        setSwitchValue(value);
        console.log('Switch value:', value);
        console.log('Data: ', data);
    };


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

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: '10%' }}>
            <Box>
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
                        position: "absolute",
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
                        position: "absolute",
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
            {loginSuccess && <AlertSuccess label="Login Succeeded!" />}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 5,
                    position: "fixed",
                    right: "0",
                    top: "0",
                    width: "45.9%",
                    height: '100vh',
                    bgcolor: '#ffff'
                }}
            >
                {show && (
                    <>
                        {showAlert && <AlertWarning teks="NIK atau Email yang Anda masukkan salah, silahkan coba lagi." />}
                        <Box sx={{ width: '85%' }}>
                            <Typography sx={{ fontSize: '32px', fontWeight: '600' }}>Selamat Datang</Typography>
                            <Typography sx={{ color: 'gray', fontSize: '18px', marginBottom: '30px', width: '100%' }}>
                                Silahkan masukkan nomor NIK (Nomor induk kependudukan) penanggung jawab.
                            </Typography>

                            <Formik
                                initialValues={{ nik: switchValue ? data.identityNumber : '', email: switchValue ? data.email : '', phone: switchValue ? data.phone : '', fullname: switchValue ? data.name : '', gender: switchValue ? data.gender : '', address: switchValue ? data.address : '', }}
                                enableReinitialize
                                validationSchema={validationSchema}
                                onSubmit={async (values) => {
                                    // if (await validationCheck(values)) {
                                    //     console.log(values);
                                    // setData(values);
                                    // await showTemporarySuccessLogin();
                                    const dataRegis = {
                                        patientId: patientId,
                                        guardianIdentityNumber: values.nik,
                                        guardianName: values.fullname,
                                        guardianPhone: values.phone,
                                        guardianEmail: values.email,
                                        guardianGender: values.gender,
                                        guardianAddress: values.address
                                    }
                                    console.log("data dikirm ke API: ", dataRegis)
                                    try {
                                        const response = await UpdatePatientGuards(dataRegis);
                                        console.log("response: ", response);
                                        console.log("Sukses")
                                        navigate('/kategori/pasien')
                                    } catch {
                                        console.log("error")
                                    }
                                }}
                            >
                                {({ errors, touched, handleChange, handleBlur, values, isValid, dirty, setFieldValue }) => (
                                    <Form>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb={'2%'}>
                                                <Typography fontWeight={"bold"} maxWidth={"190px"} fontSize={'20px'} >
                                                    Isi data diri Penanggung jawab
                                                </Typography>
                                                <SwitchCustom onChangeValue={handleSwitchChange} defaultValue={switchValue} />
                                            </Box>
                                            <FormLabel sx={{ fontSize: '18px' }}>NIK (Nomor induk kependudukan) Penanggung jawab</FormLabel>
                                            <Field
                                                name="nik"
                                                as={TextField}
                                                placeholder="Masukkan NIK (Nomor induk kependudukan)"
                                                variant="outlined"
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
                                                helperText={touched.nik && errors.nik}
                                                disabled={switchValue}
                                            />

                                            <FormLabel sx={{ fontSize: '18px', marginTop: '20px' }}>Email</FormLabel>
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
                                                disabled={switchValue}
                                            />

                                            <Typography mt={2} >
                                                No. Handphone penanggung jawab{" "}
                                                <span style={{ color: "#d32f2f" }}>*</span>{" "}
                                            </Typography>
                                            <PhoneInput
                                                country={"id"}
                                                value={switchValue ? data.phone : "62"}
                                                onChange={(phone) => setFieldValue("phone", phone)}
                                                disabled={switchValue}
                                                inputStyle={{
                                                    height: "48px",
                                                    borderRadius: "8px",
                                                    border: "1px solid #ccc",
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
                                            />

                                            <FormLabel sx={{ fontSize: '18px', marginTop: '20px' }}>Nama lengkap penanggung jawab</FormLabel>
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
                                                value={values.fullname}
                                                error={touched.fullname && Boolean(errors.fullname)}
                                                helperText={touched.fullname && errors.fullname}
                                                disabled={switchValue}
                                            />


                                            <FormControl>
                                                <FormLabel id="demo-controlled-radio-buttons-group">Jenis Kelamin Pasien</FormLabel>

                                                <RadioGroup
                                                    aria-labelledby="gender-label"
                                                    name="gender"
                                                    value={values.gender}
                                                    onChange={(e) => setFieldValue("gender", e.target.value)}
                                                    row
                                                >
                                                    <FormControlLabel value="WOMEN" disabled={switchValue} control={<BpRadio />} label="Female" />
                                                    <FormControlLabel value="MEN" disabled={switchValue} control={<BpRadio />} label="Male" />
                                                </RadioGroup>
                                            </FormControl>

                                            <Typography sx={{ fontSize: "16px", mt: 2 }}>Alamat tempat tinggal penanggung jawab<span style={{ color: "red" }}>*</span></Typography>
                                            <Field
                                                name="address"
                                                as={TextField}
                                                placeholder="Masukkan tempat tinggal penanggung jawab" s
                                                variant="outlined"
                                                size="medium"
                                                multiline
                                                minRows={2}
                                                fullWidth
                                                sx={{
                                                    width: '100%',
                                                    height: '107px',
                                                    marginTop: '10px',
                                                    alignItems: 'flex-start',
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
                                                value={values.address}
                                                error={touched.address && Boolean(errors.address)}
                                                helperText={touched.address && errors.address}
                                                disabled={switchValue}
                                            />

                                            <Button
                                                // onClick={() => console.log("isValid:", isValid, "dirty:", dirty)}
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
                                                disabled={switchValue ? false : !isValid || !dirty}
                                            >
                                                Lanjutkan
                                            </Button>

                                            {/* <CustomButton onClick={() => console.log("hai ")} label="Daftar pasien baru" /> */}

                                        </Box>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    </>
                )}

                {notFound && (

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            p: 5,
                            position: "absolute",
                            width: "60%",
                            flexDirection: 'column',
                            mt: "35%"
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
            </Box>
        </Box>
    );
}