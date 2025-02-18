import { Container, Box } from '@mui/system';
import { Typography, FormControl } from "@mui/material";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import bgImage from "../../../assets/img/String.png";
import ImageUploaderGroupAPI from '../../../components/inputComponent/ImageUploaderComponents/ImageGroupUploaderAPI';
import "dayjs/locale/id";

//hooks
import useEditKonter from "../hooks/useEditKonter";
import CustomBigCalendar from '../../../components/medium/CustomBigCalendar';
import CustomTextField from '../../../components/inputComponent/CustomTextfield';
import CustomButtonFilled from '../../../components/small/button/CustomButtonFilled';
import CustomFrameTable from '../../../components/small/CustomFrameTable';
import PaginationTabs from '../../../components/small/stepper/PaginationTabs';

export default function EditKonter() {
    const {
        handleImageChange,
        breadcrumbItems,
        formik,
        setCurrentPage,
        currentPage,
        handleEditCounter,
        kalenderRef,
        id,
        scheduleDataPraktek,
        scheduleDataPengecualian,
        tabs
    } = useEditKonter();

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
                        Edit Konter
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
                            <Typography fontSize="20px" fontWeight="700" mb="32px" mt="54px">
                                Informasi Konter
                            </Typography>
                            <ImageUploaderGroupAPI onChange={handleImageChange} parentId={id || ''} />
                            <Box component="form" noValidate autoComplete="off" mt={3}>
                                <Typography sx={{ fontSize: "16px" }}>Nama Konter<span style={{ color: "red" }}>*</span></Typography>

                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <CustomTextField
                                        name='namaKonter'
                                        placeholder='Masukkan Nama Konter'
                                        formik={formik}
                                    />
                                </FormControl>

                                <Typography sx={{ fontSize: "16px", mt: 1 }}>Lokasi Konter<span style={{ color: "red" }}>*</span></Typography>
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <CustomTextField
                                        name='lokasiKonter'
                                        placeholder='Masukkan Lokasi Konter'
                                        formik={formik}
                                    />
                                </FormControl>

                                <CustomButtonFilled
                                    variant='contained'
                                    onClick={() => setCurrentPage(2)}
                                />

                            </Box>
                        </>
                    )}

                    {currentPage === 2 && (
                        <>
                            <CustomBigCalendar
                                ref={kalenderRef}
                                initialData={scheduleDataPraktek}
                                initialDataPengecualian={scheduleDataPengecualian}
                                typeId={id}
                            />
                            <CustomButtonFilled
                                type='button'
                                variant='contained'
                                onClick={handleEditCounter}
                            />
                        </>
                    )}
                </Box>
            </Box>
        </Container>
    );
}
