/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  CardMedia,
  FormLabel,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import logo from "../../../img/St.carolus.png";
import patientImage from "../../../assets/img/registrationImg.jpg";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AlertWarning from "../../../components/small/AlertWarning";
import AlertSuccess from "../../../components/small/AlertSuccess";
import CustomButton from "../../../components/small/CustomButton";
import OtpInput from "react-otp-input";
import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  nik: Yup.string()
    .matches(/^[0-9]+$/, "NIK harus berupa angka")
    .min(12, "NIK minimal 12 digit")
    .max(14, "NIK maksimal 14 digit")
    .required("NIK wajib diisi"),
  email: Yup.string().required("Email wajib diisi"),
});

interface FormValues {
  nik: string;
  email: string;
}

const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .matches(/^[0-9]+$/, "OTP harus berupa angka")
    .min(4, "OTP minimal 4 digit")
    .max(4, "OTP maksimal 4 digit")
    .required("OTP wajib diisi"),
});

export default function LoginPasien() {
  //   const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showEmailChanged, setShowEmailChanged] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [nikError, setNikError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [otp, setOtp] = useState("");

  const otpFormShown = () => {
    // setShowEmailChanged(false);

    setOtp("");
  };

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
  };

  const validationCheck = async (values: FormValues) => {
    const { nik, email } = values;
    const nikIsValid = nik === "1234567891011";
    const emailIsValid = email === "chornaeld@gmail.com";
    setNikError(!nikIsValid);
    setEmailError(!emailIsValid);

    if (!nikIsValid || !emailIsValid) {
      await showTemporaryAlert();
      return false;
    }
    showOtp();
    return true;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
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

  const handleResendClick = () => {
    setIsCounting(true);
    setSecondsLeft(60);
    showTemporaryAlertSuccess();
    console.log("Resend clicked");
  };

  const showTemporaryAlertSuccess = async () => {
    setResendSuccess(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setResendSuccess(false);
  };

  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Box>
      <Box>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            sx={{
              width: "50%",
              height: "100vh",
              objectFit: "cover",
              position: "fixed",
              top: "0",
              left: "0",
            }}
            image={patientImage}
            alt="Example Image"
          />
        </Box>

        {/* overlay */}
        <Box
          sx={{
            position: "absolute",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            width: "50%",
            height: "100vh",
            top: "0",
            left: "0",
          }}
        />
        {/* ---- */}

        <Box
          sx={{
            position: "absolute",
            zIndex: "9999",
            width: "40%",
            left: "23%",
            bottom: "0%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography
            sx={{
              fontSize: "56px",
              fontWeight: "700",
              lineHeight: "60px",
              color: "white",
            }}
          >
            Mulai permintaan janji temu Anda di sini.
          </Typography>
        </Box>
      </Box>
      {loginSuccess && <AlertSuccess label="Login Succeeded!" />}
      {showLogin && (
        <>
          {showAlert && (
            <AlertWarning teks="NIK atau Email yang Anda masukkan salah, silahkan coba lagi." />
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              right: "0",
              top: "0",
              bottom: "0",
              width: "50%",
              flexDirection: "column",
            }}
          >
            <Box sx={{ width: "90%" }}>
              <img src={logo} alt="logo-carolus" />
              <Typography sx={{ fontSize: "32px", fontWeight: "600" }}>
                Selamat Datang
              </Typography>
              <Typography
                sx={{
                  color: "gray",
                  fontSize: "18px",
                  marginBottom: "30px",
                  width: "100%",
                }}
              >
                Silahkan masukkan nomor NIK (Nomor induk kependudukan)
                penanggung jawab.
              </Typography>

              <Formik
                initialValues={{ nik: "", email: "" }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  if (await validationCheck(values)) {
                    console.log(values);
                    await showTemporarySuccessLogin();
                  }
                }}
              >
                {({
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  values,
                  isValid,
                  dirty,
                  //   setFieldValue,
                }) => (
                  <Form>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <FormLabel sx={{ fontSize: "18px" }}>
                        NIK (Nomor induk kependudukan) Penanggung jawab
                      </FormLabel>
                      <Field
                        name="nik"
                        as={TextField}
                        placeholder="Masukkan NIK (Nomor induk kependudukan)"
                        variant="outlined"
                        fullWidth
                        sx={{
                          width: "100%",
                          height: "48px",
                          marginTop: "10px",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            backgroundColor: emailError ? "#ffcccc" : "inherit",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "1px solid #ccc",
                          },
                          "& .MuiOutlinedInput-input": {
                            padding: "10px",
                            fontSize: "16px",
                          },
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nik}
                        error={touched.nik && Boolean(errors.nik)}
                        helperText={touched.nik && errors.nik}
                      />

                      <FormLabel sx={{ fontSize: "18px", marginTop: "20px" }}>
                        Email
                      </FormLabel>
                      <Field
                        name="email"
                        as={TextField}
                        placeholder="Masukkan Email"
                        variant="outlined"
                        fullWidth
                        sx={{
                          width: "100%",
                          height: "48px",
                          marginTop: "10px",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            backgroundColor: emailError ? "#ffcccc" : "inherit",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "1px solid #ccc",
                          },
                          "& .MuiOutlinedInput-input": {
                            padding: "10px",
                            fontSize: "16px",
                          },
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />

                      {touched.email && errors.email && (
                        <Typography sx={{ color: "red", fontSize: "12px" }}>
                          {errors.email}
                        </Typography>
                      )}

                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                          width: "100%",
                          height: "48px",
                          mt: 5,
                          backgroundColor: "#8F85F3",
                          ":hover": { backgroundColor: "#D5D1FB" },
                        }}
                        disabled={!isValid || !dirty}
                      >
                        Lanjutkan
                      </Button>

                      {/* <CustomButton onClick={() => console.log("hai ")} label="Daftar pasien baru" /> */}
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </>
      )}

      {!showLogin && (
        <>
          {showEmailChanged && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 5,
                position: "absolute",
                right: "0",
                top: "0",
                width: "25%",
                flexDirection: "column",
                mr: "18%",
                mt: "15%",
              }}
            >
              <Box sx={{ ml: 1 }}>
                <Typography
                  sx={{
                    fontSize: "32px",
                    fontWeight: "600",
                    maxWidth: "410px",
                  }}
                >
                  Verifikasi
                </Typography>
                <Typography
                  sx={{
                    color: "#A8A8BD",
                    fontSize: "18px",
                    marginBottom: "30px",
                    maxWidth: "410px",
                    fontWeight: "400",
                  }}
                >
                  Silahkan masukkan kode 4 digit yang dikirimkan ke nomor Anda .
                </Typography>

                <Formik
                  initialValues={{ otp: "" }}
                  validationSchema={otpValidationSchema}
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                >
                  {({
                    errors,
                    touched,
                    handleChange,
                    // handleBlur,
                    // values,
                    isValid,
                    dirty,
                  }) => (
                    <Form>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <OtpInput
                          value={otp}
                          onChange={(otp) => {
                            setOtp(otp);
                            handleChange("otp")(otp);
                          }}
                          numInputs={4}
                          renderSeparator={
                            <span style={{ margin: "0 4px" }}> </span>
                          }
                          renderInput={(props) => (
                            <input
                              {...props}
                              style={{
                                width: "100%",
                                height: "48px",
                                textAlign: "center",
                                border: `1px solid ${
                                  touched.otp && errors.otp ? "red" : "#8F85F3"
                                }`,
                                borderRadius: "8px",
                                fontSize: "20px",
                                margin: "0 4px",
                                outline: "none",
                                padding: "14px, 12px, 14px, 12px",
                              }}
                            />
                          )}
                        />
                        {touched.otp && errors.otp && (
                          <Typography sx={{ color: "red", fontSize: "12px" }}>
                            {errors.otp}
                          </Typography>
                        )}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "10px",
                            width: "100%",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "16px",
                              lineHeight: "18px",
                              color: "#A8A8BD",
                            }}
                          >
                            Tidak mendapatkan kode?{" "}
                          </Typography>
                          <Typography
                            onClick={
                              !isCounting ? handleResendClick : undefined
                            }
                            sx={{
                              cursor: isCounting ? "default" : "pointer",
                              color: isCounting ? "#ccc" : "#8F85F3",
                              textDecoration: isCounting ? "none" : "underline",
                              fontSize: "16px",
                            }}
                          >
                            {isCounting
                              ? `${formatTime()}`
                              : "Kirim ulang tautan"}
                          </Typography>
                        </Box>
                        <Link to={"/register/pasien"}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={otpFormShown}
                            fullWidth
                            sx={{
                              width: "100%",
                              height: "48px",
                              marginTop: "20px",
                              backgroundColor: "#8F85F3",
                              ":hover": { backgroundColor: "#D5D1FB" },
                            }}
                            disabled={!isValid || !dirty}
                          >
                            Verifikasi
                          </Button>
                        </Link>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          )}

          {!showEmailChanged && (
            <Box
              sx={{
                marginLeft: "50px",
                marginTop: "auto",
                marginBottom: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ fontSize: "32px", fontWeight: "600", maxWidth: "410px" }}
              >
                Email pengaturan ulang kata sandi telah terkirim.
              </Typography>
              <Typography
                sx={{
                  color: "#16161D",
                  fontSize: "18px",
                  marginBottom: "30px",
                  maxWidth: "410px",
                  fontWeight: "400",
                }}
              >
                Kami telah mengirimkan tautan untuk mengatur ulang kata sandi
                Anda. Tidak mendapat email?
              </Typography>
              <Button
                onClick={handleResendClick}
                variant="contained"
                color="primary"
                fullWidth
                disabled={isCounting}
                sx={{
                  width: "410px",
                  height: "48px",
                  backgroundColor: isCounting ? "#ccc" : "#8F85F3",
                  ":hover": { backgroundColor: "#D5D1FB" },
                }}
              >
                {isCounting
                  ? `Kirim ulang dalam ${formatTime()}`
                  : "Kirim ulang tautan"}
              </Button>
              <CustomButton
                onClick={handleClick}
                label="Kembali ke halaman masuk"
              />

              {resendSuccess && (
                <AlertSuccess label="Link tautan berhasil dikirim ulang" />
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
