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
  nomorAntrian: string | undefined;
  namaDokter: string;
  clinic: string;
  tanggalReservasi: string;
  jadwalKonsul: string | null;
  bookingCode: string;
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
  const [patientId, setPatientId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("tes")
    if (location.state && location.state.succesSendData) {
      console.log("tes1")
      setPatientId(location.state.data)
    }
  }, [location.state, navigate]);

  useEffect(() => {
    console.log("PASIEN ID RAWAT JALAN: ", patientId);
  }, [patientId]);

  const handleScheduleChange = (scheduleId: string, schedule: string) => {
    setSelectedScheduleId(scheduleId);
    setSelectedSchedule(schedule);
    console.log('Jadwal Terpilih:', schedule);
    console.log('ID Jadwal Terpilih:', scheduleId);
  };


  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(event.target.value);
    console.log(event.target.value);
  };

  const handleDropdownPoli = (value: string, label: string) => {
    console.log(`Selected Value: ${value}, Selected Label: ${label}`);
    setIdClinic(value)
    setClinicName(label);
  };


  const handleDropdownDocter = (value: string, label: string) => {
    console.log(`Selected Value: ${value}, Selected Label: ${label}`);
    setIdDoctor(value)
    setDocterName(label);
  };

  useEffect(() => {
    const fetchClinicData = async () => {
      try {
        const response = await axios.get('https://hms.3dolphinsocial.com:8083/v1/manage/clinic/?pageNumber=0&pageSize=10&orderBy=createdDateTime=asc', {
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
        const response = await axios.get('https://hms.3dolphinsocial.com:8083/v1/manage/doctor/?pageNumber=0&pageSize=10&orderBy=id=asc', {
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
    patientId,
    setButtonDis,
    buttonDis,
  }
}
