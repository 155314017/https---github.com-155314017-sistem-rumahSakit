import { useEffect, useState } from 'react';
import { Container, Box, Typography, Button, FormControl, OutlinedInput } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import BreadCrumbs from "../../components/medium/BreadCrumbs";
import bgImage from "../../assets/img/String.png";
import AlertSuccess from "../../components/small/AlertSuccess";
import CustomTimePicker from "../../components/small/CustomTimePicker";
import dayjs from 'dayjs';
import InputCurrencyIdr from '../../components/inputComponent/InputCurrencyIdr';
import axios from 'axios';
import Cookies from "js-cookie";
import DropdownListAPI from '../../components/small/DropdownListAPI';
import { useNavigate, useParams } from 'react-router-dom';
import ImageUploaderGroupAPI from '../../components/medium/ImageGroupUploaderAPI';

type Building = {
    id: string;
    name: string;
};

type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
};


export default function EditFasilitas() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [operationalTime, setOperationalTime] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const [errorAlert, setErrorAlert] = useState(false);
    const [gedungOptions, setGedungOptions] = useState<Building[]>([]);
    const [apiUrl, setApiUrl] = useState('');
    const { id } = useParams();
    const [initialOperationalCost, setInitialOperationalCost] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [buildingName, setBuildingName] = useState('');
    const navigate = useNavigate();
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
            const dayMapping: { [key: string]: string } = {
                "Monday": "1",
                "Tuesday": "2",
                "Wednesday": "3",
                "Thursday": "4",
                "Friday": "5",
                "Saturday": "6",
                "Sunday": "7"
            };

            const dayValue = dayMapping[dayOfWeek] || "7";
            setSelectedDays(dayValue);
        }
    }, [startTime, endTime]);

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
            try {
                const token = Cookies.get("accessToken");
                const response = await axios.get(`https://hms.3dolphinsocial.com:8083/v1/manage/facility/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    }
                });
                setApiUrl(`https://hms.3dolphinsocial.com:8083/v1/manage/facility/${id}`);
                setName(response.data.data.name);
                setDescription(response.data.data.description);
                setInitialOperationalCost(response.data.data.cost);
                const buildingResponse = await axios.get(`https://hms.3dolphinsocial.com:8083/v1/manage/building/${response.data.data.masterBuildingId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    }
                });

                setBuildingName(buildingResponse.data.data.id);

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
    const handleImageChange = (images: ImageData[]) => {
        setImagesData(images);
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
        { label: "Edit Fasilitas", href: "/editFasilitas/:id" },
    ];

    const formik = useFormik({
        initialValues: {
            namaFasilitas: name,
            masterBuildingId: buildingName,
            deskripsiKlinik: description,
            operationalCost: initialOperationalCost || 0,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            namaFasilitas: Yup.string().required('Facility Name is required'),
            masterBuildingId: Yup.string().required('Gedung is required'),
            deskripsiKlinik: Yup.string().required('Deskripsi Klinik is required'),
            operationalCost: Yup.number().required('Operational Cost is required').positive('Must be a positive number'),
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
                facilityId: id,
                name: values.namaFasilitas,
                masterBuildingId: values.masterBuildingId,
                description: values.deskripsiKlinik,
                cost: values.operationalCost,
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
                const response = await axios.put('https://hms.3dolphinsocial.com:8083/v1/manage/facility/', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    },
                });
                showTemporaryAlertSuccess();
                formik.resetForm();
                setImagesData([]);
                navigate('/fasilitas', { state: { successEdit: true, message: 'Fasilitas berhasil di edit!' } })
            } catch (error) {
                console.error('Error submitting form:', error);
                if (axios.isAxiosError(error)) {
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
                    <Typography fontSize="20px" fontWeight="700">Edit Fasilitas</Typography>
                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="bg-image" />
                    </Box>

                    <ImageUploaderGroupAPI onChange={handleImageChange} apiUrl={apiUrl} />

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
                            defaultValue={formik.values.masterBuildingId}
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

                        <Typography sx={{ fontSize: "16px", mt: 3 }}>Biaya Penanganan<span style={{ color: "red" }}>*</span></Typography>
                        {/* <InputCurrencyIdr /> */}
                        <InputCurrencyIdr
                            onChange={(value) => {
                                formik.setFieldValue('operationalCost', value);
                            }}
                            defaultValue={initialOperationalCost}
                        />

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