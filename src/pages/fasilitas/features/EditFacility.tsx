import { Container, Box, Typography, FormControl } from "@mui/material";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import bgImage from "../../../assets/img/String.png";
import AlertSuccess from "../../../components/small/alert/AlertSuccess";
import InputCurrencyIdr from '../../../components/inputComponent/InputCurrencyIdr';
import DropdownListAPI from '../../../components/small/dropdownlist/DropdownListAPI';
import ImageUploaderGroupAPI from '../../../components/inputComponent/ImageUploaderComponents/ImageGroupUploaderAPI';

//hooks
import useEditFacility from "../hooks/useEditFacility";
import CustomBigCalendar from "../../../components/medium/CustomBigCalendar";
import PaginationTabs from "../../../components/small/stepper/PaginationTabs";
import CustomFrameTable from "../../../components/small/CustomFrameTable";
import CustomTextField from "../../../components/inputComponent/CustomTextfield";
import CustomButtonFilled from "../../../components/small/button/CustomButtonFilled";

export default function EditFacility() {
    const {
        formik,
        handleImageChange,
        breadcrumbItems,
        setCurrentPage,
        currentPage,
        handleEditFacility,
        id,
        message,
        isSuccess,
        gedungOptions,
        kalenderRef,
        scheduleDataPraktek,
        scheduleDataPengecualian,
        tabs
    } = useEditFacility()


    return (
        <Container sx={{ py: 2, minWidth: '1500px' }}>
            <BreadCrumbs breadcrumbItems={breadcrumbItems} onBackClick={() => window.history.back()} />

            <Box mt={3}>
                <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#FAFAFA", overflow: "hidden" }}>
                    <CustomFrameTable />
                    <Typography fontSize="20px" fontWeight="700">
                        Edit Fasilitas
                    </Typography>

                    <Box
                        sx={{ display: "flex", flexDirection: "row", mt: 2, mb: 2, justifyContent: 'space-between', ml: 2 }}
                    >
                        <PaginationTabs
                            tabs={tabs}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </Box>

                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="bg-image" />
                    </Box>

                    {currentPage === 1 && (
                        <>
                            <Typography fontSize="20px" fontWeight="700" mb="32px" mt="54px">
                                Informasi Fasilitas
                            </Typography>
                            <ImageUploaderGroupAPI onChange={handleImageChange} parentId={id || ''} />
                            <Box component="form" noValidate autoComplete="off" mt={3}>
                                <Typography sx={{ fontSize: "16px" }}>Nama Fasilitas<span style={{ color: "red" }}>*</span></Typography>
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <CustomTextField
                                        name="namaFasilitas"
                                        formik={formik}
                                        placeholder="Masukkan nama fasilitas"
                                    />
                                </FormControl>

                                <Typography sx={{ fontSize: "16px", mt: 2 }}>Pilih Gedung<span style={{ color: "red" }}>*</span></Typography>
                                <DropdownListAPI
                                    options={gedungOptions?.map(({ id, name }) => ({ value: id, label: name })) || []}
                                    placeholder="Pilih gedung"
                                    defaultValue={formik.values.masterBuildingId}
                                    onChange={(selectedOptionValue) => {
                                        formik.setFieldValue('masterBuildingId', selectedOptionValue);
                                    }}
                                    loading={false}
                                />

                                <Typography sx={{ fontSize: "16px", mt: 2 }}>Deskripsi<span style={{ color: "red" }}>*</span></Typography>
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <CustomTextField
                                        name="deskripsiKlinik"
                                        formik={formik}
                                        placeholder="Masukkan deskripsi fasilitas"
                                    />
                                </FormControl>

                                <Typography sx={{ fontSize: "16px", mt: 3 }}>Biaya Penanganan<span style={{ color: "red" }}>*</span></Typography>
                                <InputCurrencyIdr
                                    onChange={(value) => {
                                        formik.setFieldValue('operationalCost', value);
                                    }}
                                    defaultValue={formik.values.operationalCost}
                                />

                                <CustomButtonFilled
                                    variant="contained"
                                    text="Selanjutnya"
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
                                variant="contained"
                                type="submit"
                                text="Simpan"
                                disabled={!formik.isValid || !formik.dirty}
                                onClick={handleEditFacility}
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
