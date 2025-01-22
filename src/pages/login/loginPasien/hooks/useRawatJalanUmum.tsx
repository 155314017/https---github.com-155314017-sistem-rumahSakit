/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from "yup";

const validationSchema = Yup.object({
  typeOfVisit: Yup.string().required("Tipe kunjungan harus diisi"),
  symptoms: Yup.string().required("Keluhan wajib harus diisi"),
});

type Clinic = {
  id: string;
  name: string;
};

type Doctor = {
  id: string;
  name: string;
};


type dataTicket = {
  namaDokter: string;
  clinic: string;
  tanggalReservasi: string;
  jadwalKonsul: string | null;
  bookingCode: string;
}

interface dataPatient {
  patientId: string,
  needAdmin: boolean,
}


export default function useRawatJalanUmum() {
  const [showFormPage, setShowFormPage] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [clinicOptions, setClinicOptions] = useState<Clinic[]>([]);
  const [doctorOptions, setDoctorOptions] = useState<Doctor[]>([]);
  const [dataTickets, setDataTickets] = useState<dataTicket>();
  const [idDoctor, setIdDoctor] = useState('');
  const [idClinic, setIdClinic] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [docterName, setDocterName] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);
  const [buttonDis, setButtonDis] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [calendarKey, setCalendarKey] = useState<number>(0);
  const [patientData, setPatientData] = useState<dataPatient>();

  useEffect(() => {
    if (location.state && location.state.succesSendData) {
      console.log(location.state.data)
      setPatientData(location.state.data)
    }
  }, [location.state, navigate]);



  const handleScheduleChange = (scheduleId: string, schedule: string) => {
    setSelectedScheduleId(scheduleId);
    setSelectedSchedule(schedule);

  };


  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(event.target.value);
  };

  const handleDropdownPoli = (value: string, label: string) => {
    setIdClinic(value)
    setClinicName(label);
  };


  const handleDropdownDocter = (value: string, label: string) => {
    setIdDoctor(value)
    setDocterName(label);
    setCalendarKey((prevKey) => prevKey + 1);
  };

  // create ticket appointment
  const createTicket = async (data: any) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/registration/`, data, {

        headers: {
          'Content-Type': 'application/json',
          // 'accessToken': `${token}`
        },
      });
      console.log("sukses: ", response.data.data)
      // const createdDateTimeFormatted = dayjs.unix(response.data.data.queueDatum.createdDateTime).format('DD/MMM/YYYY, HH:mm');

      // object to send to Ticket Appoint
      const dataSent = {
        // nomorAntrian: response.data.data.queueDatum.queueNumber,
        namaDokter: docterName,
        clinic: clinicName,
        tanggalReservasi: response.data.data.scheduleDate,
        jadwalKonsul: response.data.data.scheduleIntervalId,
        bookingCode: response.data.data.bookingCode
      }

      setDataTickets(dataSent)
      setShowFormPage(false)
      setButtonDis(false)
    } catch (err: any) {
      if (err.response && err.response.status) {
        alert(`Error: HTTP ${err.response.status} - ${err.response.statusText || 'Something went wrong'}`);
      } else if (err.code) {
        alert(`Error Code: ${err.code}`);
      } else {
        alert('Unknown error occurred');
      }
    }
    console.log("Form submitted with values: ", data);
  }

  useEffect(() => {
    const fetchClinicData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/clinic/?pageNumber=0&pageSize=10&orderBy=createdDateTime=asc`, {
          timeout: 10000
        });
        setClinicOptions(response.data.data.content.map((item: Clinic) => ({
          id: item.id,
          name: item.name,
        })));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };
    fetchClinicData();
  }, []);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/doctor/?pageNumber=0&pageSize=10&orderBy=id=asc`, {
          timeout: 10000
        });
        setDoctorOptions(response.data.data.content.map((item: Doctor) => ({
          id: item.id,
          name: item.name,
        })));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };
    fetchDoctorData();
  }, []);

  return {
    showFormPage,
    setShowFormPage,
    validationSchema,
    handleRadioChange,
    selectedMethod,
    clinicOptions,
    doctorOptions,
    setIdDoctor,
    idDoctor,
    setSelectedScheduleId,
    selectedScheduleId,
    handleScheduleChange,
    setIdClinic,
    idClinic,
    handleDropdownPoli,
    clinicName,
    docterName,
    handleDropdownDocter,
    selectedSchedule,
    setDataTickets,
    dataTickets,
    setButtonDis,
    buttonDis,
    calendarKey,
    patientData,
    createTicket
  }
}
