import {
    Box,
    CardMedia,
    FormLabel,
    TextField,
    Typography,
    Button,
} from "@mui/material";
import logo from "../../../../assets/img/St.carolus.png";
import patientImage from "../../../../assets/img/registrationImg.jpg";
import { Formik, Form, Field } from "formik";
import AlertWarning from "../../../../components/small/alert/AlertWarning";
import AlertSuccess from "../../../../components/small/alert/AlertSuccess";
import "react-phone-input-2/lib/style.css";
import SwitchCustom from "../../../../components/small/Switch/SwitchCustom";


//hooks
import useRegisterPJ from '../hooks/useRegisterPJ';

export default function RegisterPJ() {
    const {
        validationSchema,
        emailError,
        // nikError,
        showAlert,
        loginSuccess,
        show,
        showTemporarySuccessLogin,
        handleSwitchChange,
        switchValue,
        data,
        navigate,
        notFound,
        validationCheck
    } = useRegisterPJ();
    return (
        <>
            <style>
                {`
    :root {
    background-color: #ffff
    }
    `}
            </style>

            <Box >
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
                {showAlert && (
                    <AlertWarning teks="NIK atau Email yang Anda masukkan salah, silahkan coba lagi." />
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
                    {show && (
                        <Box sx={{ width: "80%" }}>
                            <img src={logo} alt="logo-carolus" />
                            <Typography sx={{ fontSize: "32px", fontWeight: "600" }}>
                                Selamat Datang
                            </Typography>
                            <Typography
                                sx={{
                                    color: "gray",
                                    fontSize: "18px",
                                    marginBottom: "30px",
                                    width: "100%",
                                }}
                            >
                                Silahkan masukkan nomor NIK (Nomor induk kependudukan)
                                penanggung jawab.
                            </Typography>

                            <Formik
                                initialValues={{ nik: switchValue ? data.identityNumber : "", email: switchValue ? data.email : "" }}
                                enableReinitialize
                                validationSchema={switchValue ? null : validationSchema}
                                onSubmit={async (values) => {
                                    await validationCheck(values)
                                    await showTemporarySuccessLogin();

                                }}
                            >
                                {({
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    values,
                                    isValid,
                                    dirty,
                                    //   setFieldValue,
                                }) => (
                                    <Form>
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb={'2%'}>
                                                <Typography fontWeight={"bold"} maxWidth={"190px"} fontSize={'20px'} >
                                                    Isi data diri Penanggung jawab
                                                </Typography>
                                                <SwitchCustom onChangeValue={handleSwitchChange} />
                                            </Box>
                                            <FormLabel sx={{ fontSize: "18px" }}>
                                                NIK (Nomor induk kependudukan) Penanggung jawab
                                            </FormLabel>
                                            <Field
                                                name="nik"
                                                as={TextField}
                                                placeholder="Masukkan NIK (Nomor induk kependudukan)"
                                                variant="outlined"
                                                fullWidth
                                                sx={{
                                                    width: "100%",
                                                    height: "48px",
                                                    marginTop: "10px",
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "8px",
                                                        backgroundColor: touched.nik && errors.nik ? "#ffcccc" : "inherit",
                                                    },
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        border: "1px solid #ccc",
                                                    },
                                                    "& .MuiOutlinedInput-input": {
                                                        padding: "10px",
                                                        fontSize: "16px",
                                                    },
                                                }}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={switchValue ? data.identityNumber : values.nik}
                                                error={switchValue ? false : touched.nik && Boolean(errors.nik)}
                                                helperText={switchValue ? false : touched.nik && errors.nik}
                                                disabled={switchValue}
                                            />

                                            <FormLabel sx={{ fontSize: "18px", marginTop: "20px" }}>
                                                Email
                                            </FormLabel>
                                            <Field
                                                name="email"
                                                as={TextField}
                                                placeholder="Masukkan Email"
                                                variant="outlined"
                                                fullWidth
                                                sx={{
                                                    width: "100%",
                                                    height: "48px",
                                                    marginTop: "10px",
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "8px",
                                                        backgroundColor: emailError ? "#ffcccc" : "inherit",
                                                    },
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        border: "1px solid #ccc",
                                                    },
                                                    "& .MuiOutlinedInput-input": {
                                                        padding: "10px",
                                                        fontSize: "16px",
                                                    },
                                                }}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={switchValue ? data.email : values.email}
                                                error={switchValue ? false : touched.email && Boolean(errors.email)}
                                                helperText={switchValue ? false : touched.email && errors.email}
                                                disabled={switchValue}
                                            />

                                            {/* {touched.email && errors.email && (
                                    <Typography sx={{ color: "red", fontSize: "12px" }}>
                                        {errors.email}
                                    </Typography>
                                )} */}

                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                sx={{
                                                    width: "100%",
                                                    height: "48px",
                                                    mt: 5,
                                                    backgroundColor: "#8F85F3",
                                                    ":hover": { backgroundColor: "#D5D1FB" },
                                                }}
                                                disabled={switchValue ? (values.email === '' || values.nik === '' ? true : false) : !isValid || !dirty}
                                            >
                                                Lanjutkan
                                            </Button>

                                            <Button
                                                onClick={() => navigate('/register/pasien')}
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
                                                Kembali ke halaman data pasien
                                            </Button>

                                            {/* <CustomButton onClick={() => console.log("hai ")} label="Daftar pasien baru" /> */}
                                        </Box>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
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
                            }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography sx={{ fontSize: '32px', fontWeight: '600', maxWidth: '410px' }}>
                                    Data Not Found  !
                                </Typography>
                                {/* <Typography sx={{ color: '#A8A8BD', fontSize: '18px', marginBottom: '30px', maxWidth: '410px', fontWeight: '400' }}>
                            Are you sure you filled the field ?? Look sus !
                        </Typography>
                        <Typography sx={{ color: '#A8A8BD', fontSize: '18px', marginBottom: '30px', maxWidth: '410px', fontWeight: '400' }}>
                            Keep playing kiddos !
                        </Typography> */}
                            </Box>
                        </Box>
                    )
                    }


                </Box>
            </Box>
        </>
    )
}
