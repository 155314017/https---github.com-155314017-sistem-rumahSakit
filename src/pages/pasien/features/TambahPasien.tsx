import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    OutlinedInput,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import PhoneInput from 'react-phone-input-2';
import bgImage from "../../../assets/img/String.png";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import CustomTimePicker from "../../../components/medium/CustomTimePicker";
import FileUploader from '../../../components/medium/FileUploader';
import AlertWarning from "../../../components/small/alert/AlertWarning";
import CardAntrianCounter from "../../../components/small/card/CardAntrianCounter";
import CustomFrameTable from "../../../components/small/CustomFrameTable";
import DropdownListAPI from "../../../components/small/dropdownlist/DropdownListAPI";
import InformasiTicketAPI from "../../../components/small/InformasiTicketAPI";
import useTambahPasien from "../hooks/useTambahPasien";

export default function TambahPasien() {
    const {
        validationSchema,
        currentPage,
        setCurrentPage,
        getPageStyle,
        getBorderStyle,
        mainPages,
        handleScheduleChange,
        doctorOptions,
        idDoctor,
        handleDropdownDocter,
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
    } = useTambahPasien();

    return (
        <Container sx={{ py: 2 }}>
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />

            {showAlert && <AlertWarning teks="Terjadi kesalahan. Silahkan coba lagi." />}

            <Box mt={3}>
                <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}>
                    <Box sx={{ mb: 3, px: 2 }}>
                        <Typography fontSize="20px" fontWeight="700">Tambah Pasien</Typography>
                    </Box>

                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="bg-image" />
                    </Box>

                    <CustomFrameTable />

                    <Box sx={{ px: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, mb: 2, gap: 8 }} width={"100%"}>
                            <Box display={"flex"} flexDirection={"row"} >
                                <Button
                                    onClick={() => setCurrentPage(1)}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
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

                        {currentPage === 1 && (
                            <Box component="form" noValidate autoComplete="off">
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

                                        if (pasienBaru === true) {
                                            handleCreateUser(dataRegis);
                                        }

                                        setPatientData(dataRegis);
                                        changePage2();
                                    }}
                                >
                                    {({ errors, touched, handleChange, handleBlur, values, setFieldValue }) => (
                                        <Form>
                                            <Box sx={{ mt: 3, width: '100%' }}>
                                                <Typography sx={{ fontSize: "16px", fontWeight: 400, lineHeight: "18px", fontFamily: "roboto", marginTop: "24px" }}>NIK (Nomor induk kependudukan) Pasien <span style={{ color: "red" }}>*</span></Typography>
                                                <FormControl fullWidth sx={{ mt: 1 }}>
                                                    <OutlinedInput
                                                        sx={{
                                                            borderRadius: '8px',
                                                            bgcolor: '#FFFFFF',
                                                            height: '48px',
                                                            '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#8F85F3',
                                                            },
                                                        }}
                                                        name="nik"
                                                        value={values.nik || ""}
                                                        onChange={handleChange}
                                                        placeholder="Masukkan NIK"
                                                    />
                                                </FormControl>

                                                <FormControl fullWidth sx={{ mt: 3 }}>
                                                    <Typography sx={{ fontSize: "16px", mb: 1 }}>No Handphone pasien <span style={{ color: "red" }}>*</span></Typography>
                                                    <PhoneInput
                                                        country={"id"}
                                                        value={values.phone}
                                                        onChange={(value) => setFieldValue("phone", value)}
                                                        inputStyle={{
                                                            height: "48px",
                                                            borderRadius: "8px",
                                                            border: touched.phone && errors.phone ? '1px solid #ffcccc' : '1px solid #ccc',
                                                            padding: "10px 40px 10px 60px",
                                                            fontSize: "16px",
                                                            width: "100%",
                                                            backgroundColor: '#FFFFFF'
                                                        }}
                                                        buttonStyle={{
                                                            borderRadius: "8px 0 0 8px",
                                                            border: '1px solid #ccc',
                                                        }}
                                                        containerStyle={{
                                                            marginBottom: "10px",
                                                            width: "100%",
                                                        }}
                                                    />
                                                </FormControl>

                                                <FormControl fullWidth sx={{ mt: 3 }}>
                                                    <Typography sx={{ fontSize: "16px", mb: 1 }}>Email <span style={{ color: "red" }}>*</span></Typography>
                                                    <TextField
                                                        variant="outlined"
                                                        name="email"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Masukkan email"
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                borderRadius: '8px',
                                                                height: '48px',
                                                                backgroundColor: touched.email && errors.email ? '#ffcccc' : '#FFFFFF',
                                                                '&:focus-within': {
                                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                                        borderColor: '#8F85F3',
                                                                    },
                                                                },
                                                            }
                                                        }}
                                                    />
                                                </FormControl>

                                                <Typography sx={{ fontSize: "16px", fontWeight: 400, lineHeight: "18px", fontFamily: "roboto", mt: 3, mb: 1 }}>Nama lengkap pasien <span style={{ color: "red" }}>*</span></Typography>
                                                <FormControl fullWidth>
                                                    <OutlinedInput
                                                        sx={{
                                                            borderRadius: '8px',
                                                            bgcolor: '#FFFFFF',
                                                            height: '48px',
                                                            '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#8F85F3',
                                                            },
                                                        }}
                                                        name="fullname"
                                                        value={values.fullname || ""}
                                                        onChange={handleChange}
                                                        placeholder="Masukkan nama lengkap"
                                                    />
                                                </FormControl>

                                                <Box display={'flex'} justifyContent={'space-between'} sx={{ width: '100%', mt: 3 }}>
                                                    <FormControl sx={{ display: 'flex', flexDirection: 'column', width: '49%' }}>
                                                        <FormLabel sx={{ mb: 2, color: '#000000', fontSize: '16px', fontWeight: 400, lineHeight: '18px', fontFamily: 'roboto' }}>Tempat Lahir <span style={{ color: "red" }}>*</span></FormLabel>
                                                        <OutlinedInput
                                                            name="birthPlace"
                                                            placeholder="Tempat Lahir"
                                                            fullWidth
                                                            sx={{
                                                                borderRadius: '8px',
                                                                height: '56px',
                                                                bgcolor: '#FFFFFF',
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
                                                        />
                                                    </FormControl>

                                                    <FormControl sx={{ display: 'flex', flexDirection: 'column', width: '49%' }}>
                                                        <FormLabel sx={{ mb: 1, color: '#000000', fontSize: '16px', fontWeight: 400, lineHeight: '18px', fontFamily: 'roboto' }}>Tanggal Lahir <span style={{ color: "red" }}>*</span></FormLabel>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DemoContainer
                                                                components={['DatePicker']}
                                                                sx={{
                                                                    '& .MuiStack-root': {
                                                                        padding: 0,
                                                                    },
                                                                }}
                                                            >
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
                                                                                width: '100%',
                                                                                '& .MuiInputBase-root': {
                                                                                    height: '56px',
                                                                                    borderRadius: '8px',
                                                                                    backgroundColor: '#FFFFFF',
                                                                                },
                                                                                '& .MuiOutlinedInput-notchedOutline': {
                                                                                    borderColor: '#A8A8BD',
                                                                                },
                                                                                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                                    borderColor: '#8F85F3 !important',
                                                                                },
                                                                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                                                    borderColor: '#A8A8BD',
                                                                                },
                                                                                '& .Mui-error .MuiOutlinedInput-notchedOutline': {
                                                                                    borderColor: '#A8A8BD !important',
                                                                                }
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                            </DemoContainer>
                                                        </LocalizationProvider>
                                                    </FormControl>
                                                </Box>

                                                <Typography sx={{ fontSize: "16px", fontWeight: 400, lineHeight: "18px", fontFamily: "roboto", mt: 3, mb: 1 }}>
                                                    Jenis kelamin Pasien <span style={{ color: "#d32f2f" }}>*</span>
                                                </Typography>
                                                <Box display={'flex'} flexDirection={'row'} sx={{ 
                                                    border: "1px solid #A8A8BD",
                                                    borderRadius: "12px",
                                                    width: '100%',
                                                }}>
                                                    <FormControl component="fieldset" error={touched.gender && Boolean(errors.gender)} sx={{paddingX: 2, paddingY: 1}}>
                                                        <RadioGroup
                                                            aria-labelledby="gender-label"
                                                            name="gender"
                                                            value={values.gender}
                                                            onChange={(e) => setFieldValue("gender", e.target.value)}
                                                            row
                                                            sx={{
                                                                '& .MuiFormControlLabel-root': {
                                                                    mr: 4
                                                                }
                                                            }}
                                                        >
                                                            <FormControlLabel value="MALE" control={<BpRadio />} label="Pria" />
                                                            <FormControlLabel value="FEMALE" control={<BpRadio />} label="Wanita" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Box>

                                                <Typography sx={{ fontSize: "16px", fontWeight: 400, lineHeight: "18px", fontFamily: "roboto", mt: 3, mb: 1 }}>
                                                    Alamat tempat tinggal Pasien<span style={{ color: "red" }}>*</span>
                                                </Typography>
                                                <FormControl fullWidth>
                                                    <Field
                                                        name="address"
                                                        as={TextField}
                                                        placeholder="Masukkan alamat tempat tinggal"
                                                        variant="outlined"
                                                        fullWidth
                                                        size="medium"
                                                        sx={{
                                                            alignItems: 'flex-start',
                                                            bgcolor: '#FFFFFF',
                                                            '& .MuiOutlinedInput-root': {
                                                                borderRadius: '8px',
                                                                '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: '#8F85F3',
                                                                },
                                                            },
                                                        }}
                                                        value={values.address}
                                                        onChange={handleChange}
                                                        multiline
                                                        minRows={2}
                                                    />
                                                </FormControl>

                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{
                                                        mt: 3,
                                                        width: "100%",
                                                        height: "48px",
                                                        bgcolor: "#8F85F3",
                                                        color: "#fff",
                                                        textTransform: "none",
                                                        borderRadius: "8px",
                                                        boxShadow: "none",
                                                        ":hover": {
                                                            bgcolor: "#a098f5",
                                                            boxShadow: "none",
                                                        },
                                                    }}
                                                    // disabled={!formik.isValid || !formik.dirty} // Opsional
                                                    onClick={() => setCurrentPage(2)}
                                                >
                                                    Selanjutnya
                                                </Button>
                                            </Box>
                                        </Form>
                                    )}
                                </Formik>
                            </Box>
                        )}

                        {currentPage === 2 && (
                            <Box sx={{ mt: 3, width: '100%' }}>
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
                                        const dataRegis = {
                                            patientId: patientData?.id,
                                            clinicId: idClinic,
                                            doctorId: idDoctor,
                                            typeOfVisit: values.jenisKunjungan,
                                            scheduleDate: currentDate,
                                            scheduleIntervalId: selectedScheduleId,
                                            symptoms: values.complaint,
                                            referenceDoc: "",
                                            offline: true,
                                            phoneNumber: values.phone,
                                            email: values.email,
                                            needAdmin: needAdmin,
                                        }
                                        registrationPatient(dataRegis);
                                    }}
                                >
                                    {({ errors, touched, handleChange, handleBlur, values, setFieldValue }) => (
                                        <Form>
                                            <Box sx={{ mb: 3 }}>

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

                                                                {/* <Box mt={1}>
                                                                    <Box mt={2}>
                                                                        <Typography sx={{ fontWeight: 400, fontSize: '16px', lineHeight: '18px' }} >Unggah surat rujukan</Typography>

                                                                        <FileUploader
                                                                            onBase64Change={(base64String) => setFieldValue('referenceDoc', base64String)}
                                                                        />
                                                                        <Typography fontSize={"14px"} color="#A8A8BD">
                                                                            Ukuran maksimal 1mb
                                                                        </Typography>
                                                                    </Box>

                                                                </Box> */}
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
                                                    disabled={!idClinic || !idDoctor || !selectedScheduleId}
                                                >
                                                    Selesai
                                                </Button>
                                            </Box>
                                        </Form>
                                    )}
                                </Formik>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
