import { Container, Box, Typography, Button, FormControl } from "@mui/material";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import bgImage from "../../../assets/img/String.png";
import AlertSuccess from "../../../components/small/alert/AlertSuccess";
import DropdownList from "../../../components/small/dropdownlist/DropdownList";
import ImageUploaderGroup from '../../../components/inputComponent/ImageUploaderComponents/ImageUploaderGroup';
import DropdownListAPI from '../../../components/small/dropdownlist/DropdownListAPI';

//hooks
import useAddRoom from "../hooks/useAddRoom";
import CustomFrameTable from "../../../components/small/CustomFrameTable";
import CustomTextField from "../../../components/inputComponent/CustomTextfield";
import { roomType } from "../../../data/roomType";


export default function AddRoom() {
    const {
        formik,
        breadcrumbItems,
        setImagesData,
        gedungOptions,
        errorAlert,
    } = useAddRoom();


    return (
        <Container sx={{ py: 2 }}>
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box mt={3}>
                <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}>
                    <Typography fontSize="20px" fontWeight="700">Tambah Ruangan</Typography>
                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="bg-image" />
                    </Box>

                    <CustomFrameTable />
                    <ImageUploaderGroup onChange={(images) => setImagesData(images)} />

                    <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
                        <Typography sx={{ fontSize: "16px" }}>Nama Ruangan<span style={{ color: "red" }}>*</span></Typography>
                        <FormControl fullWidth sx={{ my: 1 }}>
                            <CustomTextField
                                name="namaRuangan"
                                formik={formik}
                                placeholder="Masukkan nama ruangan"

                            />
                        </FormControl>

                        <Typography sx={{ fontSize: "16px" }}>Pilih Gedung<span style={{ color: "red" }}>*</span></Typography>
                        <DropdownListAPI
                            options={gedungOptions.map(({ id, name }) => ({ value: id, label: name }))}
                            placeholder="Pilih gedung"
                            defaultValue={formik.values.masterBuildingId}
                            onChange={(selectedOptionValue) => {
                                formik.setFieldValue('masterBuildingId', selectedOptionValue);
                            }}
                            loading={false}
                        />


                        <Typography sx={{ fontSize: "16px", mt: 1 }}>Jenis Ruangan<span style={{ color: "red" }}>*</span></Typography>
                        <DropdownList
                            options={roomType}
                            placeholder="Pilih jenis ruangan"
                            onChange={(selectedValue) => formik.setFieldValue('jenisRuangan', selectedValue)}
                            loading={false}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="inherit"
                            sx={{
                                mt: 3,
                                width: "100%",
                                bgcolor: "#8F85F3",
                                color: "#fff",
                                textTransform: "none",
                                borderRadius: "8px",
                                ":hover": { bgcolor: "#a098f5" },
                            }}
                            disabled={!formik.isValid || !formik.dirty}
                        >
                            Simpan
                        </Button>
                    </Box>
                </Box>
            </Box>
            {errorAlert && (
                <AlertSuccess label="Error adding room" />
            )}
        </Container>
    );
}
