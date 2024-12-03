import { useState } from "react";
import * as Yup from "yup";
import "react-phone-input-2/lib/style.css";

const validationSchema = Yup.object({
    fullname: Yup.string().required("Nama wajib diisi"),
    phone: Yup.string().required("Nomor HP wajib diisi"),
    relation: Yup.string().required("Hubungan wajib diisi"),
    transportMethod: Yup.string().required("Cara datang/pengantar wajib diisi"),
});


export default function useRawatJalanBPJS() {
    const [showFormPage, setSHowFormPage] = useState(true);
  return {
    showFormPage,
    setSHowFormPage,
    validationSchema,
  }
}
