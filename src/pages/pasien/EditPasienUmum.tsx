import { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
    FormControl,
    OutlinedInput,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormLabel,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import BreadCrumbs from "../../components/medium/BreadCrumbs";
import bgImage from "../../assets/img/String.png";
import PhoneInputComponent from '../../components/inputComponent/PhoneInputComponent';
import FileUploader from '../../components/medium/FileUploader';
import CalenderPopover from '../../components/medium/CalenderPopover';
import { doctors } from '../../dummyData/dummyData';


export default function EditPasienUmum() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Pasien", href: "/pasien" },
        { label: "Tambah pasien", href: "/editPasien/Umum" },
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
                <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden", height: 'fit-content' }}>
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
                    <Typography fontSize="20px" fontWeight="700">Edit pasien Umum </Typography>
                    <Box
                        sx={{ display: "flex", flexDirection: "row", mt: 2, mb: 2, gap: 42 }}
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
                                    Penanggung Jawab Pasien
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
                                    Jenis Kunjungan dan Keluhan
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="bg-image" />
                    </Box>

                    {currentPage === 1 && (
                        <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
                            <Box >
                                <FormControl sx={{ width: "100%", height: "56px" }}>
                                    <FormLabel sx={{ fontSize: '16px', lineHeight: '18px', marginBottom: '15px', color: 'black' }}>
                                        Cara datang/pengantar
                                    </FormLabel>
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
                                        }}
                                    >
                                        <FormControlLabel value="sendiri" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Sendiri" />
                                        <FormControlLabel value="keluarga" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Keluarga" />
                                        <FormControlLabel value="polisi" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Polisi" />
                                        <FormControlLabel value="ambulan" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Ambulan" />
                                        <FormControlLabel value="lainnya" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Lainnya" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>

                            <Typography sx={{ fontSize: "16px", mt: 6 }}>Nama Pegawai<span style={{ color: "red" }}>*</span></Typography>
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

                            <Typography mt={2} >No. Handphone<span style={{ color: 'red' }} >*</span></Typography>
                            <PhoneInputComponent heightInput='44px' widthInput='100%' />

                            <Typography mt={2} >Hubungan dengan penanggung jawab pasien<span style={{ color: 'red' }} >*</span></Typography>
                            <FormControl fullWidth sx={{ mt: 1, mb: 2 }}>
                                <InputLabel id="relation-label">Hubungan</InputLabel>
                                <Select
                                    labelId="relation-label"
                                    label="Hubungan"
                                    sx={{
                                        width: '100%',
                                        height: '44px',
                                        backgroundColor: '#FAFAFA',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <MenuItem value="anak">Anak</MenuItem>
                                    <MenuItem value="orang tua">Orang Tua</MenuItem>
                                    <MenuItem value="kerabat">Kerabat</MenuItem>
                                </Select>
                            </FormControl>

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

                    {currentPage === 2 && (
                        <Box mt={3} >
                            <Box
                                sx={{
                                    display: "flex",
                                }}
                            >
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
                                                />
                                            </FormControl>
                                            <Typography>Poli yang dituju</Typography>
                                            <FormControl sx={{ mb: 2, width: '100%' }}>
                                                <Select
                                                    labelId="poli-label"
                                                    sx={{ height: '38px' }}
                                                >
                                                    <MenuItem sx={{ color: '#8F85F3' }} value="poli1">Poli Umum</MenuItem>
                                                    <MenuItem sx={{ color: '#8F85F3' }} value="poli2">Poli Gigi</MenuItem>
                                                    <MenuItem sx={{ color: '#8F85F3' }} value="poli3">Poli Anak</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <Box
                                                display={"flex"}
                                                flexDirection={"row"}
                                                justifyContent={"center"}
                                                alignItems={"center"}
                                                sx={{ width: "100%" }}
                                            >
                                                <FormControl sx={{ mt: 2, mb: 2, width: "100%" }} size="small">
                                                    <InputLabel id="doctor-label">
                                                        Pilih Dokter
                                                    </InputLabel>
                                                    <Select
                                                        labelId="doctor-label"
                                                        label="Pilih Dokter"
                                                        sx={{ width: "100%", borderRadius: "8px" }}
                                                    >
                                                        {doctors.map((doctor) => (
                                                            <MenuItem
                                                                key={doctor.value}
                                                                value={doctor.value}
                                                                sx={{ color: "#8F85F3" }}
                                                            >
                                                                {doctor.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>

                                                <Box sx={{ ml: 2, width: "100%" }}>
                                                    <CalenderPopover title="Pilih tanggal" />
                                                </Box>
                                            </Box>

                                            <FormControl>
                                                <Typography sx={{ textTransform: "capitalize" }}>keluhan pasien</Typography>
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    multiline
                                                    rows={4}
                                                    variant="outlined"
                                                    sx={{ maxHeight: "107px", maxWidth: "100%" }}
                                                />
                                            </FormControl>

                                            <Box mt={4}>
                                                <Box>
                                                    <Typography>Unggah kartu BPJS</Typography>
                                                    <FileUploader />
                                                    <Typography fontSize={"14px"} color="#A8A8BD">
                                                        Ukuran maksimal 1mb
                                                    </Typography>
                                                </Box>

                                                <Box mt={2}>
                                                    <Typography>Unggah surat rujukan BPJS</Typography>
                                                    <FileUploader />
                                                    <Typography fontSize={"14px"} color="#A8A8BD">
                                                        Ukuran maksimal 1mb
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            mt: 4,
                                        }}
                                    >
                                        <Button
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
                                            Simpan
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>


                    )}
                </Box>
            </Box>


        </Container>
    );
}
