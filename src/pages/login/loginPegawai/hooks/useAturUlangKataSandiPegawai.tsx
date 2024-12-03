import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
export default function useAturUlangKataSandiPegawai() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Validasi schema dengan Yup
    const validationSchema = Yup.object({
        password: Yup.string()
            .min(6, 'Kata sandi harus minimal 6 karakter')
            .required('Kata sandi wajib diisi'),
        confirmPassword: Yup.string()
            .required('Harap ulangi kata sandi')
            .oneOf([Yup.ref('password')], 'Kata sandi harus sama'),
    });
  return {
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    validationSchema,
    navigate
  }
}
