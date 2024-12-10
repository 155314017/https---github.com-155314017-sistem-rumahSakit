import { Box, CardMedia, FormLabel, TextField, Typography, Button, FormControlLabel, Radio, FormControl, OutlinedInput, Switch, RadioGroup, } from "@mui/material";
import patientImage from "../../../../assets/img/registrationImg.jpg";
import { Formik, Form, Field } from 'formik';
import AlertWarning from "../../../../components/small/AlertWarning";
import AlertSuccess from "../../../../components/small/AlertSuccess";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from "react-phone-input-2";
import SwitchCustom from "../../../../components/small/SwitchCustom";
import UpdatePatientGuards from "../../../../services/Patient Tenant/UpdatePatientGuard";


//hooks
import useBioPjBaru from "../hooks/useBioPjBaru";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";



export default function BioPjBaru() {
    const {
        validationSchema,
        handleSwitchChange,
        show,
        notFound,
        BpRadio,
        loginSuccess,
        emailError,
        showAlert,
        switchValue,
        data,
        patientId,
        navigate
    } = useBioPjBaru();

    return (
        <>
            <style>
                {`
              :root {
              background-color: #ffff
              }
              `}
            </style>
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
                            top: '85%',
                            // bottom: "0%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "56px",
                                fontWeight: "700",
                                lineHeight: "60px",
                                color: "white",
                                position: "absolute",
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
                        position: "relative",
                        right: "0",
                        top: "0",
                        width: "50%",
                        ml: '45%',
                        height: '100vh',
                    }}
                >
                    {show && (
                        <>
                            {showAlert && <AlertWarning teks="NIK atau Email yang Anda masukkan salah, silahkan coba lagi." />}
                            <Box sx={{ width: '85%' }}>
                                <Typography sx={{ fontSize: '32px', fontWeight: '600', mt: '-5%' }}>Selamat Datang</Typography>
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
                                            navigate('/kategori/pasien', { state: { succesSendData: true, data: patientId } })
                                        } catch {
                                            console.log("error")
                                        }
                                    }}
                                >
                                    {({ errors, touched, handleChange, handleBlur, values, isValid, dirty, setFieldValue }) => (
                                        <Form>
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} >
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
                                                            '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#8F85F3',
                                                            },
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
                                                            '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#8F85F3',
                                                            },
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

                                                <FormControl sx={{ width: "100%", height: "56px" }}>
                                                    <FormLabel sx={{ fontSize: '16px', lineHeight: '18px', marginBottom: '15px', color: 'black' }}>
                                                        Cara datang/pengantar
                                                    </FormLabel>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            flexWrap: "wrap",
                                                            border: "1px solid #A8A8BD",
                                                            borderRadius: "16px",
                                                            padding: '16px',
                                                            gap: "24px",
                                                            justifyContent: 'flex-start',
                                                        }}
                                                    >
                                                        <FormControlLabel value="sendiri" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Sendiri" />
                                                        <FormControlLabel value="keluarga" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Keluarga" />
                                                        <FormControlLabel value="polisi" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Polisi" />
                                                        <FormControlLabel value="ambulan" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Ambulan" />
                                                        <FormControlLabel value="lainnya" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Lainnya" />
                                                    </RadioGroup>
                                                </FormControl>

                                                <FormControl sx={{ mt: '7%' }} >
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
                                                </FormControl>

                                                <FormLabel sx={{ fontSize: '18px' }}>Nama lengkap penanggung jawab</FormLabel>
                                                <Field
                                                    name="fullname"
                                                    as={TextField}
                                                    placeholder="Masukka Nama lengkap penanggung jawab"
                                                    variant="outlined"
                                                    fullWidth
                                                    sx={{
                                                        width: '100%',
                                                        height: '60px',
                                                        marginTop: '10px',
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '8px',
                                                            backgroundColor: 'inherit',
                                                            '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#8F85F3',
                                                            },
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

                                                <Box display={'flex'} justifyContent={'space-between'} sx={{ overflow: 'hidden', height: '75px' }}>
                                                    <FormControl sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '49%' }}>
                                                        <FormLabel>Tempat Lahir</FormLabel>
                                                        <OutlinedInput
                                                            sx={{
                                                                height: '44px',
                                                                borderRadius: '8px',
                                                                '& .MuiOutlinedInput-root': {
                                                                    borderRadius: '8px',
                                                                    backgroundColor: 'inherit',
                                                                    '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                        borderColor: '#8F85F3',
                                                                    },
                                                                },
                                                                '& .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: '#ccc',
                                                                }
                                                            }}
                                                            placeholder="Tempat Lahir"
                                                        />

                                                    </FormControl>

                                                    <FormControl sx={{ width: '49%', overflow: 'hidden', height: '100%' }}>
                                                        <FormLabel>Tanggal Lahir</FormLabel>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <Box sx={{ overflow: 'hidden' }}>
                                                                <DemoContainer components={['DatePicker']}>
                                                                    <DatePicker
                                                                        slotProps={{
                                                                            textField: {
                                                                                placeholder: "Tanggal Lahir",
                                                                                sx: {
                                                                                    borderRadius: '8px',
                                                                                    height: '60px',
                                                                                    width: '100%',
                                                                                    '& .MuiOutlinedInput-root': {
                                                                                        borderRadius: '8px',
                                                                                        height: '44px',
                                                                                    },
                                                                                },
                                                                            },
                                                                        }}
                                                                    />
                                                                </DemoContainer>
                                                            </Box>
                                                        </LocalizationProvider>
                                                    </FormControl>
                                                </Box>
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
                                                            '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#8F85F3',
                                                            },
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
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
}