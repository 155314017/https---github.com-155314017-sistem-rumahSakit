/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Container, Box, Typography, Button, FormControl, OutlinedInput, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import BreadCrumbs from "../../components/medium/BreadCrumbs";
import bgImage from "../../assets/img/String.png";
import AlertSuccess from "../../components/small/AlertSuccess";
import DropdownList from "../../components/small/DropdownList";
import DatePickerCustom from '../../components/inputComponent/DatePickerCustom';
import PhoneInputComponent from '../../components/inputComponent/PhoneInputComponent';


interface ImageInfo {
    file: File;
    preview: string;
    name: string;
    size: string;
}

const hari = [
    { value: 1, label: "Senin" },
    { value: 2, label: "Selasa" },
    { value: 3, label: "Rabu" },
    { value: 4, label: "Kamis" },
    { value: 5, label: "Jumat" },
    { value: 6, label: "Sabtu" },
    { value: 7, label: "Minggu" },
];

export default function TambahPegawai() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);


    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Pegawai", href: "/pegawai" },
        { label: "Tambah Pegawai", href: "/tambahPegawai" },
    ];

    const rolePegawai = [
        { value: 1, label: "Dokter Spesialis" },
        { value: 2, label: "Dokter Umum" },
        { value: 3, label: "Customer Services" },
        { value: 4, label: "Manajemen" },
    ];

    const formik = useFormik({
        initialValues: {
            namaKlinik: '',
            deskripsiKlinik: '',
        },
        validationSchema: Yup.object({
            namaKlinik: Yup.string().required('Nama Klinik is required'),
            deskripsiKlinik: Yup.string().required('Deskripsi Klinik is required'),
        }),
        onSubmit: (values) => {
            console.log('Form submitted:', values);
        },
    });


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


    return (
        <Container sx={{ py: 2 }}>
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box mt={3}>
                <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}>
                    {/* membuat bentuk lengkung atas */}
                    <Box
                        position={"absolute"}
                        sx={{
                            top: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                            display: "flex",
                        }}
                    >
                        {/* lengkung kiri */}
                        <Box
                            sx={{
                                width: "50px",
                                height: "30px",
                                bgcolor: "#F1F0FE",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "50px",
                                    height: "30px",
                                    bgcolor: "#fff",
                                    borderRadius: "0px 15px 0px 0px ",
                                }}
                            />
                        </Box>

                        {/* kotak tengah */}
                        <Box
                            sx={{
                                width: "600px",
                                height: "50px",
                                bgcolor: "#F1F0FE",
                                borderRadius: "0px 0px 22px 22px",
                            }}
                        />

                        {/* lengkung kanan */}
                        <Box
                            sx={{
                                width: "50px",
                                height: "30px",
                                bgcolor: "#F1F0FE",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "50px",
                                    height: "30px",
                                    bgcolor: "#fff",
                                    borderRadius: "15px 0px 0px 0px ",
                                }}
                            />
                        </Box>
                    </Box>
                    {/* ---------- */}
                    <Typography fontSize="20px" fontWeight="700">Formulir Tambah Pegawai</Typography>
                    <Box
                        sx={{ display: "flex", flexDirection: "row", mt: 2, mb: 2, gap:42 }}
                    >
                        <Box display={"flex"} flexDirection={"row"} width={"290px"}>
                            <Box
                                display={"flex"}
                                flexDirection={"row"}
                                alignItems="center"
                                onClick={() => setCurrentPage(1)}
                                sx={getPageStyle(1)}
                                mx={2}
                            >
                                <Box sx={getBorderStyle(1)}>1</Box>
                                <Typography sx={{ ml: 1 }}>
                                    Biodata Pegawai
                                </Typography>
                            </Box>
                        </Box>

                        <Box display={"flex"} flexDirection={"row"} width={"290px"}>
                            <Box
                                display={"flex"}
                                flexDirection={"row"}
                                alignItems="center"
                                onClick={() => setCurrentPage(2)}
                                sx={getPageStyle(2)}
                                mx={2}
                            >
                                <Box sx={getBorderStyle(2)}>2</Box>
                                <Typography sx={{ ml: 1 }}>
                                    Hak Akses Pegawai
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="bg-image" />
                    </Box>

                    {currentPage === 1 && (
                        <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
                            <Typography fontWeight={600} fontSize={"16px"} mb={4} >1. Biodata</Typography>
                            <Typography sx={{ fontSize: "16px" }}>NIP (Nomor Induk Pegawai) </Typography>
                            <FormControl fullWidth sx={{ my: 1 }}>
                                <OutlinedInput
                                    id="nip"
                                    name="nip"
                                    size="small"
                                    placeholder="123456789"
                                    disabled
                                    sx={{ bgcolor: '#EEEEF2' }}
                                // value={formik.values.namaKlinik}
                                // onChange={formik.handleChange}
                                // onBlur={() => formik.setTouched({ ...formik.touched, namaKlinik: true })}
                                // error={formik.touched.namaKlinik && Boolean(formik.errors.namaKlinik)}
                                />
                                {/* {formik.touched.namaKlinik && formik.errors.namaKlinik && (
                                    <Typography color="error">{formik.errors.namaKlinik}</Typography>
                                )} */}
                            </FormControl>

                            <Typography sx={{ fontSize: "16px" }}>Nama Pegawai<span style={{ color: "red" }}>*</span></Typography>
                            <FormControl fullWidth sx={{ my: 1 }}>
                                <OutlinedInput
                                    id="namaKlinik"
                                    name="namaKlinik"
                                    size="small"
                                    placeholder="Masukkan Nama Pegawai"
                                    value={formik.values.namaKlinik}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.setTouched({ ...formik.touched, namaKlinik: true })}
                                    error={formik.touched.namaKlinik && Boolean(formik.errors.namaKlinik)}
                                />
                                {formik.touched.namaKlinik && formik.errors.namaKlinik && (
                                    <Typography color="error">{formik.errors.namaKlinik}</Typography>
                                )}
                            </FormControl>

                            <Typography sx={{ fontSize: "16px" }}>Tanggal Lahir<span style={{ color: "red" }}>*</span></Typography>
                            <DatePickerCustom />

                            <Typography sx={{ fontSize: "16px" }}>Alamat Tempat TInggal<span style={{ color: "red" }}>*</span></Typography>
                            <FormControl fullWidth sx={{ my: 1 }}>
                                <OutlinedInput
                                    id="deskripsiKlinik"
                                    name="deskripsiKlinik"
                                    size="small"
                                    placeholder="Masukkan alamat tempat tinggal pegawai"
                                    value={formik.values.deskripsiKlinik}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.setTouched({ ...formik.touched, deskripsiKlinik: true })}
                                    error={formik.touched.deskripsiKlinik && Boolean(formik.errors.deskripsiKlinik)}
                                    sx={{ height: '107px', alignItems: 'flex-start', borderRadius: '8px' }}
                                />
                                {formik.touched.deskripsiKlinik && formik.errors.deskripsiKlinik && (
                                    <Typography color="error">{formik.errors.deskripsiKlinik}</Typography>
                                )}
                            </FormControl>

                            <Typography>Jenis Kelamin<span style={{ color: 'red' }} >*</span></Typography>

                            <Box
                                display={'flex'}
                                flexDirection={'row'}
                                padding={"3px"}
                                border={"1px solid #A8A8BD"}
                                mt={2}
                                borderRadius={"12px"}
                                pl={2}
                            >
                                <RadioGroup
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

                            <Typography mt={2} >Status<span style={{ color: 'red' }} >*</span></Typography>
                            <FormControl sx={{ width: '100%' }} >
                                <OutlinedInput
                                    id="deskripsiKlinik"
                                    name="deskripsiKlinik"
                                    size="small"
                                    placeholder="Masukkan status pegawai"
                                    sx={{ borderRadius: '8px' }}
                                />
                            </FormControl>


                            <Typography mt={2} >Email<span style={{ color: 'red' }} >*</span></Typography>
                            <FormControl sx={{ width: '100%' }} >
                                <OutlinedInput
                                    id="deskripsiKlinik"
                                    name="deskripsiKlinik"
                                    size="small"
                                    placeholder="Masukkan email pegawai"
                                    sx={{ borderRadius: '8px' }}
                                />
                            </FormControl>

                            <Typography mt={2} >No. Handphone<span style={{ color: 'red' }} >*</span></Typography>
                            <PhoneInputComponent heightInput='44px' widthInput='100%' />
                            <Typography mt={2} >Role Pegawai<span style={{ color: 'red' }} >*</span></Typography>
                            <DropdownList placeholder='Pilih role pegawai' options={rolePegawai} />

                            <Button
                                type="submit"
                                // onClick={showTemporaryAlertSuccess}
                                onClick={() => setCurrentPage(2)}
                                variant="contained"
                                color="inherit"
                                sx={{
                                    mt: 8,
                                    width: "100%",
                                    bgcolor: "#8F85F3",
                                    color: "#fff",
                                    textTransform: "none",
                                    borderRadius: "8px",
                                    ":hover": { bgcolor: "#a098f5" },
                                }}
                                disabled={!formik.isValid || !formik.dirty}
                            >
                                Selanjutnya
                            </Button>
                        </Box>
                    )}

                    {currentPage === 2 &&(
                        <Box mt={3} >
                            <Typography fontWeight={600} fontSize={"16px"} mb={4} >1. Hak Akses Pegawai</Typography>
                        </Box>
                    )}
                </Box>
            </Box>
            {successAlert && (
                <AlertSuccess label="Success adding building" />
            )}


        </Container>
    );
}
