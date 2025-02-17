import { Container, Box } from "@mui/system";
import { Typography, FormControl, CircularProgress, TextField } from "@mui/material";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import bgImage from "../../../assets/img/String.png";
import AlertSuccess from "../../../components/small/alert/AlertSuccess";
import ImageUploaderGroupAPI from "../../../components/inputComponent/ImageUploaderComponents/ImageGroupUploaderAPI";
import useEditGedung from "../hooks/useEditGedung";
import CustomButtonFilled from "../../../components/small/button/CustomButtonFilled";
import CustomFrameTable from "../../../components/small/CustomFrameTable";
import { fieldFormStyle } from "../../../style/ts/fieldFormStyle";

export default function EditGedung() {
    const { breadcrumbItems,
        formik,
        handleImageChange,
        loading,
        successAlert,
        errorAlert,
        id } = useEditGedung();
    return (
        <Container sx={{ py: 2 }}>
            <BreadCrumbs breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />

            <Box mt={3}>
                <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}>
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
                            <TextField
                                variant="outlined"
                                id="namaGedung"
                                name="namaGedung"
                                size="small"
                                placeholder={(formik.touched.namaGedung && formik.errors.namaGedung) ? formik.errors.namaGedung : "Masukkan nama gedung"}
                                value={formik.values.namaGedung}
                                onChange={formik.handleChange}
                                disabled={loading}
                                onBlur={() => formik.setTouched({ ...formik.touched, namaGedung: true })}
                                error={formik.touched.namaGedung && Boolean(formik.errors.namaGedung)}
                                InputProps={{
                                    endAdornment: loading ? <CircularProgress size={20} /> : null
                                }}
                                sx={fieldFormStyle(formik.touched, formik.errors, "namaGedung")}
                            />
                        </FormControl>

                        <Typography sx={{ fontSize: "16px" }}>
                            Alamat Gedung<span style={{ color: "red" }}>*</span>
                        </Typography>
                        <FormControl fullWidth sx={{ my: 1 }}>
                            <TextField
                                variant="outlined"
                                id="alamatGedung"
                                name="alamatGedung"
                                size="small"
                                placeholder={(formik.touched.alamatGedung && formik.errors.alamatGedung) ? formik.errors.alamatGedung : "Masukkan alamat gedung"}
                                value={formik.values.alamatGedung}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.alamatGedung && Boolean(formik.errors.alamatGedung)}
                                InputProps={{
                                    endAdornment: loading ? <CircularProgress size={20} /> : null
                                }}
                                disabled={loading}
                                sx={{
                                    width: "100%",
                                    // height: "48px",
                                    marginTop: "10px",
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "8px",
                                        backgroundColor: formik.touched.alamatGedung && formik.errors.alamatGedung ? "#ffcccc" : "inherit",
                                        '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#8F85F3',
                                        },
                                    },
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        border: "1px solid #ccc",
                                    },
                                    "& .MuiOutlinedInput-input": {
                                        padding: "10px",
                                        fontSize: "16px",
                                    },
                                }}
                                multiline
                                minRows={3}
                                maxRows={10}
                            />
                        </FormControl>
                        <CustomButtonFilled disabled={!formik.isValid || !formik.dirty} text="Simpan" type="submit" variant="contained" />
                    </Box>
                </Box>
            </Box>

            {successAlert && (
                <AlertSuccess label="Building edited" />
            )}
            {errorAlert && (
                <AlertSuccess label="Error editing building" />
            )}
        </Container>
    )
}
