/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Container, Box, Typography, Button, FormControl, OutlinedInput } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import BreadCrumbs from "../../components/medium/BreadCrumbs";
import bgImage from "../../assets/img/String.png";
import AlertSuccess from "../../components/small/AlertSuccess";
import DropdownList from "../../components/small/DropdownList";
import CustomTimePicker from "../../components/small/CustomTimePicker";
import dayjs from 'dayjs';
import ImageUploaderGroup from '../../components/medium/ImageUploaderGroup';
import InputCurrencyIdr from '../../components/inputComponent/InputCurrencyIdr';
import axios from 'axios';
import Cookies from "js-cookie";
import DropdownListAPI from '../../components/small/DropdownListAPI';
import { useNavigate } from 'react-router-dom';

type Building = {
    id: string;
    name: string;
};

type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
};


export default function TambahFasilitas() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [operationalTime, setOperationalTime] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const [operationalCost, setOperationalCost] = useState<string | null>(null);
    const [errorAlert, setErrorAlert] = useState(false);
    const [gedungOptions, setGedungOptions] = useState<Building[]>([]);
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
                if (axios.isAxiosError(error)) {
                    console.error("Axios error:", error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            }
        };
        fetchGedungData();
    }, []);
    const handleImageChange = (images: ImageData[]) => {
        setImagesData(images);
    };

    const dayMapping: { [key: string]: number } = {
        "Senin": 1,
        "Selasa": 2,
        "Rabu": 3,
        "Kamis": 4,
        "Jumat": 5,
        "Sabtu": 6,
        "Minggu": 0,
    };


    const handleTambahHari = () => {
        const dateTime = selectedDay + " " + startTime?.format("HH:mm") + " - " + endTime?.format("HH:mm");
        setOperationalTime(dateTime);
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
        { label: "Fasilitas", href: "/fasilitas" },
        { label: "Tambah Fasilitas", href: "/tambahFasilitas" },
    ];

    const formik = useFormik({
        initialValues: {
            deskripsiKlinik: '',
            masterBuildingId: '',
            namaFasilitas:'',
        },
        validationSchema: Yup.object({
            deskripsiKlinik: Yup.string().required('Deskripsi Klinik is required'),
            masterBuildingId: Yup.string().required('Gedung is required'),
            namaFasilitas: Yup.string().required('Facility Name is required'),
        }),
        onSubmit: async (values) => {

            const selectedDayOfWeek = dayMapping[selectedDay || "1"];
            const adjustedStartTime = startTime?.day(selectedDayOfWeek);
            const adjustedEndTime = endTime?.day(selectedDayOfWeek);
            const schedules = [
                {
                    startDateTime: adjustedStartTime?.unix(),
                    endDateTime: adjustedEndTime?.unix(),
                }
            ];

            const data = {
                name: values.namaFasilitas,
                masterBuildingId: values.masterBuildingId,
                description: values.deskripsiKlinik,
                cost: operationalCost ? parseInt(operationalCost.replace(/\D/g, '')) : 0,
                additionalInfo: "hai",
                schedules: schedules,
                images: imagesData.map(image => ({
                    imageName: image.imageName || "",
                    imageType: image.imageType || "",
                    imageData: image.imageData || "",
                })),
            };
            const token = Cookies.get("accessToken");
            try {
                const response = await axios.post('https://hms.3dolphinsocial.com:8083/v1/manage/facility/', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    },
                });
                showTemporaryAlertSuccess();
                formik.resetForm();
                setImagesData([]);
                navigate('/fasilitas', { state: { successAdd: true, message: 'Fasilitas berhasil ditambahkan!' } })
            } catch (error) {
                console.error('Error submitting form:', error);
                if (axios.isAxiosError(error)) {
                    console.error('Axios error message:', error.message);
                    console.error('Response data:', error.response?.data);
                    showTemporaryAlertError();
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        },
    });

    return (
        <Container sx={{ py: 2 }}>
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box mt={3}>
                <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}>
                    <Typography fontSize="20px" fontWeight="700">Tambah Fasilitas</Typography>
                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="bg-image" />
                    </Box>

                    <ImageUploaderGroup onChange={handleImageChange} />

                    <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
                        <Typography sx={{ fontSize: "16px" }}>Nama Fasilitas<span style={{ color: "red" }}>*</span></Typography>
                        <FormControl fullWidth sx={{ my: 1 }}>
                            <OutlinedInput
                                id="namaFasilitas"
                                name="namaFasilitas"
                                size="small"
                                placeholder="Masukkan nama fasilitas"
                                value={formik.values.namaFasilitas}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.namaFasilitas && Boolean(formik.errors.namaFasilitas)}
                            />
                            {formik.touched.namaFasilitas && formik.errors.namaFasilitas && (
                                <Typography color="error">{formik.errors.namaFasilitas}</Typography>
                            )}
                        </FormControl>

                        <Typography sx={{ fontSize: "16px", mt: 2 }}>Pilih Gedung<span style={{ color: "red" }}>*</span></Typography>
                        <DropdownListAPI
                            options={gedungOptions.map(({ id, name }) => ({ value: id, label: name }))}
                            placeholder="Pilih gedung"
                            onChange={(selectedOptionValue) => {
                                formik.setFieldValue('masterBuildingId', selectedOptionValue);
                            }}
                            loading={false}
                        />

                        <Typography sx={{ fontSize: "16px", mt: 2 }}>Deskripsi<span style={{ color: "red" }}>*</span></Typography>
                        <FormControl fullWidth sx={{ my: 1 }}>
                            <OutlinedInput
                                id="deskripsiKlinik"
                                name="deskripsiKlinik"
                                size="small"
                                placeholder="Masukkan deskripsi"
                                value={formik.values.deskripsiKlinik}
                                onChange={formik.handleChange}
                                onBlur={() => formik.setTouched({ ...formik.touched, deskripsiKlinik: true })}
                                error={formik.touched.deskripsiKlinik && Boolean(formik.errors.deskripsiKlinik)}
                                sx={{ height: '107px', alignItems: 'flex-start', borderRadius: '8px' }}
                            />
                            {formik.touched.deskripsiKlinik && formik.errors.deskripsiKlinik && (
                                <Typography color="error">{formik.errors.deskripsiKlinik}</Typography>
                            )}
                        </FormControl>

                        <Box display={'flex'} flexDirection={'column'} border={'1px solid #A8A8BD'} borderRadius={'16px'} padding={'16px'} mt={2}>
                            <Typography mb={'15px'} >Jam Operasional</Typography>
                            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} gap={'32px'} >
                                {/* Hari */}
                                <Box display={'flex'} flexDirection={'column'} width={'100%'} >
                                    <Typography>Hari</Typography>
                                    <DropdownList
                                        options={[
                                            { value: 1, label: "Senin" },
                                            { value: 2, label: "Selasa" },
                                            { value: 3, label: "Rabu" },
                                            { value: 4, label: "Kamis" },
                                            { value: 5, label: "Jumat" },
                                            { value: 6, label: "Sabtu" },
                                            { value: 7, label: "Minggu" },
                                        ]}
                                        placeholder="Pilih hari"
                                        onChange={(value: string) => {
                                            setSelectedDay(value);
                                        }}
                                        loading={false}
                                    />
                                </Box>

                                {/* Jam Mulai */}
                                <Box display={'flex'} flexDirection={'column'} width={'100%'} >
                                    <Typography>Jam mulai</Typography>
                                    <CustomTimePicker
                                        value={startTime}
                                        onChange={(newValue) => setStartTime(newValue)}
                                    />
                                </Box>

                                {/* Jam Selesai */}
                                <Box display={'flex'} flexDirection={'column'} width={'100%'} >
                                    <Typography>Jam selesai</Typography>
                                    <CustomTimePicker
                                        value={endTime}
                                        onChange={(newValue) => setEndTime(newValue)}
                                    />
                                </Box>
                            </Box>
                            <Button
                                fullWidth
                                sx={{
                                    mt: 2,
                                    bgcolor: 'transparent',
                                    color: '#8F85F3',
                                    border: '1px solid #8F85F3',
                                    ":hover": { bgcolor: '#8F85F3', color: 'white' },
                                }}
                                onClick={handleTambahHari}
                            >
                                + Tambah hari
                            </Button>
                        </Box>

                        <Typography sx={{ fontSize: "16px", mt: 3 }}>Biaya Penanganan<span style={{ color: "red" }}>*</span></Typography>
                        {/* <InputCurrencyIdr /> */}
                        <InputCurrencyIdr onChange={(value) => setOperationalCost(value)} defaultValue={0} />

                        <Button
                            type="submit"
                            onClick={showTemporaryAlertSuccess}
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
            {successAlert && (
                <AlertSuccess label="Success adding building" />
            )}
            {errorAlert && (
                <AlertSuccess label="Error adding building" />
            )}
        </Container>
    );
}