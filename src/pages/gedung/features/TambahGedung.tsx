import { Container, Box } from "@mui/system";
import { Typography, Button, FormControl, TextField } from "@mui/material";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import bgImage from "../../../assets/img/String.png";
import AlertSuccess from "../../../components/small/alert/AlertSuccess";
import ImageUploaderGroup from "../../../components/inputComponent/ImageUploaderComponents/ImageUploaderGroup";
import useTambahGedung from "../hooks/useTambahGedung";
import CustomFrameTable from "../../../components/small/CustomFrameTable";


export default function TambahGedung() {
    const {
        formik,
        handleImageChange,
        breadcrumbItems,
        errorAlert
    } = useTambahGedung();
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
                            <TextField
                                variant="outlined"
                                id="namaGedung"
                                name="namaGedung"
                                size="small"
                                placeholder={(formik.touched.namaGedung && formik.errors.namaGedung) ? formik.errors.namaGedung : "Masukkan nama gedung"}
                                value={formik.values.namaGedung}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.namaGedung && Boolean(formik.errors.namaGedung)}
                                sx={{
                                    width: "100%",
                                    height: "48px",
                                    marginTop: "10px",
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "8px",
                                        backgroundColor: formik.touched.namaGedung && formik.errors.namaGedung ? "#ffcccc" : "inherit",
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


                        {/* Button */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="inherit"
                            sx={{
                                mt: 10,
                                width: "100%",
                                bgcolor: "#8F85F3",
                                color: "#fff",
                                textTransform: "none",
                                borderRadius: "8px",
                                boxShadow: "none",
                                ":hover": {
                                    bgcolor: "#a098f5",
                                    boxShadow: "none",
                                },
                            }}
                            disabled={!formik.isValid || !formik.dirty}
                        >
                            Simpan
                        </Button>
                    </Box>
                </Box>
            </Box>
            {errorAlert && (
                <AlertSuccess label="Error adding building" />
            )}
        </Container>
    )
}
