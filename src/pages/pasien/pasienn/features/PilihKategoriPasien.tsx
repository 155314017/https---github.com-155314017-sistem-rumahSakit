import { Avatar, Box, CardMedia, IconButton, Button, CircularProgress, Typography } from "@mui/material";
import register from "../../../../assets/img/registerImg.jpg";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ModalKodeBooking from "../../../../components/small/ModalKodeBooking";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import OTPInput from "react-otp-input";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 670,
    bgcolor: "#FFFFFF",
    border: "1px solid #A8A8BD",
    boxShadow: 2,
    p: 4,
    borderRadius: "16px",
};

const otpValidationSchema = Yup.object({
    otp: Yup.string()
        .matches(/^[0-9]+$/, "OTP harus berupa angka")
        .min(6, "OTP minimal 6 digit")
        .max(6, "OTP maksimal 6 digit")
        .required("OTP wajib diisi"),
});

export default function PilihKategoriPasien() {
    const [openModalKodeBooking, setOpenModalKodeBooking] = useState(false);
    const [openModalPilihPembayaran, setOpenModalPilihPembayaran] = useState(false);
    // const [mainPages, setMainPages] = useState(true);
    // const [inputCodePages, setInputCodePages] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const mainPages = true;
    const inputCodePages = false;


    console.log(openModalKodeBooking);
    console.log(openModalPilihPembayaran);

    return (
        <>
            <style>
                {`
            :root {
            background-color: #ccc
            }
            `}
            </style>
            <Box
                sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
            >
                {mainPages && (
                    <>
                        <CardMedia
                            component="img"
                            sx={{
                                width: "60%",
                                height: "350px",
                                borderRadius: "24px",
                                position: "relative",
                                marginTop: "20px",
                                "@media (max-width: 600px)": {
                                    width: "100%"
                                }
                            }
                            }
                            image={register}
                            alt="Example Image"
                        />
                        <Box width={'60%'} >
                            <Box
                                sx={{
                                    bgcolor: '#ffff',
                                    width: '96%',
                                    height: '100px',
                                    borderRadius: '24px',
                                    gap: '4px',
                                    padding: '24px',
                                    my: '2%',
                                    display: 'flex',
                                    flexDirection: 'column',

                                }}
                            >
                                <Typography id="modal-modal-description" fontWeight={600} fontSize={'24px'} lineHeight={'26px'}>
                                    Pilih Kategori Pasien
                                </Typography>
                                <Typography color="#747487" fontWeight={400} fontSize={'18px'} >
                                    Membantu tenaga medis dalam memberikan perawatan yang lebih terorganisir, sesuai dengan tingkat kebutuhan pasien.
                                </Typography>
                            </Box>
                            <Box
                                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                            >
                                <Link
                                    to="/tambahPasien/BPJS"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Card
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            width: "96%",
                                            height: "128px",
                                            borderRadius: "24px",
                                            backgroundColor: "#F1F0FE",
                                            padding: "24px",
                                            gap: "16px",
                                            boxShadow: "none", // Remove shadow
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: "#7367F0",
                                                fontSize: "18px",
                                                fontWeight: "600",
                                                lineHeight: "20px",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Pasien BPJS
                                        </Typography>
                                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", textDecoration: "none" }}>
                                            <Typography sx={{ textDecoration: "none" }}>
                                                dimana sudah terdaftar dalam program BPJS, sudah memiliki kartu dan berhak mendapatkan pelayanan kesehatan
                                            </Typography>
                                            <ArrowForwardIosIcon sx={{ color: "#7367F0" }} />
                                        </Box>
                                    </Card>

                                </Link>

                                <Link
                                    to="/tambahPasien/Umum"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Card
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            width: "96%",
                                            height: "128px",
                                            borderRadius: "24px",
                                            backgroundColor: "#F1F0FE",
                                            padding: "24px",
                                            gap: "16px",
                                            boxShadow: "none", // Remove shadow
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: "#7367F0",
                                                fontSize: "18px",
                                                fontWeight: "600",
                                                lineHeight: "20px",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Pasien umum
                                        </Typography>
                                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", textDecoration: "none" }}>
                                            <Typography sx={{ textDecoration: "none" }}>
                                                Pasien yang berobat di rumah sakit dengan membayar sendiri seluruh biaya perawatan dan pengobatan yang dibutuhkan.
                                            </Typography>
                                            <ArrowForwardIosIcon sx={{ color: "#7367F0" }} />
                                        </Box>
                                    </Card>
                                </Link>
                                <Link to="#" style={{ textDecoration: "none" }} onClick={() => setOpenModalPilihPembayaran(true)} >
                                    <Card sx={cardStyle}>
                                        <Avatar alt="Kode Booking" src="/src/img/filling.png" sx={{ width: '88px', height: '88px' }} />
                                        <Box>
                                            <Typography sx={titleStyle}>Pasien Baru</Typography>
                                            <Box sx={descriptionBoxStyle}>
                                                <Typography>Pasien yang baru pertama kali datang ke rumah sakit untuk keperluan berobat. </Typography>
                                                <ArrowForwardIosIcon sx={{ color: "#7367F0" }} />
                                            </Box>
                                        </Box>
                                    </Card>
                                </Link>
                            </Box>
                        </Box>
                        <ModalKodeBooking open={openModalKodeBooking} onClose={() => setOpenModalKodeBooking(false)} />
                    </>
                )}

                {inputCodePages && (
                    <Box sx={style}>
                        <IconButton
                            onClick={() => setOpenModalKodeBooking(false)}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                color: '#A8A8BD',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography id="modal-modal-title" sx={{ mt: 2, fontSize: "18px", fontWeight: 600 }}>
                            Masukkan kode booking
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mb: 3 }}>
                            Berfungsi untuk pasien yang sudah melakukan pendaftaran online untuk check-in nomor antrian.
                        </Typography>

                        <Formik
                            initialValues={{ otp: "" }}
                            validationSchema={otpValidationSchema}
                            onSubmit={async (values) => {
                                console.log("Kode booking:", values.otp);
                                setIsLoading(true);
                                await new Promise((resolve) => setTimeout(resolve, 3000));
                                setOpenModalKodeBooking(false)
                                setIsLoading(false);
                            }}
                        >
                            {({ errors, touched, setFieldValue, values, isValid, dirty }) => (
                                <Form>
                                    <Field name="otp">
                                        {() => (
                                            <OTPInput
                                                value={values.otp}
                                                onChange={(otp) => setFieldValue("otp", otp)}
                                                numInputs={6}
                                                shouldAutoFocus
                                                renderSeparator={<span style={{ margin: "0 10px" }}> </span>}
                                                renderInput={(props) => (
                                                    <input
                                                        {...props}
                                                        style={{
                                                            width: "68px",
                                                            height: "58px",
                                                            textAlign: "center",
                                                            border: "1px solid #8F85F3",
                                                            borderRadius: "8px",
                                                            fontSize: "20px",
                                                            margin: "0 4px",
                                                            outline: "none",
                                                            padding: "8px",
                                                            color: "black",
                                                            backgroundColor: "white",
                                                        }}
                                                    />
                                                )}
                                            />
                                        )}
                                    </Field>
                                    {errors.otp && touched.otp && (
                                        <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                                            {errors.otp}
                                        </Typography>
                                    )}
                                    <Box sx={{ mt: 3, textAlign: "right" }}>
                                        <Button
                                            type="submit"
                                            style={{
                                                padding: "10px 20px",
                                                backgroundColor: isValid && dirty ? "#8F85F3" : "#A8A8A8",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "8px",
                                                cursor: isValid && dirty ? "pointer" : "not-allowed",
                                                fontWeight: 600,
                                                width: "100%",
                                            }}
                                            disabled={!isValid || !dirty || isLoading}
                                        >
                                            {isLoading ? (
                                                <CircularProgress size={25} sx={{ color: "white" }} />
                                            ) : (
                                                "Submit"
                                            )}
                                        </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                )}
            </Box>
        </>
    )
}

const cardStyle = {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    height: "80px",
    borderRadius: "24px",
    backgroundColor: "#F1F0FE",
    padding: "24px",
    gap: "16px",
    boxShadow: "none",
};

const titleStyle = {
    color: "#7367F0",
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "20px",
    textDecoration: "none",
};

const descriptionBoxStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textDecoration: "none",
};
