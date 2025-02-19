import { Box, Container, FormControl, Typography } from "@mui/material";
import bgImage from "../../../assets/img/String.png";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import ImageUploaderGroup from '../../../components/inputComponent/ImageUploaderComponents/ImageUploaderGroup';
import AlertSuccess from "../../../components/small/alert/AlertSuccess";

//hooks
import useAddCounter from "../hooks/useAddCounter";
import CustomBigCalendar from "../../../components/medium/CustomBigCalendar";
import CustomButtonFilled from "../../../components/small/button/CustomButtonFilled";
import CustomFrameTable from "../../../components/small/CustomFrameTable";
import PaginationTabs from "../../../components/small/stepper/PaginationTabs";
import CustomTextField from "../../../components/inputComponent/CustomTextfield";
export default function AddCounter() {
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
    } = useAddCounter();

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
                    <Box width={'50%'} >
                        <PaginationTabs
                            tabs={tabs}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </Box>

                    {currentPage === 1 && (
                        <>
                            <ImageUploaderGroup onChange={handleImageChange} />
                            <Box component="form" noValidate autoComplete="off" mt={3}>
                                <Typography sx={{ fontSize: "16px" }}>Nama Konter<span style={{ color: "red" }}>*</span></Typography>
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <CustomTextField
                                        name="namaKonter"
                                        placeholder="Masukkan Nama Konter"
                                        formik={formik}
                                    />
                                </FormControl>

                                <Typography sx={{ fontSize: "16px", mt: 1 }}>Lokasi Konter<span style={{ color: "red" }}>*</span></Typography>
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <CustomTextField
                                        name="lokasiKonter"
                                        placeholder="Masukkan Lokasi Konter"
                                        formik={formik}
                                    />
                                </FormControl>
                                <CustomButtonFilled
                                    variant="contained"
                                    onClick={() => setCurrentPage(2)}
                                    text="Selanjutnya"
                                />
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
