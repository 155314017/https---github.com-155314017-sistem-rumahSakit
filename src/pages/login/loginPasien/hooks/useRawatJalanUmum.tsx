import React from 'react'
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
    fullname: Yup.string().required("Nama wajib diisi"),
    phone: Yup.string().required("Nomor HP wajib diisi"),
    relation: Yup.string().required("Hubungan wajib diisi"),
    transportMethod: Yup.string().required("Cara datang/pengantar wajib diisi"),
});

export default function useRawatJalanUmum() {
    const [showFormPage, setSHowFormPage] = useState(true);
    const [selectedMethod, setSelectedMethod] = useState<string>("");

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMethod(event.target.value);
    };
  return {
    showFormPage,
    setSHowFormPage,
    validationSchema,
    handleRadioChange,
    selectedMethod
  }
}
