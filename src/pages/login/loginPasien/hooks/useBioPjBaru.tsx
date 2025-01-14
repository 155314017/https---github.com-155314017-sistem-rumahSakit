import { Radio } from '@mui/material'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import 'react-phone-input-2/lib/style.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { RadioProps } from '@mui/material/Radio'

const validationSchema = Yup.object({
  nik: Yup.string()
    .matches(/^[0-9]+$/, 'NIK harus berupa angka')
    .min(12, 'NIK minimal 12 digit')
    .max(16, 'NIK maksimal 14 digit')
    .required('NIK wajib diisi'),
  email: Yup.string().required('Email wajib diisi'),
  phone: Yup.string()
    .required('Isi nomor telepon')
    .matches(/^[0-9]{10,15}$/, 'Nomor telepon tidak valid')
    .min(10, 'Nomor telepon minimal 10 digit')
    .max(14, 'Nomor telepon maksimal 14 digit'),
  fullname: Yup.string().required('Nama lengkap wajib diisi'),
  gender: Yup.string().required('JenisK kelamin harus dipilih'),
  birthPlace: Yup.string().required('Tempat lahir harus diisi'),
  address: Yup.string().required('Tempat lahir harus diisi')
})

// interface FormValues {
//     nik: string;
//     email: string;
// }

const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .matches(/^[0-9]+$/, 'OTP harus berupa angka')
    .min(4, 'OTP minimal 4 digit')
    .max(4, 'OTP maksimal 4 digit')
    .required('OTP wajib diisi')
})

interface DataKirim {
  identityNumber: string
  email: string
  phone: string
  name: string
  gender: string
  address: string
  birthPlace: string
  birtDate: string
}

export default function useBioPjBaru() {
  // const [showPassword, setShowPassword] = usseState(false);
  const [showLogin, setShowLogin] = useState(true)
  const [showEmailChanged, setShowEmailChanged] = useState(true)
  const [emailError, setEmailError] = useState(false)
  // const [, setNikError] = useState(false);
  // const [PasswordError,setPasswordError] = useState(false);
  const [data, setData] = useState<DataKirim>({
    identityNumber: '',
    email: '',
    phone: '',
    name: '',
    gender: '',
    address: '',
    birthPlace: '',
    birtDate: ''
  })
  const [showAlert, setShowAlert] = useState(false)
  const [isCounting, setIsCounting] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(60)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [otp, setOtp] = useState('')
  const [switchValue, setSwitchValue] = useState(false)
  const [patientId, setPatientId] = useState<string>('')
  const [noIdentity, setNoIdentity] = useState(false)
  const [currentView, setCurrentView] = useState('show')
  const [show, setShow] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [nikPjBaru, setNikPjBaru] = useState('')
  const [emailPjBaru, setEmailPjBaru] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedValue, setSelectedValue] = useState('sendiri');

  useEffect(() => {
    const state = location.state;

    if (state?.successSendDataPj) {
      setData(state.data ?? null);
      setSwitchValue(state.successSendDataPj);
      setPatientId(state.idPatient ?? '');
    } else if (state?.patientWithNoIdentity) {
      setNoIdentity(true);
      setPatientId(state.idPatient ?? '');
    } else if (state) {

      setData(state.data ?? null);
      setPatientId(state.idPatient ?? '');
      setNikPjBaru(state.BioPjBaru?.nik ?? '');
      setEmailPjBaru(state.BioPjBaru?.email ?? '');

      
    }
  }, [location.state, navigate]);


  useEffect(() => {
    
  }, [nikPjBaru, emailPjBaru])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!patientId && !noIdentity) {
        setNotFound(true);
        setShow(false);
        setCurrentView('notFound');
      } else {
        const timeoutId = setTimeout(() => {
        setNotFound(false);
        setShow(true);
        setCurrentView('show');
        },50)

        return () => clearTimeout(timeoutId);
        
      }
    },100);

    return () => clearTimeout(timeoutId);


    // After the state has been updated, set loading to false
  }, [patientId, noIdentity]);

  const otpFormShown = () => {
    // setShowEmailChanged(false);

    setOtp('')
  }

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
    // setPasswordError(false);
    setShowLogin(false)
  }

  // const validationCheck = async (values: DataKirim) => {
  //   // showOtp()

  //   return true
  // }

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

  const [value, setValue] = React.useState('female')
  const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
    console.log(value)
  }

  const handleSwitchChange = (value: boolean) => {
    setSwitchValue(value)
    console.log('Switch value:', value)
    console.log('Data: ', data)
  }

  const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 24,
    height: 24,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
      outline: '2px auto red',
      outlineOffset: 2
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
      ...theme.applyStyles('dark', {
        backgroundColor: '#30404d'
      })
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
      ...theme.applyStyles('dark', {
        background: 'rgba(57,75,89,.5)'
      })
    },
    ...theme.applyStyles('dark', {
      boxShadow: '0 0 0 1px rgb(16 22 26 / 40%)',
      backgroundColor: '#394b59',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
    })
  }))

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#7367F0',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&::before': {
      display: 'block',
      width: 24,
      height: 24,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""'
    },
    'input:hover ~ &': {
      backgroundColor: '#7367F0'
    }
  })

  function BpRadio(props: RadioProps) {
    return (
      <Radio
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        {...props}
      />
    )
  }

  return {
    validationSchema,
    otpValidationSchema,
    otpFormShown,
    handleClick,
    showTemporaryAlert,
    showTemporarySuccessLogin,
    handleResendClick,
    formatTime,
    handleChangeGender,
    handleSwitchChange,
    value,
    otp,
    setOtp,
    BpRadio,
    showOtp,
    loginSuccess,
    emailError,
    showAlert,
    switchValue,
    data,
    patientId,
    navigate,
    showLogin,
    showEmailChanged,
    resendSuccess,
    noIdentity,
    currentView,
    show,
    notFound,
    nikPjBaru,
    emailPjBaru,
    selectedValue,
    setSelectedValue,
  }
}
