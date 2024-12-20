import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import 'react-phone-input-2/lib/style.css'
import { useLocation, useNavigate } from 'react-router-dom'

const validationSchema = Yup.object({
  nik: Yup.string()
    .matches(/^[0-9]+$/, 'NIK harus berupa angka')
    .min(12, 'NIK minimal 12 digit')
    .max(16, 'NIK maksimal 14 digit')
    .required('NIK wajib diisi'),
  email: Yup.string().email('email tidak valid').required('Email wajib diisi')
})

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

interface DataKirim {
  identityNumber: string
  name: string
  phone: string
  email: string
  gender: string
  address: string
}
export default function useRegisterPJ() {
  //   const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(true)
  const [showEmailChanged, setShowEmailChanged] = useState(true)
  const [emailError, setEmailError] = useState(false)
  // const [nikError, setNikError] = useState(false)
  const [, setPasswordError] = useState(false)
  const location = useLocation()
  const [showAlert, setShowAlert] = useState(false)
  const [isCounting, setIsCounting] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(60)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [otp, setOtp] = useState('')
  const [data, setData] = useState<DataKirim>({
    identityNumber: '',
    name: '',
    phone: '',
    email: '',
    gender: '',
    address: ''
  })
  const [patientId, setPatientId] = useState<string>('')
  const [show, setShow] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const navigate = useNavigate()

  const [switchValue, setSwitchValue] = useState(false)

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
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setShowAlert(false)
  }

  const showTemporarySuccessLogin = async () => {
    setLoginSuccess(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setLoginSuccess(false)
  }

  const showOtp = () => {
    setEmailError(false)
    setPasswordError(false)
    setShowLogin(false)
  }

  const validationCheck = async (values: FormValues) => {

      navigate('/register/penanggungJawab', {
        state: {
          successSendDataPj: switchValue,
          message: 'Gedung berhasil ditambahkan!',
          data: data,
          idPatient: patientId,
          BioPjBaru : values
        }
      })
    
  
    return true;
  };

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>
    if (isCounting && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1)
      }, 1000)
    } else if (secondsLeft === 0) {
      setIsCounting(false)
      setSecondsLeft(60)
    }

    return () => clearInterval(timer)
  }, [isCounting, secondsLeft])

  useEffect(() => {
    if (location.state && location.state.successAdd) {
      console.log(location.state.message)
      console.log('DATA YANG DIKIRIM: ', location.state.data)
      setData(location.state.data)
      console.log('Data yang di state kan: ', data)
      setPatientId(location.state.idPatient)
      // navigate(location.pathname, { replace: true, state: undefined });
    }
  }, [location.state, navigate])

  useEffect(() => {
    console.log('Id Patient: ', patientId)

    if (patientId === '') {
      setShowLogin(false)
      setNotFound(true)
      setShow(false)
    } else {
      setShowLogin(true)
      setNotFound(false)
      setShow(true)
    }
  }, [patientId])

  const handleResendClick = () => {
    setIsCounting(true)
    setSecondsLeft(60)
    showTemporaryAlertSuccess()
    console.log('Resend clicked')
  }

  const showTemporaryAlertSuccess = async () => {
    setResendSuccess(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setResendSuccess(false)
  }

  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60)
    const seconds = secondsLeft % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSwitchChange = (value: boolean) => {
    setSwitchValue(value)
    console.log('Switch value:', value)
    console.log('Data: ', data)
  }
  return {
    validationSchema,
    otpValidationSchema,
    showLogin,
    showEmailChanged,
    emailError,
    // nikError,
    showAlert,
    resendSuccess,
    loginSuccess,
    otp,
    setOtp,
    show,
    setShow,
    notFound,
    handleClick,
    showTemporaryAlert,
    showTemporarySuccessLogin,
    showOtp,
    validationCheck,
    handleResendClick,
    formatTime,
    handleSwitchChange,
    switchValue,
    data,
    navigate
  }
}
