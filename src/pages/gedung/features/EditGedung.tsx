import { Container, Box } from "@mui/system";
import { Typography, FormControl } from "@mui/material";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import bgImage from "../../../assets/img/String.png";
import AlertSuccess from "../../../components/small/alert/AlertSuccess";
import ImageUploaderGroupAPI from "../../../components/inputComponent/ImageUploaderComponents/ImageGroupUploaderAPI";
import useEditGedung from "../hooks/useEditGedung";
import CustomButtonFilled from "../../../components/small/button/CustomButtonFilled";
import CustomFrameTable from "../../../components/small/CustomFrameTable";
import CustomTextField from "../../../components/inputComponent/CustomTextfield";

export default function EditGedung() {
    const { breadcrumbItems,
        formik,
        handleImageChange,
        id,
        isSuccess,
        message
    } = useEditGedung();
    return (
        <Container sx={{ py: 2 }}>
            <BreadCrumbs breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />

            <Box mt={3}>
                <Box position="relative" sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden", p: 3 }}>
                    <Typography fontSize="20px" fontWeight="700">Edit Gedung</Typography>
                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="bg-image" />
                    </Box>

                    <CustomFrameTable />
                    <ImageUploaderGroupAPI onChange={handleImageChange} parentId={id || ''} />
                    <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
                        <Typography sx={{ fontSize: "16px" }}>
                            Nama Gedung<span style={{ color: "red" }}>*</span>
                        </Typography>
                        <FormControl fullWidth sx={{ my: 1 }}>
                            <CustomTextField
                                name="namaGedung"
                                formik={formik}
                                placeholder="Masukkan Nama Gedung"
                            />
                        </FormControl>

                        <Typography sx={{ fontSize: "16px" }}>
                            Alamat Gedung<span style={{ color: "red" }}>*</span>
                        </Typography>

                        <FormControl fullWidth sx={{ my: 1 }}>
                            <CustomTextField
                                name="alamatGedung"
                                formik={formik}
                                multiline
                                rows={3}
                                placeholder="Masukkan Alamat Gedung"
                            />
                        </FormControl>

                        <CustomButtonFilled disabled={!formik.isValid || !formik.dirty} text="Simpan" type="submit" variant="contained" />
                    </Box>
                </Box>
            </Box>

            {isSuccess && (
                <AlertSuccess label={message} />
            )}
        </Container>
    )
}
