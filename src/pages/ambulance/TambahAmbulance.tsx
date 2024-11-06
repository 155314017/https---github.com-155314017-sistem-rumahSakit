import { Container, Box } from "@mui/system";
import { Typography, Button } from "@mui/material";
import BreadCrumbs from "../../components/medium/BreadCrumbs";
import bgImage from "../../assets/img/String.png";
import ImageUploaderGroup from "../../components/medium/ImageUploaderGroup";
import CustomTimePicker from "../../components/small/CustomTimePicker";
import DropdownList from "../../components/small/DropdownList";
import { useState } from "react";
import dayjs from "dayjs";
import InputCurrencyIdr from "../../components/inputComponent/InputCurrencyIdr";
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

type ImageData = {
  imageName: string;
  imageType: string;
  imageData: string;
};

export default function TambahAmbulance() {
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [operationalCost, setOperationalCost] = useState<string | null>(null);
  const [operationalTime, setOperationalTime] = useState<string | null>(null);
  const [imagesData, setImagesData] = useState<ImageData[]>([]);
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const handleTambahHari = () => {
    console.log("Selected day:", selectedDay);
    console.log("Start time:", startTime?.format("HH:mm"));
    console.log("End time:", endTime?.format("HH:mm"));
    console.log(successAlert);
    console.log(errorAlert);
    console.log(operationalTime);

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

  const handleImageChange = (images: ImageData[]) => {
    console.log('Images changed:', images);
    setImagesData(images);
  };

  const breadcrumbItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Ambulance",
      href: "/ambulance",
    },
    {
      label: "Tambah Ambulance",
      href: "/tambahAmbulance",
    },
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const schedules = [
      {
        startDateTime: startTime ? dayjs(startTime).toISOString() : null,
        endDateTime: endTime ? dayjs(endTime).toISOString() : null,
      }
    ].filter(schedule => schedule.startDateTime && schedule.endDateTime);

    const data = {
      number: "12345",
      status: "ACTIVE",
      additionalInfo: "hi",
      cost: operationalCost ? parseInt(operationalCost.replace(/\D/g, '')) : 0,
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
      const response = await axios.post('https://hms.3dolphinsocial.com:8083/v1/manage/ambulance/', data, {
        headers: {
          'Content-Type': 'application/json',
          'accessToken': `${token}`
        },
      });
      console.log('Response:', response.data);
      showTemporaryAlertSuccess();
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
  };

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
            Tambah Ambulance
          </Typography>

          <Box position="absolute" sx={{ top: 0, right: 0 }}>
            <img src={bgImage} alt="bg-image" />
          </Box>

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

          {/* image uploader */}
          <ImageUploaderGroup onChange={handleImageChange} />

          {/* form */}
          <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={handleSubmit}>
            <Typography sx={{ fontSize: "16px" }}>
              Biaya Tarif<span style={{ color: "red" }}>*</span>
            </Typography>
            <InputCurrencyIdr onChange={(value) => setOperationalCost(value)} />
            <Box display={'flex'} flexDirection={'column'} border={'1px solid #A8A8BD'} borderRadius={'16px'} padding={'16px'} mt={2}>
              <Typography mb={'15px'} >Jam Operasional</Typography>
              <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} gap={'32px'} >
                {/* Hari */}
                <Box display={'flex '} flexDirection={'column'} width={'100%'} >
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
          </Box>

          {/* Button */}
          <Button
            variant="contained"
            onClick={handleSubmit}
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
            type="submit"
          >
            Simpan
          </Button>
        </Box>
      </Box>
    </Container>
  );
}