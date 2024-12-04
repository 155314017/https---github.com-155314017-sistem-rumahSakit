import React from 'react'
import { Box, CardMedia, FormLabel, TextField, Typography, Button, FormControlLabel, FormControl, RadioGroup, FormHelperText, CircularProgress, } from "@mui/material";
import patientImage from "../../../../assets/img/registrationImg.jpg";
import { Formik, Form, Field } from 'formik';
import AlertWarning from "../../../../components/small/AlertWarning";
import AlertSuccess from "../../../../components/small/AlertSuccess";
import OtpInput from 'react-otp-input';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from "react-phone-input-2";
import RegisterPatient from "../../../../services/Patient Tenant/RegisterPatient";
import VerifyOTPPatient from "../../../../services/Patient Tenant/VerifyOTPPatient";

//hooks
import useRegistrasiPasienBaru from "../hooks/useRegistrasiPasienBaru";
export default function RegisterPasienBaru() {
    const {
        otpFormShown,
      showOtp,
      showTemporaryAlertError,
      handleResendClick,
      formatTime,
      data1,
      showLogin,
      notFound,
      buttonDis,
      errorAlert,
      showEmailChanged,
      showAlert,
      emailError,
      resendSuccess,
      isCounting,
      validationSchema,
      otpValidationSchema,
      BpRadio,
      emailOTP,
      otp,
      patientId, setPatientId,
      setButtonDis,
      setEmailOTP,
      setData,
      navigate,
      data,
      setOtp
    } = useRegistrasiPasienBaru();
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
  )
}
