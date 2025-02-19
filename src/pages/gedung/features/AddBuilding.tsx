import { Container, Box } from "@mui/system";
import { Typography, FormControl } from "@mui/material";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import bgImage from "../../../assets/img/String.png";
import ImageUploaderGroup from "../../../components/inputComponent/ImageUploaderComponents/ImageUploaderGroup";
import useAddBuilding from "../hooks/useAddBuilding";
import CustomFrameTable from "../../../components/small/CustomFrameTable";
import CustomButtonFilled from "../../../components/small/button/CustomButtonFilled";
import CustomTextField from "../../../components/inputComponent/CustomTextfield";
import AlertWarning from "../../../components/small/alert/AlertWarning";
export default function AddBuilding() {
    const {
        formik,
        handleImageChange,
        breadcrumbItems,
        isSuccess
    } = useAddBuilding();
    return (
        <Container sx={{ py: 2 }}>
            <BreadCrumbs breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />

            <Box mt={3}>
                <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#ffff", overflow: "hidden" }}>
                    <Typography fontSize="20px" fontWeight="700">Tambah Gedung</Typography>
                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="bg-image" />
                    </Box>

                    <CustomFrameTable />

                    <ImageUploaderGroup onChange={handleImageChange} />

                    <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
                        <Typography sx={{ fontSize: "16px" }}>
                            Nama Gedung<span style={{ color: "red" }}>*</span>
                        </Typography>

                        <FormControl fullWidth sx={{ my: 1 }}>
                            <CustomTextField
                                name="namaGedung"
                                formik={formik}
                                placeholder="Masukkan nama gedung"
                            />
                        </FormControl>

                        <Typography sx={{ fontSize: "16px" }}>
                            Alamat Gedung<span style={{ color: "red" }}>*</span>
                        </Typography>

                        <FormControl fullWidth sx={{ my: 1 }}>
                            {/* custom textfield, jika untuk ukuran kecil, multiline dan rows tidak perlu dipanggil  */}
                            <CustomTextField
                                name="alamatGedung"
                                formik={formik}
                                placeholder="Masukkan alamat gedung"
                                multiline
                                rows={3}
                            />
                        </FormControl>

                        <CustomButtonFilled type="submit" text="Simpan" disabled={!formik.isValid || !formik.dirty} variant="contained" />

                    </Box>
                </Box>
            </Box>
            {isSuccess && (
                <AlertWarning teks="Error adding building" />
            )}
        </Container>
    )
}
