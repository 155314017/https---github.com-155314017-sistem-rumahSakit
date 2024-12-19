import { Box, CardMedia, FormLabel, TextField, Typography, Button, FormControlLabel, Radio, FormControl, RadioGroup, } from "@mui/material";
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
import dayjs from "dayjs";



export default function BioPjBaru() {
    const {
        validationSchema,
        handleSwitchChange,
        BpRadio,
        loginSuccess,
        showAlert,
        switchValue,
        data,
        patientId,
        navigate,
        noIdentity,
        currentView,
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
                            top: '87.6%',
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
                    {currentView === 'show' &&
                        <>
                            {showAlert && <AlertWarning teks="NIK atau Email yang Anda masukkan salah, silahkan coba lagi." />}
                            <Box sx={{ width: '85%' }}>
                                <Typography sx={{ fontSize: '32px', fontWeight: '600', mt: '-5%' }}>Selamat Datang</Typography>
                                <Typography sx={{ color: 'gray', fontSize: '18px', marginBottom: '30px', width: '100%' }}>
                                    Silahkan masukkan nomor NIK (Nomor induk kependudukan) penanggung jawab.
                                </Typography>

                                <Formik
                                    initialValues={{ relation: '', birthDate: switchValue ? data.birtDate : '', nik: switchValue ? data.identityNumber : '', email: switchValue ? data.email : '', phone: switchValue ? data.phone : '62', fullname: switchValue ? data.name : '', gender: switchValue ? data.gender : '', address: switchValue ? data.address : '', birthPlace: switchValue ? data.birthPlace : '' }}
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
                                            guardianAddress: values.address,
                                            // MASIH ERROR
                                            guardianType: 'guardianType',
                                            guardianRelation: values.relation,
                                            guardianBirthPlace: values.birthPlace,
                                            guardianBirthDate: values.birthDate,
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
                                                    <SwitchCustom onChangeValue={handleSwitchChange} defaultValue={switchValue} disable={noIdentity} />
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
                                                            backgroundColor: touched.nik && errors.nik ? '#ffcccc' : 'inherit',
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
                                                    // helperText={touched.nik && errors.nik}
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
                                                            backgroundColor: touched.email && errors.email ? '#ffcccc' : 'inherit',
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
                                                    // helperText={touched.email && errors.email}
                                                    disabled={switchValue}
                                                />
                                                <Box bgcolor={'red'} >
                                                    <FormControl sx={{ width: "100%", height: "56px" }}>
                                                        <Typography sx={{ fontSize: '16px', lineHeight: '18px', marginBottom: '15px', color: 'black' }}>
                                                            Cara datang/pengantar
                                                        </Typography>
                                                        <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            onChange={(event) => setFieldValue("relation", event.target.value)}
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

                                                    <FormControl sx={{ mt: '9.1%' }} >
                                                        <Typography mt={2} >
                                                            No. Handphone penanggung jawab{" "}
                                                            <span style={{ color: "#d32f2f" }}>*</span>{" "}
                                                        </Typography>
                                                        <PhoneInput
                                                            disabled={switchValue}
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
                                                    </FormControl>
                                                </Box>

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
                                                            backgroundColor: touched.fullname && errors.fullname ? "#ffcccc" : 'inherit',
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
                                                    // helperText={touched.fullname && errors.fullname}
                                                    disabled={switchValue}
                                                />

                                                <Box display={'flex'} justifyContent={'space-between'} sx={{ overflow: 'hidden', height: '85px' }}>
                                                    <FormControl sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '49%' }}>
                                                        <FormLabel>Tempat Lahir</FormLabel>
                                                        <Field
                                                            name="birthPlace"
                                                            as={TextField}
                                                            placeholder="Tempat Lahir"
                                                            variant="outlined"
                                                            fullWidth
                                                            sx={{
                                                                width: '100%',
                                                                height: '60px',
                                                                marginTop: '10px',
                                                                '& .MuiOutlinedInput-root': {
                                                                    borderRadius: '8px',
                                                                    backgroundColor: touched.birthPlace && errors.birthPlace ? "#ffcccc" : 'inherit',
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
                                                            value={values.birthPlace}
                                                            error={touched.birthPlace && Boolean(errors.birthPlace)}
                                                            // helperText={touched.fullname && errors.fullname}
                                                            disabled={switchValue}
                                                        />

                                                    </FormControl>

                                                    <FormControl sx={{ width: '49%', overflow: 'hidden', height: '100%' }}>
                                                        <FormLabel>Tanggal Lahir</FormLabel>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <Box sx={{ overflow: 'hidden' }}>
                                                                <DemoContainer components={['DatePicker']}>
                                                                    <DatePicker
                                                                        disabled={switchValue}
                                                                        value={dayjs(values.birthDate)}
                                                                        onChange={(newValue) => {
                                                                            if (newValue) {
                                                                                const formattedDate = newValue.format("YYYY-MM-DD");
                                                                                values.birthDate = formattedDate;
                                                                                console.log("tanggalLahir", formattedDate);
                                                                            }
                                                                        }}
                                                                        slotProps={{
                                                                            textField: {
                                                                                placeholder: "Tanggal Lahir",
                                                                                error: touched.birthDate && Boolean(errors.birthDate), // Error hanya saat touched dan ada error
                                                                                helperText: touched.birthDate && errors.birthDate, // Menampilkan pesan error saat tidak valid
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
                                                <FormLabel id="demo-controlled-radio-buttons-group">Jenis Kelamin Pasien</FormLabel>
                                                <Box display={'flex'} flexDirection={'row'} padding={1} border={"1px solid #A8A8BD"} borderRadius={"12px"} pl={3}>
                                                    <FormControl>
                                                        <FormControl component="fieldset" error={touched.gender && Boolean(errors.gender)}>
                                                            <RadioGroup
                                                                aria-labelledby="gender-label"
                                                                name="gender"
                                                                value={values.gender}
                                                                onChange={(e) => setFieldValue("gender", e.target.value)}
                                                                row
                                                            >
                                                                <FormControlLabel disabled={switchValue ? true : false} value="WOMEN" control={<BpRadio />} label="Female" />
                                                                <FormControlLabel disabled={switchValue ? true : false} value="MEN" control={<BpRadio />} label="Male" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </FormControl>
                                                </Box>

                                                <Typography sx={{ fontSize: "16px", mt: 2 }}>Alamat tempat tinggal penanggung jawab<span style={{ color: "red" }}>*</span></Typography>
                                                <Field
                                                    disabled={switchValue}
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
                                                            '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#8F85F3',
                                                            },
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
                                                        ":hover": {
                                                            backgroundColor: '#D5D1FB'
                                                        },
                                                    }}
                                                    disabled={switchValue ? false : !isValid || !dirty}
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
                                                        marginBottom: '20px',
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
                        </>
                    }

                    {currentView === 'notFound' &&

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
                    }
                </Box>
            </Box >
        </>
    );
}