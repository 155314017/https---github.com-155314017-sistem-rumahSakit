import {
    Container,
    Box,
    Typography,
    Button,
    FormControl,
    FormControlLabel,
    RadioGroup,
    TextField,
    OutlinedInput,
    FormLabel,
    CircularProgress,
    Checkbox,
    FormHelperText
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import bgImage from "../../../../assets/img/String.png";
import PhoneInput from 'react-phone-input-2';
//hooks
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import useTambahPasienUmumOffline from "../hooks/useTambahPasienUmumOffline";
import SwitchCustom from "../../../../components/small/Switch/SwitchCustom";
import DropdownListAPI from "../../../../components/small/dropdownlist/DropdownListAPI";
import CustomCalender from "../../../../components/medium/CustomCalender";
import InformasiTicketAPI from "../../../../components/small/InformasiTicketAPI";
import bgImg from "../../../../assets/img/Bg-desktop.svg"
import BreadCrumbBasic from "../../../../components/medium/BreadCrumbBasic";
import AlertWarning from "../../../../components/small/alert/AlertWarning";
import { useEffect } from "react";
import dataPasien from "../../../../dummyData/dataPasien";
import { Field, Form, Formik } from "formik";
import CardAntrianCounter from "../../../../components/small/card/CardAntrianCounter";


export default function TambahPasienUmumOffline() {
    const {
        validationSchema,
        currentPage,
        setCurrentPage,
        getPageStyle,
        getBorderStyle,
        isCurrentPageValid,
        handleSwitchChange,
        switchValue,
        mainPages,
        guardFullPage,
        setGuardFullPage,
        patientFullPage,
        handleScheduleChange,
        doctorOptions,
        idDoctor,
        handleDropdownDocter,
        findPatientByNik,
        patientData,
        BpRadio,
        // putGuard,
        changePage2,
        clinicOptions,
        handleDropdownPoli,
        createTicket,
        dataTickets,
        birthDate,
        birthPlace,
        showAlert,
        calendarKey,
        isLoading,
        handleGoBack,
        formik,
        setNeedAdmin,
        fileName,
        handleFileChange,
        needAdmin,
        setMainPages,
        NIK,
        birth,
       setPatientData,
       validationSchema1


    } = useTambahPasienUmumOffline();

    useEffect(() => {
        console.log(currentPage)
    }, [currentPage]);


    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "100vh",
            height: "auto",
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            py: 2,
            // bgcolor: 'yellow'
            position: "relative",
        }}>

            <Container sx={{
                pt: '80px',
                // bgcolor: 'red',
                marginTop: '-90px'
            }}>
                <Box sx={{
                    position: 'relative',
                    top: 0,
                    left: 0,
                    // right: "auto",
                    zIndex: 1000,
                    padding: '16px',
                    width: {
                        xs: '90%',
                        sm: '84%',
                        md: '90%',
                        lg: '100%',
                    },
                    // bgcolor: 'blue'

                }}>
                    <BreadCrumbBasic
                        title="Pasien lama"
                        description="Pasien yang pernah datang sebelumnya untuk keperluan berobat."
                        onBackClick={handleGoBack}
                    />

                    {showAlert && <AlertWarning teks="NIK Tidak Ditemukan. Silahkan coba lagi." />}
                </Box>

                <Box mt={5}>


                    {mainPages && (
                        <Box mt={currentPage == 2 ? '10%' : '10%'} position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden", height: 'fit-content' }}>
                            <Box marginBottom={3} padding={1.6}>
                                <Typography fontWeight={600} fontSize={20}>
                                    Formulir pendaftaran pasien Umum
                                </Typography>
                                <Typography fontWeight={400} fontSize={16} color="#A8A8BD">
                                    Pasien yang berobat di rumah sakit dengan membayar sendiri seluruh biaya perawatan dan pengobatan yang dibutuhkan.
                                </Typography>
                            </Box>

                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, mb: 2, gap: 8 }}>
                                {/* Step 1 */}
                                <Box display={"flex"} flexDirection={"row"} width={"290px"}>

                                    <Button
                                        onClick={() => setCurrentPage(1)}
                                        // disabled={currentPage > 1} // Nonaktifkan jika bukan langkah pertama
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            mx: 2,
                                            ...getPageStyle(1),
                                            "&:hover": {
                                                backgroundColor: "inherit",
                                            },
                                        }}
                                    >
                                        <Box sx={getBorderStyle(1)}>1</Box>
                                        <Typography sx={{ ml: 1, textTransform: 'none' }}>Data diri pasien</Typography>
                                    </Button>
                                </Box>

                                {/* Step 2 */}
                                <Box display={"flex"} flexDirection={"row"} width={"400px"}>
                                    <Button
                                        onClick={() => setCurrentPage(2)}
                                        disabled={currentPage < 2} // Nonaktifkan jika di langkah pertama atau langkah berikutnya
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
                                        <Typography sx={{ ml: 1, textTransform: 'none' }}>
                                            Jenis Kunjungan dan Keluhan
                                        </Typography>
                                    </Button>
                                </Box>

                            </Box>


                            <Box position="absolute" sx={{ top: 0, right: 0 }}>
                                <img src={bgImage} alt="bg-image" />
                            </Box>

                            {currentPage === 1 && (
                                <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>

                                    {patientFullPage && (
                                        <>

                                            <Typography>NIK (Nomor induk kependudukan) Pasien</Typography>
                                            <OutlinedInput
                                                sx={{
                                                    borderRadius: '8px',
                                                    height: '48px',
                                                    '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#8F85F3',
                                                    },
                                                    backgroundColor: formik.touched.nikCari && formik.errors.nikCari ? '#ffcccc' : 'inherit',
                                                }}
                                                placeholder='Masukkan NIK ktp'
                                                value={formik.values.nikCari}
                                                onChange={formik.handleChange}
                                                name="nikCari"
                                                onBlur={formik.handleBlur}
                                            />
                                            <Button
                                                type="button"
                                                // onClick={() => patientPage ? setPatientPage(true) : setCurrentPage(2)}
                                                onClick={() => findPatientByNik(formik.values.nikCari)}
                                                variant="contained"
                                                color="inherit"
                                                sx={{
                                                    mt: 4,
                                                    width: "100%",
                                                    bgcolor: "#8F85F3",
                                                    color: "#fff",
                                                    textTransform: "none",
                                                    borderRadius: "8px",
                                                    ":hover": { bgcolor: "#a098f5" },
                                                }}
                                                disabled={!isCurrentPageValid()}
                                            >
                                                Selanjutnya
                                            </Button>
                                        </>
                                    )}

                                    {!patientFullPage && (<>
                                        <Formik
                                            initialValues={{
                                                nik: NIK,
                                                email: "",
                                                phone: patientData.phone,
                                                fullname: patientData.name,
                                                gender: patientData.gender,
                                                address: patientData.address,
                                                birthPlace: patientData.birthPlace,
                                                birthDate: patientData.birthDate,
                                            }}
                                            enableReinitialize
                                            validationSchema={validationSchema}
                                            onSubmit={async (values) => {
                                                console.log(values);

                                                const dataRegis = {
                                                    address: patientData?.address,
                                                    nik: values.nik,
                                                    email: values.email,
                                                    phone: patientData?.phone,
                                                    gender: patientData?.gender,
                                                    name: patientData?.name,
                                                    birthDate: birth,
                                                    birthPlace: patientData?.birthPlace,
                                                };
                                                setPatientData(dataRegis);
                                                console.log(patientData);
                                                changePage2();
                                            }}
                                        >
                                            {({ errors, touched, handleChange, handleBlur, values, isValid, dirty, setFieldValue }) => (
                                                <Form>
                                                    <Box>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                border: "1px solid #c5a8ff",
                                                                borderRadius: "8px",
                                                                backgroundColor: "#f5f0ff",
                                                                padding: "8px 16px",
                                                                color: "#7b49c4",
                                                                fontSize: "14px",
                                                                fontWeight: 500,
                                                                marginBottom: "16px",
                                                            }}
                                                        >
                                                            <InfoOutlinedIcon sx={{ marginRight: "8px" }} />
                                                            <Typography>
                                                                Harap periksa kembali data diri Anda, jika ada data yang tidak sesuai anda dapat merubahnya di Admin.
                                                            </Typography>
                                                        </Box>

                                                        <Box height={"fit-content"} width={"100%"} borderRadius={"16px"} display="flex" flexDirection="column" justifyContent="center">
                                                            <Box display={"flex"} flexDirection="column" alignItems="flex-start" gap={"5px"} width={'99%'}>
                                                                <Typography>NIK (Nomor induk kependudukan) Pasien</Typography>
                                                                <FormControl fullWidth error={touched.nik && Boolean(errors.nik)}>
                                                                    <OutlinedInput
                                                                        name="nik"
                                                                        placeholder="Masukkan NIK (Nomor induk kependudukan)"
                                                                        sx={{
                                                                            marginTop: '10px',
                                                                            '& .MuiOutlinedInput-root': {
                                                                                borderRadius: '8px',
                                                                                backgroundColor: touched.nik && errors.nik ? '#ffcccc' : 'inherit',
                                                                                '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                                    borderColor: '#8F85F3',
                                                                                },
                                                                            },
                                                                        }}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.nik}
                                                                    />
                                                                    {touched.nik && errors.nik && (
                                                                        <FormHelperText>{errors.nik}</FormHelperText>
                                                                    )}
                                                                </FormControl>

                                                                <Typography>Email</Typography>
                                                                <FormControl fullWidth error={touched.email && Boolean(errors.email)}>
                                                                    <OutlinedInput
                                                                        name="email"
                                                                        value={values.email}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        sx={{
                                                                            marginTop: '10px',
                                                                            '& .MuiOutlinedInput-root': {
                                                                                borderRadius: '8px',
                                                                                backgroundColor: touched.email && errors.email ? '#ffcccc' : 'inherit',
                                                                                '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                                    borderColor: '#8F85F3',
                                                                                },
                                                                            },
                                                                        }}
                                                                    />
                                                                    {touched.email && errors.email && (
                                                                        <FormHelperText error>{errors.email}</FormHelperText>
                                                                    )}
                                                                </FormControl>

                                                                <Typography>Nama lengkap pasien <span style={{ color: "red" }}>*</span></Typography>
                                                                <FormControl fullWidth>
                                                                    <OutlinedInput
                                                                        sx={{
                                                                            borderRadius: '8px',
                                                                            bgcolor: '#E8E8E8',
                                                                            '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                                borderColor: '#8F85F3',
                                                                            },
                                                                        }}
                                                                        name="fullname"
                                                                        value={patientData.name}
                                                                        disabled
                                                                    />
                                                                </FormControl>

                                                                <Box display={'flex'} justifyContent={'space-between'} sx={{ overflow: 'hidden', height: '75px', width: '100%' }}>
                                                                    <FormControl sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '49%' }}>
                                                                        <FormLabel>Tempat Lahir <span style={{ color: "red" }}>*</span></FormLabel>
                                                                        <OutlinedInput
                                                                            name="birthPlace"
                                                                            placeholder="Tempat Lahir"
                                                                            fullWidth
                                                                            sx={{
                                                                                borderRadius: '8px',
                                                                                height: '44px',
                                                                                bgcolor: '#E8E8E8',
                                                                                '& .MuiOutlinedInput-root': {
                                                                                    borderRadius: '8px',
                                                                                    backgroundColor: touched.birthPlace && errors.birthPlace ? "#ffcccc" : 'inherit',
                                                                                    '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                                        borderColor: '#8F85F3',
                                                                                    },
                                                                                },
                                                                            }}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={patientData?.birthPlace}
                                                                            error={touched.birthPlace && Boolean(errors.birthPlace)}
                                                                            disabled
                                                                        />
                                                                    </FormControl>

                                                                    < FormControl sx={{ width: '49%', overflow: 'hidden', height: '100%' }}>
                                                                        <FormLabel>Tanggal Lahir <span style={{ color: "red" }}>*</span></FormLabel>
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                            <Box sx={{ overflow: 'hidden' }}>
                                                                                <DemoContainer components={['DatePicker']}>
                                                                                    <DatePicker
                                                                                        value={dayjs(birth, "MM-DD-YYYY")}
                                                                                        onChange={(newValue) => {
                                                                                            if (newValue) {
                                                                                                const formattedDate = newValue.format("MM-DD-YYYY");
                                                                                                setFieldValue("birthDate", formattedDate);
                                                                                            }
                                                                                        }}
                                                                                        slotProps={{
                                                                                            textField: {
                                                                                                placeholder: "Tanggal Lahir",
                                                                                                sx: {
                                                                                                    borderRadius: '8px',
                                                                                                    height: '60px',
                                                                                                    width: '100%',
                                                                                                    bgcolor: '#E8E8E8',
                                                                                                    '& .MuiOutlinedInput-root': {
                                                                                                        borderRadius: '8px',
                                                                                                        height: '44px',
                                                                                                    },
                                                                                                },
                                                                                            },
                                                                                        }}
                                                                                        disabled
                                                                                    />
                                                                                </DemoContainer>
                                                                            </Box>
                                                                        </LocalizationProvider>
                                                                    </FormControl>
                                                                </Box>

                                                                <Typography>No Handphone pasien <span style={{ color: "red" }}>*</span></Typography>
                                                                <FormControl fullWidth>
                                                                    <PhoneInput
                                                                        country={"id"}
                                                                        value={patientData?.phone}
                                                                        onChange={(values) => setFieldValue("phone", values)}
                                                                        inputStyle={{
                                                                            height: "48px",
                                                                            borderRadius: "8px",
                                                                            border: "1px solid #ccc",
                                                                            padding: "10px 40px 10px 60px",
                                                                            fontSize: "16px",
                                                                            width: "100%",
                                                                            backgroundColor: '#E8E8E8',
                                                                        }}
                                                                        buttonStyle={{
                                                                            borderRadius: "8px 0 0 8px",
                                                                            border: "1px solid #ccc",
                                                                        }}
                                                                        containerStyle={{
                                                                            marginBottom: "10px",
                                                                            width: "100%",
                                                                        }}
                                                                        disabled
                                                                    />
                                                                </FormControl>

                                                                <Typography sx={{ fontWeight: 400, fontSize: '16px', mt: '10px' }}>
                                                                    Jenis kelamin Pasien{" "}
                                                                    <span style={{ color: "#d32f2f" }}>*</span>{" "}
                                                                </Typography>
                                                                <Box display={'flex'} flexDirection={'row'} padding={1} border={"1px solid #A8A8BD"} borderRadius={"12px"} pl={3} width={'96%'}>
                                                                    <FormControl component="fieldset" error={touched.gender && Boolean(errors.gender)} disabled>
                                                                        <RadioGroup
                                                                            aria-labelledby="gender-label"
                                                                            name="gender"
                                                                            value={patientData.gender}
                                                                            onChange={(e) => setFieldValue("gender", e.target.value)}
                                                                            row
                                                                        >
                                                                            <FormControlLabel value="MEN" control={<BpRadio />} label="Pria" />
                                                                            <FormControlLabel value="WOMEN" control={<BpRadio />} label="Wanita" />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Box>

                                                                <Typography sx={{ fontWeight: 400, fontSize: '16px', mt: '10px' }}>
                                                                    Alamat tempat tinggal Pasien<span style={{ color: "red" }}>*</span>
                                                                </Typography>
                                                                <FormControl fullWidth>
                                                                    <Field
                                                                        name="address"
                                                                        as={TextField}
                                                                        placeholder="Masukkan tempat tinggal penanggung jawab"
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        size="medium"
                                                                        sx={{
                                                                            marginTop: '10px',
                                                                            marginBottom: '8px',
                                                                            alignItems: 'flex-start',
                                                                            bgcolor: '#E8E8E8',
                                                                            '& .MuiOutlinedInput-root': {
                                                                                borderRadius: '8px',
                                                                                '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                                    borderColor: '#8F85F3',
                                                                                },
                                                                            },
                                                                        }}
                                                                        value={patientData.address}
                                                                        multiline
                                                                        minRows={2}
                                                                        disabled
                                                                    />
                                                                </FormControl>

                                                                <Box
                                                                    sx={{
                                                                        padding: '8px 24px 8px 24px',
                                                                        borderRadius: '12px',
                                                                        border: '1px solid #A8A8BD',
                                                                        mt: '1%',
                                                                        width: '95%',
                                                                    }}
                                                                >
                                                                    <FormControlLabel
                                                                        sx={{ color: '#747487', fontWeight: 400, fontSize: '16px' }}
                                                                        control={
                                                                            <Checkbox
                                                                                sx={{
                                                                                    color: '#A8A8BD',
                                                                                    borderRadius: '4px',
                                                                                    '&.Mui-checked': {
                                                                                        color: '#7367F0',
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
                                                                    color="inherit"
                                                                    sx={{
                                                                        mt: 6,
                                                                        width: "100%",
                                                                        bgcolor: "#8F85F3",
                                                                        color: "#fff",
                                                                        textTransform: "none",
                                                                        borderRadius: "8px",
                                                                        ":hover": { bgcolor: "#a098f5" },
                                                                    }}
                                                                    disabled={!(isValid && dirty)}
                                                                >
                                                                    Selanjutnya
                                                                </Button>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Form>
                                            )}
                                        </Formik>



                                    </>
                                    )}
                                </Box>
                            )}


                            {/* Start */}
                            {currentPage === 2 && needAdmin === false && (
                                <Box mt={3}>
                                    <Box sx={{ display: "flex" }}>
                                        <Box sx={{ width: '100%', justifyContent: "ce" }}>
                                            <Box>
                                                <Formik
                                                    initialValues={{
                                                        phone: patientData.phone,
                                                        fullname: patientData.name,
                                                        gender: patientData.gender,
                                                        address: patientData.address,
                                                        birthPlace: patientData.birthPlace,
                                                        jenisKunjungan: '',
                                                        doctor: '',
                                                        complaint: '',
                                                        email: patientData.email, // Add email to initial values
                                                        nik: NIK,
                                                    }}
                                                    enableReinitialize
                                                    validationSchema={validationSchema1}
                                                    onSubmit={async (values) => {
                                                        const dataRegis = {
                                                            namaKlinik: '',
                                                            address: patientData?.address,
                                                            nik: patientData.id,
                                                            email: patientData?.email,
                                                            phone: patientData?.phone,
                                                            gender: patientData?.gender,
                                                            fullname: patientData?.name,
                                                            birthDatePatient: patientData?.birthDate,
                                                            birthPlacePatient: patientData?.birthPlace,
                                                            docs: '',
                                                            asuranceDocs: '',
                                                            jenisKunjungan: values.jenisKunjungan,
                                                            poli: '',
                                                            doctor: values.doctor,
                                                            keluhan: values.complaint,
                                                            riwayatPenyakit: '',
                                                            alergi: '',
                                                        }
                                                        // handle form submission with dataRegis
                                                    }}
                                                >
                                                    {({ errors, touched, handleChange, handleBlur, values,
                                                        isValid,
                                                        dirty, setFieldValue }) => (
                                                        <Form>
                                                            <Box sx={{ paddingBottom: '16px', gap: "24px", justifyContent: "center", display: 'flex', flexDirection: 'column' }}>
                                                                <Box sx={{ display: "flex", flexDirection: "column", }}>
                                                                    <FormControl>
                                                                        {/* Contact Info Section */}
                                                                        <Box
                                                                            sx={{
                                                                                display: "flex",
                                                                                flexDirection: "column",
                                                                                width: { sm: "91%", md: "93%", lg: "100%" },
                                                                                maxWidth: "1040px",

                                                                                marginBottom: '24px',
                                                                                padding: 4,
                                                                                border: "1px solid #ddd",
                                                                                borderRadius: "16px",
                                                                                backgroundColor: "#fff",
                                                                            }}>
                                                                            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
                                                                                Kontak Info
                                                                            </Typography>
                                                                            <Typography>No Handphone pasien <span style={{ color: "red" }}>*</span></Typography>
                                                                            <FormControl>
                                                                                <PhoneInput
                                                                                    country={"id"}
                                                                                    value={values.phone}
                                                                                    onChange={(value) => setFieldValue("phone", value)}
                                                                                    onBlur={handleBlur}
                                                                                    inputStyle={{
                                                                                        height: "48px",
                                                                                        borderRadius: "8px",
                                                                                        border: touched.phone && errors.phone ? '1px solid #ffcccc' : '1px solid #ccc',
                                                                                        padding: "10px 40px 10px 60px",
                                                                                        fontSize: "16px",
                                                                                        width: "100%",
                                                                                        backgroundColor: 'white',
                                                                                        outline: touched.phone && errors.phone ? 'none' : 'inherit',
                                                                                    }}
                                                                                    buttonStyle={{
                                                                                        borderRadius: "8px 0 0 8px",
                                                                                        border: '1px solid #ccc',
                                                                                    }}
                                                                                    containerStyle={{
                                                                                        marginBottom: "10px",
                                                                                        width: "100%",
                                                                                        display: 'flex',
                                                                                        alignItems: 'center',
                                                                                        borderRadius: '8px',
                                                                                        border: touched.phone && errors.phone ? '1px solid #ffcccc' : '1px solid #ccc',
                                                                                        transition: 'border-color 0.3s',
                                                                                        '&:focus-within': {
                                                                                            borderColor: '#8F85F3',
                                                                                        },
                                                                                    }}
                                                                                />
                                                                                {touched.phone && errors.phone && (
                                                                                    <FormHelperText error>{errors.phone}</FormHelperText>
                                                                                )}
                                                                            </FormControl>
                                                                            <Typography>Email</Typography>
                                                                            <FormControl>
                                                                                <OutlinedInput
                                                                                    sx={{
                                                                                        width: '100%',
                                                                                        height: 'auto',
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
                                                                                    name="email"
                                                                                    value={values.email}
                                                                                    error={touched.email && Boolean(errors.email)}
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                />
                                                                                {touched.email && errors.email && (
                                                                                    <FormHelperText error>{errors.email}</FormHelperText>
                                                                                )}
                                                                            </FormControl>
                                                                        </Box>

                                                                        {/* Patient Complaint Section */}
                                                                        <Box>
                                                                            <Box sx={{
                                                                                display: "flex",
                                                                                flexDirection: "column",
                                                                                width: { sm: "91%", md: "93%", lg: "100%" },
                                                                                maxWidth: "1040px",

                                                                                padding: 4,
                                                                                border: "1px solid #ddd",
                                                                                borderRadius: "16px",
                                                                                backgroundColor: "#fff",
                                                                            }}>
                                                                                <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
                                                                                    Keluhan Pasien
                                                                                </Typography>
                                                                                <Typography>Jenis Kunjungan</Typography>
                                                                                <FormControl sx={{ marginBottom: '10px' }}>
                                                                                    <TextField
                                                                                        variant="outlined"
                                                                                        sx={{
                                                                                            width: '100%',
                                                                                            height: 'auto',
                                                                                            marginTop: '10px',
                                                                                            '& .MuiOutlinedInput-root': {
                                                                                                borderRadius: '8px',
                                                                                                backgroundColor: touched.jenisKunjungan && errors.jenisKunjungan ? '#ffcccc' : 'inherit',
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
                                                                                        name="jenisKunjungan"
                                                                                        value={values.jenisKunjungan}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                    />
                                                                                    {touched.jenisKunjungan && errors.jenisKunjungan && (
                                                                                        <FormHelperText error>{errors.jenisKunjungan}</FormHelperText>
                                                                                    )}
                                                                                </FormControl>


                                                                                <Typography>Poli yang dituju</Typography>
                                                                                <DropdownListAPI
                                                                                    options={clinicOptions.map(({ id, name }) => ({ value: id, label: name }))}
                                                                                    placeholder="Pilih Klinik yang dituju"
                                                                                    onChange={handleDropdownPoli}
                                                                                    loading={false}
                                                                                />

                                                                                <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"} sx={{ width: "100%" }}>
                                                                                    <FormControl sx={{ mt: 2, mb: 2, width: "100%" }} size="small">
                                                                                        <Typography>Dokter yang bertugas</Typography>
                                                                                        <DropdownListAPI
                                                                                            placeholder="Pilih dokter"
                                                                                            options={doctorOptions.map(({ id, name }) => ({ value: id, label: name }))}
                                                                                            onChange={handleDropdownDocter}
                                                                                            loading={false}

                                                                                        />
                                                                                        <Typography color="error">
                                                                                            {touched.doctor && errors.doctor}
                                                                                        </Typography>
                                                                                    </FormControl>
                                                                                    <Box sx={{ ml: 2, width: "100%" }}>
                                                                                        <Typography>Tanggal dan Jam Operasional</Typography>
                                                                                        <CustomCalender key={calendarKey} doctorId={idDoctor} onChange={handleScheduleChange} />
                                                                                    </Box>

                                                                                </Box>
                                                                                <Typography>Keluhan Pasien</Typography>
                                                                                <FormControl sx={{ marginBottom: '10px' }}>
                                                                                    <TextField

                                                                                        value={values.complaint}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        name="complaint"
                                                                                        placeholder="Masukkan keluhan pasien"
                                                                                        fullWidth
                                                                                        required
                                                                                        multiline
                                                                                        rows={3}
                                                                                        variant="outlined"
                                                                                        sx={{
                                                                                            width: '100%',
                                                                                            height: 'auto',
                                                                                            marginTop: '10px',
                                                                                            '& .MuiOutlinedInput-root': {
                                                                                                borderRadius: '8px',
                                                                                                backgroundColor: touched.complaint && errors.complaint ? '#ffcccc' : 'inherit',
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
                                                                                    />
                                                                                    {touched.complaint && errors.complaint && (
                                                                                        <FormHelperText error>{errors.complaint}</FormHelperText>
                                                                                    )}
                                                                                </FormControl>
                                                                                <Typography>Unggah surat rujukan</Typography>
                                                                                <Box display="flex" alignItems="center" border="1px solid #ccc" borderRadius="6px" overflow="hidden" height={50}>
                                                                                    {/* Tombol Unggah */}
                                                                                    <Button
                                                                                        variant="contained"
                                                                                        component="label"
                                                                                        sx={{
                                                                                            backgroundColor: "#8F85F3",
                                                                                            color: "white",
                                                                                            borderRadius: 0,
                                                                                            padding: "40px",
                                                                                            textTransform: "none",
                                                                                            fontSize: "14px",
                                                                                            fontWeight: 500,
                                                                                            "&:hover": { backgroundColor: "#836FD1" },
                                                                                        }}
                                                                                        startIcon={<UploadFileIcon />}
                                                                                    >
                                                                                        Unggah Berkas
                                                                                        <input
                                                                                            hidden
                                                                                            type="file"
                                                                                            onChange={handleFileChange}
                                                                                        />
                                                                                    </Button>

                                                                                    {/* Kolom Input */}
                                                                                    <TextField
                                                                                        value={fileName}
                                                                                        placeholder="Pilih berkas"
                                                                                        variant="outlined"
                                                                                        InputProps={{
                                                                                            readOnly: true,
                                                                                            style: {
                                                                                                borderRadius: 0,
                                                                                                fontSize: "14px",
                                                                                                padding: "10px",
                                                                                            },
                                                                                        }}
                                                                                        sx={{
                                                                                            flex: 1,
                                                                                            "& .MuiOutlinedInput-root": {
                                                                                                border: "none",
                                                                                                "& fieldset": { border: "none" },
                                                                                            },
                                                                                        }}
                                                                                    />
                                                                                </Box>
                                                                            </Box>
                                                                        </Box>
                                                                    </FormControl >

                                                                </Box >


                                                                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                                                                    <Button
                                                                        variant="contained"
                                                                        color="inherit"
                                                                        onClick={createTicket}
                                                                        sx={{
                                                                            backgroundColor: "#8F85F3",
                                                                            color: "white",
                                                                            textTransform: "none",
                                                                            width: "100%",
                                                                            padding: "10px 24px",
                                                                            borderRadius: "8px",
                                                                            "&:hover": {
                                                                                backgroundColor: "#7C75E2",
                                                                            },
                                                                        }}
                                                                    // disabled={!isValid || !dirty}
                                                                    >
                                                                        {isLoading ? (
                                                                            <CircularProgress sx={{ color: 'white' }} size={20} />
                                                                        ) : (
                                                                            "Simpan"
                                                                        )}
                                                                    </Button>
                                                                </Box>
                                                            </Box >
                                                        </Form >
                                                    )}
                                                </Formik >
                                            </Box >
                                        </Box >
                                    </Box >
                                </Box >
                            )}

                            {/* end */}
                        </Box >
                    )}
                    {
                        needAdmin && !mainPages && (
                            <Box marginLeft={"20%"} marginTop={"10%"} zIndex={1500} >
                                <CardAntrianCounter
                                    nomorAntrian={dataTickets?.nomorAntrian || "Unknown"}
                                    onClose={() => setNeedAdmin(false)}
                                />
                            </Box>
                        )
                    }

                    {
                        !mainPages && !needAdmin && (
                            <Box marginLeft={"20%"} marginTop={"10%"} zIndex={1500}>

                                <InformasiTicketAPI
                                    clinic={dataTickets?.clinic || "Unknown Clinic"}
                                    jadwalKonsul={dataTickets?.jadwalKonsul || "Unknown Date"}
                                    namaDokter={dataTickets?.namaDokter || "Unknow Doctor"}
                                    // nomorAntrian={dataTickets?.nomorAntrian || "Unknown"}
                                    tanggalReservasi={dataTickets?.tanggalReservasi || "Unknown Date"}
                                    bookingCode=""
                                />
                            </Box>
                        )
                    }
                </Box >
            </Container >
        </Box >
    );
}
