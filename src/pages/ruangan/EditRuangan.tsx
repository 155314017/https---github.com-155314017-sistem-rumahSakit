import { useEffect, useState } from 'react';
import { Container, Box, Typography, Button, FormControl, OutlinedInput, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import BreadCrumbs from "../../components/medium/BreadCrumbs";
import bgImage from "../../assets/img/String.png";
import AlertSuccess from "../../components/small/AlertSuccess";
import DropdownListAPI from '../../components/small/DropdownListAPI';
import ImageUploaderGroupAPI from '../../components/medium/ImageGroupUploaderAPI';
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from 'react-router-dom';
import DropdownList from '../../components/small/DropdownList';
import { useNavigate } from "react-router-dom";

interface FormValues {
    namaKlinik: string;
    masterBuildingId: string;
    jenisRuangan: string;
}

type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
};

type Building = {
    id: string;
    name: string;
};

const jenisRuangan = [
    { value: 1, label: "VIP" },
    { value: 2, label: "Kelas 1" },
    { value: 3, label: "Kelas 2" },
    { value: 4, label: "Kelas 3" },
    { value: 5, label: "BPJS" },
];

export default function EditRuangan() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [apiUrl, setApiUrl] = useState('');
    const { id } = useParams();
    const [gedungOptions, setGedungOptions] = useState<Building[]>([]);
    const [roomName, setRoomName] = useState<string>('');
    const [buildingName, setBuildingName] = useState('');
    const [roomType, setRoomType] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchGedungData = async () => {
            try {
                const response = await axios.get('https://hms.3dolphinsocial.com:8083/v1/manage/building/?pageNumber=0&pageSize=10&orderBy=createdDateTime=asc', {
                    timeout: 10000
                });
                setGedungOptions(response.data.data.content.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                })));
            } catch (error) {
                console.error("Error fetching buildings:", error);
            }
        };
        fetchGedungData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = Cookies.get("accessToken");
                const response = await axios.get(`https://hms.3dolphinsocial.com:8083/v1/manage/room/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    }
                });
                setApiUrl(`https://hms.3dolphinsocial.com:8083/v1/manage/room/${id}`);
                setRoomName(response.data.data.name);
                setRoomType(response.data.data.type);

                const buildingResponse = await axios.get(`https://hms.3dolphinsocial.com:8083/v1/manage/building/${response.data.data.masterBuildingId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    }
                });

                setBuildingName(buildingResponse.data.data.id);  // Store the building ID instead of name
            } catch (error) {
                console.error('Error fetching room data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        console.log("Room Name:", roomName);
        console.log("Building ID:", buildingName);
    }, [roomName, buildingName]);

    const formik = useFormik<FormValues>({
        initialValues: {
            namaKlinik: roomName,
            masterBuildingId: buildingName,
            jenisRuangan: roomType,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            namaKlinik: Yup.string().required('Nama Ruangan is required'),
            masterBuildingId: Yup.string().required('Gedung is required'),
            jenisRuangan: Yup.string().required('Jenis Ruangan is required'),
        }),
        onSubmit: async (values) => {
            console.log("Submitted values: ", values);
            const data = {
                roomId: id,
                name: values.namaKlinik,
                masterBuildingId: values.masterBuildingId,
                type: values.jenisRuangan,
                additionalInfo: "add info,",
                images: imagesData,
            };

            const token = Cookies.get("accessToken");
            try {
                const response = await axios.put('https://hms.3dolphinsocial.com:8083/v1/manage/room/', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    },
                });
                setSuccessAlert(true);
                console.log(response);
                setTimeout(() => {
                    navigate('/ruangan');
                }, 2000); 

            } catch (error) {
                console.error('Error editing room:', error);
                setErrorAlert(true);
            }
        },
    });

    const handleImageChange = (images: ImageData[]) => {
        setImagesData(images);
    };

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

                    <ImageUploaderGroupAPI onChange={handleImageChange} apiUrl={apiUrl} />

                    <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
                        <Typography sx={{ fontSize: "16px" }}>Nama Ruangan<span style={{ color: "red" }}>*</span></Typography>
                        <FormControl fullWidth sx={{ my: 1 }}>
                            <OutlinedInput
                                id="namaKlinik"
                                name="namaKlinik"
                                size="small"
                                placeholder={loading ? "" : "Masukkan Nama ruangan"}
                                value={loading ? "" : formik.values.namaKlinik}
                                onChange={formik.handleChange}
                                onBlur={() => formik.setTouched({ ...formik.touched, namaKlinik: true })}
                                error={formik.touched.namaKlinik && Boolean(formik.errors.namaKlinik)}
                                startAdornment={loading ? <CircularProgress size={20} /> : null}
                                disabled={loading}
                            />
                            {formik.touched.namaKlinik && formik.errors.namaKlinik && (
                                <Typography color="error">{formik.errors.namaKlinik}</Typography>
                            )}
                        </FormControl>

                        <Typography sx={{ fontSize: "16px" }}>Pilih Gedung<span style={{ color: "red" }}>*</span></Typography>
                        <DropdownListAPI
                            options={gedungOptions.map(({ id, name }) => ({ value: id, label: name }))}
                            placeholder={loading ? "" : "Pilih gedung"}
                            defaultValue={loading ? "" : formik.values.masterBuildingId}
                            onChange={(selectedOptionValue, selectedLabel) => {
                                formik.setFieldValue('masterBuildingId', selectedOptionValue);
                                console.log("Selected Building ID:", selectedOptionValue);
                                console.log("Selected Building Name:", selectedLabel);
                            }}
                            loading={loading}   
                        />

                        <Typography sx={{ fontSize: "16px", mt: 1 }}>Jenis Ruangan<span style={{ color: "red" }}>*</span></Typography>
                        <DropdownList
                            options={jenisRuangan}
                            placeholder={loading ? "" : "Pilih jenis ruangan"}
                            onChange={(selectedValue) => {
                                console.log("Selected Jenis Ruangan:", selectedValue); 
                                formik.setFieldValue('jenisRuangan', selectedValue);
                            }}
                            defaultValue={loading ? "" : formik.values.jenisRuangan}
                            loading={loading}
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

                    {successAlert && <AlertSuccess label="Ruangan updated successfully" />}
                    {errorAlert && <AlertSuccess label="Error updating ruangan" />}
                </Box>
            </Box>
        </Container>
    );
}
