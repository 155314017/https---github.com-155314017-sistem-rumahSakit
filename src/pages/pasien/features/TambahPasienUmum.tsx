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
    FormHelperText,
    Checkbox,
} from "@mui/material";
import FileUploader from '../../../components/medium/FileUploader';
import PhoneInput from 'react-phone-input-2';
import useTambahPasienUmum from '../hooks/useTambahPasienUmum';
import DropdownListAPI from "../../../components/small/dropdownlist/DropdownListAPI";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import InformasiTicketAPI from "../../../components/small/InformasiTicketAPI";
import dayjs from "dayjs";
import AlertWarning from "../../../components/small/alert/AlertWarning";
import { Field, Formik, Form } from "formik";
import CustomTimePicker from "../../../components/medium/CustomTimePicker";
import CardAntrianCounter from "../../../components/small/card/CardAntrianCounter";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";

export default function TambahPasienUmum() {
    const {
        validationSchema,
        currentPage,
        setCurrentPage,
        getPageStyle,
        getBorderStyle,
        mainPages,
        patientFullPage,
        handleScheduleChange,
        doctorOptions,
        idDoctor,
        handleDropdownDocter,
        findPatientByNik,
        patientData,
        BpRadio,
        changePage2,
        clinicOptions,
        handleDropdownPoli,
        dataTickets,
        showAlert,
        breadcrumbItems,
        formik,
        setNeedAdmin,
        needAdmin,
        NIK,
        birth,
        setPatientData,
        validationSchema1,
        navigate,
        idClinic,
        registrationPatient,
        selectedScheduleId,
        selectedSchedule,
        clinicName,
        docterName,
        tanggalReserve,
        registrationCode,
        queueNumber,
        queueData,
        pasienBaru,
        handleCreateUser

    } = useTambahPasienUmum();




    return (
        

            <Container  sx={{ py: 2 }}>
                <BreadCrumbs
                        breadcrumbItems={breadcrumbItems}
                        onBackClick={() => window.history.back()}
                    />
                
                        
        

                    {showAlert && <AlertWarning teks="Terjadi kesalahan. Silahkan coba lagi." />}


                <Box mt={7}>


                    {mainPages && (
                        <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden", height: 'fit-content' }}>
                            <Box marginBottom={0} padding={'24px'} gap={"10px"} width={'100%'}>
                                <Typography fontWeight={600} fontSize={'20px'} lineHeight={'22px'} fontFamily={'roboto'} marginBottom={1}>
                                    Formulir pendaftaran pasien Umum
                                </Typography>
                                <Typography fontWeight={400} fontSize={'16px'} lineHeight={'18px'} color="#A8A8BD" maxWidth={'95%'} fontFamily={'roboto'}>
                                    Pasien yang berobat di rumah sakit dengan membayar sendiri seluruh biaya perawatan dan pengobatan yang dibutuhkan.
                                </Typography>
                            </Box>

                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0, mb: 2, gap: 8 }} width={"100%"}>
                                <Box display={"flex"} flexDirection={"row"} >

                                    <Button
                                        onClick={() => setCurrentPage(1)}
                                        // disabled={currentPage > 1} 
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
                                        <Typography sx={{ ml: 1, textTransform: 'none', fontSize: '14px', fontWeight: 600, lineHeight: '16px', fontFamily: 'roboto' }}>Data diri pasien</Typography>
                                    </Button>
                                </Box>

                                <Box display={"flex"} flexDirection={"row"} width={"400px"}>
                                    <Button
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
                                        <Typography sx={{ ml: 1, textTransform: 'none', fontSize: '14px', fontWeight: 600, lineHeight: '16px' }}>
                                            Jenis Kunjungan dan Keluhan
                                        </Typography>
                                    </Button>
                                </Box>

                            </Box>


                            {/* <Box position="absolute" sx={{ top: 0, right: 0 }}>
                                <img src={bgImage} alt="bg-image" />
                            </Box> */}

                            {currentPage === 1 && (
                                <Box sx={{ display: "flex", flexDirection: "column", gap: "0", width: "100%" }}>

                                    {patientFullPage && (
                                        <>

                                            <Typography sx={{ fontSize: '16px', fontWeight: 400, lineHeight: '18px', fontFamily: 'roboto', mb: 2 }}>NIK (Nomor induk kependudukan) Pasien <span style={{ color: 'red' }}>*</span></Typography>
                                            <OutlinedInput
                                                sx={{
                                                    borderRadius: '8px',
                                                    height: '48px',
                                                    '& .MuiInputBase-root': {
                                                        height: '48px',
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        height: '15px',
                                                    },
                                                    '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#A8A8BD',
                                                        border: '3px solid #8F85F3',

                                                    },
                                                    backgroundColor: formik.touched.nikCari && formik.errors.nikCari ? '#ffcccc' : '#fff',

                                                }}
                                                placeholder='Masukkan NIK ktp'
                                                value={formik.values.nikCari}
                                                onChange={formik.handleChange}
                                                name="nikCari"
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.nikCari && formik.errors.nikCari && (
                                                <FormHelperText sx={{ color: 'red', mt: '1px' }}>{formik.errors.nikCari}</FormHelperText>
                                            )}
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
                                                disabled={!!(!formik.touched.nikCari && formik.errors.nikCari) || !formik.values.nikCari}
                                            >
                                                Selanjutnya
                                            </Button>
                                        </>
                                    )}

                                    {!patientFullPage && (<>
                                        <Formik
                                            initialValues={{
                                                nik: NIK || '',
                                                email: patientData?.email || '',
                                                phone: patientData?.phone || '',
                                                fullname: patientData?.fullname || '',
                                                gender: patientData?.gender || '',
                                                address: patientData?.address || '',
                                                birthPlace: patientData?.birthPlace || '',
                                                birthDate: patientData?.birthDate || '',
                                            }}
                                            enableReinitialize
                                            validationSchema={validationSchema}
                                            onSubmit={async (values) => {
                                                console.log(values);

                                                const dataRegis = {
                                                    id: patientData?.id,
                                                    address: values?.address,
                                                    nik: values?.nik,
                                                    email: values?.email,
                                                    phone: values?.phone,
                                                    gender: values?.gender,
                                                    fullname: values?.fullname,
                                                    birthDate: values.birthDate,
                                                    birthPlace: values?.birthPlace,
                                                };

                                                if(pasienBaru === true){
                                                    handleCreateUser(dataRegis);
                                                }

                                                
                                                setPatientData(dataRegis);
                                                console.log(patientData);
                                                changePage2();
                                            }}
                                        >
                                            {({ errors, touched, handleChange, handleBlur, values, setFieldValue }) => (
                                                <Form>
                                                    <Box>
                                                        <Typography sx={{ fontSize: "20px", fontWeight: 600, lineHeight: "22px", fontFamily: "roboto", marginBottom: "16px" }}>
                                                            Konfirmasi data diri pasien
                                                        </Typography>

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
                                                            <Typography sx={{ fontSize: "16px", fontWeight: 400, lineHeight: "18px", fontFamily: "roboto" }}>
                                                                Harap periksa kembali data diri Anda, jika ada data yang tidak sesuai anda dapat merubahnya di Admin.
                                                            </Typography>
                                                        </Box>

                                                        <Box height={"fit-content"} width={"100%"} borderRadius={"16px"} display="flex" flexDirection="column" justifyContent="center">
                                                            <Box display={"flex"} flexDirection="column" alignItems="flex-start" gap={"5px"} width={'99%'}>
                                                                <Typography sx={{ fontSize: "16px", fontWeight: 400, lineHeight: "18px", fontFamily: "roboto", marginTop: "10px" }}>NIK (Nomor induk kependudukan) Pasien <span style={{ color: "red" }}>*</span></Typography>
                                                                <FormControl fullWidth error={touched.nik && Boolean(errors.nik)}>
                                                                    <OutlinedInput
                                                                        name="nik"
                                                                        placeholder="Masukkan NIK (Nomor induk kependudukan)"
                                                                        sx={{
                                                                            bgcolor: pasienBaru ? '#FFFFFF' : '#E8E8E8',
                                                                            borderRadius: '8px',
                                                                            '& .MuiOutlinedInput-root': {
                                                                                borderRadius: '3px solid #8F85F3',
                                                                                backgroundColor: touched.nik && errors.nik ? '#ffcccc' : 'inherit',
                                                                                '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                                    borderColor: '3px solid #8F85F3',
                                                                                },
                                                                            },
                                                                            '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                                borderColor: '#A8A8BD',
                                                                                border: '3px solid #8F85F3',

                                                                            },
                                                                        }}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.nik}
                                                                        disabled={!pasienBaru}
                                                                    />
                                                                    {touched.nik && errors.nik && (
                                                                        <FormHelperText>{errors.nik}</FormHelperText>
                                                                    )}
                                                                </FormControl>

                                                                <Typography sx={{ fontSize: "16px", fontWeight: 400, lineHeight: "18px", fontFamily: "roboto", marginTop: "10px" }}>Email <span style={{ color: "red" }}>*</span></Typography>
                                                                <FormControl fullWidth error={touched.email && Boolean(errors.email)}>
                                                                    <OutlinedInput
                                                                        name="email"
                                                                        value={values.email}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        disabled={!pasienBaru}
                                                                        sx={{
                                                                            borderRadius: '8px',
                                                                            bgcolor: pasienBaru ? '#FFFFFF' : '#E8E8E8',
                                                                            
                                                                            '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                                borderColor: '#A8A8BD',
                                                                                border: '3px solid #8F85F3',

                                                    },
                                                                        }}
                                                                    />
                                                                    {/* {touched.email && errors.email && (
                                                                        <FormHelperText error>{errors.email}</FormHelperText>
                                                                    )} */}
                                                                </FormControl>

                                                                <Typography sx={{ fontSize: "16px", fontWeight: 400, lineHeight: "18px", fontFamily: "roboto", marginTop: "10px" }}>No Handphone pasien <span style={{ color: "red" }}>*</span></Typography>
                                                                <FormControl fullWidth>
                                                                    <PhoneInput
                                                                        country={"id"}
                                                                        value={patientData?.phone}
                                                                        onChange={(values) => setFieldValue("phone", values)}


                                                                        // sx={{
                                                                        //     width: '100%',
                                                                        //     height: 'auto',
                                                                        //     marginTop: '10px',
                                                                        //     '& .MuiOutlinedInput-root': {
                                                                        //         borderRadius: '8px',
                                                                        //         backgroundColor: touched.phone && errors.phone ? '#ffcccc' : 'inherit',
                                                                        //         '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                        //             borderColor: '#8F85F3',
                                                                        //         },
                                                                        //     },
                                                                        //     '& .MuiOutlinedInput-notchedOutline': {
                                                                        //         border: '1px solid #ccc',
                                                                        //     },
                                                                        //     '& .MuiOutlinedInput-input': {
                                                                        //         padding: '10px',
                                                                        //         fontSize: '16px',
                                                                        //     },
                                                                        // }}

                                                                        inputStyle={{
                                                                            height: "48px",
                                                                            borderRadius: "8px",
                                                                            border: "1px solid #ccc",
                                                                            padding: "10px 40px 10px 60px",
                                                                            backgroundColor: pasienBaru ? "#FFFFFF" : "#EEEEF2",
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
                                                                        
                                                                        disabled={!pasienBaru}
                                                                    />
                                                                </FormControl>

                                                                <Typography sx={{ fontSize: "16px", fontWeight: 400, lineHeight: "18px", fontFamily: "roboto" }}>Nama lengkap pasien <span style={{ color: "red" }}>*</span></Typography>
                                                                <FormControl fullWidth>
                                                                    <OutlinedInput
                                                                        sx={{
                                                                            borderRadius: '8px',
                                                                            bgcolor:pasienBaru ? '#FFFFFF' : '#E8E8E8',
                                                                            '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                                borderColor: '#8F85F3',
                                                                            },
                                                                        }}
                                                                        name="fullname"
                                                                        value={values.fullname || ""}
                                                                        onChange={handleChange}
                                                                        disabled={!pasienBaru}
                                                                    />
                                                                </FormControl>

                                                                <Box display={'flex'} justifyContent={'space-between'} sx={{ height: '75px', width: '100%', marginTop: "10px" }}>
                                                                    <FormControl sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '49%', height: '100%' }}>
                                                                        <FormLabel>Tempat Lahir <span style={{ color: "red" }}>*</span></FormLabel>
                                                                        <OutlinedInput
                                                                            name="birthPlace"
                                                                            placeholder="Tempat Lahir"
                                                                            fullWidth
                                                                            sx={{
                                                                                borderRadius: '8px',
                                                                                height: '75px',
                                                                                bgcolor: pasienBaru ? '#FFFFFF' : '#E8E8E8',
                                                                                '& .MuiOutlinedInput-root': {
                                                                                    borderRadius: '8px',
                                                                                    backgroundColor: touched.birthPlace && errors.birthPlace ? "#ffcccc" : 'inherit',
                                                                                },
                                                                                    '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                                        borderColor: '#A8A8BD',
                                                                                        border: '3px solid #8F85F3',
                                                                                },
                                                                            }}
                                                                            
                                                                            onBlur={handleBlur}
                                                                            value={values.birthPlace}
                                                                            onChange={handleChange}
                                                                            error={touched.birthPlace && Boolean(errors.birthPlace)}
                                                                            disabled={!pasienBaru}
                                                                        />
                                                                    </FormControl>

                                                                    < FormControl sx={{ width: '49%', height: '75px' }}>
                                                                        <FormLabel >Tanggal Lahir <span style={{ color: "red" }}>*</span></FormLabel>
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                            <Box sx={{ marginTop: "-9px" }}>
                                                                                <DemoContainer components={['DatePicker']}>
                                                                                    <DatePicker
                                                                                        value={values.birthDate ? dayjs(values.birthDate, "MM-DD-YYYY") : dayjs(birth, "MM-DD-YYYY")}
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
                                                                                                    height: '100%',
                                                                                                    width: '100%',
                                                                                                    bgcolor:pasienBaru ? '#FFFFFF' : '#E8E8E8',
                                                                                                    '& .MuiOutlinedInput-root': {
                                                                                                        borderRadius: '8px',
                                                                                                        height: '58px',
                                                                                                    },
                                                                                                },
                                                                                            },
                                                                                        }}
                                                                                        disabled={!pasienBaru}
                                                                                    />
                                                                                </DemoContainer>
                                                                            </Box>
                                                                        </LocalizationProvider>
                                                                    </FormControl>
                                                                </Box>



                                                                <Typography sx={{ fontSize: "16px", fontWeight: 400, lineHeight: "18px", fontFamily: "roboto", marginTop: "10px" }}>
                                                                    Jenis kelamin Pasien{" "}
                                                                    <span style={{ color: "#d32f2f" }}>*</span>{" "}
                                                                </Typography>
                                                                <Box display={'flex'} flexDirection={'row'} padding={1} border={"1px solid #A8A8BD"} borderRadius={"12px"} pl={3} width={'96%'}>
                                                                    <FormControl component="fieldset" error={touched.gender && Boolean(errors.gender)} disabled={!pasienBaru}>
                                                                        <RadioGroup
                                                                            aria-labelledby="gender-label"
                                                                            name="gender"
                                                                            value={patientData?.gender}
                                                                            onChange={(e) => setFieldValue("gender", e.target.value)}
                                                                            row
                                                                        >
                                                                            <FormControlLabel value="MALE" control={<BpRadio />} label="Pria" />
                                                                            <FormControlLabel value="FEMALE" control={<BpRadio />} label="Wanita" />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Box>

                                                                <Typography sx={{ fontSize: "16px", fontWeight: 400, lineHeight: "18px", fontFamily: "roboto", marginTop: "10px" }}>
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

                                                                            marginBottom: '8px',
                                                                            alignItems: 'flex-start',
                                                                            bgcolor: pasienBaru ? '#FFFFFF' : '#E8E8E8',
                                                                            '& .MuiOutlinedInput-root': {
                                                                                borderRadius: '8px',
                                                                                '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                                    borderColor: '#8F85F3',
                                                                                },
                                                                            },
                                                                        }}
                                                                        value={patientData?.address}
                                                                        multiline
                                                                        minRows={2}
                                                                        disabled={!pasienBaru}
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
                                                                // disabled={!(isValid && dirty)}
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
                            {currentPage === 2 && (
                                <Box >
                                    <Box sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Formik
                                            initialValues={{
                                                phone: patientData?.phone,
                                                fullname: patientData?.fullname,
                                                gender: patientData?.gender,
                                                address: patientData?.address,
                                                birthPlace: patientData?.birthPlace,
                                                jenisKunjungan: '',
                                                doctor: '',
                                                complaint: '',
                                                email: patientData?.email || '',
                                                nik: NIK,
                                            }}
                                            enableReinitialize
                                            validationSchema={validationSchema1}
                                            validateOnChange={true}
                                            validateOnBlur={true}
                                            onSubmit={async (values) => {
                                                const currentDate = dayjs().format('YYYY-MM-DD');
                                                // console.log('Form submitted:', patientData?.id);
                                                const dataRegis = {
                                                    patientId: patientData?.id,
                                                    clinicId: idClinic,
                                                    doctorId: idDoctor,
                                                    typeOfVisit: values.jenisKunjungan,
                                                    // scheduleDate: 1,
                                                    scheduleDate: currentDate,
                                                    scheduleIntervalId: selectedScheduleId,
                                                    symptoms: values.complaint,
                                                    referenceDoc: "",
                                                    offline: true,
                                                    phoneNumber: values.phone,
                                                    email: values.email,
                                                    needAdmin: needAdmin,
                                                }
                                                console.log('tes: ', dataRegis)
                                                registrationPatient(dataRegis);

                                            }}
                                        >
                                            {(
                                                {
                                                    errors,
                                                    touched,
                                                    handleChange,
                                                    handleBlur,
                                                    values,
                                                    isValid,
                                                    // dirty, 
                                                    setFieldValue
                                                }
                                            ) => (
                                                <Form>
                                                    <Box sx={{ width: '93%' }}>

                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                width: "100%",


                                                                marginBottom: '24px',
                                                                padding: 4,
                                                                border: "1px solid #ddd",
                                                                borderRadius: "16px",
                                                                backgroundColor: "#fff",
                                                            }}>
                                                            <Typography sx={{ fontWeight: 600, marginBottom: 2, fontSize: '16px', lineHeight: '18px', fontFamily: 'roboto' }}>
                                                                Kontak Info
                                                            </Typography>
                                                            <Typography sx={{ fontWeight: 400, fontSize: '16px', lineHeight: '18px', fontFamily: 'roboto', mb: 1 }} >No Handphone pasien <span style={{ color: "red" }}>*</span></Typography>
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
                                                                    }}
                                                                />
                                                                {/* {touched.phone && errors.phone && (
                                                                                    <FormHelperText error>{errors.phone}</FormHelperText>
                                                                                )} */}
                                                            </FormControl>
                                                            <Typography sx={{ fontWeight: 400, fontSize: '16px', lineHeight: '18px', fontFamily: 'roboto' }} >Email<span style={{ color: "red" }}>*</span></Typography>
                                                            <FormControl>
                                                                <TextField
                                                                    placeholder="Masukkan email"
                                                                    variant="outlined"
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
                                                                {/* {touched.email && errors.email && (
                                                                                    <FormHelperText error>{errors.email}</FormHelperText>
                                                                                )} */}
                                                            </FormControl>
                                                        </Box>

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
                                                                <Typography sx={{ fontWeight: 600, marginBottom: 2, fontSize: '16px', lineHeight: '18px', fontFamily: 'roboto' }}>
                                                                    Keluhan Pasien
                                                                </Typography>
                                                                <Typography sx={{ fontWeight: 400, fontSize: '16px', lineHeight: '18px' }} >Jenis Kunjungan<span style={{ color: "red" }}>*</span></Typography>
                                                                <FormControl sx={{ marginBottom: '10px' }}>
                                                                    <TextField
                                                                        placeholder="Masukkan jenis kunjungan"
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
                                                                    {/* {touched.jenisKunjungan && errors.jenisKunjungan && (
                                                                                        <FormHelperText error>{errors.jenisKunjungan}</FormHelperText>
                                                                                    )} */}
                                                                </FormControl>


                                                                <Typography sx={{ fontWeight: 400, fontSize: '16px', lineHeight: '18px', mt: 1, mb: 1, fontFamily: 'roboto' }} >Poli yang dituju<span style={{ color: "red" }}>*</span></Typography>
                                                                <DropdownListAPI
                                                                    options={clinicOptions.map(({ id, name }) => ({ value: id, label: name }))}
                                                                    placeholder="Pilih Klinik yang dituju"
                                                                    onChange={handleDropdownPoli}
                                                                    loading={false}
                                                                />

                                                                <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"} sx={{ width: "100%", height: "auto" }}>
                                                                    <FormControl sx={{ mt: 2, mb: 2, width: "100%" }} size="small">
                                                                        <Typography sx={{ fontWeight: 400, fontSize: '16px', lineHeight: '18px', mt: 1, mb: 1, fontFamily: 'roboto' }} >Dokter yang bertugas<span style={{ color: "red" }}>*</span></Typography>
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
                                                                        <Typography sx={{ fontWeight: 400, fontSize: '16px', lineHeight: '18px', mt: 1, mb: 1, fontFamily: 'roboto' }} >Tanggal dan Jam Operasional<span style={{ color: "red" }}>*</span></Typography>
                                                                        {/* <CustomCalender key={calendarKey} typeId={idDoctor} onChange={handleScheduleChange} /> */}
                                                                        <CustomTimePicker

                                                                            typeId={idDoctor}
                                                                            onChange={(scheduleId, schedule) => {
                                                                                const id = scheduleId;
                                                                                const jadwal = schedule;
                                                                                handleScheduleChange(id, jadwal);
                                                                                console.log(scheduleId, schedule);
                                                                            }}
                                                                        />

                                                                    </Box>

                                                                </Box>
                                                                <Typography sx={{ fontWeight: 400, fontSize: '16px', lineHeight: '18px', fontFamily: 'roboto' }} >Keluhan Pasien<span style={{ color: "red" }}>*</span></Typography>
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
                                                                    {/* {touched.complaint && errors.complaint && (
                                                                                        <FormHelperText error>{errors.complaint}</FormHelperText>
                                                                                    )} */}
                                                                </FormControl>

                                                                <Box mt={1}>
                                                                    <Box mt={2}>
                                                                        <Typography sx={{ fontWeight: 400, fontSize: '16px', lineHeight: '18px' }} >Unggah surat rujukan</Typography>

                                                                        <FileUploader
                                                                            onBase64Change={(base64String) => setFieldValue('referenceDoc', base64String)}
                                                                        />
                                                                        <Typography fontSize={"14px"} color="#A8A8BD">
                                                                            Ukuran maksimal 1mb
                                                                        </Typography>
                                                                    </Box>

                                                                </Box>
                                                            </Box>
                                                        </Box>





                                                        <Box sx={{ mt: 4, justifyContent: "center", width: "100%" }}>
                                                            <Button
                                                                type="submit"
                                                                variant="contained"
                                                                sx={{
                                                                    width: "107%",
                                                                    height: "44px",
                                                                    marginTop: "20px",
                                                                    backgroundColor: "#8F85F3",
                                                                    ":hover": { backgroundColor: "#D5D1FB" },
                                                                }}
                                                                disabled={!isValid || !idClinic || !idDoctor || !selectedScheduleId}
                                                            >
                                                                Selesai
                                                            </Button>
                                                        </Box>
                                                    </Box >
                                                </Form >
                                            )}
                                        </Formik >
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
                                    nomorAntrian={queueData?.queueNumber || queueNumber}
                                    tanggalReservasi={tanggalReserve}
                                    onClose={() => navigate("/offline/tambahPasien")}
                                />
                            </Box>
                        )
                    }

                    {
                        !mainPages && !needAdmin && (
                            <Box marginLeft={"20%"} marginTop={"10%"} zIndex={1500}>

                                <InformasiTicketAPI
                                    clinic={clinicName}
                                    jadwalKonsul={`${dayjs().format('DD')}/${dayjs().format('MMM')}/${dayjs().year()}, ${selectedSchedule}`}
                                    namaDokter={docterName}
                                    nomorAntrian={queueData?.queueNumber || queueNumber}
                                    tanggalReservasi={tanggalReserve}
                                    registrationId={registrationCode}
                                    patienDataSent={dataTickets}
                                    offline={true}
                                    onClose={() => navigate("/offline/tambahPasien")}
                                />
                            </Box>
                        )
                    }
                </Box >
            </Container >
    );
}
