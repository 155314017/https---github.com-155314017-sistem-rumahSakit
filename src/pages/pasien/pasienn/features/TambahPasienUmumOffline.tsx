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
} from "@mui/material";
import bgImage from "../../../../img/String.png";
import PhoneInput from 'react-phone-input-2';
//hooks
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import useTambahPasienUmumOffline from "../hooks/useTambahPasienUmumOffline";
import SwitchCustom from "../../../../components/small/SwitchCustom";
import DropdownListAPI from "../../../../components/small/dropdownlist/DropdownListAPI";
import CustomCalender from "../../../../components/medium/CustomCalender";
import InformasiTicketAPI from "../../../../components/small/InformasiTicketAPI";
import bgImg from "../../../../assets/img/Bg-desktop.svg"
import BreadCrumbBasic from "../../../../components/medium/BreadCrumbBasic";
import AlertWarning from "../../../../components/small/alert/AlertWarning";
import { useEffect } from "react";


export default function TambahPasienUmumOffline() {
    const {
        formik,
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
        putGuard,
        changePage2,
        clinicOptions,
        handleDropdownPoli,
        createTicket,
        dataTickets,
        birthDate,
        birthPlace,
        showAlert,
        calendarKey,
        isLoading

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
                    zIndex: 9999,
                    padding: '16px',
                    width: {
                        xs: '90%', // Untuk layar kecil (mobile)
                        sm: '84%',  // Untuk layar sedang
                        md: '90%',  // Untuk layar besar
                        lg: '100%',
                    },
                    // bgcolor: 'blue'
                }}>
                    <BreadCrumbBasic title="Pasien lama" description="Pasien yang pernah datang sebelumnya untuk keperluan berobat." onBackClick={() => currentPage > 1 ? setCurrentPage(currentPage - 1) : window.history.back()} />
                    {showAlert && <AlertWarning teks="NIK Tidak Ditemukan. Silahkan coba lagi." />}
                </Box>

                <Box mt={5}>

                    {mainPages && (
                        <Box mt={currentPage == 2 ? '20%' : '10%'} position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden", height: 'fit-content' }}>

                            <Box sx={{ display: "flex", flexDirection: "row", mt: 2, mb: 2, gap: 8 }}>
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
                                            Data diri Penanggung Jawab Pasien
                                        </Typography>
                                    </Button>
                                </Box>

                                {/* Step 3 */}
                                <Box display={"flex"} flexDirection={"row"} width={"350px"}>
                                    <Button
                                        onClick={() => setCurrentPage(3)}
                                        disabled={currentPage < 3} // Nonaktifkan jika bukan langkah terakhir
                                        sx={{
                                            ...getPageStyle(3),
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            mx: 2,
                                            "&:hover": {
                                                backgroundColor: "inherit",
                                            },
                                        }}
                                    >
                                        <Box sx={getBorderStyle(3)}>3</Box>
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
                                        <Box>
                                            <Box height={"fit-content"} width={"100%"} borderRadius={"16px"} display="flex" flexDirection="column" justifyContent="center">
                                                <Box display={"flex"} flexDirection="column" alignItems="flex-start" gap={"5px"} width={'99%'}>
                                                    <Typography>NIK (Nomor induk kependudukan) Pasien</Typography>
                                                    <OutlinedInput
                                                        sx={{
                                                            borderRadius: '8px',
                                                            height: '48px',
                                                            width: '100%',
                                                            bgcolor: '#E8E8E8',
                                                            '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#8F85F3',
                                                            },
                                                        }}
                                                        placeholder='Masukkan NIK ktp'
                                                        value={formik.values.nik}
                                                        onChange={formik.handleChange}
                                                        name="nik"
                                                        disabled
                                                    />
                                                    <Typography>Nama lengkap pasien</Typography>
                                                    <OutlinedInput
                                                        sx={{
                                                            width: '100%',
                                                            maxHeight: '44px',
                                                            borderRadius: '8px',
                                                            bgcolor: '#E8E8E8',
                                                            '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#8F85F3',
                                                            },
                                                        }}
                                                        name="fullname"
                                                        value={patientData?.fullName}
                                                        disabled
                                                        onChange={(value) => formik.setFieldValue("fullname", value)}
                                                    />

                                                    <Box display={'flex'} justifyContent={'space-between'} sx={{ overflow: 'hidden', height: '75px', width: '100%' }}>
                                                        <FormControl sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '49%' }}>
                                                            <FormLabel>Tempat Lahir</FormLabel>
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
                                                                        backgroundColor: formik.touched.birthPlacePatient && formik.errors.birthPlacePatient ? "#ffcccc" : 'inherit',
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
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={birthPlace}
                                                                error={formik.touched.birthPlacePatient && Boolean(formik.errors.birthPlacePatient)}
                                                                disabled
                                                            // helperText={touched.fullname && errors.fullname}
                                                            />

                                                        </FormControl>

                                                        <FormControl sx={{ width: '49%', overflow: 'hidden', height: '100%' }}>
                                                            <FormLabel>Tanggal Lahir</FormLabel>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <Box sx={{ overflow: 'hidden' }}>
                                                                    <DemoContainer components={['DatePicker']}>
                                                                        <DatePicker
                                                                            value={dayjs(birthDate)}
                                                                            onChange={(newValue) => {
                                                                                if (newValue) {
                                                                                    const formattedDate = newValue.format("YYYY-MM-DD");
                                                                                    formik.setFieldValue("birthDate", formattedDate);
                                                                                    console.log("tanggalLahir", formattedDate);
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
                                                    <Typography>No Handphone pasien</Typography>
                                                    <PhoneInput
                                                        country={"id"}
                                                        value={patientData?.phoneNumber}
                                                        onChange={(values) => formik.setFieldValue("phone", values)}
                                                        // disabled={switchValue}
                                                        // onChange={(value) => console.log("nomor: ", value)}
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

                                                </Box>
                                            </Box>
                                        </Box>
                                        <Button
                                            type="button"
                                            onClick={changePage2}
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
                                        // disabled={!isCurrentPageValid()}
                                        >
                                            Selanjutnya
                                        </Button>
                                    </>
                                    )}
                                </Box>
                            )}

                            {currentPage === 2 && (
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    {guardFullPage && (
                                        <>
                                            <SwitchCustom onChangeValue={handleSwitchChange} defaultValue={switchValue} />
                                            <Typography>NIK (Nomor induk kependudukan) Penanggung jawab</Typography>
                                            <OutlinedInput
                                                sx={{
                                                    borderRadius: '8px',
                                                    height: '48px',
                                                    backgroundColor: switchValue ? "#E8E8E8" : "inherit"
                                                }}
                                                placeholder='Masukkan NIK ktp'
                                                value={formik.values.nikGuardian}
                                                onChange={formik.handleChange}
                                                name="nikGuardian"
                                                disabled={switchValue}
                                            />
                                            <Typography color="error">{formik.touched.nik && formik.errors.nik}</Typography>
                                            <Button
                                                type="button"
                                                // onClick={() => patientPage ? setPatientPage(true) : setCurrentPage(2)}
                                                onClick={() => setGuardFullPage(false)}
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
                                            // disabled={!isCurrentPageValid()}
                                            >
                                                Selanjutnya
                                            </Button>
                                        </>
                                    )}

                                    {!guardFullPage && (
                                        <>
                                            <Box>
                                                <Box height={"fit-content"} width={"100%"} borderRadius={"16px"} paddingLeft={"5px"} display="flex" flexDirection="column" justifyContent="center">
                                                    <Box display={"flex"} flexDirection="column" alignItems="flex-start" gap={"15px"} width={'99%'} mt={2}>
                                                        <SwitchCustom onChangeValue={handleSwitchChange} defaultValue={switchValue ? true : false} />
                                                        <Typography>NIK (Nomor induk kependudukan) Penanggung jawab</Typography>
                                                        <OutlinedInput
                                                            sx={{
                                                                borderRadius: '8px',
                                                                height: '48px',
                                                                width: '100%',
                                                                backgroundColor: switchValue ? "#E8E8E8" : "inherit",
                                                                '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: '#8F85F3',
                                                                },
                                                            }}
                                                            placeholder='Masukkan NIK ktp'
                                                            defaultValue={'coba'}
                                                            value={formik.values.nikGuardian}
                                                            onChange={formik.handleChange}
                                                            name="nikGuardian"
                                                            disabled={switchValue ? true : false}
                                                        />
                                                        <Typography>Email</Typography>
                                                        <OutlinedInput
                                                            sx={{
                                                                borderRadius: '8px',
                                                                height: '48px',
                                                                width: '100%',
                                                                mb: 2,
                                                                backgroundColor: switchValue ? "#E8E8E8" : "inherit",
                                                                '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: '#8F85F3',
                                                                },
                                                            }}
                                                            placeholder='Masukkan email'
                                                            value={formik.values.emailGuardian}
                                                            onChange={formik.handleChange}
                                                            name="emailGuardian"
                                                            disabled={switchValue ? true : false}
                                                        />
                                                        <Typography>No Handphone Penanggung Jawab</Typography>
                                                        <PhoneInput
                                                            country={"id"}
                                                            value={formik.values.phoneGuardian}
                                                            // onChange={(phone) => setFieldValue("phone", phone)}
                                                            // disabled={switchValue}
                                                            onChange={(value) => formik.setFieldValue("phoneGuardian", value)}
                                                            inputStyle={{
                                                                backgroundColor: switchValue ? "#E8E8E8" : "inherit",
                                                                height: "48px",
                                                                borderRadius: "8px",
                                                                border: "1px solid #ccc",
                                                                padding: "10px 40px 10px 60px",
                                                                fontSize: "16px",
                                                                width: "100%",
                                                            }}
                                                            buttonStyle={{
                                                                borderRadius: "8px 0 0 8px",
                                                                border: "1px solid #ccc",
                                                            }}
                                                            containerStyle={{
                                                                marginBottom: "10px",
                                                                width: "100%",
                                                            }}
                                                            disabled={switchValue ? true : false}
                                                        />
                                                        {/* <Box display={'flex'} justifyContent={'space-between'} sx={{ overflow: 'hidden', height: '80px', width: '100%' }}>
                                                        <FormControl sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '49%' }}>
                                                            <FormLabel>Tempat Lahir</FormLabel>
                                                            <OutlinedInput
                                                                name="birthPlaceGuardian"
                                                                placeholder="Tempat Lahir"
                                                                fullWidth
                                                                sx={{
                                                                    width: '100%',
                                                                    height: '44px',
                                                                    mb: '5px',
                                                                    marginTop: '10px',
                                                                    borderRadius: '8px',
                                                                    backgroundColor: switchValue ? "#E8E8E8" : "inherit",
                                                                    '& .MuiOutlinedInput-root': {
                                                                        borderRadius: '8px',
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
                                                                value={formik.values.birthPlaceGuardian}
                                                                onChange={formik.handleChange}
                                                                disabled={switchValue}
                                                            />

                                                        </FormControl>

                                                        <FormControl sx={{ width: '49%', overflow: 'hidden', height: '100%' }}>
                                                            <FormLabel>Tanggal Lahir</FormLabel>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <Box sx={{ overflow: 'hidden' }}>
                                                                    <DemoContainer components={['DatePicker']}>
                                                                        <DatePicker
                                                                            value={dayjs(formik.values.birthDateGuardian)}
                                                                            onChange={(newValue) => {
                                                                                if (newValue) {
                                                                                    const formattedDate = newValue.format("YYYY-MM-DD");
                                                                                    formik.setFieldValue('birthDateGuardian', formattedDate);
                                                                                    console.log("tanggalLahir", formattedDate);
                                                                                }
                                                                            }}
                                                                            slotProps={{
                                                                                textField: {
                                                                                    placeholder: "Tanggal Lahir",
                                                                                    sx: {
                                                                                        borderRadius: '8px',
                                                                                        height: '60px',
                                                                                        width: '100%',
                                                                                        '& .MuiOutlinedInput-root': {
                                                                                            backgroundColor: switchValue ? "#E8E8E8" : "inherit",
                                                                                            borderRadius: '8px',
                                                                                            height: '44px',
                                                                                        },
                                                                                    },
                                                                                },
                                                                            }}
                                                                            disabled={switchValue}
                                                                        />
                                                                    </DemoContainer>
                                                                </Box>
                                                            </LocalizationProvider>
                                                        </FormControl>
                                                    </Box> */}

                                                        <Typography>Nama lengkap penanggung jawab</Typography>
                                                        <OutlinedInput
                                                            sx={{
                                                                width: '100%',
                                                                maxHeight: '44px',
                                                                borderRadius: '8px',
                                                                backgroundColor: switchValue ? "#E8E8E8" : "inherit",
                                                                '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: '#8F85F3',
                                                                },
                                                            }}
                                                            name="fullnameGuardian"
                                                            value={formik.values.fullnameGuardian}
                                                            onChange={formik.handleChange}
                                                            disabled={switchValue ? true : false}
                                                        />
                                                        <Typography>Cara datang/pengantar</Typography>
                                                        <Box sx={{
                                                            border: '1px solid #ccc',
                                                            borderRadius: '12px',
                                                            padding: '8px 12px 8px 12px',
                                                            gap: '24px',
                                                            backgroundColor:  "inherit",
                                                            width: '97.5%',
                                                        }}
                                                        >
                                                            <FormControl sx={{ width: '95%', }} >
                                                                <RadioGroup
                                                                    aria-labelledby="gender-label"
                                                                    name="typeGuardian"
                                                                    value={formik.values.typeGuardian}
                                                                    // value={""}
                                                                    onChange={(e) => formik.setFieldValue("typeGuardian", e.target.value)}
                                                                    row
                                                                    sx={{
                                                                        display: 'flex',
                                                                        flexDirection: 'row',
                                                                        justifyContent: 'space-between',
                                                                        width: '100%',
                                                                    }}
                                                                >
                                                                    <FormControlLabel value="SENDIRI" control={<BpRadio />} label="Sendiri" />
                                                                    <FormControlLabel value="KELUARGA" control={<BpRadio />} label="Keluarga" />
                                                                    <FormControlLabel value="POLISI" control={<BpRadio />} label="Polisi" />
                                                                    <FormControlLabel value="AMBULAN" control={<BpRadio />} label="Ambulan" />
                                                                    <FormControlLabel value="LAINNYA" control={<BpRadio />} label="Lainnya" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </Box>

                                                        <Typography>Jenis Kelamin Penanggung Jawab</Typography>
                                                        <Box sx={{
                                                            border: '1px solid #ccc',
                                                            borderRadius: '12px',
                                                            padding: '8px 12px 8px 12px',
                                                            gap: '24px',
                                                            backgroundColor: switchValue ? "#E8E8E8" : "inherit",
                                                            width: '97.5%',
                                                        }}
                                                        >
                                                            <FormControl sx={{ width: '100%' }} >
                                                                <RadioGroup
                                                                    aria-labelledby="gender-label"
                                                                    name="genderGuardian"
                                                                    value={formik.values.genderGuardian}
                                                                    onChange={(e) => formik.setFieldValue("genderGuardian", e.target.value)}
                                                                    row
                                                                    sx={{
                                                                        display: 'flex',
                                                                        flexDirection: 'row',
                                                                        justifyContent: 'space-between',
                                                                        width: '25%'
                                                                    }}
                                                                >
                                                                    <FormControlLabel disabled={switchValue ? true : false} value="WOMEN" control={<BpRadio />} label="Female" />
                                                                    <FormControlLabel disabled={switchValue ? true : false} value="MEN" control={<BpRadio />} label="Male" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </Box>
                                                        <Typography>Alamat tempat tinggal penanggung jawab</Typography>
                                                        <OutlinedInput
                                                            id="addressGuardian"
                                                            name="addressGuardian"
                                                            size="small"
                                                            placeholder="Masukkan alamat tempat tinggal penanggug jawab"
                                                            value={formik.values.addressGuardian}
                                                            onChange={formik.handleChange}
                                                            onBlur={() => formik.setTouched({ ...formik.touched, addressGuardian: true })}
                                                            error={formik.touched.addressGuardian && Boolean(formik.errors.addressGuardian)}
                                                            disabled={switchValue ? true : false}
                                                            sx={{
                                                                height: '107px',
                                                                alignItems: 'flex-start',
                                                                borderRadius: '8px',
                                                                backgroundColor: switchValue ? "#E8E8E8" : "inherit",
                                                                width: '100%',
                                                                '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: '#8F85F3',
                                                                },
                                                            }}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Button
                                                // type="button"
                                                // onClick={() => setCurrentPage(3)}
                                                onClick={putGuard}
                                                // onClick={() => console.log(formik.values.nikGuardian)}
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
                                            // disabled={!isCurrentPageValid()}
                                            >
                                                Selanjutnya
                                            </Button>
                                        </>
                                    )}
                                </Box>
                            )}

                            {currentPage === 3 && (
                                <Box mt={3}>
                                    <Box sx={{ display: "flex" }}>
                                        <Box sx={{ width: '100%' }}>
                                            <Box>
                                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                    <FormControl>
                                                        <Typography>Jenis Kunjungan</Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            sx={{
                                                                width: "100%",
                                                                borderRadius: "8px",
                                                                mb: 2,
                                                                padding: "0",
                                                                "& .MuiOutlinedInput-root": {
                                                                    height: "44px",
                                                                    padding: "0 12px",
                                                                    border: "1px solid #A8A8BD",
                                                                    "& input": {
                                                                        height: "44px",
                                                                        padding: "0",
                                                                    },

                                                                    '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                        borderColor: '#8F85F3',
                                                                    },
                                                                },
                                                            }}
                                                            name="jenisKunjungan"
                                                            value={formik.values.jenisKunjungan}
                                                            onChange={formik.handleChange}
                                                        />
                                                        <Typography color="error">{formik.touched.jenisKunjungan && formik.errors.jenisKunjungan}</Typography>
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
                                                                placeholder='Pilih dokter'
                                                                options={doctorOptions.map(({ id, name }) => ({ value: id, label: name }))}
                                                                onChange={handleDropdownDocter}
                                                                loading={false}
                                                            />
                                                            <Typography color="error">{formik.touched.doctor && formik.errors.doctor}</Typography>
                                                        </FormControl>
                                                        <Box sx={{ ml: 2, width: "100%" }}>
                                                            <Typography>Tanggal dan Jam Operasional</Typography>
                                                            {/* <CalenderPopover title="Pilih tanggal" /> */}
                                                            <CustomCalender key={calendarKey} doctorId={idDoctor} onChange={handleScheduleChange} />
                                                        </Box>
                                                    </Box>

                                                    {/* <FormControl>
                                                        <Typography sx={{ textTransform: "capitalize" }}>Keluhan pasien</Typography>
                                                        <TextField
                                                            id="outlined-multiline-static"
                                                            multiline
                                                            rows={4}
                                                            variant="outlined"
                                                            sx={{
                                                                maxHeight: "107px",
                                                                maxWidth: "100%",
                                                                '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: '#8F85F3',
                                                                },
                                                            }}
                                                            name="keluhan"
                                                            value={formik.values.keluhan}
                                                            onChange={formik.handleChange}
                                                        />
                                                        <Typography color="error">{formik.touched.keluhan && formik.errors.keluhan}</Typography>
                                                    </FormControl> */}

                                                    {/* <Box mt={4}>
                                                        <Box>
                                                            <RadioGroup
                                                                aria-label="transport-method"
                                                                name="transport-method"
                                                                value={selectedMethod}
                                                                onChange={handleRadioChange}
                                                                sx={{ display: 'flex', flexDirection: 'column', border: '1px solid black', marginTop: '20px', marginBottom: '10px', borderRadius: '16px', padding: '16px 24px 16px 24px' }}
                                                            >
                                                                <Box display={'flex'} flexDirection={'row'} >
                                                                    <FormControlLabel value="asuransi" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Asuransi" />
                                                                    <FormControlLabel value="uang tunai dan debit" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Uang tunai dan debit" />
                                                                </Box>
                                                                {selectedMethod == 'asuransi' && (
                                                                    <Box>
                                                                        <Typography mb={'10px'} >Unggah kartu asuransi</Typography>
                                                                        <FileUploader
                                                                            onBase64Change={(base64String) =>
                                                                                formik.setFieldValue("asuranceDocs", base64String)
                                                                            }
                                                                        />
                                                                        <Typography fontSize={'14px'} color="#A8A8BD" >Ukuran file maksimal 1mb</Typography>
                                                                    </Box>
                                                                )}
                                                            </RadioGroup>
                                                        </Box>
                                                    </Box> */}
                                                    {/* <Box>
                                                        <Typography mb={'10px'} >Unggah surat rujukan</Typography>
                                                        <FileUploader
                                                            onBase64Change={(base64String) =>
                                                                formik.setFieldValue("docs", base64String)
                                                            }
                                                        />
                                                        <Typography fontSize={'14px'} color="#A8A8BD" >Ukuran file maksimal 1mb</Typography>
                                                    </Box> */}
                                                </Box>
                                            </Box>

                                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                                                <Button
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
                                                >
                                                    {isLoading ? (
                                                        <CircularProgress sx={{ color: 'white' }} size={20} />
                                                    ) : (
                                                        "Simpan"
                                                    )}
                                                </Button>

                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    )}

                    {!mainPages && (
                        <Box marginLeft={"30%"} marginTop={"10%"}>
                            <InformasiTicketAPI
                                clinic={dataTickets?.clinic || "Unknown Clinic"}
                                jadwalKonsul={dataTickets?.jadwalKonsul || "Unknown Date"}
                                namaDokter={dataTickets?.namaDokter || "Unknow Doctor"}
                                nomorAntrian={dataTickets?.nomorAntrian || "Unknown"}
                                tanggalReservasi={dataTickets?.tanggalReservasi || "Unknown Date"}
                                bookingCode=""
                            />
                        </Box>
                    )}
                </Box>
            </Container>
        </Box >
    );
}
