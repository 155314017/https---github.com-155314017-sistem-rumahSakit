import { Container, Box } from "@mui/system";
import { Typography, Button } from "@mui/material";
import BreadCrumbs from "../../components/medium/BreadCrumbs";
import bgImage from "../../assets/img/String.png";
import CustomTimePicker from "../../components/small/CustomTimePicker";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import dayjs from "dayjs";
import InputCurrencyIdr from "../../components/inputComponent/InputCurrencyIdr";
import axios from 'axios';
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import ImageUploaderGroupAPI from "../../components/medium/ImageGroupUploaderAPI";
import { useFormik } from "formik";
import DropdownListAPI from "../../components/small/DropdownListAPI";
import "dayjs/locale/id";  // Import Bahasa Indonesia locale

interface FormValues {
    operationalCost: number;
}

type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
};

export default function EditAmbulance() {
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const { id } = useParams();
    const [apiUrl, setApiUrl] = useState('');
    const [initialOperationalCost, setInitialOperationalCost] = useState<number>(0);
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedDays, setSelectedDays] = useState<string>('');
    dayjs.locale("id"); // Set the locale globally

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("accessToken");
                const response = await axios.get(`https://hms.3dolphinsocial.com:8083/v1/manage/ambulance/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    }
                });

                const data = response.data.data;
                setApiUrl(`https://hms.3dolphinsocial.com:8083/v1/manage/ambulance/${id}`);
                setInitialOperationalCost(data.cost);
                console.log("SCHEDULEEESS ", data.schedules);
                console.log(errorAlert);
                console.log(successAlert);

                if (data.schedules && data.schedules.length > 0) {
                    const schedule = data.schedules[0];
                    setStartTime(dayjs(schedule.startTime));
                    setEndTime(dayjs(schedule.endTime));
                }

                console.log("Start: ", startTime);
                console.log("End: ", endTime);
                setImagesData(data.images || []);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        console.log("Fetched ! ! !")
        console.log("Start: ", startTime);
        console.log("End: ", endTime);
    }, [startTime, endTime]);

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

            const dayValue = dayMapping[dayOfWeek] || "7"; // Default ke "Minggu" jika tidak cocok
            setSelectedDays(dayValue);  // Menetapkan nilai hari yang sesuai
            console.log(dayValue);
        }
    }, [startTime, endTime]);


    const formik = useFormik<FormValues>({
        initialValues: {
            operationalCost: initialOperationalCost || 0,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            operationalCost: Yup.number().required('Operational Cost is required').positive('Must be a positive number'),
        }),
        onSubmit: async (values) => {
            const schedules = [
                {
                    day: selectedDay,
                    startDateTime: startTime ? dayjs(startTime).toISOString() : null,
                    endDateTime: endTime ? dayjs(endTime).toISOString() : null,
                }
            ].filter(schedule => schedule.startDateTime && schedule.endDateTime);

            const data = {
                ambulanceId: id,
                number: "999",
                status: "ACTIVE",
                cost: values.operationalCost,
                schedules: schedules,
                images: imagesData.map(image => ({
                    imageName: image.imageName || "",
                    imageType: image.imageType || "",
                    imageData: image.imageData || "",
                })),
            };

            const token = Cookies.get("accessToken");
            try {
                const response = await axios.put("https://hms.3dolphinsocial.com:8083/v1/manage/ambulance/", data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    },
                });
                console.log(response)
                setSuccessAlert(true);
            } catch (error) {
                console.error('Error editing ambulance:', error);
                setErrorAlert(true);
            }
        },
    });

    const handleImageChange = (images: ImageData[]) => {
        setImagesData(images);
    };

    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Ambulance", href: "/ambulance" },
        { label: "Edit Ambulance", href: `/editAmbulance/${id}` },
    ];

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
                        Edit Ambulance
                    </Typography>

                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="bg-image" />
                    </Box>

                    <ImageUploaderGroupAPI onChange={handleImageChange} apiUrl={apiUrl} />

                    <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
                        <Typography sx={{ fontSize: "16px" }}>
                            Biaya Tarif<span style={{ color: "red" }}>*</span>
                        </Typography>
                        <InputCurrencyIdr
                            onChange={(value) => formik.setFieldValue('operationalCost', value)}
                            defaultValue={initialOperationalCost}
                        />
                        <Box display={'flex'} flexDirection={'column'} border={'1px solid #A8A8BD'} borderRadius={'16px'} padding={'16px'} mt={2}>
                            <Typography mb={'15px'}>Jam Operasional</Typography>
                            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} gap={'32px'}>
                                <Box display={'flex'} flexDirection={'column'} width={'100%'}>
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

                                <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                                    <Typography>Jam mulai</Typography>
                                    <CustomTimePicker
                                        value={startTime}
                                        onChange={(newValue) => setStartTime(newValue)}
                                    />
                                </Box>

                                <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                                    <Typography>Jam selesai</Typography>
                                    <CustomTimePicker
                                        value={endTime}
                                        onChange={(newValue) => setEndTime(newValue)}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Button type="submit"
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
                    >
                        Simpan
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
