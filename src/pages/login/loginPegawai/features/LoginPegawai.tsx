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
  Button
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import loginImage from '../../../../assets/img/loginImg.webp'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import AlertSuccess from '../../../../components/small/alert/AlertSuccess'
import AlertWarning from '../../../../components/small/alert/AlertWarning'
import CustomButton from '../../../../components/small/CustomButton'
import logo from '../../../../assets/img/St.carolus.png'
import { Helmet } from 'react-helmet';
//hooks
import useLoginPegawai from '../hooks/useLoginPegawai'
import { fieldFormStyle } from '../../../../style/ts/fieldFormStyle'
import CustomButtonFilled from '../../../../components/small/button/CustomButtonFilled'
export default function LoginPegawai() {
  const {
    showPassword,
    showLogin,
    gantiPassword,
    isCounting,
    resendSuccess,
    successLogout,
    wrongPassword,
    wrongEmail,
    handleClickShowPassword,
    forgotPass,
    handleClick,
    showTemporarySuccessLogin,
    loginComponent,
    handleCheckboxChange,
    validationSchema,
    validationCheck,
    handleResetPassword,
    handleResendClick,
    formatTime,
    isChecked
  } = useLoginPegawai()
  return (
    <>
      <style>
        {`
            :root {
            background-color: #ffff
            }
            `}
      </style>
      <Helmet>
        {/* <title>Login Pegawai - Sistem Rumah Sakit</title> */}
        <meta name="description" content="Halaman Login untuk Pegawai di Sistem Rumah Sakit, tempat pegawai dapat mengakses layanan rumah sakit secara mudah dan cepat." />
        <meta charSet="UTF-8" />
        <meta name="keywords" content="login pegawai, sistem rumah sakit, aplikasi rumah sakit, React, medical staff portal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* <!-- Open Graph Meta Tags --> */}
        <meta property="og:title" content="Login Pegawai - Sistem Rumah Sakit" />
        <meta property="og:description" content="Halaman Login untuk Pegawai di Sistem Rumah Sakit." />
        <meta property="og:image" content="URL-Gambar-Logo-Rumah-Sakit.jpg" />
        <meta property="og:url" content="URL-Halaman-Login" />
        <meta property="og:type" content="website" />

        {/* <!-- Twitter Card Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Login Pegawai - Sistem Rumah Sakit" />
        <meta name="twitter:description" content="Halaman Login untuk Pegawai di Sistem Rumah Sakit." />
        <meta name="twitter:image" content="URL-Gambar-Logo-Rumah-Sakit.jpg" />

      </Helmet>

      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <Box>
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
            image={loginImage}
            alt="Login Image"
            loading='lazy'
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            position: 'absolute',
            right: '0',
            top: '0',
            width: '50%',
            height: '100vh',
            flexDirection: 'column',
            bgcolor: '#ffff'
          }}
        >
          {resendSuccess && <AlertSuccess label="Link tautan berhasil dikirim ulang" />}
          {successLogout && <AlertSuccess label="Berhasil Log Out" />}
          {wrongPassword && (
            <AlertWarning teks="Kata sandi yang Anda masukkan salah, silahkan coba lagi." />
          )}
          {wrongEmail && (
            <AlertWarning teks="Email yang Anda masukkan salah, silahkan coba lagi." />
          )}

          {showLogin && (
            <Box
              sx={{
                marginY: 'auto',
                marginX: 'auto',
                width: '90%'
              }}
            >
              <img src={logo} alt="" style={{ width: '100px' }} />
              <Typography sx={{ fontSize: '32px', fontWeight: '600' }}>Selamat Datang</Typography>
              <Typography sx={{ color: 'gray', fontSize: '18px', marginBottom: '30px' }}>
                Silakan masukkan detail akun Anda untuk melanjutkan
              </Typography>

              <Formik
                initialValues={{
                  email: isChecked ? 'email@email.com' : '',
                  password: isChecked ? 'password' : ''
                }}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  await validationCheck(values)
                  await showTemporarySuccessLogin()
                }}
              >
                {({ errors, touched, handleChange, handleBlur, values, isValid, dirty }) => (
                  <Form>
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <FormLabel sx={{ fontSize: '18px' }}>Email</FormLabel>
                      <Field
                        name="email"
                        as={TextField}
                        placeholder="Masukkan email, username, atau NIP"
                        variant="outlined"
                        fullWidth
                        sx={fieldFormStyle(touched, errors, 'email')}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(e)
                        }}
                        onBlur={handleBlur}
                        value={values.email}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />

                      <FormLabel sx={{ fontSize: '18px', marginTop: '20px' }}>Kata Sandi</FormLabel>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        sx={{
                          width: '100%',
                          height: '48px',
                          marginTop: '10px'
                        }}
                      >
                        <Field
                          name="password"
                          as={TextField}
                          placeholder="Masukkan kata sandi"
                          variant="outlined"
                          type={showPassword ? 'text' : 'password'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword} edge="end">
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                          sx={fieldFormStyle(touched, errors, 'password')}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleChange(e)
                          }}
                          onBlur={handleBlur}
                          value={values.password}
                          error={touched.password && Boolean(errors.password)}
                          helperText={touched.password && errors.password}
                        />
                      </FormControl>

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: '10px',
                          width: '100%'
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              sx={{
                                '&.Mui-checked': {
                                  color: '#8F85F3'
                                }
                              }}
                              checked={isChecked}
                              onChange={handleCheckboxChange}
                            />
                          }
                          label="Ingat kata sandi"
                          sx={{ marginRight: 'auto' }}
                        />

                        <a href={'#'} onClick={forgotPass} style={{ textDecoration: 'none', fontSize: '16px', color: '#8F85F3' }}>
                          Lupa kata sandi?
                        </a>
                      </Box>
                      {/* <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                          width: '100%',
                          height: '48px',
                          marginTop: '20px',
                          backgroundColor: '#8F85F3',
                          ':hover': { backgroundColor: '#D5D1FB' }
                        }}
                        disabled={isChecked ? !isChecked : !isValid || !dirty}
                      >
                        Login
                      </Button> */}
                      <CustomButtonFilled type='submit' variant='contained' color='primary' text='Login' disabled={isChecked ? !isChecked : !isValid || !dirty} />
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          )}
          {!showLogin && (
            <>
              {gantiPassword && (
                <Box
                  sx={{
                    marginLeft: '50px',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    width: '90%'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '32px',
                      fontWeight: '600',
                      width: '100%'
                    }}
                  >
                    Masukkan alamat Email Anda
                  </Typography>
                  <Typography
                    sx={{
                      color: '#A8A8BD',
                      fontSize: '18px',
                      marginBottom: '30px',
                      width: '100%',
                      fontWeight: '400'
                    }}
                  >
                    Untuk mengatur ulang kata sandi Anda, masukkan alamat email yang Anda gunakan.
                  </Typography>

                  <Formik
                    initialValues={{ email: '' }}
                    validationSchema={Yup.object({
                      email: Yup.string().email('Email tidak valid').required('Email wajib diisi')
                    })}
                    validateOnChange={true}
                    validateOnBlur={true}
                    onSubmit={async (values) => {
                      if (await handleResetPassword(values)) {
                        console.log(values)
                        await showTemporarySuccessLogin()
                      }
                    }}
                  >
                    {({ errors, touched, handleChange, handleBlur, values, isValid, dirty }) => (
                      <Form>
                        <Box
                          sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <FormLabel sx={{ fontSize: '18px' }}>Email</FormLabel>
                          <Field
                            name="email"
                            as={TextField}
                            placeholder="example@mail.com"
                            variant="outlined"
                            fullWidth
                            sx={fieldFormStyle(touched, errors, 'email')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                          />
                          {/* <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                              width: '100%',
                              height: '48px',
                              marginTop: '20px',
                              backgroundColor: '#8F85F3',
                              ':hover': { backgroundColor: '#D5D1FB' }
                            }}
                            disabled={!isValid || !dirty}
                          >
                            Setel ulang kata sandi
                          </Button> */}

                          <CustomButtonFilled type='submit' variant='contained' color='primary' text='Setel ulang kata sandi' disabled={!isValid || !dirty} />

                          <CustomButton onClick={loginComponent} label="Kembali ke halaman masuk" />
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Box>
              )}

              {!gantiPassword && (
                <Box
                  sx={{
                    marginLeft: '50px',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '90%'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '32px',
                      fontWeight: '600',
                      width: '100%'
                    }}
                  >
                    Email pengaturan ulang kata sandi telah terkirim.
                  </Typography>
                  <Typography
                    sx={{
                      color: '#16161D',
                      fontSize: '18px',
                      marginBottom: '30px',
                      width: '100%',
                      fontWeight: '400'
                    }}
                  >
                    Kami telah mengirimkan tautan untuk mengatur ulang kata sandi Anda. Tidak
                    mendapat email?
                  </Typography>
                  <Button
                    onClick={handleResendClick}
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isCounting}
                    sx={{
                      width: '100%',
                      height: '48px',
                      backgroundColor: isCounting ? '#ccc' : '#8F85F3',
                      ':hover': { backgroundColor: '#D5D1FB' }
                    }}
                  >
                    {isCounting ? `Kirim ulang dalam ${formatTime()}` : 'Kirim ulang tautan'}
                  </Button>
                  <CustomButton onClick={handleClick} label="Kembali ke halaman masuk" />
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  )
}
