import { Box, Button, Container, FormControl, OutlinedInput, Typography } from "@mui/material";
import bgImage from "../../../assets/img/String.png";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import ImageUploaderGroup from '../../../components/inputComponent/ImageUploaderComponents/ImageUploaderGroup';
import AlertSuccess from "../../../components/small/alert/AlertSuccess";

//hooks
import useTambahKonter from "../hooks/useTambahKonter";
import CustomBigCalendar from "../../../components/medium/CustomBigCalendar";
import CustomButtonFilled from "../../../components/small/button/CustomButtonFilled";
import CustomFrameTable from "../../../components/small/CustomFrameTable";
import PaginationTabs from "../../../components/small/stepper/PaginationTabs";
export default function TambahKonter() {
    const {
        breadcrumbItems,
        formik,
        handleImageChange,
        setCurrentPage,
        currentPage,
        tabs,
        kalenderRef,
        handleSaveKonter,
        isSuccess,
        message
    } = useTambahKonter();

    return (
        <Container sx={{ py: 2, minWidth: '1500px' }}>
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box mt={3} >
                <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#FAFAFA", overflow: "hidden" }}>
                    <CustomFrameTable />
                    <Typography fontSize="20px" fontWeight="700">Tambah Konter</Typography>
                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="bg-image" />
                    </Box>
                    <PaginationTabs
                        tabs={tabs}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />

                    {currentPage === 1 && (
                        <>
                            <ImageUploaderGroup onChange={handleImageChange} />
                            <Box component="form" noValidate autoComplete="off" mt={3}>
                                <Typography sx={{ fontSize: "16px" }}>Nama Konter<span style={{ color: "red" }}>*</span></Typography>
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <OutlinedInput
                                        id="namaKonter"
                                        name="namaKonter"
                                        size="small"
                                        placeholder="Masukkan Nama konter"
                                        value={formik.values.namaKonter}
                                        onChange={formik.handleChange}
                                        onBlur={() => formik.setTouched({ ...formik.touched, namaKonter: true })}
                                        error={formik.touched.namaKonter && Boolean(formik.errors.namaKonter)}
                                    />
                                    {formik.touched.namaKonter && formik.errors.namaKonter && (
                                        <Typography color="error">{formik.errors.namaKonter}</Typography>
                                    )}
                                </FormControl>



                                <Typography sx={{ fontSize: "16px", mt: 1 }}>Lokasi Konter<span style={{ color: "red" }}>*</span></Typography>
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <OutlinedInput
                                        id="lokasiKonter"
                                        name="lokasiKonter"
                                        size="small"
                                        placeholder="Masukkan lokasi konter"
                                        value={formik.values.lokasiKonter}
                                        onChange={formik.handleChange}
                                        onBlur={() => formik.setTouched({ ...formik.touched, lokasiKonter: true })}
                                        error={formik.touched.lokasiKonter && Boolean(formik.errors.lokasiKonter)}
                                        sx={{ height: '107px', alignItems: 'flex-start', borderRadius: '8px' }}
                                    />
                                    {formik.touched.lokasiKonter && formik.errors.lokasiKonter && (
                                        <Typography color="error">{formik.errors.lokasiKonter}</Typography>
                                    )}
                                </FormControl>

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
                                >
                                    Selanjutnya
                                </Button>
                            </Box>
                        </>
                    )}

                    {currentPage === 2 && (
                        <>
                            <CustomBigCalendar ref={kalenderRef} />
                            <CustomButtonFilled
                                variant="contained"
                                onClick={handleSaveKonter}
                                text="Simpan"
                            />
                        </>
                    )}
                </Box>
            </Box>
            {isSuccess && (
                <AlertSuccess label={message} />
            )}
        </Container>
    )
}
