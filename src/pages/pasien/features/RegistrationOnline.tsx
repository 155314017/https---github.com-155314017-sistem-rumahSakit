/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    CardMedia,
    Typography,
    Button,
    FormControl,
    TextField,
    FormLabel,
    FormControlLabel,
    Checkbox,
    RadioGroup,
    Skeleton,
} from "@mui/material";
import { Box } from "@mui/system";
import patientImage from "../../../assets/img/registrationImg.jpg";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import PhoneInput from "react-phone-input-2";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Formik, Form, Field } from "formik";
import CardRawatJalan from "../../../components/small/card/CardRawatJalan";
import CustomCalendar from "../../../components/medium/CustomCalender";
import DropdownListAPI from "../../../components/small/dropdownlist/DropdownListAPI";
import InformasiTicketAPI from "../../../components/small/InformasiTicketAPI";
import useRegistrationOnline from "../hooks/useRegistrationOnline";
import FileUploader from "../../../components/medium/FileUploader";


export default function RegistrationOnline() {
    const {
        navigate,
        BpRadio,
        clinicOptions,
        doctorOptions,
        calendarKey,
        idDoctor,
        idClinic,
        clinicName,
        docterName,
        selectedScheduleId,
        selectedSchedule,
        setNeedAdmin,
        needAdmin,
        handleScheduleChange,
        handleDropdownPoli,
        handleDropdownDocter,
        getBorderStyle,
        getPageStyle,
        initialValues,
        getValidationSchema,
        checkIdentityNumber,
        setCurrentPage,
        currentPage,
        patientData,
        registrationPatient,
        tanggalReserve,
        bookingCode,
        setDataPatient,
        dataPatient,
        registrationId,
        isLoading
    } = useRegistrationOnline();
    return (
        <>
            <style>
                {
                    `
            :root {
            background-color: #ffff}
            `
                }
            </style>

            <Box sx={{ display: "flex", height: "auto" }}>
                <Box position="absolute" minWidth="50%" maxWidth="50%">
                    <Box sx={{ position: "relative" }}>
                        <CardMedia
                            component="img"
                            sx={{
                                width: "50%",
                                minWidth: '50%',
                                maxWidth: '50%',
                                height: "100vh",
                                objectFit: "cover",
                                position: "fixed",
                                top: 0,
                                left: 0,
                            }}
                            image={patientImage}
                            alt="Example Image"
                        />
                    </Box>
                    <Box
                        sx={{
                            position: "fixed",
                            bgcolor: "rgba(0, 0, 0, 0.5)",
                            width: "50%",
                            height: "100vh",
                            top: 0,
                            left: 0,
                        }}
                    />
                    <Box
                        sx={{
                            position: "fixed",
                            zIndex: 9999,
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

                {isLoading ? (
                    <Skeleton
                        sx={{ bgcolor: 'grey.300', position: 'absolute', right: 0 }}
                        variant="rectangular"
                        width={'50%'}
                        height={'100vh'}
                        animation="wave"
                    />
                ) : (



                    <Box
                        position="absolute" ml={'50%'} minWidth="50%" maxWidth="50%" minHeight={'100vh'}
                    >
                        <Formik
                            initialValues={initialValues}
                            enableReinitialize
                            validationSchema={getValidationSchema(currentPage)}
                            onSubmit={(values) => {
                                switch (currentPage) {
                                    case 1:
                                        return setCurrentPage(2);
                                    case 2:
                                        checkIdentityNumber(values.nik)
                                        return setCurrentPage(3);
                                    case 3:
                                        setCurrentPage(4)
                                        return;
                                    case 4: {
                                        const data = {
                                            patientId: patientData?.id || null,
                                            clinicId: idClinic,
                                            doctorId: idDoctor,
                                            typeOfVisit: values.typeOfVisit,
                                            scheduleDate: dayjs(selectedSchedule?.split(",")[0]).format("YYYY-MM-DD"),
                                            scheduleIntervalId: selectedScheduleId,
                                            symptoms: values.symptoms,
                                            referenceDoc: "",
                                            offline: false,
                                            phoneNumber: values.phoneCp,
                                            email: values.emailCp,
                                            needAdmin: needAdmin,
                                        };
                                        registrationPatient(data);
                                        setDataPatient(data);
                                        return;
                                    }


                                }
                            }
                            }
                            validateOnMount
                            validateOnChange
                            validateOnBlur
                        >
                            {({
                                errors,
                                touched,
                                values,
                                handleChange,
                                setFieldValue,
                                handleSubmit,
                                isValid,
                            }) => (
                                <Form onSubmit={handleSubmit}>
                                    {(currentPage === 1 || currentPage === 2 || currentPage === 3 || currentPage === 4) && (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                flexDirection: "column",
                                            }}
                                            mb={3}
                                        >
                                            {(currentPage === 2 || currentPage === 3) && (
                                                <Box mb={2} ml={currentPage === 3 ? '5%' : '10%'} width={'fit-content'} mt={currentPage === 3 ? '5%' : '20%'}>
                                                    <Typography
                                                        fontSize="32px"
                                                        fontWeight={600}
                                                        lineHeight="34px"
                                                    >
                                                        Selamat datang
                                                    </Typography>
                                                    <Typography
                                                        fontSize="18px"
                                                        fontWeight={400}
                                                        lineHeight="20px"
                                                        color="#747487"
                                                    >
                                                        Silakan masukkan nomor NIK (Nomor induk kependudukan)
                                                        Pasien.
                                                    </Typography>
                                                </Box>
                                            )}

                                            <Box display="flex" justifyContent={'space-between'} flexDirection="row" ml={currentPage === 4 || currentPage === 3 ? 0 : '5%'} mt={currentPage === 4 || currentPage === 2 || currentPage === 3 ? '5%' : '15%'} >
                                                <Box display="flex" flexDirection="row" width="290px">
                                                    <Button
                                                        type="button"
                                                        onClick={() => setCurrentPage(1)}
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            alignItems: "center",
                                                            mx: 5,
                                                            ...getPageStyle(1),
                                                            "&:hover": {
                                                                backgroundColor: "inherit",
                                                            },
                                                        }}
                                                    >
                                                        <Box sx={getBorderStyle(1)}>1</Box>
                                                        <Typography sx={{ ml: 1, textTransform: "none" }}>
                                                            Data diri pasien
                                                        </Typography>
                                                    </Button>
                                                </Box>
                                                <Box display="flex" flexDirection="row" width="400px">
                                                    <Button
                                                        type="button"
                                                        onClick={() => setCurrentPage(4)}
                                                        disabled={currentPage < 4}
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
                                                        <Box sx={getBorderStyle(4)}>2</Box>
                                                        <Typography sx={{ ml: 1, textTransform: "none" }}>
                                                            Jenis Kunjungan dan Keluhan
                                                        </Typography>
                                                    </Button>
                                                </Box>
                                            </Box>
                                            {currentPage === 1 && (
                                                <Box mb={2} mt={'5%'} ml={'10%'} >
                                                    <Typography
                                                        fontWeight={600}
                                                        fontSize="20px"
                                                        lineHeight="22px"
                                                    >
                                                        Pilih kategori pasien
                                                    </Typography>
                                                    <Typography
                                                        maxWidth="77%"
                                                        fontWeight={400}
                                                        fontSize="16px"
                                                        lineHeight="18px"
                                                        color="#747487"
                                                    // bgcolor={'red'}
                                                    >
                                                        Membantu tenaga medis dalam memberikan perawatan yang
                                                        lebih terorganisir, sesuai dengan tingkat kebutuhan
                                                        pasien.
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    )}

                                    {currentPage === 1 && (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "24px",
                                                maxWidth: "600px",
                                                ml: '10%',
                                                // bgcolor: 'red',
                                                width: "100%",
                                            }}
                                        >
                                            <CardRawatJalan
                                                onClick={() => setCurrentPage(2)}
                                                title="Pasien Umum"
                                                text="Pasien yang berobat di rumah sakit dengan membayar sendiri seluruh biaya perawatan dan pengobatan yang dibutuhkan."
                                            />
                                            <CardRawatJalan
                                                onClick={() => navigate("/rawatjalan/bpjs")}
                                                title="Pasien Asuransi"
                                                text="Pasien yang berobat di rumah sakit dengan biaya yang di cover oleh pihak asuransi."
                                            />
                                        </Box>
                                    )}

                                    {currentPage === 2 && (
                                        <Box sx={{ textAlign: "left", width: "100%", maxWidth: "600px", ml: '10%' }} >
                                            <Typography
                                                mb={2}
                                                fontSize="20px"
                                                fontWeight={600}
                                                lineHeight="22px"
                                            >
                                                Isi data pasien
                                            </Typography>
                                            <FormControl fullWidth>
                                                <Typography>NIK (Nomor induk kependudukan) Pasien</Typography>
                                                <Field
                                                    as={TextField}
                                                    name="nik"
                                                    placeholder="Masukkan NIK"
                                                    variant="outlined"
                                                    sx={{
                                                        width: "100%",
                                                        height: "48px",
                                                        marginTop: "10px",
                                                        "& .MuiOutlinedInput-root": {
                                                            borderRadius: "8px",
                                                            backgroundColor: touched.nik && errors.nik ? "#ffcccc" : "inherit",
                                                            '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#8F85F3',
                                                            },
                                                        },
                                                        "& .MuiOutlinedInput-notchedOutline": {
                                                            border: "1px solid #ccc",
                                                        },
                                                        "& .MuiOutlinedInput-input": {
                                                            padding: "10px",
                                                            fontSize: "16px",
                                                        },
                                                    }}
                                                    error={touched.nik && Boolean(errors.nik)}
                                                // helperText={touched.nik && errors.nik}
                                                />
                                            </FormControl>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                disabled={!isValid}
                                                sx={{
                                                    mt: 2,
                                                    width: "100%",
                                                    backgroundColor: !isValid ? "#A8A8BD" : "#8F85F3",
                                                    color: "white",
                                                    ":hover": {
                                                        backgroundColor: !isValid ? "red" : "#D5D1FB",
                                                    },
                                                    "&.Mui-disabled": {
                                                        backgroundColor: "#A8A8BD",
                                                        color: "white",
                                                    },
                                                }}
                                            >
                                                Lanjutkan
                                            </Button>

                                        </Box>
                                    )}

                                    {currentPage === 3 && (
                                        <Box sx={{ textAlign: "left", width: "90%", ml: "5%" }}>
                                            <Typography
                                                fontSize="20px"
                                                fontWeight={600}
                                                mb="1%"
                                            >
                                                Konfirmasi data diri pasien
                                            </Typography>
                                            <Box
                                                bgcolor="#F1F0FE"
                                                border="2px solid #8F85F3"
                                                borderRadius="8px"
                                                padding="8px 16px"
                                                display="flex"
                                                flexDirection="row"
                                                gap="6px"
                                                alignItems="center"
                                                mb={2}
                                            >
                                                <ErrorOutlineOutlinedIcon
                                                    sx={{ color: "#7367F0", width: 20, height: 20 }}
                                                />
                                                <Typography color="#7367F0" fontWeight={400} fontSize="16px">
                                                    Harap periksa kembali data diri Anda, jika ada data yang tidak sesuai anda dapat merubahnya di Admin dengan mengklik tombol ubah data.
                                                </Typography>
                                            </Box>
                                            <FormLabel>NIK (Nomor induk kependudukan) Pasien</FormLabel>
                                            <Field
                                                as={TextField}
                                                name="nik"
                                                placeholder="Masukkan NIK"
                                                variant="outlined"
                                                fullWidth
                                                disabled
                                                sx={{
                                                    mb: 2,
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "8px",
                                                        bgcolor: "#EEEEF2",
                                                        border: "1px solid #A8A8BD",
                                                    },
                                                }}
                                                error={touched.nik && Boolean(errors.nik)}
                                            // helperText={touched.nik && errors.nik}
                                            />
                                            <FormLabel>Email</FormLabel>
                                            <Field
                                                as={TextField}
                                                name="email"
                                                placeholder="Masukkan Email"
                                                variant="outlined"
                                                disabled
                                                fullWidth
                                                sx={{
                                                    mb: 2,
                                                    border: 'none',
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "8px",
                                                        bgcolor: "#EEEEF2",
                                                        border: "1px solid #A8A8BD",
                                                    },
                                                }}
                                                error={touched.email && Boolean(errors.email)}
                                            // helperText={touched.email && errors.email}
                                            />
                                            <Typography>
                                                No. Handphone Pasien <span style={{ color: "#d32f2f" }}>*</span>
                                            </Typography>
                                            <PhoneInput
                                                country="id"
                                                countryCodeEditable={false}
                                                disabled
                                                inputStyle={{
                                                    height: "48px",
                                                    borderRadius: "8px",
                                                    border: "1px solid #ccc",
                                                    padding: "10px 40px 10px 60px",
                                                    backgroundColor: "#EEEEF2",
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
                                                value={values.phone}
                                                onChange={(phone) => {
                                                    // PhoneInput onChange: string => setState
                                                    // Jalankan setFieldValue agar formik simpan nilainya
                                                    // Sebab 'phone' field di initialValues
                                                    // pastikan name="phone" agar match
                                                    return setFieldValue("phone", phone);
                                                }}
                                            />
                                            {/* {touched.phone && errors.phone && (
                                            <Typography variant="caption" color="error">
                                                {errors.phone}
                                            </Typography>
                                        )} */}
                                            <FormLabel>Nama lengkap Pasien</FormLabel>
                                            <Field
                                                as={TextField}
                                                name="fullname"
                                                placeholder="Masukkan nama lengkap"
                                                variant="outlined"
                                                disabled
                                                fullWidth
                                                sx={{
                                                    mb: 2,
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "8px",
                                                        bgcolor: "#EEEEF2",
                                                        border: "1px solid #A8A8BD",
                                                    },
                                                }}
                                                error={touched.email && Boolean(errors.email)}
                                            // helperText={touched.email && errors.email}
                                            />
                                            <Box display="flex" justifyContent="space-between" gap={2}>
                                                <FormControl sx={{ width: "50%" }}>
                                                    <FormLabel>Tempat Lahir</FormLabel>
                                                    <Field
                                                        as={TextField}
                                                        name="birthPlace"
                                                        disabled
                                                        placeholder="Tempat Lahir"
                                                        variant="outlined"
                                                        sx={{
                                                            "& .MuiOutlinedInput-root": {
                                                                borderRadius: "8px",
                                                                bgcolor: "#EEEEF2",
                                                                border: "1px solid #A8A8BD",
                                                            },
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormControl sx={{ width: "50%" }}>
                                                    <FormLabel>Tanggal Lahir</FormLabel>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            disabled
                                                            value={values.birthDate ? dayjs(values.birthDate) : null}
                                                            onChange={(date) => setFieldValue("birthDate", date)}
                                                            slotProps={{
                                                                textField: {
                                                                    placeholder: "Tanggal Lahir",
                                                                    sx: {
                                                                        bgcolor: "#EEEEF2",
                                                                        borderRadius: "8px",
                                                                        border: "1px solid #A8A8BD",
                                                                    },
                                                                },
                                                            }}
                                                        />
                                                    </LocalizationProvider>
                                                </FormControl>
                                            </Box>
                                            <Typography sx={{ mt: 2 }}>
                                                Jenis kelamin Pasien <span style={{ color: "#d32f2f" }}>*</span>
                                            </Typography>
                                            <Box
                                                bgcolor="#EEEEF2"
                                                border="1px solid #A8A8BD"
                                                display="flex"
                                                flexDirection="row"
                                                padding={1}
                                                borderRadius="12px"
                                                pl={3}
                                            >
                                                <FormControl
                                                    component="fieldset"
                                                    error={touched.gender && Boolean(errors.gender)}
                                                >
                                                    <RadioGroup
                                                        aria-labelledby="gender-label"
                                                        name="gender"
                                                        value={values.gender}
                                                        onChange={(e) => {
                                                            setFieldValue("gender", e.target.value);
                                                            console.log(e.target.value)
                                                        }}
                                                        row
                                                    >
                                                        <FormControlLabel
                                                            value="FEMALE"
                                                            control={<BpRadio />}
                                                            label="Female"
                                                            disabled
                                                        />
                                                        <FormControlLabel
                                                            value="MALE"
                                                            control={<BpRadio />}
                                                            label="Male"
                                                            disabled
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Box>
                                            <Typography>
                                                Alamat tempat tinggal Pasien <span style={{ color: "red" }}>*</span>
                                            </Typography>
                                            <TextField
                                                placeholder="Masukkan tempat tinggal"
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                disabled
                                                rows={2}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "8px",
                                                        bgcolor: "#EEEEF2",
                                                        border: "1px solid #A8A8BD",
                                                    },
                                                }}
                                                value={values.address}
                                                onChange={handleChange}
                                                name="address"
                                            />
                                            <Box
                                                sx={{
                                                    padding: "8px 24px",
                                                    borderRadius: "12px",
                                                    border: "1px solid #A8A8BD",
                                                    mt: 3,
                                                }}
                                            >
                                                <FormControlLabel
                                                    sx={{ color: "#747487", fontWeight: 400, fontSize: "16px" }}
                                                    control={
                                                        <Checkbox
                                                            sx={{
                                                                color: "#A8A8BD",
                                                                borderRadius: "4px",
                                                                "&.Mui-checked": {
                                                                    color: "#7367F0",
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
                                                sx={{
                                                    width: "100%",
                                                    height: "48px",
                                                    marginTop: "20px",
                                                    backgroundColor: "#8F85F3",
                                                    ":hover": { backgroundColor: "#D5D1FB" },
                                                }}
                                            >
                                                Lanjutkan
                                            </Button>
                                        </Box>
                                    )}



                                    {currentPage === 4 && (
                                        <Box sx={{ minWidth: "90%", mb: 5, maxWidth: "90%", ml: 5 }}>
                                            <Typography
                                                sx={{
                                                    fontSize: "20px",
                                                    fontWeight: "600",
                                                    lineHeight: "22px",
                                                    mt: 2,
                                                }}
                                            >
                                                Formulir pendaftaran pasien Umum
                                            </Typography>
                                            <Typography
                                                mb={2}
                                                fontWeight={400}
                                                fontSize="16px"
                                                lineHeight="18px"
                                                color="#A8A8BD"
                                            >
                                                Pasien yang berobat di rumah sakit dengan membayar sendiri
                                                seluruh biaya perawatan.
                                            </Typography>
                                            <Box display="flex" flexDirection="column" gap={2}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        border: "1px solid gray",
                                                        borderRadius: "16px",
                                                        p: 2,
                                                    }}
                                                >
                                                    <Typography fontWeight="bold" mb={1}>
                                                        Kontak info
                                                    </Typography>
                                                    <FormControl sx={{ mb: 2 }}>
                                                        <Typography>No. Handphone</Typography>
                                                        <PhoneInput
                                                            country="id"
                                                            countryCodeEditable={false}
                                                            inputStyle={{
                                                                height: "48px",
                                                                borderRadius: "8px",
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
                                                            value={values.phoneCp}
                                                            onChange={(val) => setFieldValue("phoneCp", val)}
                                                        />
                                                        {/* {touched.phoneCp && errors.phoneCp && (
                                                        <Typography variant="caption" color="error">
                                                            {errors.phoneCp}
                                                        </Typography>
                                                    )} */}
                                                    </FormControl>
                                                    <FormControl>
                                                        <Typography>Email</Typography>
                                                        <Field
                                                            as={TextField}
                                                            name="emailCp"
                                                            placeholder="Masukkan email"
                                                            variant="outlined"
                                                            sx={{
                                                                width: "100%",
                                                                height: "48px",
                                                                marginTop: "10px",
                                                                "& .MuiOutlinedInput-root": {
                                                                    borderRadius: "8px",
                                                                    backgroundColor: touched.emailCp && errors.emailCp ? "#ffcccc" : "inherit",
                                                                    '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                        borderColor: '#8F85F3',
                                                                    },
                                                                },
                                                                "& .MuiOutlinedInput-notchedOutline": {
                                                                    border: "1px solid #ccc",
                                                                },
                                                                "& .MuiOutlinedInput-input": {
                                                                    padding: "10px",
                                                                    fontSize: "16px",
                                                                },
                                                            }}
                                                            error={touched.emailCp && Boolean(errors.emailCp)}
                                                        // helperText={touched.emailCp && errors.emailCp}
                                                        />
                                                    </FormControl>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        border: "1px solid gray",
                                                        borderRadius: "16px",
                                                        p: 2,
                                                    }}
                                                >
                                                    <Typography fontWeight="bold" mb={1}>
                                                        Keluhan Pasien
                                                    </Typography>
                                                    <FormControl sx={{ mb: 2 }}>
                                                        <Typography>Jenis Kunjungan</Typography>
                                                        <Field
                                                            as={TextField}
                                                            name="typeOfVisit"
                                                            placeholder="Masukkan jenis kunjungan"
                                                            variant="outlined"
                                                            sx={{
                                                                width: "100%",
                                                                height: "48px",
                                                                marginTop: "10px",
                                                                "& .MuiOutlinedInput-root": {
                                                                    borderRadius: "8px",
                                                                    backgroundColor: touched.typeOfVisit && errors.typeOfVisit ? "#ffcccc" : "inherit",
                                                                    '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                        borderColor: '#8F85F3',
                                                                    },
                                                                },
                                                                "& .MuiOutlinedInput-notchedOutline": {
                                                                    border: "1px solid #ccc",
                                                                },
                                                                "& .MuiOutlinedInput-input": {
                                                                    padding: "10px",
                                                                    fontSize: "16px",
                                                                },
                                                            }}
                                                            error={touched.typeOfVisit && Boolean(errors.typeOfVisit)}
                                                        // helperText={touched.typeOfVisit && errors.typeOfVisit}
                                                        />
                                                    </FormControl>
                                                    <Typography>Poli yang dituju</Typography>

                                                    <DropdownListAPI
                                                        options={clinicOptions.map(({ id, name }) => ({ value: id, label: name }))}
                                                        placeholder="Pilih Fasilitas Induk"
                                                        onChange={handleDropdownPoli}
                                                        loading={false}
                                                    />
                                                    <Box
                                                        display="flex"
                                                        flexDirection="row"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        sx={{ width: "100%", mt: 2 }}
                                                    >
                                                        <FormControl sx={{ width: "50%" }} size="small">
                                                            <Typography>Dokter yang bertugas</Typography>
                                                            <DropdownListAPI
                                                                placeholder='Pilih dokter'
                                                                options={doctorOptions.map(({ id, name }) => ({ value: id, label: name }))}
                                                                onChange={handleDropdownDocter}
                                                                loading={false}
                                                            />
                                                        </FormControl>
                                                        <Box sx={{ ml: 2, width: "50%" }}>
                                                            <Typography>Tanggal & Jam Operasional</Typography>
                                                            <CustomCalendar
                                                                key={calendarKey}
                                                                typeId={idDoctor}
                                                                onChange={(scheduleId, schedule) => {
                                                                    setFieldValue("schedule", scheduleId);
                                                                    handleScheduleChange(scheduleId, schedule);
                                                                }}
                                                            />
                                                            {/* {touched.schedule && errors.schedule && (
                                                            <Typography variant="caption" color="error">
                                                                {errors.schedule as string}
                                                            </Typography>
                                                        )} */}
                                                        </Box>
                                                    </Box>
                                                    <FormControl sx={{ mt: 2 }}>
                                                        <Typography>Keluhan Pasien</Typography>
                                                        <Field
                                                            as={TextField}
                                                            name="symptoms"
                                                            multiline
                                                            rows={4}
                                                            variant="outlined"
                                                            sx={{
                                                                width: "100%",
                                                                mt: 1,
                                                                "& .MuiOutlinedInput-root": {
                                                                    border: "1px solid #A8A8BD",
                                                                    "&.Mui-focused fieldset": {
                                                                        borderColor: "#6B63D1",
                                                                    },
                                                                },
                                                            }}
                                                            error={touched.symptoms && Boolean(errors.symptoms)}
                                                        // helperText={touched.symptoms && errors.symptoms}
                                                        />
                                                    </FormControl>
                                                    <Box mt={1}>
                                                        <Box mt={2}>
                                                            <Typography>Unggah surat rujukan</Typography>
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
                                            <Button
                                                type="submit"
                                                // onClick={() => console.log('clicked')}
                                                variant="contained"
                                                sx={{
                                                    width: "100%",
                                                    height: "48px",
                                                    marginTop: "20px",
                                                    backgroundColor: "#8F85F3",
                                                    ":hover": { backgroundColor: "#D5D1FB" },
                                                }}
                                                disabled={!isValid}
                                            >
                                                Selesai
                                            </Button>
                                        </Box>
                                    )}

                                    {currentPage === 5 && (
                                        <Box zIndex={1500} ml={'10%'} >
                                            <InformasiTicketAPI
                                                clinic={clinicName}
                                                tanggalReservasi={tanggalReserve}
                                                namaDokter={docterName}
                                                jadwalKonsul={selectedSchedule}
                                                bookingCode={bookingCode}
                                                onClose={() => setCurrentPage(1)}
                                                patienDataSent={dataPatient}
                                                registrationId={registrationId}
                                            />
                                        </Box>
                                    )}
                                </Form>
                            )}
                        </Formik>

                    </Box >
                )}
            </Box >
        </>
    );
}
