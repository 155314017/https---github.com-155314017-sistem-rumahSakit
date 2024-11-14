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
import axios from 'axios';
import Cookies from "js-cookie";
import DropdownListAPI from '../../components/small/DropdownListAPI';
import { Navigate, useNavigate } from 'react-router-dom';

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

type Facility = {
    id: string;
    name: string;
};

export default function TambahSubFasilitas() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [operationalTime, setOperationalTime] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
    const [errorAlert, setErrorAlert] = useState(false);
    const [facilityOptions, setFacilityOptions] = useState<Facility[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFacilityData = async () => {
            console.log("Fetching info buildings...");
            try {
                console.log("Try fetching info buildings");
                const response = await axios.get('https://hms.3dolphinsocial.com:8083/v1/manage/facility/?pageNumber=0&pageSize=10&orderBy=createdDateTime=asc', {
                    timeout: 10000
                });
                setFacilityOptions(response.data.data.content.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                })));
                console.log(response.data.data.content);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("Axios error:", error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            }
        };
        fetchFacilityData();
    }, []);

    console.log(operationalTime)

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
        console.log("Selected day:", selectedDay);
        console.log("Start time:", startTime?.format("HH:mm"));
        console.log("End time:", endTime?.format("HH:mm"));
        // console.log(errorAlert)
        // console.log(successAlert)
        // console.log(operationalTime)

        const dateTime = selectedDay + " " + startTime?.format("HH:mm") + " - " + endTime?.format("HH:mm");
        setOperationalTime(dateTime);
        console.log("Waktu yg dipilih: ", dateTime);
        console.log("Day: ", selectedDay);
        console.log("start time: ", startTime?.unix());
        console.log("end time: ", endTime?.unix());
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
        { label: "Tambah SubFasilitas", href: "/tambahSubFasilitas" },
    ];

    const formik = useFormik({
        initialValues: {
            masterFacilityId: '',
            namaSubFasilitas: '',
        },
        validationSchema: Yup.object({
            masterFacilityId: Yup.string().required('Gedung is required'),
            namaSubFasilitas: Yup.string().required('SubFacility Name is required'),
        }),
        onSubmit: async (values) => {

            const selectedDayOfWeek = dayMapping[selectedDay || "1"];
            const adjustedStartTime = startTime?.day(selectedDayOfWeek);
            const adjustedEndTime = endTime?.day(selectedDayOfWeek);

            console.log("Selected Day on submit: ", selectedDayOfWeek)
            console.log("adjusted start time: ", adjustedStartTime)
            console.log("adjusted end time: ", adjustedEndTime)


            const schedules = [
                {
                    startDateTime: adjustedStartTime?.unix(),
                    endDateTime: adjustedEndTime?.unix(),
                }
            ];

            const data = {
                name: values.namaSubFasilitas,
                facilityDataId: values.masterFacilityId,
                additionalInfo: "hai",
                schedules: schedules,
                images: null,
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
                navigate('/fasilitas', { state: { successAddSub: true, message: 'Fasilitas berhasil ditambahkan!' } })
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
                    <Typography fontSize="20px" fontWeight="700">Tambah SubFasilitas</Typography>
                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="bg-image" />
                    </Box>

                    <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
                        <Typography sx={{ fontSize: "16px" }}>Nama Sub Fasilitas<span style={{ color: "red" }}>*</span></Typography>
                        <FormControl fullWidth sx={{ my: 1 }}>
                            <OutlinedInput
                                id="namaSubFasilitas"
                                name="namaSubFasilitas"
                                size="small"
                                placeholder="Masukkan nama subfasilitas"
                                value={formik.values.namaSubFasilitas}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.namaSubFasilitas && Boolean(formik.errors.namaSubFasilitas)}
                            />
                            {formik.touched.namaSubFasilitas && formik.errors.namaSubFasilitas && (
                                <Typography color="error">{formik.errors.namaSubFasilitas}</Typography>
                            )}
                        </FormControl>

                        <Typography sx={{ fontSize: "16px", mt: 2 }}>Pilih Fasilitas<span style={{ color: "red" }}>*</span></Typography>
                        <DropdownListAPI
                            options={facilityOptions.map(({ id, name }) => ({ value: id, label: name }))}
                            placeholder="Pilih Fasilitas Induk"
                            defaultValue={formik.values.masterFacilityId}
                            onChange={(selectedOptionValue, selectedLabel) => {
                                formik.setFieldValue('masterFacilityId', selectedOptionValue);
                                console.log("Selected Building ID:", selectedOptionValue);
                                console.log("Selected Building Name:", selectedLabel);
                            }}
                            loading={false}
                        />

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
                                            console.log("Selected value:", value);
                                            setSelectedDay(value);
                                        }}
                                        loading={false}
                                    // defaultValue=""
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