import { Container, Box } from "@mui/system";
import { Typography, Button, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import BreadCrumbs from "../../components/medium/BreadCrumbs";
import ImageUploaderGroup from "../../components/medium/ImageUploaderGroup";
import CustomTimePicker from "../../components/small/CustomTimePicker";
import DropdownList from "../../components/small/DropdownList";
import InputCurrencyIdr from "../../components/inputComponent/InputCurrencyIdr";
import axios from 'axios';
import Cookies from "js-cookie";
import { useState } from "react";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import "dayjs/locale/id";
import { useNavigate } from "react-router-dom";


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

export default function TambahAmbulance() {
  const [imagesData, setImagesData] = useState<ImageData[]>([]);
  const [errorAlert, setErrorAlert] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  dayjs.locale("id");

  const navigate = useNavigate();

  console.log(errorAlert)
  const dayMapping: { [key: string]: number } = {
    "Senin": 1,
    "Selasa": 2,
    "Rabu": 3,
    "Kamis": 4,
    "Jumat": 5,
    "Sabtu": 6,
    "Minggu": 0,
  };

  interface FormValues {
    operationalCost: number;
  }

  const handleTambahHari = () => {
    if (selectedDay && startTime && endTime) {
      const newSchedule: Schedule = {
        day: selectedDay,
        startTime: startTime,
        endTime: endTime,
      };
      setSchedules([...schedules, newSchedule]);
      setSelectedDay('');
      setStartTime(null);
      setEndTime(null);
    }
  };

  const handleDeleteSchedule = (index: number) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };

  const showTemporaryAlertError = async () => {
    setErrorAlert(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setErrorAlert(false);
  };

  const handleImageChange = (images: ImageData[]) => {
    setImagesData(images);
  };

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Ambulance", href: "/ambulance" },
    { label: "Tambah Ambulance", href: "/tambahAmbulance" },
  ];

  const formik = useFormik<FormValues>({
    initialValues: {
      operationalCost: 0,
    },
    validationSchema: Yup.object({
      operationalCost: Yup.number().required('Operational Cost is required').positive('Must be a positive number'),
    }),
    onSubmit: async (values) => {
      const formattedSchedules = schedules.map((schedule) => {
        const selectedDayOfWeek = dayMapping[schedule.day];
        return {
          startDateTime: schedule.startTime.day(selectedDayOfWeek).unix(),
          endDateTime: schedule.endTime.day(selectedDayOfWeek).unix(),
        };
      });

      const data = {
        number: "12345",
        status: "ACTIVE",
        additionalInfo: "hi",
        cost: values.operationalCost || 0,
        schedules: formattedSchedules,
        images: imagesData.map(image => ({
          imageName: image.imageName || "",
          imageType: image.imageType || "",
          imageData: image.imageData || "",
        })),
      };

      const token = Cookies.get("accessToken");

      try {
        const response = await axios.post('https://hms.3dolphinsocial.com:8083/v1/manage/ambulance/', data, {
          headers: {
            'Content-Type': 'application/json',
            'accessToken': `${token}`,
          },
        });
        console.log('Response:', response.data);
        navigate('/ambulance', { state: { successAdd: true, message: 'Gedung berhasil ditambahkan!' } });
      } catch (error) {
        console.error('Error submitting form:', error);
        showTemporaryAlertError();
      }
    }
  });

  return (
    <Container sx={{ py: 2 }}>
      <BreadCrumbs
        breadcrumbItems={breadcrumbItems}
        onBackClick={() => window.history.back()}
      />

      <Box mt={3}>
        <Box p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}>
          <Typography fontSize="20px" fontWeight="700">Tambah Ambulance</Typography>

          <ImageUploaderGroup onChange={handleImageChange} />

          <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
            <Typography sx={{ fontSize: "16px" }}>Biaya Tarif<span style={{ color: "red" }}>*</span></Typography>
            <InputCurrencyIdr
              onChange={(value) => {
                formik.setFieldValue('operationalCost', value);
              }}
              defaultValue={0}
            />

            <Box display={'flex'} flexDirection={'column'} border={'1px solid #A8A8BD'} borderRadius={'16px'} padding={'16px'} mt={2}>
              <Typography mb={'15px'} >Jam Operasional</Typography>
              <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} gap={'32px'} >
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

                <Box display={'flex'} flexDirection={'column'} width={'100%'} >
                  <Typography>Jam mulai</Typography>
                  <CustomTimePicker
                    value={startTime}
                    onChange={(newValue) => setStartTime(newValue)}
                  />
                </Box>

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

              {schedules.map((schedule, index) => (
                <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mt={2}
                  sx={{
                    border: '1px solid black',
                    padding: '4px',
                    borderRadius:'6px'
                  }}  
                >
                  <Typography>{`${schedule.day}: ${schedule.startTime.format("HH:mm")} - ${schedule.endTime.format("HH:mm")}`}</Typography>
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
