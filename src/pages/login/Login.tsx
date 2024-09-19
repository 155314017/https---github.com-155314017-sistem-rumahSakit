import { Box, CardMedia, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, TextField, Typography, Checkbox, Link, Button } from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import my from "../../img/loginImg.png";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Email tidak valid')
        .required('Email wajib diisi'),
    password: Yup.string()
        .min(6, 'Kata sandi harus terdiri dari minimal 6 karakter')
        .required('Kata sandi wajib diisi'),
});

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [showEmailChanged, setShowEmailChanged] = useState(true);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClick = () => {
        setShowLogin(true);
        setShowEmailChanged(true);
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
                <CardMedia
                    component="img"
                    height="864"
                    sx={{ width: '793px', objectFit: 'cover', marginTop: '40px' }}
                    image={my}
                    alt="Example Image"
                />
                {showLogin && (
                    <>


                        <Box sx={{ marginLeft: '50px', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Typography sx={{ fontSize: '32px', fontWeight: '600' }}>
                                Selamat Datang
                            </Typography>
                            <Typography sx={{ color: 'gray', fontSize: '18px', marginBottom: '30px' }}>
                                Silakan masukkan detail akun Anda untuk melanjutkan
                            </Typography>

                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    console.log(values);
                                }}
                            >
                                {({ errors, touched, handleChange, handleBlur, values }) => (
                                    <Form>
                                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <FormLabel sx={{ fontSize: '18px' }}>Email</FormLabel>
                                            <Field
                                                name="email"
                                                as={TextField}
                                                placeholder="Masukkan email, username, atau NIP"
                                                variant="outlined"
                                                fullWidth
                                                sx={{
                                                    width: '410px',
                                                    height: '48px',
                                                    marginTop: '10px',
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                    },
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        border: '1px solid #ccc',
                                                    },
                                                    '& .MuiOutlinedInput-input': {
                                                        padding: '10px',
                                                        fontSize: '16px',
                                                    },
                                                }}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                                error={touched.email && Boolean(errors.email)}
                                                helperText={touched.email && errors.email}
                                            />
                                            <FormLabel sx={{ fontSize: '18px', marginTop: '20px' }}>Kata Sandi</FormLabel>
                                            <FormControl variant="outlined" fullWidth sx={{ width: '410px', height: '48px', marginTop: '10px' }}>
                                                <Field
                                                    name="password"
                                                    as={TextField}
                                                    placeholder="Masukkan kata sandi"
                                                    variant="outlined"
                                                    type={showPassword ? 'text' : 'password'}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    onClick={handleClickShowPassword}
                                                                    edge="end"
                                                                >
                                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    sx={{
                                                        height: '48px',
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '8px',
                                                        },
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                            border: '1px solid #ccc',
                                                        },
                                                        '& .MuiOutlinedInput-input': {
                                                            padding: '10px',
                                                            fontSize: '16px',
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
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginTop: '10px',
                                                    maxWidth: '92%'
                                                }}
                                            >
                                                <FormControlLabel
                                                    control={<Checkbox />}
                                                    label="Ingat kata sandi"
                                                    sx={{ marginRight: 'auto' }}
                                                />

                                                <Link onClick={() => setShowLogin(false)} href="#" underline="hover" sx={{ fontSize: '16px', color: '#8F85F3' }}>
                                                    Lupa kata sandi?
                                                </Link>
                                            </Box>

                                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ width: '410px', height: '48px', marginTop: '20px', backgroundColor: '#8F85F3', ":hover": { backgroundColor: '#D5D1FB' } }}>
                                                Login
                                            </Button>
                                        </Box>
                                    </Form>
                                )}
                            </Formik>
                        </Box>

                    </>
                )}
                {
                    !showLogin && (
                        <>
                            {showEmailChanged && (
                                <Box sx={{ marginLeft: '50px', marginTop: 'auto', marginBottom: 'auto' }}>
                                    <Typography sx={{ fontSize: '32px', fontWeight: '600', maxWidth: '410px' }}>
                                        Masukkan alamat Email Anda
                                    </Typography>
                                    <Typography sx={{ color: '#A8A8BD', fontSize: '18px', marginBottom: '30px', maxWidth: '410px', fontWeight: '400' }}>
                                        Untuk mengatur ulang kata sandi Anda, masukkan alamat email yang Anda gunakan.
                                    </Typography>

                                    <Formik
                                        initialValues={{ email: '', password: '' }}
                                        validationSchema={validationSchema}
                                        onSubmit={(values) => {
                                            console.log(values);
                                        }}
                                    >
                                        {({ errors, touched, handleChange, handleBlur, values }) => (
                                            <Form>
                                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                                    <FormLabel sx={{ fontSize: '18px' }}>Email</FormLabel>
                                                    <Field
                                                        name="email"
                                                        as={TextField}
                                                        placeholder="example@mail.com"
                                                        variant="outlined"
                                                        fullWidth
                                                        sx={{
                                                            width: '410px',
                                                            height: '48px',
                                                            marginTop: '10px',
                                                            '& .MuiOutlinedInput-root': {
                                                                borderRadius: '8px',
                                                            },
                                                            '& .MuiOutlinedInput-notchedOutline': {
                                                                border: '1px solid #ccc',
                                                            },
                                                            '& .MuiOutlinedInput-input': {
                                                                padding: '10px',
                                                                fontSize: '16px',
                                                            },
                                                        }}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.email}
                                                        error={touched.email && Boolean(errors.email)}
                                                        helperText={touched.email && errors.email}
                                                    />
                                                    <Button onClick={() => setShowEmailChanged(false)} type="submit" variant="contained" color="primary" fullWidth sx={{ width: '410px', height: '48px', marginTop: '20px', backgroundColor: '#8F85F3', ":hover": { backgroundColor: '#D5D1FB' } }}>
                                                        Setel ulang kata sandi
                                                    </Button>

                                                    <Button onClick={() => setShowLogin(true)} fullWidth sx={{ width: '410px', height: '48px', marginTop: '20px', backgroundColor: 'transparent', color: '#8F85F3', border: '1px solid', borderColor: '#8F85F3', ":hover": { backgroundColor: '#8F85F3', color: 'white' } }}>
                                                        Kembali ke halaman masuk
                                                    </Button>
                                                </Box>
                                            </Form>
                                        )}
                                    </Formik>
                                </Box>
                            )}

                            {!showEmailChanged && (
                                <Box sx={{ marginLeft: '50px', marginTop: 'auto', marginBottom: 'auto' }}>
                                    <Typography sx={{ fontSize: '32px', fontWeight: '600', maxWidth: '410px' }}>
                                        Email pengaturan ulang kata sandi telah terkirim.
                                    </Typography>
                                    <Typography sx={{ color: '#16161D', fontSize: '18px', marginBottom: '30px', maxWidth: '410px', fontWeight: '400' }}>
                                        Kami telah mengirimkan tautan untuk mengatur ulang kata sandi Anda. Tidak mendapat email?
                                    </Typography>
                                    <Button onClick={() => console.log("clicked")} variant="contained" color="primary" fullWidth sx={{ width: '410px', height: '48px', marginTop: '20px', backgroundColor: '#8F85F3', ":hover": { backgroundColor: '#D5D1FB' } }}>
                                        Kirim ulang tautan
                                    </Button>
                                    <Button onClick={() => handleClick() } fullWidth sx={{ width: '410px', height: '48px', marginTop: '20px', backgroundColor: 'transparent', color: '#8F85F3', border: '1px solid', borderColor: '#8F85F3', ":hover": { backgroundColor: '#8F85F3', color: 'white' } }}>
                                        Kembali ke halaman masuk
                                    </Button>
                                </Box>
                            )}
                        </>
                    )
                }

            </Box>
        </>
    );
}
