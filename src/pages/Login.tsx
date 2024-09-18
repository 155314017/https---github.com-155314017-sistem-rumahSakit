import { Box, CardMedia, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, TextField, Typography, Checkbox, Link, Button } from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import my from "../img/loginImg.png";
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

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
            <CardMedia
                component="img"
                height="864"
                sx={{ width: '793px', objectFit: 'cover', marginTop: '40px' }}
                image={my}
                alt="Example Image"
            />

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

                                    <Link href="#" underline="hover" sx={{ fontSize: '16px', color: '#8F85F3' }}>
                                        Lupa kata sandi?
                                    </Link>
                                </Box>

                                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ width: '410px', height: '48px', marginTop: '20px', backgroundColor: '#8F85F3' }}>
                                    Login
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
}
