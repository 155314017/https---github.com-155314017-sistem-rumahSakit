import { Box, Container, FormControl, Typography } from "@mui/material";
import bgImage from "../../../assets/img/String.png";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import ImageUploaderGroup from '../../../components/inputComponent/ImageUploaderComponents/ImageUploaderGroup';

//hooks
import useTambahKlinik from "../hooks/useTambahKlinik";
import CustomBigCalendar from "../../../components/medium/CustomBigCalendar";
import CustomFrameTable from "../../../components/small/CustomFrameTable";
import AlertWarning from "../../../components/small/alert/AlertWarning";
import PaginationTabs from "../../../components/small/stepper/PaginationTabs";
import CustomTextField from "../../../components/inputComponent/CustomTextfield";
import CustomButtonFilled from "../../../components/small/button/CustomButtonFilled";
export default function TambahKlinik() {
    const {
        breadcrumbItems,
        formik,
        handleImageChange,
        setCurrentPage,
        currentPage,
        kalenderRef,
        handleSaveKlinik,
        isSuccess,
        tabs,
        message
    } = useTambahKlinik();
    return (
        <Container sx={{ py: 2, minWidth: '1500px' }}>
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box mt={3}>
                <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#FAFAFA", overflow: "hidden" }}>
                    <CustomFrameTable />
                    <Typography fontSize="20px" fontWeight="700">
                        Tambah Klinik
                    </Typography>

                    <Box
                        sx={{ width: '50%' }}
                    >
                        <PaginationTabs
                            tabs={tabs}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
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
                                    <CustomTextField
                                        name="namaKlinik"
                                        placeholder="Masukkan Nama klinik"
                                        formik={formik}
                                    />
                                </FormControl>

                                <Typography sx={{ fontSize: "16px" }}>Deskripsi Klinik<span style={{ color: "red" }}>*</span></Typography>
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <CustomTextField
                                        name="deskripsiKlinik"
                                        placeholder="Masukkan Deskripsi klinik"
                                        formik={formik}
                                    />
                                </FormControl>

                                <Typography sx={{ fontSize: "16px" }}>Code Klinik<span style={{ color: "red" }}>*</span></Typography>
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <CustomTextField
                                        name="code"
                                        placeholder="Masukkan Kode klinik"
                                        formik={formik}
                                    />
                                </FormControl>
                                <CustomButtonFilled
                                    type="submit"
                                    variant="contained"
                                    disabled={!formik.isValid || !formik.dirty}
                                    onClick={() => setCurrentPage(2)}
                                    text="Selanjutnya"
                                />
                                {/* <ImageUploader onImagesSelected={handleImagesSelected} /> */}
                            </Box>
                        </>
                    )}
                    {currentPage === 2 && (
                        <>
                            <CustomBigCalendar ref={kalenderRef} />
                            <CustomButtonFilled
                                type="submit"
                                variant="contained"
                                onClick={handleSaveKlinik}
                                text="Simpan"
                            />
                        </>)}
                </Box>
            </Box>
            {isSuccess && (
                <AlertWarning teks={message} />
            )}
        </Container >
    )
}
