import { Box, Button, Container, FormControl, OutlinedInput, Typography } from "@mui/material";
import bgImage from "../../../assets/img/String.png";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import ImageUploaderGroup from '../../../components/medium/imageComponent/ImageUploaderGroup';

//hooks
import useTambahKlinik from "../hooks/useTambahKlinik";
import CustomBigCalendar from "../../../components/medium/CustomBigCalendar";
export default function TambahKlinik() {
    const { 
        breadcrumbItems,
        formik,
        handleImageChange,
        setCurrentPage,
        getPageStyle,
        getBorderStyle,
        currentPage,
        kalenderRef,
        handleSaveKlinik
    } = useTambahKlinik();
    return (
        <Container sx={{ py: 2, minWidth: '1500px' }}>
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box mt={3}>
                <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#FAFAFA", overflow: "hidden" }}>
                    {/* Membuat bentuk lengkung atas */}

                    <Box
                        position={"absolute"}
                        sx={{
                            top: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                            display: "flex",
                        }}
                    >
                        {/* Lengkung kiri */}
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
                                    bgcolor: "#FAFAFA",
                                    borderRadius: "0px 15px 0px 0px ",
                                }}
                            />
                        </Box>

                        {/* Kotak tengah */}
                        <Box
                            sx={{
                                width: "600px",
                                height: "50px",
                                bgcolor: "#F1F0FE",
                                borderRadius: "0px 0px 22px 22px",
                            }}
                        />

                        {/* Lengkung kanan */}
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
                                    bgcolor: "#FAFAFA",
                                    borderRadius: "15px 0px 0px 0px ",
                                }}
                            />
                        </Box>
                    </Box>
                    <Typography fontSize="20px" fontWeight="700">
                        Tambah Klinik
                    </Typography>

                    <Box
                        sx={{ display: "flex", flexDirection: "row", mt: 2, mb: 2, justifyContent: 'space-between', ml: 2 }}
                    >
                        <Box display={"flex"} flexDirection={"row"} width={"400px"}>
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
                                    Informasi Klinik
                                </Typography>
                            </Box>
                        </Box>

                        <Box display={"flex"} flexDirection={"row"} width={"800px"}>
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
                                    Jam Operasional
                                </Typography>
                            </Box>
                        </Box>

                    </Box>
                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="bg-image" />
                    </Box>
                    {currentPage === 1 && (
                        <>
                            <ImageUploaderGroup onChange={handleImageChange} />

                            <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
                                <Typography sx={{ fontSize: "16px" }}>Nama Klinik<span style={{ color: "red" }}>*</span></Typography>
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <OutlinedInput
                                        id="namaKlinik"
                                        name="namaKlinik"
                                        size="small"
                                        placeholder="Masukkan Nama klinik"
                                        value={formik.values.namaKlinik}
                                        onChange={formik.handleChange}
                                        onBlur={() => formik.setTouched({ ...formik.touched, namaKlinik: true })}
                                        error={formik.touched.namaKlinik && Boolean(formik.errors.namaKlinik)}
                                    />
                                    {formik.touched.namaKlinik && formik.errors.namaKlinik && (
                                        <Typography color="error">{formik.errors.namaKlinik}</Typography>
                                    )}
                                </FormControl>

                                <Typography sx={{ fontSize: "16px" }}>Deskripsi Klinik<span style={{ color: "red" }}>*</span></Typography>
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <OutlinedInput
                                        id="deskripsiKlinik"
                                        name="deskripsiKlinik"
                                        size="small"
                                        placeholder="Masukkan deskripsi klinik"
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

                                <Typography sx={{ fontSize: "16px" }}>Code Klinik<span style={{ color: "red" }}>*</span></Typography>
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <OutlinedInput
                                        id="code"
                                        name="code"
                                        size="small"
                                        placeholder="Masukkan kode klinik"
                                        value={formik.values.code}
                                        onChange={formik.handleChange}
                                        onBlur={() => formik.setTouched({ ...formik.touched, code: true })}
                                        error={formik.touched.code && Boolean(formik.errors.code)}
                                    />
                                    {formik.touched.namaKlinik && formik.errors.namaKlinik && (
                                        <Typography color="error">{formik.errors.namaKlinik}</Typography>
                                    )}
                                </FormControl>
                                {/* Tombol Submit */}
                                <Button
                                    type="submit"
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
                                    disabled={!formik.isValid || !formik.dirty} // Opsional
                                    onClick={() => setCurrentPage(2)}
                                >
                                    Selanjutnya
                                </Button>
                                {/* <ImageUploader onImagesSelected={handleImagesSelected} /> */}
                            </Box>
                        </>
                    )}
                    {currentPage === 2 && (
                        <>
                            <CustomBigCalendar ref={kalenderRef} />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSaveKlinik}
                                sx={{ marginTop: '20px', width: '100%', bgcolor: '#8F85F3' }}
                            >
                                Simpan
                            </Button>
                        </>)}
                </Box>
            </Box>
        </Container >
    )
}
