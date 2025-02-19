import { Container, Box, Typography, FormControl } from "@mui/material";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import bgImage from "../../../assets/img/String.png";
import AlertSuccess from "../../../components/small/alert/AlertSuccess";
import ImageUploaderGroup from '../../../components/inputComponent/ImageUploaderComponents/ImageUploaderGroup';
import InputCurrencyIdr from '../../../components/inputComponent/InputCurrencyIdr';
import DropdownListAPI from '../../../components/small/dropdownlist/DropdownListAPI';
import useAddFacility from "../hooks/useAddFacility";
import 'dayjs/locale/id';
import CustomBigCalendar from "../../../components/medium/CustomBigCalendar";
import CustomFrameTable from "../../../components/small/CustomFrameTable";
import PaginationTabs from "../../../components/small/stepper/PaginationTabs";
import CustomTextField from "../../../components/inputComponent/CustomTextfield";
import CustomButtonFilled from "../../../components/small/button/CustomButtonFilled";

export default function AddFacility() {
    const {
        breadcrumbItems,
        formik,
        gedungOptions,
        handleImageChange,
        currentPage,
        setCurrentPage,
        handleSaveFasilitas,
        kalenderRef,
        setOperationalCost,
        tabs,
        message,
        isSuccess
    } = useAddFacility();



    return (
        <Container sx={{ py: 2, minWidth: '1500px' }}>
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box mt={3}>
                <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#FAFAFA", overflow: "hidden" }}>
                    <CustomFrameTable />
                    <Typography fontSize="20px" fontWeight="700">Tambah Fasilitas</Typography>
                    <Box width={'50%'} >
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
                            <ImageUploaderGroup onChange={handleImageChange} />

                            <Box component="form" noValidate autoComplete="off" mt={3}>
                                <Typography sx={{ fontSize: "16px" }}>Nama Fasilitas<span style={{ color: "red" }}>*</span></Typography>
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <CustomTextField
                                        name="namaFasilitas"
                                        placeholder="Masukkan nama fasilitas"
                                        formik={formik}
                                    />
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
                                    <CustomTextField
                                        name="deskripsiKlinik"
                                        placeholder="Masukkan deskripsi fasilitas"
                                        formik={formik}
                                        multiline
                                        rows={3}
                                    />
                                </FormControl>

                                <Typography sx={{ fontSize: "16px", mt: 3 }}>Biaya Penanganan<span style={{ color: "red" }}>*</span></Typography>
                                <InputCurrencyIdr onChange={(value) => setOperationalCost(parseInt(value.replace(/\D/g, '') || '0'))} defaultValue={0} />
                                <CustomButtonFilled
                                    variant="contained"
                                    onClick={() => setCurrentPage(2)}
                                    disabled={!formik.isValid || !formik.dirty}
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
                                onClick={handleSaveFasilitas}
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
