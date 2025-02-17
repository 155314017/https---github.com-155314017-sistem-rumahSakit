import { Container, Box, Typography, FormControl } from "@mui/material";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import bgImage from "../../../assets/img/String.png";
import AlertSuccess from "../../../components/small/alert/AlertSuccess";
import DropdownListAPI from '../../../components/small/dropdownlist/DropdownListAPI';
import ImageUploaderGroupAPI from '../../../components/inputComponent/ImageUploaderComponents/ImageGroupUploaderAPI';
import DropdownList from '../../../components/small/dropdownlist/DropdownList';

//hooks
import useEditRuangan from "../hooks/useEditRuangan";
import CustomFrameTable from "../../../components/small/CustomFrameTable";
import CustomTextField from "../../../components/inputComponent/CustomTextfield";
import CustomButtonFilled from "../../../components/small/button/CustomButtonFilled";
import { roomType } from "../../../data/roomType";



export default function EditRuangan() {
    const {
        formik,
        handleImageChange,
        successAlert,
        errorAlert,
        loading,
        gedungOptions,
        id
    } = useEditRuangan();

    return (
        <Container sx={{ py: 2 }}>
            <BreadCrumbs
                breadcrumbItems={[
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Ruangan", href: "/ruangan" },
                    { label: "Edit Ruangan", href: "/editRuangan" },
                ]}
                onBackClick={() => window.history.back()}
            />
            <Box mt={3}>
                <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}>
                    <Typography fontSize="20px" fontWeight="700">Edit Ruangan</Typography>
                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="bg-image" />
                    </Box>
                    <CustomFrameTable />
                    <ImageUploaderGroupAPI onChange={handleImageChange} parentId={id || ''} />

                    <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
                        <Typography sx={{ fontSize: "16px" }}>Nama Ruangan<span style={{ color: "red" }}>*</span></Typography>
                        <FormControl fullWidth sx={{ my: 1 }}>
                            <CustomTextField
                                name="namaRuangan"
                                formik={formik}
                                placeholder="Masukkan nama gedung"
                            />
                        </FormControl>

                        <Typography sx={{ fontSize: "16px" }}>Pilih Gedung<span style={{ color: "red" }}>*</span></Typography>
                        <DropdownListAPI
                            options={gedungOptions.map(({ id, name }) => ({ value: id, label: name }))}
                            placeholder={loading ? "" : "Pilih gedung"}
                            defaultValue={loading ? "" : formik.values.masterBuildingId}
                            onChange={(selectedOptionValue) => {
                                formik.setFieldValue('masterBuildingId', selectedOptionValue);
                            }}
                            loading={loading}
                        />

                        <Typography sx={{ fontSize: "16px", mt: 1 }}>Jenis Ruangan<span style={{ color: "red" }}>*</span></Typography>
                        <DropdownList
                            options={roomType}
                            placeholder={loading ? "" : "Pilih jenis ruangan"}
                            onChange={(selectedValue) => {
                                formik.setFieldValue('jenisRuangan', selectedValue);
                            }}
                            defaultValue={loading ? "" : formik.values.jenisRuangan}
                            loading={loading}
                        />

                        <CustomButtonFilled
                            type="submit"
                            variant="contained"
                            disabled={!formik.isValid || !formik.dirty}
                            text="Simpan"
                        />
                    </Box>

                    {successAlert && <AlertSuccess label="Ruangan updated successfully" />}
                    {errorAlert && <AlertSuccess label="Error updating ruangan" />}
                </Box>
            </Box>
        </Container>
    );
}
