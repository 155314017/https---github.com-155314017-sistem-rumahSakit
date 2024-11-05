import { useState } from 'react';
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

const hari = [
    { value: 1, label: "Senin" },
    { value: 2, label: "Selasa" },
    { value: 3, label: "Rabu" },
    { value: 4, label: "Kamis" },
    { value: 5, label: "Jumat" },
    { value: 6, label: "Sabtu" },
    { value: 7, label: "Minggu" },
];

const listFasilitas = [
    { value: 1, label: "MRI" },
    { value: 2, label: "Fisioterapi" },
    { value: 3, label: "Unit Transfusi Darah (UTD)" },
];


type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
};

export default function TambahFasilitas() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [operationalTime, setOperationalTime] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const [operationalCost, setOperationalCost] = useState<string | null>(null);
    const [errorAlert, setErrorAlert] = useState(false);



    const handleImageChange = (images: ImageData[]) => {
        console.log('Images changed:', images);
        setImagesData(images);
    };

    const handleTambahHari = () => {
        // const selectedDayLabel = hari.find(day => day.value === selectedDay)?.label;
        console.log("Selected day:", selectedDay);
        console.log("Start time:", startTime?.format("HH:mm"));
        console.log("End time:", endTime?.format("HH:mm"));

        const dateTime = selectedDay + " " + startTime?.format("HH:mm") + " - " + endTime?.format("HH:mm");
        setOperationalTime(dateTime);
        console.log(dateTime);
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
        },
        validationSchema: Yup.object({
            deskripsiKlinik: Yup.string().required('Deskripsi Klinik is required'),
        }),
        onSubmit: async (values) => {
            const schedules = [
                {
                    startDateTime: startTime ? dayjs(startTime).toISOString() : null,
                    endDateTime: endTime ? dayjs(endTime).toISOString() : null,
                }
            ].filter(schedule => schedule.startDateTime && schedule.endDateTime); 

            const data = {
                name: selectedFacility,
                masterBuildingId: "7e331236-8a5c-4650-b373-6c591abc5a58", 
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

            console.log('Form submitted:', data);

            const token = Cookies.get("accessToken");

            try {
                const response = await axios.post('https://hms.3dolphinsocial.com:8083/v1/manage/facility/', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    },
                });
                console.log('Response:', response.data);
                showTemporaryAlertSuccess();
                formik.resetForm();
                setImagesData([]);
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
                        <DropdownList
                            options={listFasilitas}
                            placeholder="masukkan nama ruangan"
                            onChange={(value: string) => {
                                console.log(value);
                                setSelectedFacility(value)
                            }
                            }
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
                                        options={hari}
                                        placeholder="Pilih hari"
                                        onChange={(value: string) => {
                                            console.log("Selected value:", value);
                                            setSelectedDay(value);
                                        }}
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
                        <InputCurrencyIdr onChange={(value) => setOperationalCost(value)} />

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