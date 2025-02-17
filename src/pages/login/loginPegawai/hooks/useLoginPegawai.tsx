/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useLocation, useNavigate } from 'react-router-dom'

//service
import Login from '../../../../services/Admin Tenant/Auth/Login'
import ResetPassword from '../../../../services/Admin Tenant/Auth/ResetPassword'

const validationSchema = Yup.object({
  email: Yup.string().email('Email tidak valid').required('Email wajib diisi'),
  password: Yup.string().required('Kata sandi wajib diisi')
})

interface FormValues {
  email: string
  password: string
}

interface FormResetPasswordValues {
  email: string
}

export default function useLoginPegawai() {
  const [showPassword, setShowPassword] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [gantiPassword, setGantiPassword] = useState(true)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [isCounting, setIsCounting] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(60)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [successLogout, setSuccessLogout] = useState(false)
  const [wrongPassword, setWrongPassword] = useState(false)
  const [wrongEmail, setWrongEmail] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const location = useLocation()

  const navigate = useNavigate()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const forgotPass = () => {
    setShowLogin(false)
    setEmailError(false)
    setPasswordError(false)
  }

  const handleClick = () => {
    setShowLogin(true)
    setGantiPassword(true)
  }

  const showTemporarySuccessLogin = async () => {
    setLoginSuccess(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setLoginSuccess(false)
  }

  const loginComponent = () => {
    setShowLogin(true)
  }
  const showTemporaryWrongEmail = async () => {
    setWrongEmail(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setWrongEmail(false)
  }

  const showTemporaryWrongPassword = async () => {
    setWrongPassword(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setWrongPassword(false)
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked)

  }

  const validationCheck = async (values: FormValues) => {
    try {
      const { email, password } = values
      const response = await Login(email, password)
      if (response.responseCode === '200') {
        navigate('/dashboard', { state: { statusLogin: true } })
        return true
      } else {
        return false
      }
    } catch (error: any) {
      if (error.responseCode == '401') {
        showTemporaryWrongPassword()
      } else if (error.responseCode == '404') {
        showTemporaryWrongEmail()
      }
    }
  }

  useEffect(() => {
    if (location.state && location.state.successLogOut) {
      showTemporarySuccessLogout()
      navigate(location.pathname, { replace: true, state: undefined })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, navigate])

  const showTemporarySuccessLogout = async () => {
    setSuccessLogout(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setSuccessLogout(false)
  }

  const handleResetPassword = async (values: FormResetPasswordValues) => {
    try {
      const email = values.email
      const response = await ResetPassword(email)
      if (response.responseCode === '200') {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error('Error during password reset:', error)
      return false
    }
  }

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
    showTemporaryAlertSuccess()
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
  return {
    showPassword,
    setShowPassword,
    showLogin,
    setShowLogin,
    gantiPassword,
    setGantiPassword,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
    isCounting,
    setIsCounting,
    secondsLeft,
    setSecondsLeft,
    resendSuccess,
    setResendSuccess,
    loginSuccess,
    setLoginSuccess,
    successLogout,
    setSuccessLogout,
    wrongPassword,
    setWrongPassword,
    wrongEmail,
    handleClickShowPassword,
    forgotPass,
    handleClick,
    showTemporarySuccessLogin,
    loginComponent,
    showTemporaryWrongEmail,
    showTemporaryWrongPassword,
    handleCheckboxChange,
    validationSchema,
    validationCheck,
    handleResetPassword,
    handleResendClick,
    showTemporaryAlertSuccess,
    formatTime,
    isChecked
  }
}
