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

const listSubFasilitas = [
    { value: 1, label: "Baju Nakes" },
    { value: 2, label: "Stetoskop" },
    { value: 3, label: "Suntikan" },
];


type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
};

const jenisFasilitas = [
    { value: 1, label: "MRI" },
    { value: 2, label: "Fisioterapi" },
    { value: 3, label: "Unit Transfusi Darah (UTD)" },
];

export default function TambahSubFasilitas() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [operationalTime, setOperationalTime] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
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
        { label: "fasilitas", href: "/fasilitas" },
        { label: "Tambah SubFasilitas", href: "/tambahSubFasilitas" },
    ];

    const formik = useFormik({
        initialValues: {
            // deskripsiKlinik: '',
        },
        validationSchema: Yup.object({
            // deskripsiKlinik: Yup.string().required('Deskripsi Klinik is required'),
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
                facilityDataId: "c941a277-06b0-4026-97d7-b952a68b6716",
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
                const response = await axios.post('https://hms.3dolphinsocial.com:8083/v1/manage/subfacility/', data, {
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
                        <Typography sx={{ fontSize: "16px" }}>Nama Sub Fasilitas<span style={{ color: "red" }}>*</span></Typography>
                        <DropdownList
                            options={listSubFasilitas}
                            placeholder="masukkan nama sub fasilitas"
                            onChange={(value: string) => {
                                console.log(value);
                                setSelectedFacility(value)
                            }
                            }
                        />

                        <Typography sx={{ fontSize: "16px", mt: 2 }}>Pilih Fasilitas<span style={{ color: "red" }}>*</span></Typography>
                        <DropdownList
                            options={jenisFasilitas}
                            placeholder="Pilih fasilitas induk"
                            onChange={(selectedValue) => formik.setFieldValue('fasilitas', selectedValue)}
                        />

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
                <AlertSuccess label="Success adding SubFacility" />
            )}
            {errorAlert && (
                <AlertSuccess label="Error adding SubFacility" />
            )}
        </Container>
    );
}