import { Box, Container, FormControl, Typography } from "@mui/material";
import bgImage from "../../../assets/img/String.png";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
//hooks
import useTambahSubFasilitas from "../hooks/useTambahSubFasilitas";
import DropdownListAPI from "../../../components/small/dropdownlist/DropdownListAPI";
import CustomBigCalendar from "../../../components/medium/CustomBigCalendar";
import PaginationTabs from "../../../components/small/stepper/PaginationTabs";
import CustomFrameTable from "../../../components/small/CustomFrameTable";
import CustomTextField from "../../../components/inputComponent/CustomTextfield";
import CustomButtonFilled from "../../../components/small/button/CustomButtonFilled";
export default function TambahSubFasilitas() {
    const { breadcrumbItems,
        formik,
        facilityOptions,
        setCurrentPage,
        currentPage,
        kalenderRef,
        handleSaveKlinik,
        tabs
    } = useTambahSubFasilitas();
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
                        Tambah SubFasilitas
                    </Typography>

                    <Box
                        sx={{ width: '50%' }}
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
                            {/* <ImageUploaderGroup onChange={handleImageChange} /> */}

                            <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
                                <Typography sx={{ fontSize: "16px" }}>Nama SubFasilitas<span style={{ color: "red" }}>*</span></Typography>
                                <FormControl fullWidth sx={{ my: 1 }}>
                                    <CustomTextField
                                        name="namaSubFasilitas"
                                        formik={formik}
                                        placeholder="Masukkan Nama subfasilitas"
                                    />
                                </FormControl>

                                <Typography sx={{ fontSize: "16px" }}>Nama Fasilitas<span style={{ color: "red" }}>*</span></Typography>
                                <DropdownListAPI
                                    options={facilityOptions.map(({ id, name }) => ({ value: id, label: name }))}
                                    placeholder="Pilih fasilitas"
                                    defaultValue={formik.values.facilityId}
                                    onChange={(selectedOptionValue) => {
                                        formik.setFieldValue('facilityId', selectedOptionValue);
                                    }}
                                    loading={false}
                                />
                                <CustomButtonFilled
                                    text="Selanjutnya"
                                    type="submit"
                                    variant="contained"
                                    disabled={!formik.isValid || !formik.dirty}
                                    onClick={() => setCurrentPage(2)}
                                />
                            </Box>
                        </>
                    )}
                    {currentPage === 2 && (
                        <>
                            <CustomBigCalendar ref={kalenderRef} />
                            <CustomButtonFilled
                                variant="contained"
                                text="Simpan"
                                type={undefined}
                                disabled={!formik.isValid || !formik.dirty}
                                onClick={() => handleSaveKlinik}
                            />
                        </>)}
                </Box>
            </Box>
        </Container >
    )
}
