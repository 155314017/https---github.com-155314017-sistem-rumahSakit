import {
    Box,
    CardMedia,
    FormControl,
    FormLabel,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import my from "../../../../assets/img/loginImg.png";
import { Formik, Form, Field } from "formik";
import logo from "../../../../assets/img/St.carolus.png";
import CustomButton from "../../../../components/small/CustomButton";

//hooks
import useAturUlangKataSandiPegawai from "../hooks/useAturUlangKataSandiPegawai";

export default function AturUlangKataSandiPegawai() {
   const {
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    validationSchema,
    navigate
   } = useAturUlangKataSandiPegawai();

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
                        image={my}
                        alt="Example Image"
                    />
                </Box>

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
                </Box>
            </Box>

            <Box>
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
                    <Box
                        sx={{
                            marginY: "auto",
                            marginX: "auto",
                            width: "90%",
                            
                        }}
                    >
                        <img src={logo} alt="logo-carolus" />
                        <Typography sx={{ fontSize: "32px", fontWeight: "600" }}>
                            Atur ulang kata sandi baru
                        </Typography>
                        <Typography
                            sx={{
                                color: "gray",
                                fontSize: "18px",
                                marginBottom: "30px",
                                width: "100%",
                            }}
                        >
                            Password baru kamu, harus berbeda dari kata sandi yang lama.
                        </Typography>

                        <Formik
                            initialValues={{ password: '', confirmPassword: '' }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                // Logika pengiriman data
                                console.log(values);
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form>
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
                                            mb:2
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
                                                    bgcolor: "inherit",
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    border: "1px solid #ccc",
                                                },
                                                "& .MuiOutlinedInput-input": {
                                                    padding: "10px",
                                                    fontSize: "16px",
                                                },
                                            }}
                                        />
                                        {errors.password && touched.password ? (
                                            <Typography color="error">{errors.password}</Typography>
                                        ) : null}
                                    </FormControl>

                                    <FormLabel sx={{ fontSize: "18px", marginTop: "20px" }}>
                                        Ulangi Kata Sandi
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
                                            name="confirmPassword"
                                            as={TextField}
                                            placeholder="Ulangi kata sandi"
                                            variant="outlined"
                                            type={showConfirmPassword ? "text" : "password"}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handleClickShowConfirmPassword}
                                                            edge="end"
                                                        >
                                                            {showConfirmPassword ? (
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
                                                    bgcolor: "inherit",
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    border: "1px solid #ccc",
                                                },
                                                "& .MuiOutlinedInput-input": {
                                                    padding: "10px",
                                                    fontSize: "16px",
                                                },
                                            }}
                                        />
                                        {errors.confirmPassword && touched.confirmPassword ? (
                                            <Typography color="error">{errors.confirmPassword}</Typography>
                                        ) : null}
                                    </FormControl>

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
                                        }}>
                                        Atur kata sandi
                                    </Button>
                                    <CustomButton onClick={ () => navigate('/login/pegawai')} label="Kembali ke halaman masuk" />
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
