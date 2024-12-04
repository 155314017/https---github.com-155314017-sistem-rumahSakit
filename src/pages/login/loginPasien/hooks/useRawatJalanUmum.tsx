import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  fullname: Yup.string().required("Nama wajib diisi"),
  phone: Yup.string().required("Nomor HP wajib diisi"),
  relation: Yup.string().required("Hubungan wajib diisi"),
  transportMethod: Yup.string().required("Cara datang/pengantar wajib diisi"),
});

type Clinic = {
  id: string;
  name: string;
};


export default function useRawatJalanUmum() {
  const [showFormPage, setSHowFormPage] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [clinicOptions, setClinicOptions] = useState<Clinic[]>([]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(event.target.value);
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

  return {
    showFormPage,
    setSHowFormPage,
    validationSchema,
    handleRadioChange,
    selectedMethod,
    clinicOptions,
  }
}
