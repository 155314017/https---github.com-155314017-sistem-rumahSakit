import { Container, Box, Typography, Button, FormControl, OutlinedInput } from "@mui/material";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import bgImage from "../../../assets/img/String.png";
import AlertSuccess from "../../../components/small/alert/AlertSuccess";
import ImageUploaderGroup from '../../../components/medium/imageComponent/ImageUploaderGroup';
import InputCurrencyIdr from '../../../components/inputComponent/InputCurrencyIdr';
import DropdownListAPI from '../../../components/small/dropdownlist/DropdownListAPI';
import useTambahFasilitas from '../hooks/useTambahFasilitas';
import 'dayjs/locale/id';
import TestKalender from "../../../components/medium/TestKalender";

export default function TambahFasilitas() {
    const { breadcrumbItems,
        formik,
        gedungOptions,
        handleImageChange,
        errorAlert,
        successAlert,
        currentPage,
        setCurrentPage,
        getPageStyle,
        getBorderStyle,
        handleSaveFasilitas,
        kalenderRef,
        setOperationalCost
    } = useTambahFasilitas();



    return (
        <Container sx={{ py: 2, minWidth: '1500px' }}>
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box mt={3}>
                <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#FAFAFA", overflow: "hidden" }}>
                    {/* Bentuk lengkung atas */}
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

                    <Typography fontSize="20px" fontWeight="700">Tambah Fasilitas</Typography>

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
                                    Informasi Fasilitas
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
                            <Typography fontSize="20px" fontWeight="700" mb="32px" mt="54px">
                                Informasi Fasilitas
                            </Typography>
                            <ImageUploaderGroup onChange={handleImageChange} />

                            <Box component="form" noValidate autoComplete="off" mt={3}>
                                <Typography sx={{ fontSize: "16px" }}>Nama Fasilitas<span style={{ color: "red" }}>*</span></Typography>
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <OutlinedInput
                                        id="namaFasilitas"
                                        name="namaFasilitas"
                                        size="small"
                                        placeholder="Masukkan nama fasilitas"
                                        value={formik.values.namaFasilitas}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.namaFasilitas && Boolean(formik.errors.namaFasilitas)}
                                    />
                                    {formik.touched.namaFasilitas && formik.errors.namaFasilitas && (
                                        <Typography color="error">{formik.errors.namaFasilitas}</Typography>
                                    )}
                                </FormControl>

                                <Typography sx={{ fontSize: "16px", mt: 2 }}>Pilih Gedung<span style={{ color: "red" }}>*</span></Typography>
                                <DropdownListAPI
                                    options={gedungOptions.map(({ id, name }) => ({ value: id, label: name }))}
                                    placeholder="Pilih gedung"
                                    onChange={(selectedOptionValue) => {
                                        formik.setFieldValue('masterBuildingId', selectedOptionValue);
                                    }}
                                    loading={false}
                                />

                                <Typography sx={{ fontSize: "16px", mt: 2 }}>Deskripsi<span style={{ color: "red" }}>*</span></Typography>
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <OutlinedInput
                                        id="deskripsiKlinik"
                                        name="deskripsiKlinik"
                                        size="small"
                                        placeholder="Masukkan deskripsi"
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

                                <Typography sx={{ fontSize: "16px", mt: 3 }}>Biaya Penanganan<span style={{ color: "red" }}>*</span></Typography>
                                <InputCurrencyIdr onChange={(value) => setOperationalCost(parseInt(value.replace(/\D/g, '') || '0'))} defaultValue={0} />

                                <Button
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
                                    onClick={() => setCurrentPage(2)}
                                    disabled={!formik.isValid || !formik.dirty}
                                >
                                    Selanjutnya
                                </Button>
                            </Box>
                        </>
                    )}

                    {currentPage === 2 && (
                        <>
                            <TestKalender ref={kalenderRef} />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSaveFasilitas}
                                sx={{ marginTop: '20px', width: '100%', bgcolor: '#8F85F3' }}
                            >
                                Simpan
                            </Button>
                        </>
                    )}
                </Box>
            </Box>
            {successAlert && (
                <AlertSuccess label="Success adding building" />
            )}
            {errorAlert && (
                <AlertSuccess label="Error adding building" />
            )}
        </Container>
    )
}
