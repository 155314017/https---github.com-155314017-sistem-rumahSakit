import React, { useEffect, useState } from "react";
import * as Yup from 'yup';
import 'react-phone-input-2/lib/style.css';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RegisterPatient from "../../../../services/Patient Tenant/RegisterPatient";
import { styled } from '@mui/material/styles';
import { Radio } from '@mui/material';
import { RadioProps } from '@mui/material/Radio';

const validationSchema = Yup.object({
    nik: Yup.string()
        .matches(/^[0-9]+$/, 'NIK harus berupa angka')
        .min(14, 'NIK minimal 14 digit')
        .max(16, 'NIK maksimal 16 digit')
        .required('NIK wajib diisi'),
    email: Yup.string().required('Email wajib diisi'),
    address: Yup.string().required('Email wajib diisi'),
    phone: Yup.string()
        .required('Isi nomor telepon')
        .matches(/^[0-9]{10,14}$/, 'Nomor telepon tidak valid'),
    fullname: Yup.string().required('Wajib diisi')
        .matches(/^[A-Za-z\s]+$/, "Nama hanya boleh berisi huruf"),
    gender: Yup.string().required('JenisK kelamin harus dipilih'),
    tempatLahir: Yup.string().required('Tempat lahir harus diisi'),
    tanggalLahir: Yup.string().required('Tempat lahir harus diisi'),
});



interface DataKirim {
    identityNumber: string;
    name: string;
    phone: string;
    email: string;
    gender: string;
    address: string;
    birthDate: string;
    birthPlace: string;
}

interface DataAwal {
    id: string,
    nik: string;
    fullname: string;
    phone: string;
    email: string;
    gender: string;
    address: string;
    birthDate: string;
    birthPlace: string;
}

const otpValidationSchema = Yup.object({
    otp: Yup.string()
        .matches(/^[0-9]+$/, 'OTP harus berupa angka')
        .min(4, 'OTP minimal 4 digit')
        .max(4, 'OTP maksimal 4 digit')
        .required('OTP wajib diisi'),
});

const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 24,
    height: 24,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
        outline: '2px auto red',
        outlineOffset: 2,
    },
    'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
        ...theme.applyStyles('dark', {
            backgroundColor: '#30404d',
        }),
    },
    'input:disabled ~ &': {
        boxShadow: 'none',
        background: 'rgba(206,217,224,.5)',
        ...theme.applyStyles('dark', {
            background: 'rgba(57,75,89,.5)',
        }),
    },
    ...theme.applyStyles('dark', {
        boxShadow: '0 0 0 1px rgb(16 22 26 / 40%)',
        backgroundColor: '#394b59',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))',
    }),
}));

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#7367F0',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&::before': {
        display: 'block',
        width: 24,
        height: 24,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
    },
    'input:hover ~ &': {
        backgroundColor: '#7367F0',
    },
});

function BpRadio(props: RadioProps) {
    return (
        <Radio
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            {...props}
        />
    );
}
export default function useRegistrasiPasienBaru() {
    // const [showPassword, setShowPassword] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [showEmailChanged, setShowEmailChanged] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [, setNikError] = useState(false);
    const [, setPasswordError] = useState(false);
    const [data, setData] = useState<DataKirim>({ identityNumber: '', name: '', phone: '', email: '', gender: '', address: '', birthDate: '', birthPlace: '' });
    const [showAlert, setShowAlert] = useState(false);
    const [isCounting, setIsCounting] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(60);
    const [resendSuccess, setResendSuccess] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [emailOTP, setEmailOTP] = useState('');
    const [otp, setOtp] = useState('');
    const [data1, setData1] = useState<DataAwal | null>(null);
    const [patientId, setPatientId] = useState<string>('');
    const [buttonDis, setButtonDis] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const [needAdmin, setNeedAdmin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const otpFormShown = () => {
        // setShowEmailChanged(false);
        setOtp('');
    }

    const handleClick = () => {
        setShowLogin(true);
        setShowEmailChanged(true);
    };

    const showTemporaryAlert = async () => {
        setShowAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setShowAlert(false);
    };


    const showTemporarySuccessLogin = async () => {
        setLoginSuccess(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setLoginSuccess(false);
    };

    const showOtp = () => {
        setEmailError(false);
        setPasswordError(false);
        setShowLogin(false);
        setShowEmailChanged(true);
    };

    const handleClickSent = () => {
        const data = {
            patientId: data1?.id,
            needAdmin: needAdmin,
        }
        // next to category patient after checking patient data and ask if they need change their data and carrying data 
        navigate('/kategori/pasien', { state: { dataPatient: data, categoryPatient: true } })
    }

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (isCounting && secondsLeft > 0) {
            timer = setInterval(() => {
                setSecondsLeft((prev) => prev - 1);
            }, 1000);
        } else if (secondsLeft === 0) {
            setIsCounting(false);
            setSecondsLeft(60);
        }

        return () => clearInterval(timer);
    }, [isCounting, secondsLeft]);

    const handleResendClick = async () => {
        setLoading(true);
        try {
            await RegisterPatient(data);
            showTemporaryAlertSuccess();
            setLoading(false);
        } catch {
            setLoading(false);
            alert("Terjadi kesalahan saat mengirim ulang kode. Silakan coba lagi.");
        }
        setIsCounting(true);
        setSecondsLeft(60);
        setLoading(false);
    };

    const showTemporaryAlertSuccess = async () => {
        setResendSuccess(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setResendSuccess(false);
    };

    const formatTime = () => {
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const [value, setValue] = React.useState('');
    const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    // get data passed from page before 
    useEffect(() => {
        if (location.state && location.state.patientData) {
            setData1(location.state.data);
            console.log('tes', location.state.data)
        }
    }, [location.state]);

    // useEffect(() => {
    //     if (data1 != null) {
    //         if (data1.email === '') {
    //             setShowLogin(false);
    //             setNotFound(true);
    //         } else {
    //             setShowLogin(true);
    //             setNotFound(false);
    //         }
    //     } else {
    //         setShowLogin(false);
    //         setNotFound(true);
    //     }
    // }, [data1]);



    const showTemporaryAlertError = async () => {
        setErrorAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setErrorAlert(false);
    };
    return {
        otpFormShown,
        showOtp,
        showTemporaryAlert,
        showTemporaryAlertSuccess,
        showTemporaryAlertError,
        showTemporarySuccessLogin,
        handleClick,
        handleResendClick,
        formatTime,
        value,
        handleChangeGender,
        data1,
        showLogin,
        buttonDis,
        errorAlert,
        showEmailChanged,
        showAlert,
        emailError,
        resendSuccess,
        loginSuccess,
        secondsLeft,
        isCounting,
        validationSchema,
        otpValidationSchema,
        BpRadio,
        emailOTP,
        otp,
        patientId, setPatientId,
        setButtonDis,
        setEmailOTP,
        setData,
        setNikError,
        navigate,
        data,
        setOtp,
        loading,
        setNeedAdmin,
        needAdmin,
        handleClickSent
    }
}
