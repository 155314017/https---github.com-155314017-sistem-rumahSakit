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
import { useParams, useNavigate } from 'react-router-dom';

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

export default function EditSUbFasilitas() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [operationalTime, setOperationalTime] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const [errorAlert, setErrorAlert] = useState(false);
    const { id } = useParams();
    const [facilityOptions, setFacilityOptions] = useState<Facility[]>([]);
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [facilityId, setFacilityId] = useState<string>('');
    const [selectedDays, setSelectedDays] = useState<string>("1");

    const dayMapping: { [key: string]: number } = {
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 0,
    };

    useEffect(() => {
        if (startTime && endTime) {
            const formattedStartTime = startTime.format("HH:mm");
            const formattedEndTime = endTime.format("HH:mm");
            const dayOfWeek = startTime.format("dddd");

            console.log(formattedStartTime)
            console.log(formattedEndTime);
            const dayMapping: { [key: string]: string } = {
                "Senin": "1",
                "Selasa": "2",
                "Rabu": "3",
                "Kamis": "4",
                "Jumat": "5",
                "Sabtu": "6",
                "Minggu": "7"
            };

            const dayValue = dayMapping[dayOfWeek] || "7";
            setSelectedDays(dayValue);
            console.log(dayValue);
        }
    }, [startTime, endTime]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("accessToken");
                const response = await axios.get(`https://hms.3dolphinsocial.com:8083/v1/manage/subfacility/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    }
                });
                setName(response.data.data.name);
                setFacilityId(response.data.data.facilityDataId);
                console.log("nama: ", name)

                if (response.data.data.schedules && response.data.data.schedules.length > 0) {
                    const schedule = response.data.data.schedules[0];
                    setStartTime(dayjs.unix(schedule.startDateTime));
                    setEndTime(dayjs.unix(schedule.endDateTime));
                }

                setImagesData(response.data.data.images || []);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchGedungData = async () => {
            try {
                const response = await axios.get('https://hms.3dolphinsocial.com:8083/v1/manage/facility/?pageNumber=0&pageSize=10&orderBy=createdDateTime=asc', {
                    timeout: 10000
                });
                setFacilityOptions(response.data.data.content.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                })));
            } catch (error) {
                console.error("Error fetching buildings:", error);
            }
        };
        fetchGedungData();
    }, []);

    console.log(operationalTime)

    const handleTambahHari = () => {
        console.log("Selected day:", selectedDay);
        console.log("Start time:", startTime?.format("HH:mm"));
        console.log("End time:", endTime?.format("HH:mm"));
        const dateTime = selectedDay + " " + startTime?.format("HH:mm") + " - " + endTime?.format("HH:mm");
        setOperationalTime(dateTime);
        console.log("Waktu yg dipilih: ", dateTime);
        console.log("Day: ", selectedDay);
        console.log("start time: ", startTime?.unix());
        console.log("end time: ", endTime?.unix());
    };

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
        { label: "fasilitas", href: "/fasilitas" },
        { label: "Edit SubFasilitas", href: "/editSubFasilitas:id" },
    ];

    const formik = useFormik({
        initialValues: {
            // deskripsiKlinik: '',
            masterFacilityId: facilityId,
            namaSubFasilitas: name,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            // deskripsiKlinik: Yup.string().required('Deskripsi Klinik is required'),
            masterFacilityId: Yup.string().required('Facility is required'),
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
                subfacilityId: id,
                name: values.namaSubFasilitas,
                facilityDataId: values.masterFacilityId,
                additionalInfo: "hai",
                schedules: schedules,
                images: null,
            };

            console.log('Form submitted:', data);

            const token = Cookies.get("accessToken");

            try {
                const response = await axios.put('https://hms.3dolphinsocial.com:8083/v1/manage/subfacility/', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    },
                });
                console.log('Response:', response.data);
                showTemporaryAlertSuccess();
                formik.resetForm();
                setImagesData([]);
                navigate('/fasilitas')
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
                    <Typography fontSize="20px" fontWeight="700">Edit SubFasilitas</Typography>
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
                                placeholder="Masukkan nama fasilitas"
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
                                    <DropdownListAPI
                                        options={[
                                            { value: "1", label: "Senin" },
                                            { value: "2", label: "Selasa" },
                                            { value: "3", label: "Rabu" },
                                            { value: "4", label: "Kamis" },
                                            { value: "5", label: "Jumat" },
                                            { value: "6", label: "Sabtu" },
                                            { value: "7", label: "Minggu" },
                                        ]}
                                        placeholder="Pilih hari"
                                        onChange={(value: string) => setSelectedDay(value)}
                                        loading={false}
                                        defaultValue={selectedDays}
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