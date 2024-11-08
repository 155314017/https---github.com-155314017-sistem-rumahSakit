import { Container, Box } from "@mui/system";
import { Typography, Button, FormControl, OutlinedInput, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import BreadCrumbs from "../../components/medium/BreadCrumbs";
import bgImage from "../../assets/img/String.png";
import { useEffect, useState } from "react";
import AlertSuccess from "../../components/small/AlertSuccess";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import ImageUploaderGroupAPI from "../../components/medium/ImageGroupUploaderAPI";
import { useNavigate } from "react-router-dom";

type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
};

interface FormValues {
    namaGedung: string;
    alamatGedung: string;
}

export default function EditGedung() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [apiUrl, setApiUrl] = useState('');
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            console.log("id room: ", id)
            try {
                const token = Cookies.get("accessToken");
                const response = await axios.get(`https://hms.3dolphinsocial.com:8083/v1/manage/building/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    }
                });
                setApiUrl(`https://hms.3dolphinsocial.com:8083/v1/manage/building/${id}`);
                console.log("DATA : ")
                console.log("Response", response.data);
                console.log(response.data.data.name);
                console.log("Images: ")
                setName(response.data.data.name);
                setAddress(response.data.data.address);
                console.log("DATA state : ")
                console.log(name);
                console.log(address);
            } catch (error) {
                console.error('Error saat menghapus data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        console.log("Nama gedung: ", name);
    }, [name]);

    const handleImageChange = (images: ImageData[]) => {
        console.log('Images changed:', images);
        setImagesData(images);
    };

    const showTemporaryAlertSuccess = async () => {
        setSuccessAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessAlert(false);
    };

    const showTemporaryAlertError = async () => {
        setErrorAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setErrorAlert(false);
    };

    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Gedung", href: "/gedung" },
        { label: "Edit Gedung", href: `/editGedung/${id}` },
    ];

    const formik = useFormik<FormValues>({
        initialValues: {
            namaGedung: name,
            alamatGedung: address,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            namaGedung: Yup.string().required('Nama Gedung is required'),
            alamatGedung: Yup.string().required('Alamat Gedung is required'),
        }),
        onSubmit: async (values) => {
            console.log(values.namaGedung)
            console.log(values.alamatGedung)

            const data = {
                buildingId: id,
                name: values.namaGedung,
                address: values.alamatGedung,
                additionalInfo: "",
                images: imagesData.map(image => ({
                    imageName: image.imageName || "",
                    imageType: image.imageType || "",
                    imageData: image.imageData || "",
                })),
            };

            console.log('Submitting form with data:', data);

            const token = Cookies.get("accessToken");
            console.log("Token :", token)

            try {
                const response = await axios.put('https://hms.3dolphinsocial.com:8083/v1/manage/building/', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    },
                });
                console.log('Response:', response.data);
                showTemporaryAlertSuccess();
                formik.resetForm();
                setImagesData([]);
                navigate('/gedung')
            } catch (error) {
                console.error('Error submitting form:', error);
                if (axios.isAxiosError(error)) {
                    console.error('Axios error message:', error.message);
                    console.error('Response data:', error.response?.data);

                    if (error.response) {
                        console.error('Response status:', error.response.status);
                        console.error('Response headers:', error.response.headers);
                        console.error('Response data:', error.response.data);
                    } else {
                        console.error('Error message:', error.message);
                    }
                    showTemporaryAlertError();
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        },
    });

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


                    <ImageUploaderGroupAPI onChange={handleImageChange} apiUrl={apiUrl} />


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
                                disabled={loading}
                                onBlur={() => formik.setTouched({ ...formik.touched, namaGedung: true })}
                                error={formik.touched.namaGedung && Boolean(formik.errors.namaGedung)}
                                endAdornment={loading ? <CircularProgress size={20} /> : null}
                            />
                            {formik.touched.namaGedung && formik.errors.namaGedung && (
                                <Typography color="error">{formik.errors.namaGedung}</Typography>
                            )}
                        </FormControl>

                        <Typography sx={{ fontSize: "16px" }}>
                            Alamat Gedung<span style={{ color: "red" }}>*</span>
                        </Typography>
                        <FormControl fullWidth sx={{ my: 1 }}>
                            <OutlinedInput
                                id="alamatGedung"
                                name="alamatGedung"
                                size="small"
                                placeholder="Masukkan alamat tempat tinggal pegawai"
                                value={formik.values.alamatGedung}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.alamatGedung && Boolean(formik.errors.alamatGedung)}
                                endAdornment={loading ? <CircularProgress size={20} /> : null}
                                disabled={loading}
                                sx={{
                                    alignItems: 'flex-start',
                                    paddingLeft: '8px',
                                }}
                                inputProps={{
                                    sx: {
                                        padding: '8px',
                                    }
                                }}
                                multiline
                                minRows={3}
                                maxRows={10}
                            />
                            {formik.touched.alamatGedung && formik.errors.alamatGedung && (
                                <Typography color="error">{formik.errors.alamatGedung}</Typography>
                            )}
                        </FormControl>

                        {/* Button */}
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

            {successAlert && (
                <AlertSuccess label="Building edited" />
            )}
            {errorAlert && (
                <AlertSuccess label="Error editing building" />
            )}
        </Container>
    );
}