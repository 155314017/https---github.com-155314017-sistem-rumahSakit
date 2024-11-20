import {  useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from "js-cookie";
import * as Yup from "yup";
import "dayjs/locale/id";
import dayjs from "dayjs";

type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
  };
export default function useTambahAmbulance() {
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const [errorAlert, setErrorAlert] = useState(false);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
    const [operationalTime, setOperationalTime] = useState<string | null>(null);
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

      interface FormValues {
        operationalCost: number;
      }
    
      const handleTambahHari = () => {
        console.log("Selected day:", selectedDay);
        console.log("Start time:", startTime?.format("HH:mm"));
        console.log("End time:", endTime?.format("HH:mm"));
        const dateTime = selectedDay + " " + startTime?.format("HH:mm") + " - " + endTime?.format("HH:mm");
        console.log(errorAlert);
        console.log(operationalTime);
        setOperationalTime(dateTime);
        console.log("Waktu yg dipilih: ", dateTime);
        console.log("Day: ", selectedDay);
        console.log("start time: ", startTime?.unix());
        console.log("end time: ", endTime?.unix());
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
            cost: values.operationalCost | 0,
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
            navigate('/ambulance', { state: { successAdd: true, message: 'Gedung berhasil ditambahkan!' } })
          } catch (error) {
            console.error('Error submitting form:', error);
            showTemporaryAlertError();
          }
        }
      })
    
  return {
    breadcrumbItems,
    handleTambahHari,
    handleImageChange,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    setSelectedDay,
    formik
  }
    
  
}
