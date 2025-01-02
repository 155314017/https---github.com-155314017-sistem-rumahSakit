import { useEffect, useState } from "react";
import * as Yup from "yup";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  nik: Yup.string()
    .matches(/^[0-9]+$/, "NIK harus berupa angka")
    .min(14, "NIK minimal 14 digit")
    .max(16, "NIK maksimal 16 digit")
    .required("NIK wajib diisi"),
  email: Yup.string().required("Email wajib diisi")
    .email("Format Email Tidak Sesuai")
});

interface FormValues {
  nik: string
  email: string
}

const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .matches(/^[0-9]+$/, 'OTP harus berupa angka')
    .min(4, 'OTP minimal 4 digit')
    .max(4, 'OTP maksimal 4 digit')
    .required('OTP wajib diisi')
})


export default function useLoginPasien() {
    //   const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(true)
  const [showEmailChanged, setShowEmailChanged] = useState(true)
  const [emailError, setEmailError] = useState(false)
  const [, setNikError] = useState(false)
  const [, setPasswordError] = useState(false)

  const [showAlert, setShowAlert] = useState(false)
  const [isCounting, setIsCounting] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(60)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [otp, setOtp] = useState('')

  const navigate = useNavigate()

  // const otpFormShown = () => {
  //   // setShowEmailChanged(false);

  //   setOtp("");
  // };

  const handleClick = () => {
    setShowLogin(true)
    setShowEmailChanged(true)
  }

  const showTemporaryAlert = async () => {
    setShowAlert(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setShowAlert(false)
  }

  const showTemporarySuccessLogin = async () => {
    setLoginSuccess(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setLoginSuccess(false)
  }

  const showOtp = () => {
    setEmailError(false)
    setPasswordError(false)
    setShowLogin(false)
  }

  const validationCheck = async (values: FormValues) => {

    // showOtp();
    navigate("/register/pasien/baru", { state: { succesSendData1: true, data: values } });
    return true;
  };

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>
    if (isCounting && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft(prev => prev - 1)
      }, 1000)
    } else if (secondsLeft === 0) {
      setIsCounting(false)
      setSecondsLeft(60)
    }

    return () => clearInterval(timer)
  }, [isCounting, secondsLeft])

  const handleResendClick = () => {
    setIsCounting(true)
    setSecondsLeft(60)
    showTemporaryAlertSuccess()
    console.log('Resend clicked')
  }

  const showTemporaryAlertSuccess = async () => {
    setResendSuccess(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setResendSuccess(false)
  }

  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60)
    const seconds = secondsLeft % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  return{
    showLogin,
    setShowLogin,
    showEmailChanged,
    setShowEmailChanged,
    emailError,
    setEmailError,
    setNikError,
    setPasswordError,
    showAlert,
    setShowAlert,
    isCounting,
    setIsCounting,
    secondsLeft,
    setSecondsLeft,
    resendSuccess,
    setResendSuccess,
    loginSuccess,
    setLoginSuccess,
    otp,
    setOtp,
    validationCheck,
    showTemporarySuccessLogin,
    validationSchema,
    otpValidationSchema,
    showOtp,
    handleClick,
    handleResendClick,
    formatTime,
    showTemporaryAlert,
    navigate
  }
}
