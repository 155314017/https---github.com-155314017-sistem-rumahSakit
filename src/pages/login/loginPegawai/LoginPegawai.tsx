import {
  Box,
  CardMedia,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Checkbox,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import my from "../../../img/loginImg.png";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AlertSuccess from "../../../components/small/AlertSuccess";
import AlertWarning from "../../../components/small/AlertWarning";
import CustomButton from "../../../components/small/CustomButton";
import LabelHandler from "../../../components/small/LabelHandler";
import logo from "../../../img/St.carolus.png";
import { useNavigate } from "react-router-dom";
import Login from "../../../services/Admin Tenant/Auth/Login";
import ResetPassword from "../../../services/Admin Tenant/Auth/ResetPassword";

const validationSchema = Yup.object({
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: Yup.string()
    .required("Kata sandi wajib diisi"),
});

interface FormValues {
  email: string;
  password: string;
}

interface FormResetPasswordValues {
  email: string;
}


export default function LoginPegawai() {
  const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showEmailChanged, setShowEmailChanged] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const [wrongPassword, setWrongPassword] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);


  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const forgotPass = () => {
    setShowLogin(false);
    setEmailError(false);
    setPasswordError(false);
  };

  const handleClick = () => {
    setShowLogin(true);
    setShowEmailChanged(true);
  };


  const showTemporarySuccessLogin = async () => {
    setLoginSuccess(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setLoginSuccess(false);
  };

  const loginComponent = () => {
    setShowLogin(true);
  };
  const showTemporaryWrongEmail = async () => {
    setWrongEmail(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setWrongEmail(false);
  };

  const showTemporaryWrongPassword = async () => {
    setWrongPassword(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setWrongPassword(false);
  };

  const validationCheck = async (values: FormValues) => {
    console.log("inside validationCheck");
    try {
      const { email, password } = values;
      const response = await Login(email, password);
      console.log("Login response:", response);

      if (response.responseCode === "200") {
        console.log("sukses");
        navigate('/dashboard');
        return true;
      } else {
        console.log("gagal - unexpected response:", response);
        return false;
      }
    } catch (error: any) {
      // console.error("Error during login:", error);
      // return false;
      if (error.responseCode == "401") {//salah password
        console.log(error.responseCode);
        showTemporaryWrongPassword();
      } else if (error.responseCode == "404") {//salah email
        console.log(error.responseCode);
        showTemporaryWrongEmail();
      }
    }
  };

  const handleResetPassword = async (values: FormResetPasswordValues) => {
    console.log("inside handleResetPassword");
    try {
      const email = values.email; 
      const response = await ResetPassword(email);
      if (response.responseCode === "200") {
        console.log("email sent");
        return true;
      } else {
        console.log("gagal - unexpected response:", response);
        return false;
      }
    } catch (error: any) {
      console.error("Error during password reset:", error);
      return false;
    }
  };


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

  const handleResendClick = () => {
    setIsCounting(true);
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
    <>
      <style>
        {`
            :root {
            background-color: #ffff
            }
            `}
      </style>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "row",

        }}
      >
        <Box>
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
            image={my}
            alt="Example Image"
          />
        </Box>


        <Box
          sx={{
            display: "flex",
            position: "absolute",
            right: "0",
            top: "0",
            width: "50%",
            height: "100vh",
            flexDirection: "column",
            bgcolor: '#ffff'
          }}
        >

          {resendSuccess && (
            <AlertSuccess label="Link tautan berhasil dikirim ulang" />
          )}

          {showLogin && (
            <>
              {wrongPassword && (
                <AlertWarning teks="Kata sandi yang Anda masukkan salah, silahkan coba lagi." />
              )}

              {wrongEmail && (
                <AlertWarning teks="Email yang Anda masukkan salah, silahkan coba lagi." />
              )}

              <Box
                sx={{
                  marginY: "auto",
                  marginX: "auto",
                  width: "90%",

                }}
              >
                <img src={logo} alt="" style={{ width: "100px" }} />
                <Typography sx={{ fontSize: "32px", fontWeight: "600" }}>
                  Selamat Datang
                </Typography>
                <Typography
                  sx={{ color: "gray", fontSize: "18px", marginBottom: "30px" }}
                >
                  Silakan masukkan detail akun Anda untuk melanjutkan
                </Typography>

                <Formik
                  initialValues={{ email: "", password: "" }}
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
                  }) => (
                    <Form>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <FormLabel sx={{ fontSize: "18px" }}>Email</FormLabel>
                        <Field
                          name="email"
                          as={TextField}
                          placeholder="Masukkan email, username, atau NIP"
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
                        <FormLabel sx={{ fontSize: "18px", marginTop: "20px" }}>
                          Kata Sandi
                        </FormLabel>
                        <FormControl
                          variant="outlined"
                          fullWidth
                          sx={{
                            width: "100%",
                            height: "48px",
                            marginTop: "10px",
                          }}
                        >
                          <Field
                            name="password"
                            as={TextField}
                            placeholder="Masukkan kata sandi"
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              height: "48px",
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                                backgroundColor: passwordError
                                  ? "#ffcccc"
                                  : "inherit",
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
                            value={values.password}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                          />
                        </FormControl>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "10px",
                            width: "100%",
                          }}
                        >
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Ingat kata sandi"
                            sx={{ marginRight: "auto" }}
                          />
                          <LabelHandler
                            onClick={forgotPass}
                            href="#"
                            label="Lupa kata sandi?"
                          />
                        </Box>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
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
                          Login
                        </Button>


                        {loginSuccess && (
                          <AlertSuccess label="Login Succeeded!" />
                        )}
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            </>
          )}
          {!showLogin && (
            <>
              {showEmailChanged && (
                <Box
                  sx={{
                    marginLeft: "50px",
                    marginTop: "auto",
                    marginBottom: "auto",
                    width: '90%'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "32px",
                      fontWeight: "600",
                      width: "100%",
                    }}
                  >
                    Masukkan alamat Email Anda
                  </Typography>
                  <Typography
                    sx={{
                      color: "#A8A8BD",
                      fontSize: "18px",
                      marginBottom: "30px",
                      width: "100%",
                      fontWeight: "400",
                    }}
                  >
                    Untuk mengatur ulang kata sandi Anda, masukkan alamat email
                    yang Anda gunakan.
                  </Typography>

                  <Formik
                    initialValues={{ email: "" }}
                    validationSchema={Yup.object({
                      email: Yup.string()
                        .email("Email tidak valid")
                        .required("Email wajib diisi"),
                    })}
                    validateOnChange={true}
                    validateOnBlur={true}
                    onSubmit={async (values) => {
                      if (await handleResetPassword(values)) {
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
                  }) => (
                    <Form>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <FormLabel sx={{ fontSize: "18px" }}>Email</FormLabel>
                        <Field
                          name="email"
                          as={TextField}
                          placeholder="example@mail.com"
                          variant="outlined"
                          fullWidth
                          sx={{
                            width: "100%",
                            height: "48px",
                            marginTop: "10px",
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "8px",
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
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          // onClick={() => setShowEmailChanged(false)}
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
                          Setel ulang kata sandi
                        </Button>

                        <CustomButton
                          onClick={loginComponent}
                          label="Kembali ke halaman masuk"
                        />
                      </Box>
                    </Form>
                  )}
                </Formik>
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
                width: '90%'
              }}
            >
              <Typography
                sx={{
                  fontSize: "32px",
                  fontWeight: "600",
                  width: "100%",
                }}
              >
                Email pengaturan ulang kata sandi telah terkirim.
              </Typography>
              <Typography
                sx={{
                  color: "#16161D",
                  fontSize: "18px",
                  marginBottom: "30px",
                  width: "100%",
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
                  width: "100%",
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

              {/* {resendSuccess && (
                  <AlertSuccess label="Link tautan berhasil dikirim ulang" />
                )} */}
            </Box>
          )}
        </>
          )}
      </Box>
    </Box >
    </>
  );
}
