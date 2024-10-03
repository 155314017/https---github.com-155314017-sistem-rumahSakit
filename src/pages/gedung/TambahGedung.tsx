import { Container, Box } from "@mui/system";
import { Typography, Button, InputAdornment, FormControl, OutlinedInput } from "@mui/material";
import { useFormik } from "formik"; // Import useFormik
import * as Yup from "yup"; // Import Yup for validation
import BreadCrumbs from "../../components/medium/BreadCrumbs";
import ImageUploader from "../../components/medium/ImageUploader";
import bgImage from "../../assets/img/String.png";
import { useState } from "react";
import AlertSuccess from "../../components/small/AlertSuccess";

interface ImageInfo {
    file: File;
    preview: string;
    name: string;
    size: string;
}

export default function TambahGedung() {
    const [successAlert, setSuccessAlert] = useState(false);

    const showTemporaryAlertSuccess = async () => {
        setSuccessAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessAlert(false);
    };

    const handleImagesSelected = (images: ImageInfo[]) => {
        console.log("Selected images:", images);
    };

    const breadcrumbItems = [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Gedung",
            href: "/gedung",
        },
        {
            label: "Tambah Gedung",
            href: "/tambahGedung",
        },
    ];

    const formik = useFormik({
        initialValues: {
            namaGedung: '',
            alamatGedung: '',
        },
        validationSchema: Yup.object({
            namaGedung: Yup.string().required('Nama Gedung is required'),
            alamatGedung: Yup.string().required('Alamat Gedung is required'),
        }),
        onSubmit: (values) => {
            console.log('Form submitted:', values);
        },
    });

    return (
        <Container sx={{ py: 2 }}>
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />

            <Box mt={3}>
                <Box
                    position="relative"
                    p={3}
                    sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}
                >
                    <Typography fontSize="20px" fontWeight="700">
                        Tambah Gedung
                    </Typography>

                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="bg-image" />
                    </Box>

                    {/* membuat bentuk lengkung atas */}
                    <Box
                        position={"absolute"}
                        sx={{
                            top: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                            display: "flex",
                        }}
                    >
                        {/* lengkung kiri */}
                        <Box
                            sx={{
                                width: "50px",
                                height: "30px",
                                bgcolor: "#F1F0FE",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "50px",
                                    height: "30px",
                                    bgcolor: "#fff",
                                    borderRadius: "0px 15px 0px 0px ",
                                }}
                            />
                        </Box>

                        {/* kotak tengah */}
                        <Box
                            sx={{
                                width: "600px",
                                height: "50px",
                                bgcolor: "#F1F0FE",
                                borderRadius: "0px 0px 22px 22px",
                            }}
                        />

                        {/* lengkung kanan */}
                        <Box
                            sx={{
                                width: "50px",
                                height: "30px",
                                bgcolor: "#F1F0FE",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "50px",
                                    height: "30px",
                                    bgcolor: "#fff",
                                    borderRadius: "15px 0px 0px 0px ",
                                }}
                            />
                        </Box>
                    </Box>
                    {/* ---------- */}

                    {/* image uploader */}
                    <ImageUploader onImagesSelected={handleImagesSelected} />

                    {/* form */}
                    <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
                        <Typography sx={{ fontSize: "16px" }}>
                            Nama Gedung<span style={{ color: "red" }}>*</span>
                        </Typography>
                        <FormControl fullWidth sx={{ my: 1 }}>
                            <OutlinedInput
                                id="namaGedung"
                                name="namaGedung"
                                size="small"
                                placeholder="Masukkan nama gedung"
                                value={formik.values.namaGedung}
                                onChange={formik.handleChange}
                                onBlur={() => {
                                    formik.handleBlur({ target: { name: "namaGedung" } });
                                    formik.setTouched({ ...formik.touched, namaGedung: true }); // Mark as touched
                                }}
                                error={formik.touched.namaGedung && Boolean(formik.errors.namaGedung)}
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                            />
                            {formik.touched.namaGedung && formik.errors.namaGedung ? (
                                <Typography color="error">{formik.errors.namaGedung}</Typography>
                            ) : null}
                        </FormControl>

                        <Typography sx={{ fontSize: "16px" }}>
                            Alamat Gedung<span style={{ color: "red" }}>*</span>
                        </Typography>
                        <FormControl fullWidth sx={{ my: 1 }}>
                            <OutlinedInput
                                id="alamatGedung"
                                name="alamatGedung"
                                size="medium"
                                placeholder="Masukkan alamat tempat tinggal pegawai"
                                value={formik.values.alamatGedung}
                                onChange={formik.handleChange}
                                onBlur={() => {
                                    formik.handleBlur({ target: { name: "alamatGedung" } });
                                    formik.setTouched({ ...formik.touched, alamatGedung: true }); // Mark as touched
                                }}
                                error={formik.touched.alamatGedung && Boolean(formik.errors.alamatGedung)}
                                sx={{ height: '107px', alignItems: 'flex-start', paddingTop: '8px' }}
                                inputProps={{ sx: { padding: 0 } }}
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                            />
                            {formik.touched.alamatGedung && formik.errors.alamatGedung ? (
                                <Typography color="error">{formik.errors.alamatGedung}</Typography>
                            ) : null}
                        </FormControl>

                        {/* Button */}
                        <Button
                            type="submit"
                            onClick={ showTemporaryAlertSuccess }
                            variant="contained"
                            color="inherit"
                            sx={{
                                mt: 3,
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
                            disabled={!formik.isValid || !formik.dirty} // Disable if form is not valid or not dirty
                        >
                            Simpan
                        </Button>
                    </Box>
                </Box>
            </Box>

                            {successAlert && (
                                <AlertSuccess label="Success adding building" />
                            )}

        </Container>
    );
}
