import {
  Box,
  CardMedia,
  FormLabel,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import logo from "../../../../img/St.carolus.png";
import patientImage from "../../../../assets/img/registrationImg.jpg";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AlertWarning from "../../../../components/small/AlertWarning";
import AlertSuccess from "../../../../components/small/AlertSuccess";
import "react-phone-input-2/lib/style.css";
//hooks
import useLoginPasien from "../hooks/useLoginPasien";


export default function LoginPasien() {
  const {
    showAlert,
    loginSuccess,
    validationCheck,
    showTemporarySuccessLogin,
    validationSchema,
    navigate,

  } = useLoginPasien()


  return (
    <>
      <style>
        {`
              :root {
              background-color: #ffff
              }
              `}
      </style>

      <Box>
        <Box>
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              sx={{
                width: '50%',
                height: '100vh',
                objectFit: 'cover',
                position: 'fixed',
                top: '0',
                left: '0'
              }}
              image={patientImage}
              alt="Example Image"
            />
          </Box>

          <Box
            sx={{
              position: 'absolute',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              width: '50%',
              height: '100vh',
              top: '0',
              left: '0'
            }}
          ></Box>

          <Box
            sx={{
              position: 'absolute',
              zIndex: '9999',
              width: '40%',
              left: '23%',
              bottom: '0%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <Typography
              sx={{
                fontSize: '56px',
                fontWeight: '700',
                lineHeight: '60px',
                color: 'white'
              }}
            >
              Mulai permintaan janji temu Anda di sini.
            </Typography>
          </Box>
        </Box>
        {loginSuccess && <AlertSuccess label="Login Succeeded!" />}
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
            width: "50%",
            flexDirection: "column",
            gap: 5,
            height: "100vh",
            bgcolor: "#fff",
          }}
        >
          <Box sx={{ width: "80%" }}>
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
                    <Typography fontWeight={600} fontSize={'20px'} mb={'2%'} >
                      Isi data diri pasien
                    </Typography>

                    <FormLabel sx={{ fontSize: "16px" }}>
                      NIK (Nomor induk kependudukan) Pasien
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
                          backgroundColor: touched.nik && errors.nik ? "#ffcccc" : "inherit",
                          '&:focus-within .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#8F85F3',
                          },
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
                    // helperText={touched.nik && errors.nik}
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
                          backgroundColor: touched.email && errors.email ? "#ffcccc" : "inherit",
                          '&:focus-within .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#8F85F3',
                          },
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
                    // helperText={touched.email && errors.email}
                    />

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

                    <Button
                      onClick={() => navigate('/register/penanggungJawab', { state: { patientWithNoIdentity: true } })}
                      sx={{
                        width: '100%',
                        height: '48px',
                        marginTop: '20px',
                        backgroundColor: '#ffff',
                        border: '1px solid #8F85F3',
                        color: '#8F85F3',
                        ":hover": { backgroundColor: '#8F85F3', color: '#ffff' },
                      }}
                    >
                      Pasien Tanpa Identitas
                    </Button>

                    {/* <CustomButton onClick={() => console.log("hai ")} label="Daftar pasien baru" /> */}
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </>
  )
}
