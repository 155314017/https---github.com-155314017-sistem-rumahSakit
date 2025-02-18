import { Container, Box } from '@mui/system';
import { Typography, FormControl, } from '@mui/material';
import bgImage from '../../../assets/img/String.png';
import 'dayjs/locale/id';
// components
import BreadCrumbs from '../../../components/medium/BreadCrumbs'
// hooks
import useEditSubFasilitas from '../hooks/useEditSubFasilitas';
import DropdownListAPI from '../../../components/small/dropdownlist/DropdownListAPI';
import CustomBigCalendar from '../../../components/medium/CustomBigCalendar';
import CustomFrameTable from '../../../components/small/CustomFrameTable';
import PaginationTabs from '../../../components/small/stepper/PaginationTabs';
import CustomTextField from '../../../components/inputComponent/CustomTextfield';
import CustomButtonFilled from '../../../components/small/button/CustomButtonFilled';
import AlertSuccess from '../../../components/small/alert/AlertSuccess';

export default function EditSubFasilitas() {
    const {
        breadcrumbItems,
        formik,
        setCurrentPage,
        currentPage,
        handleEditSubFasilitas,
        kalenderRef,
        id,
        facilityOptions,
        scheduleDataPraktek,
        scheduleDataPengecualian,
        tabs,
        isSuccess,
        message
    } = useEditSubFasilitas();

    return (
        <Container sx={{ py: 2, minWidth: '1500px' }}>
            <BreadCrumbs breadcrumbItems={breadcrumbItems} onBackClick={() => window.history.back()} />

            <Box mt={3}>
                <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#FAFAFA", overflow: "hidden" }}>
                    <CustomFrameTable />
                    <Typography fontSize="20px" fontWeight="700">
                        Edit SubFasilitas
                    </Typography>

                    <Box
                        sx={{ display: "flex", flexDirection: "row", mt: 2, mb: 2, justifyContent: 'space-between', ml: 2 }}
                    >
                        <PaginationTabs
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            tabs={tabs}
                        />
                    </Box>

                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="bg-image" />
                    </Box>

                    {currentPage === 1 && (
                        <>
                            <Typography fontSize="20px" fontWeight="700" mb="32px" mt="54px">
                                Informasi SubFasilitas
                            </Typography>
                            {/* <ImageUploaderGroupAPI onChange={handleImageChange} parentId={id || ''} /> */}
                            <Box component="form" noValidate autoComplete="off" mt={3}>
                                <Typography sx={{ fontSize: "16px" }}>Nama Sub Fasilitas<span style={{ color: "red" }}>*</span></Typography>
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <CustomTextField
                                        name='namaSubFasilitas'
                                        placeholder='Masukkan nama Subfasilitas'
                                        formik={formik}
                                    />
                                </FormControl>

                                <Typography sx={{ fontSize: "16px", mt: 2 }}>Pilih Fasilitas<span style={{ color: "red" }}>*</span></Typography>
                                <DropdownListAPI
                                    options={facilityOptions.map(({ id, name }) => ({ value: id, label: name }))}
                                    placeholder="Pilih Fasilitas Induk"
                                    defaultValue={formik.values.masterFacilityId}
                                    onChange={(selectedOptionValue) => {
                                        formik.setFieldValue('masterFacilityId', selectedOptionValue);
                                    }}
                                    loading={false}
                                />
                                <CustomButtonFilled
                                    variant='contained'
                                    onClick={() => setCurrentPage(2)}
                                    text='Selanjutnya'
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
                                variant='contained'
                                onClick={handleEditSubFasilitas}
                                text='Simpan'
                            />
                        </>
                    )}
                </Box>
            </Box>
            {isSuccess && (
                <AlertSuccess label={message} />
            )}
        </Container>
    );
}