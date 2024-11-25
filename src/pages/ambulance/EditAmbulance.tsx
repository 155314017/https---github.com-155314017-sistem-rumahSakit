import { Container, Box, Typography, Button, IconButton } from "@mui/material";
import BreadCrumbs from "../../components/medium/BreadCrumbs";
import bgImage from "../../assets/img/String.png";
import CustomTimePicker from "../../components/small/CustomTimePicker";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import dayjs from "dayjs";
import InputCurrencyIdr from "../../components/inputComponent/InputCurrencyIdr";
import axios from 'axios';
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import ImageUploaderGroupAPI from "../../components/medium/ImageGroupUploaderAPI";
import { useFormik } from "formik";
import DropdownListAPI from "../../components/small/DropdownListAPI";
import "dayjs/locale/id";
import DeleteIcon from '@mui/icons-material/Delete';

interface FormValues {
  operationalCost: number;
}

type ImageData = {
  imageName: string;
  imageType: string;
  imageData: string;
};

type Schedule = {
  day: string;
  startTime: dayjs.Dayjs;
  endTime: dayjs.Dayjs;
};

export default function EditAmbulance() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [imagesData, setImagesData] = useState<ImageData[]>([]);
  const { id } = useParams();
  const [initialOperationalCost, setInitialOperationalCost] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<string>("1");
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
  const navigate = useNavigate();

  // Fetch data function
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://your-api-url/${id}`);
        const data = response.data;
        setInitialOperationalCost(data.operationalCost || 0);
        setImagesData(data.images || []);
        // Set schedules as needed
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const formik = useFormik<FormValues>({
    initialValues: {
      operationalCost: initialOperationalCost || 0,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      operationalCost: Yup.number()
        .required('Operational Cost is required')
        .positive('Must be a positive number'),
    }),
    onSubmit: async (values) => {
      const formattedSchedules = schedules.map(schedule => ({
        startDateTime: schedule.startTime.unix(),
        endDateTime: schedule.endTime.unix(),
      }));

      const data = {
        ambulanceId: id,
        cost: values.operationalCost,
        schedules: formattedSchedules,
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
            'accessToken': `${token}`,
          },
        });
        console.log(response);
        navigate('/ambulance', { state: { successEdit: true, message: 'Ambulance successfully updated!' } });
      } catch (error) {
        console.error('Error editing ambulance:', error);
      }
    },
  });

  const handleTambahHari = () => {
    if (selectedDay && startTime && endTime) {
      setSchedules([...schedules, { day: selectedDay, startTime, endTime }]);
      setSelectedDay("1");
      setStartTime(null);
      setEndTime(null);
    }
  };

  const handleDeleteSchedule = (index: number) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };

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
        <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}>
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
                    onChange={(value) => setSelectedDay(value)}
                    loading={false}
                  />
                </Box>

                <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                  <Typography>Jam mulai</Typography>
                  <CustomTimePicker value={startTime} onChange={setStartTime} />
                </Box>

                <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                  <Typography>Jam selesai</Typography>
                  <CustomTimePicker value={endTime} onChange={setEndTime} />
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

              {schedules.map((schedule, index) => (
                <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Typography>{`hari ${dayNames[schedule.day] || 'Unknown'}: ${schedule.startTime.format("HH:mm")} - ${schedule.endTime.format("HH:mm")}`}</Typography>
                  <IconButton color="error" onClick={() => handleDeleteSchedule(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>

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
                ":hover": { bgcolor: "#a098f5", boxShadow: "none" },
              }}
              disabled={!formik.isValid || !formik.dirty}
            >
              Simpan
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}