import { Container, Box } from "@mui/system";
import { Typography, Button } from "@mui/material";
import BreadCrumbs from "../../components/medium/BreadCrumbs";
import ImageUploaderGroup from "../../components/medium/ImageUploaderGroup";
import CustomTimePicker from "../../components/small/CustomTimePicker";
import DropdownList from "../../components/small/DropdownList";
import InputCurrencyIdr from "../../components/inputComponent/InputCurrencyIdr";
import axios from 'axios';
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "dayjs/locale/id";
import { useNavigate } from "react-router-dom";


type ImageData = {
  imageName: string;
  imageType: string;
  imageData: string;
};

// const validationSchema = Yup.object({
//   cost: Yup.number()
//     .typeError("Biaya tarif harus berupa angka")
//     .required("Biaya tarif wajib diisi")
//     .min(1, "Biaya tarif tidak boleh 0"),
// });

export default function TambahAmbulance() {
  const [imagesData, setImagesData] = useState<ImageData[]>([]);
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
  const [operationalTime, setOperationalTime] = useState<string | null>(null);
  const [operationalCost, setOperationalCost] = useState<string | null>(null);
  dayjs.locale("id");

  const navigate = useNavigate();

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

  const handleImageChange = (images: ImageData[]) => {
    setImagesData(images);
  };

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Ambulance", href: "/ambulance" },
    { label: "Tambah Ambulance", href: "/tambahAmbulance" },
  ];

  const handleSubmit = async (values: any) => {
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

    const token = Cookies.get("accessToken");

    try {
      const response = await axios.post('https://hms.3dolphinsocial.com:8083/v1/manage/ambulance/', data, {
        headers: {
          'Content-Type': 'application/json',
          'accessToken': `${token}`,
        },
      });
      console.log('Response:', response.data);
      showTemporaryAlertSuccess();
      navigate('/ambulance')
    } catch (error) {
      console.error('Error submitting form:', error);
      showTemporaryAlertError();
    }
  };

  return (
    <Container sx={{ py: 2 }}>
      <BreadCrumbs
        breadcrumbItems={breadcrumbItems}
        onBackClick={() => window.history.back()}
      />

      <Box mt={3}>
        <Formik
          initialValues={{
            cost: '',
            operationalTime: '',
            startTime: null as dayjs.Dayjs | null,
            endTime: null as dayjs.Dayjs | null,
            selectedDay: '',
          }}
          // validationSchema={validationSchema} // Use the updated validationSchema
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form>
              <Box p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}>
                <Typography fontSize="20px" fontWeight="700">Tambah Ambulance</Typography>

                <ImageUploaderGroup onChange={handleImageChange} />

                <Box mt={3}>
                  <Typography sx={{ fontSize: "16px" }}>Biaya Tarif<span style={{ color: "red" }}>*</span></Typography>
                  <InputCurrencyIdr
                    onChange={(value) => setOperationalCost(value)}
                    defaultValue={0}
                  />
                  {errors.cost && touched.cost && <div style={{ color: "red" }}>{errors.cost}</div>}
                </Box>

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
                  type="submit"
                >
                  Simpan
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
