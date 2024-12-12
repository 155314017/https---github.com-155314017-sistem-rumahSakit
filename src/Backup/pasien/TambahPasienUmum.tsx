import { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    OutlinedInput,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import BreadCrumbs from "../../components/medium/BreadCrumbs";
import bgImage from "../../assets/img/String.png";
import FileUploader from '../../components/medium/FileUploader';
import { doctors } from '../../dummyData/dummyData';
import PhoneInput from 'react-phone-input-2';
import SwitchCustom from '../../components/small/SwitchCustom';
import CustomCalender from '../../components/medium/CustomCalender';
import InformasiTicket from '../../components/small/InformasiTicket';

export default function TambahPasienUmum() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [guardFullPage, setGuardFullPage] = useState(true);
    const [patientFullPage, setPatientFullsPage] = useState(true);
    const [switchValue, setSwitchValue] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [mainPages, setMainPages] = useState(true);
    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Pasien", href: "/pasien" },
        { label: "Tambah Pasien", href: "/tambahPasien/Umum" },
    ];

    const formik = useFormik({
        initialValues: {
            namaKlinik: '',
            deskripsiKlinik: '',
            nik: '',
            // phonePasien: '',
            caraDatang: '',
            namaPenanggungJawab: '',
            phonePenanggungJawab: '',
            hubungan: '',
            jenisPembayaran: '',
            jenisKunjungan: '',
            poli: '',
            doctor: '',
            keluhan: '',
            riwayatPenyakit: '',
            alergi: '',
        },
        validationSchema: Yup.object({
            nik: Yup.string().required('NIK is required'),
            // phonePasien: Yup.string().required('No. Handphone Pasien is required'),
            caraDatang: Yup.string().required('Cara datang is required'),
            namaPenanggungJawab: Yup.string().required('Nama lengkap penanggung jawab is required'),
            phonePenanggungJawab: Yup.string().required('No. Handphone penanggung jawab is required'),
            hubungan: Yup.string().required('Hubungan penanggung jawab dengan pasien is required'),
            jenisPembayaran: Yup.string().required('Jenis Pembayaran is required'),
            jenisKunjungan: Yup.string().required('Jenis Kunjungan is required'),
            poli: Yup.string().required('Poli yang dituju is required'),
            doctor: Yup.string().required('Pilih Dokter is required'),
            keluhan: Yup.string().required('Keluhan pasien is required'),
            riwayatPenyakit: Yup.string().required('Riwayat penyakit is required'),
            alergi: Yup.string().required('Alergi is required'),
        }),
        onSubmit: (values) => {
            console.log('Form submitted:', values);
        },
    });

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMethod(event.target.value);
    };

    const getPageStyle = (page: number) => {
        if (page === currentPage) {
            return { color: "#8F85F3", cursor: "pointer", fontWeight: "bold" };
        } else if (page < currentPage) {
            return { color: "#8F85F3", cursor: "pointer" };
        } else {
            return { color: "black", cursor: "pointer" };
        }
    };

    const getBorderStyle = (page: number) => {
        if (page === currentPage) {
            return {
                display: "flex",
                border: "1px solid #8F85F3",
                width: "38px",
                height: "38px",
                borderRadius: "8px",
                justifyContent: "center",
                alignItems: "center",
            };
        } else if (page < currentPage) {
            return {
                display: "flex",
                border: "1px solid #8F85F3",
                width: "38px",
                height: "38px",
                borderRadius: "8px",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#8F85F3",
                color: "white",
            };
        } else {
            return {
                display: "flex",
                border: "1px solid #8F85F3",
                width: "38px",
                height: "38px",
                borderRadius: "8px",
                justifyContent: "center",
                alignItems: "center",
                color: "#8F85F3",
            };
        }
    };

    const isCurrentPageValid = () => {
        if (currentPage === 1) {
            return formik.values.nik;
        } else if (currentPage === 2) {
            return formik.values.caraDatang && formik.values.namaPenanggungJawab && formik.values.phonePenanggungJawab && formik.values.hubungan;
        } else if (currentPage === 3) {
            return formik.values.jenisPembayaran && formik.values.jenisKunjungan && formik.values.poli && formik.values.doctor && formik.values.keluhan && formik.values.riwayatPenyakit && formik.values.alergi;
        }
        return false;
    };

    const handleSwitchChange = (value: boolean) => {
        setSwitchValue(value);
        console.log('Switch value:', value);
    };

    return (
        <Container sx={{ py: 2 }}>
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box mt={3}>
                {mainPages && (
                    <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden", height: 'fit-content' }}>
                        <Box position={"absolute"} sx={{ top: 0, left: "50%", transform: "translateX(-50%)", display: "flex" }}>
                            <Box sx={{ width: "50px", height: "30px", bgcolor: "#F1F0FE" }}>
                                <Box sx={{ width: "50px", height: "30px", bgcolor: "#fff", borderRadius: "0px 15px 0px 0px " }} />
                            </Box>
                            <Box sx={{ width: "600px", height: "50px", bgcolor: "#F1F0FE", borderRadius: "0px 0px 22px 22px" }} />
                            <Box sx={{ width: "50px", height: "30px", bgcolor: "#F1F0FE" }}>
                                <Box sx={{ width: "50px", height: "30px", bgcolor: "#fff", borderRadius: "15px 0px 0px 0px " }} />
                            </Box>
                        </Box>
                        <Typography fontSize="20px" fontWeight="700" maxWidth={'20%'}>Formulir pendafataran pasien Umum</Typography>
                        <Box sx={{ display: "flex", flexDirection: "row", mt: 2, mb: 2, gap: 12 }}>
                            <Box display={"flex"} flexDirection={"row"} width={"290px"}>
                                <Box display={"flex"} flexDirection={"row"} alignItems="center" onClick={() => setCurrentPage(1)} sx={getPageStyle(1)} mx={2}>
                                    <Box sx={getBorderStyle(1)}>1</Box>
                                    <Typography sx={{ ml: 1 }}>Data diri pasien</Typography>
                                </Box>
                            </Box>
                            <Box display={"flex"} flexDirection={"row"} width={"290px"}>
                                <Box display={"flex"} flexDirection={"row"} alignItems="center" onClick={() => setCurrentPage(2)} sx={getPageStyle(2)} mx={2}>
                                    <Box sx={getBorderStyle(2)}>2</Box>
                                    <Typography sx={{ ml: 1 }}>Data diri Penanggung Jawab Pasien</Typography>
                                </Box>
                            </Box>
                            <Box display={"flex"} flexDirection={"row"} width={"290px"}>
                                <Box display={"flex"} flexDirection={"row"} alignItems="center" onClick={() => setCurrentPage(3)} sx={getPageStyle(3)} mx={2}>
                                    <Box sx={getBorderStyle(3)}>3</Box>
                                    <Typography sx={{ ml: 1 }}>Jenis Kunjungan dan Keluhan</Typography>
                                </Box>
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
                                            sx={{ borderRadius: '8px', height: '48px' }}
                                            placeholder='Masukkan NIK ktp'
                                            value={formik.values.nik}
                                            onChange={formik.handleChange}
                                            name="nik"
                                        />
                                        <Typography color="error">{formik.touched.nik && formik.errors.nik}</Typography>
                                        <Button
                                            type="button"
                                            // onClick={() => patientPage ? setPatientPage(true) : setCurrentPage(2)}
                                            onClick={() => setPatientFullsPage(false)}
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
                                                    sx={{ borderRadius: '8px', height: '48px', width: '100%' }}
                                                    placeholder='Masukkan NIK ktp'
                                                    value={formik.values.nik}
                                                    onChange={formik.handleChange}
                                                    name="nik"
                                                />
                                                <Typography>Email</Typography>
                                                <OutlinedInput
                                                    sx={{ borderRadius: '8px', height: '48px', width: '100%' }}
                                                    placeholder='Masukkan email'
                                                    // value={formik.values.nik}
                                                    onChange={formik.handleChange}
                                                    name="nik"
                                                />
                                                <Typography>No Handphone pasien</Typography>
                                                <PhoneInput
                                                    country={"id"}
                                                    value={"62"}
                                                    // onChange={(phone) => setFieldValue("phone", phone)}
                                                    // disabled={switchValue}
                                                    onChange={(value) => console.log("nomor: ", value)}
                                                    inputStyle={{
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
                                                />
                                                <Typography>Nama lengkap pasien</Typography>
                                                <OutlinedInput
                                                    sx={{ width: '100%', maxHeight: '44px', backgroundColor: '#FAFAFA', borderRadius: '8px' }}
                                                    name="namaPenanggungJawab"
                                                    value={formik.values.namaPenanggungJawab}
                                                    onChange={formik.handleChange}
                                                />
                                                <Typography color="error">{formik.touched.namaPenanggungJawab && formik.errors.namaPenanggungJawab}</Typography>
                                                <Typography color="error">{formik.touched.phonePenanggungJawab && formik.errors.phonePenanggungJawab}</Typography>
                                                <Typography>Jenis Kelamin<span style={{ color: 'red' }} >*</span></Typography>
                                                <Box
                                                    display={'flex'}
                                                    flexDirection={'row'}
                                                    padding={"3px"}
                                                    border={"1px solid #A8A8BD"}
                                                    mt={2}
                                                    borderRadius={"12px"}
                                                    pl={2}
                                                    width={"100%"}
                                                >
                                                    <RadioGroup
                                                        sx={{
                                                            width: "100%",
                                                            gap: '15px'
                                                        }}
                                                        row // Mengatur radio button secara horizontal
                                                    // value={selectedValue}
                                                    // onChange={handleChange}
                                                    >
                                                        <FormControlLabel
                                                            value="pria"
                                                            control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />}
                                                            label="Pria"
                                                        />
                                                        <FormControlLabel
                                                            value="wanita"
                                                            control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />}
                                                            label="Wanita"
                                                        />
                                                    </RadioGroup>
                                                </Box>
                                                <Typography>Alamat tempat tinggal pasien</Typography>
                                                <OutlinedInput
                                                    id="deskripsiKlinik"
                                                    name="deskripsiKlinik"
                                                    size="small"
                                                    placeholder="Masukkan deskripsi"
                                                    // value={formik.values.deskripsiKlinik}
                                                    onChange={formik.handleChange}
                                                    onBlur={() => formik.setTouched({ ...formik.touched, deskripsiKlinik: true })}
                                                    error={formik.touched.deskripsiKlinik && Boolean(formik.errors.deskripsiKlinik)}
                                                    sx={{ height: '107px', alignItems: 'flex-start', borderRadius: '8px', width: '100%' }}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Button
                                        type="button"
                                        onClick={() => setCurrentPage(2)}
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
                                            sx={{ borderRadius: '8px', height: '48px' }}
                                            placeholder='Masukkan NIK ktp'
                                            value={formik.values.nik}
                                            onChange={formik.handleChange}
                                            name="nik"
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
                                                    <SwitchCustom onChangeValue={handleSwitchChange} defaultValue={switchValue} />
                                                    <Typography>NIK (Nomor induk kependudukan) Penanggung jawab</Typography>
                                                    <OutlinedInput
                                                        sx={{ borderRadius: '8px', height: '48px', width: '100%' }}
                                                        placeholder='Masukkan NIK ktp'
                                                        value={formik.values.nik}
                                                        onChange={formik.handleChange}
                                                        name="nik"
                                                        disabled
                                                    />
                                                    <Typography>Email</Typography>
                                                    <OutlinedInput
                                                        sx={{ borderRadius: '8px', height: '48px', width: '100%', mb: 2 }}
                                                        placeholder='Masukkan email'
                                                        value={formik.values.nik}
                                                        onChange={formik.handleChange}
                                                        name="nik"
                                                    />
                                                    <PhoneInput
                                                        country={"id"}
                                                        value={"62"}
                                                        // onChange={(phone) => setFieldValue("phone", phone)}
                                                        // disabled={switchValue}
                                                        onChange={(value) => console.log("nomor: ", value)}
                                                        disabled
                                                        inputStyle={{
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
                                                    />
                                                    <Typography>Nama lengkap penanggung jawab</Typography>
                                                    <OutlinedInput
                                                        sx={{ width: '100%', maxHeight: '44px', backgroundColor: '#FAFAFA', borderRadius: '8px' }}
                                                        name="namaPenanggungJawab"
                                                        value={formik.values.namaPenanggungJawab}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <Typography color="error">{formik.touched.namaPenanggungJawab && formik.errors.namaPenanggungJawab}</Typography>
                                                    <Typography color="error">{formik.touched.phonePenanggungJawab && formik.errors.phonePenanggungJawab}</Typography>
                                                    <Typography>Cara datang/pengantar</Typography>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            border: "1px solid #A8A8BD",
                                                            borderRadius: "16px",
                                                            padding: '8px',
                                                            pl: '21px',
                                                            pr: '21px',
                                                            justifyContent: 'space-between',
                                                            width: "95%",
                                                        }}
                                                    >
                                                        <FormControlLabel value="sendiri" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Sendiri" />
                                                        <FormControlLabel value="keluarga" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Keluarga" />
                                                        <FormControlLabel value="polisi" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Polisi" />
                                                        <FormControlLabel value="ambulan" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Ambulan" />
                                                        <FormControlLabel value="lainnya" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Lainnya" />
                                                    </RadioGroup>
                                                    {/* <FormControl fullWidth sx={{ mb: 2 }}>
                                                    <Select
                                                        labelId="relation-label"
                                                        sx={{
                                                            width: '100%',
                                                            height: '44px',
                                                            backgroundColor: '#FAFAFA',
                                                            borderRadius: '8px',
                                                        }}
                                                        name="hubungan"
                                                        value={formik.values.hubungan}
                                                        onChange={formik.handleChange}
                                                    >
                                                        <MenuItem value="anak">Anak</MenuItem>
                                                        <MenuItem value="orang tua">Orang Tua</MenuItem>
                                                        <MenuItem value="kerabat">Kerabat</MenuItem>
                                                    </Select>
                                                    <Typography color="error">{formik.touched.hubungan && formik.errors.hubungan}</Typography>
                                                </FormControl> */}
                                                    <Typography>Jenis Kelamin</Typography>
                                                    <RadioGroup
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            border: "1px solid #A8A8BD",
                                                            borderRadius: "16px",
                                                            padding: '8px',
                                                            pl: '21px',
                                                            pr: '21px',
                                                            justifyContent: 'flex-start',
                                                            width: "95%",
                                                        }}
                                                        row // Mengatur radio button secara horizontal
                                                    // value={selectedValue}
                                                    // onChange={handleChange}
                                                    >
                                                        <FormControlLabel
                                                            value="pria"
                                                            control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />}
                                                            label="Pria"
                                                        />
                                                        <FormControlLabel
                                                            value="wanita"
                                                            control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />}
                                                            label="Wanita"
                                                        />
                                                    </RadioGroup>
                                                    <Typography>Alamat tempat tinggal penanggung jawab</Typography>
                                                    <OutlinedInput
                                                        id="deskripsiKlinik"
                                                        name="deskripsiKlinik"
                                                        size="small"
                                                        placeholder="Masukkan deskripsi"
                                                        // value={formik.values.deskripsiKlinik}
                                                        onChange={formik.handleChange}
                                                        onBlur={() => formik.setTouched({ ...formik.touched, deskripsiKlinik: true })}
                                                        error={formik.touched.deskripsiKlinik && Boolean(formik.errors.deskripsiKlinik)}
                                                        sx={{ height: '107px', alignItems: 'flex-start', borderRadius: '8px', width: '100%' }}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Button
                                            type="button"
                                            onClick={() => setCurrentPage(3)}
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
                                                                border: "1px solid #8F85F3",
                                                                "& input": {
                                                                    height: "44px",
                                                                    padding: "0",
                                                                },
                                                                "& fieldset": {
                                                                    borderColor: "#8F85F3",
                                                                },
                                                                "&:hover fieldset": {
                                                                    borderColor: "#7A73E3",
                                                                },
                                                                "&.Mui-focused fieldset": {
                                                                    borderColor: "#6B63D1",
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
                                                <FormControl sx={{ mb: 2, width: '100%' }}>
                                                    <Select
                                                        labelId="poli-label"
                                                        sx={{ height: '38px' }}
                                                        name="poli"
                                                        value={formik.values.poli}
                                                        onChange={formik.handleChange}
                                                    >
                                                        <MenuItem sx={{ color: '#8F85F3' }} value="poli1">Poli Umum</MenuItem>
                                                        <MenuItem sx={{ color: '#8F85F3' }} value="poli2">Poli Gigi</MenuItem>
                                                        <MenuItem sx={{ color: '#8F85F3' }} value="poli3">Poli Anak</MenuItem>
                                                    </Select>
                                                    <Typography color="error">{formik.touched.poli && formik.errors.poli}</Typography>
                                                </FormControl>
                                                <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"} sx={{ width: "100%" }}>
                                                    <FormControl sx={{ mt: 2, mb: 2, width: "100%" }} size="small">
                                                        <InputLabel id="doctor-label">Pilih Dokter</InputLabel>
                                                        <Select
                                                            labelId="doctor-label"
                                                            label="Pilih Dokter"
                                                            sx={{ width: "100%", borderRadius: "8px" }}
                                                            name="doctor"
                                                            value={formik.values.doctor}
                                                            onChange={formik.handleChange}
                                                        >
                                                            {doctors.map((doctor) => (
                                                                <MenuItem key={doctor.value} value={doctor.value} sx={{ color: "#8F85F3" }}>
                                                                    {doctor.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                        <Typography color="error">{formik.touched.doctor && formik.errors.doctor}</Typography>
                                                    </FormControl>
                                                    <Box sx={{ ml: 2, width: "100%" }}>
                                                        {/* <CalenderPopover title="Pilih tanggal" /> */}
                                                        <CustomCalender doctorId='1' onChange={() => console.log('r')} />
                                                    </Box>
                                                </Box>

                                                <FormControl>
                                                    <Typography sx={{ textTransform: "capitalize" }}>Keluhan pasien</Typography>
                                                    <TextField
                                                        id="outlined-multiline-static"
                                                        multiline
                                                        rows={4}
                                                        variant="outlined"
                                                        sx={{ maxHeight: "107px", maxWidth: "100%" }}
                                                        name="keluhan"
                                                        value={formik.values.keluhan}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <Typography color="error">{formik.touched.keluhan && formik.errors.keluhan}</Typography>
                                                </FormControl>

                                                <Box mt={4}>
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
                                                                    <FileUploader />
                                                                    <Typography fontSize={'14px'} color="#A8A8BD" >Ukuran file maksimal 1mb</Typography>
                                                                </Box>
                                                            )}
                                                        </RadioGroup>
                                                    </Box>
                                                </Box>
                                                <Box>
                                                    <Typography mb={'10px'} >Unggah surat rujukan</Typography>
                                                    <FileUploader />
                                                    <Typography fontSize={'14px'} color="#A8A8BD" >Ukuran file maksimal 1mb</Typography>
                                                </Box>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                                            <Button
                                                onClick={() => setMainPages(false)}
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
                                            // onClick={formik.handleSubmit}
                                            >
                                                Simpan
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
                        <InformasiTicket />
                    </Box>
                )}
            </Box>
        </Container>
    );
}