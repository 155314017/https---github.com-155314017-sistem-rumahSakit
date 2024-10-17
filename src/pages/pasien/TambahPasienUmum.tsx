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

export default function TambahPasienUmum() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Pasien", href: "/pasien" },
        { label: "Tambah Pasien", href: "/tambahPasien/Umum" },
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
                    <Typography fontSize="20px" fontWeight="700">Formulir pendafataran pasien Umum</Typography>
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
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                            }}
                        >
                            <Box>
                                <Box
                                    bgcolor={"#EEEEF2"}
                                    height={"272px"}
                                    width={"100%"}
                                    borderRadius={"16px"}
                                    paddingLeft={"5px"}
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    marginBottom={"30px"}
                                >
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="flex-start"
                                        gap={"15px"}
                                    >
                                        <Typography marginLeft={"15px"} fontSize={"20px"} fontWeight={600}>Data diri pasien</Typography>
                                        <Box display={"flex"} flexDirection={"column"} gap={'5px'} padding={'5px'} width={'90%'}>
                                            <Typography marginLeft={"15px"} fontSize={"16px"} mb={"-10px"}>Unggah KTP pasien</Typography>
                                            <Box ml={2} mt={1} mb={1} width={'100%'}>
                                                <FileUploader />
                                            </Box>
                                            <Typography marginLeft={"15px"} mt={"-10px"} fontSize={"14px"} color="#A8A8BD" >Ukuran file maksimal 1mb</Typography>
                                        </Box>

                                        <Box width={'100%'} >
                                            <Typography marginLeft={"25px"}>No. Handphone pasien</Typography>
                                            <Box ml={2} >
                                                <PhoneInputComponent widthInput="92%" heightInput="44px" />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box>
                                    <Box
                                        bgcolor={"#EEEEF2"}
                                        height={"544px"}
                                        width={"100%"}
                                        borderRadius={"16px"}
                                        paddingLeft={"5px"}
                                        display="flex"
                                        flexDirection="column"
                                        marginBottom={"30px"}
                                    >
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            gap={"15px"}
                                            padding={'20px'}
                                        >
                                            <Typography fontSize={'20px'} fontWeight={600} >Data diri penanggung jawab pasien</Typography>
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
                                                        width: '91%',
                                                        justifyContent: 'space-between'
                                                    }}
                                                >
                                                    <FormControlLabel value="sendiri" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Sendiri" />
                                                    <FormControlLabel value="keluarga" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Keluarga" />
                                                    <FormControlLabel value="polisi" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Polisi" />
                                                    <FormControlLabel value="ambulan" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Ambulan" />
                                                    <FormControlLabel value="lainnya" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Lainnya" />
                                                </RadioGroup>
                                            </FormControl>

                                            <Box mt={"3%"} >
                                                <Typography  >No. Handphone pasien</Typography>
                                                <PhoneInputComponent widthInput="92%" heightInput="44px" />
                                                <Typography mt={"2%"}>Nama lengkap penanggung jawab</Typography>
                                                <TextField sx={{ width: '92%', maxHeight: '44px', backgroundColor: '#FAFAFA', borderRadius: '8px' }} InputProps={{
                                                    sx: {
                                                        height: '44px',
                                                        borderRadius: '8px',
                                                        padding: 0,
                                                    },
                                                }} />
                                                <Typography mt={2} >No. Handphone penanggung jawab</Typography>
                                                <PhoneInputComponent widthInput="92%" heightInput="44px" />
                                                <Box mt={2} >
                                                    <Typography>Hubungan penanggung jawab dengan pasien</Typography>
                                                    <FormControl fullWidth sx={{ mb: 2 }}>
                                                        <Select
                                                            labelId="relation-label"
                                                            sx={{
                                                                width: '92%',
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
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                            </Box>
                            <Button
                                type="submit"
                                // onClick={showTemporaryAlertSuccess}
                                onClick={() => setCurrentPage(2)}
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
                                            <Typography>Jenis Pembayaran?</Typography>
                                            <Box>
                                                <RadioGroup
                                                    aria-label="transport-method"
                                                    name="transport-method"
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        border: "1px solid black",
                                                        marginTop: "20px",
                                                        marginBottom: "10px",
                                                        borderRadius: "16px",
                                                        padding: "16px 24px 16px 24px",
                                                    }}
                                                >
                                                    <Box display={"flex"} flexDirection={"row"}>
                                                        <FormControlLabel
                                                            value="asuransi"
                                                            control={
                                                                <Radio
                                                                    sx={{
                                                                        "&.Mui-checked": { color: "#7367F0" },
                                                                    }}
                                                                />
                                                            }
                                                            label="Asuransi"
                                                        />
                                                        <FormControlLabel
                                                            value="uang tunai dan debit"
                                                            control={
                                                                <Radio
                                                                    sx={{
                                                                        "&.Mui-checked": { color: "#7367F0" },
                                                                    }}
                                                                />
                                                            }
                                                            label="Uang tunai dan debit"
                                                        />
                                                    </Box>
                                                </RadioGroup>
                                            </Box>

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
                                                    <Typography>Unggah surat rujukan</Typography>
                                                    <FileUploader />
                                                    <Typography fontSize={"14px"} color="#A8A8BD">
                                                        Ukuran maksimal 1mb
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box mt={1} >
                                                <Typography>Apakah pasien ada riwayat penyakit</Typography>
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
                                                        mt: 1
                                                    }}
                                                >
                                                    <FormControlLabel value="sendiri" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Iya" />
                                                    <FormControlLabel value="keluarga" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Tidak" />
                                                </RadioGroup>
                                            </Box>

                                            <Box mt={1} >
                                                <Typography>Apakah pasien ada alergi</Typography>
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
                                                        mt: 1
                                                    }}
                                                >
                                                    <FormControlLabel value="sendiri" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Iya" />
                                                    <FormControlLabel value="keluarga" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Tidak" />
                                                </RadioGroup>
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
