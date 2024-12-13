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
import axios from "axios";
import InformasiTicketAPI from "../../../../components/small/InformasiTicketAPI";
import { Stack } from "@mui/system";

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
    const [mainPages, setMainPages] = useState(true);
    const [inputCodePages, setInputCodePages] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [infoTicket, setInfoTicket] = useState(false);

    const handleBack = () => {
        setOpenModalPilihPembayaran(false);
    }

    return (
        <>
            <style>
                {`
            :root {
            background-color: #eeedf2
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
                                    bgcolor: '#ffffff',
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
                                    to="#"
                                    style={{ textDecoration: "none" }}
                                    onClick={() => {
                                        setOpenModalPilihPembayaran(true);
                                        setMainPages(false);
                                    }}
                                >
                                    <Card
                                        sx={cardStyle}
                                    >
                                        <Avatar alt="Kode Booking" src="/src/img/filling.png" sx={{ width: '88px', height: '88px' }} />
                                        <Box>
                                            <Typography
                                                sx={{
                                                    color: "#7367F0",
                                                    fontSize: "18px",
                                                    fontWeight: "600",
                                                    lineHeight: "20px",
                                                    textDecoration: "none",
                                                }}
                                            >
                                                Pasien Lama
                                            </Typography>
                                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", textDecoration: "none" }}>
                                                <Typography sx={{ textDecoration: "none" }}>
                                                    dimana sudah terdaftar dalam program BPJS, sudah memiliki kartu dan berhak mendapatkan pelayanan kesehatan
                                                </Typography>
                                                <ArrowForwardIosIcon sx={{ color: "#7367F0" }} />
                                            </Box>
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
                                            Pasien Baru
                                        </Typography>
                                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", textDecoration: "none" }}>
                                            <Typography sx={{ textDecoration: "none" }}>
                                                Pasien yang berobat di rumah sakit dengan membayar sendiri seluruh biaya perawatan dan pengobatan yang dibutuhkan.
                                            </Typography>
                                            <ArrowForwardIosIcon sx={{ color: "#7367F0" }} />
                                        </Box>
                                    </Card>
                                </Link>
                                <Link to="#" style={{ textDecoration: "none" }} onClick={() => {
                                    setInputCodePages(true);
                                    setMainPages(false);
                                }} >
                                    <Card sx={cardStyle}>
                                        <Avatar alt="Kode Booking" src="/src/img/filling.png" sx={{ width: '88px', height: '88px' }} />
                                        <Box>
                                            <Typography sx={titleStyle}>Masukkan kode booking</Typography>
                                            <Box sx={descriptionBoxStyle}>
                                                <Typography>Berfungsi untuk pasien yang sudah melakukan pendaftaran online untuk
                                                    check-in nomor antrian.</Typography>
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
                            onClick={() => {
                                setInputCodePages(false);
                                setMainPages(true);
                            }}
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
                                // await new Promise((resolve) => setTimeout(resolve, 3000));
                                const response = await axios.post('https://hms.3dolphinsocial.com:8083/v1/patient/check-in', values.otp, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        // 'accessToken': `${token}`
                                    },
                                });
                                console.log(response);
                                setOpenModalKodeBooking(false)
                                setInfoTicket(true);
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

                {openModalPilihPembayaran && (
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
                        <Box
                            sx={{
                                bgcolor: '#ffffff',
                                width: '57%',
                                height: '100px',
                                borderRadius: '24px',
                                gap: '4px',
                                padding: '24px',
                                my: '2%',
                                display: 'flex',
                                flexDirection: 'column',

                            }}
                        >
                            <Typography id="modal-modal-title" sx={{ mt: 2, fontSize: '18px', fontWeight: 600 }}>
                                Pilih metode pembayaran
                            </Typography>
                            <Typography color="#747487" fontWeight={400} fontSize={'18px'}>
                                Cara yang digunakan untuk menyelesaikan transaksi.
                            </Typography>
                        </Box>

                        <Stack direction="column" width={'60%'} spacing={3}>
                            {/* Pasien BPJS */}
                            <Link to="/tambahPasien/umum/offline" style={{ textDecoration: "none" }}>
                                <Card sx={cardStyle}>
                                    <Avatar alt="Kode Booking" src="/src/img/filling.png" sx={{ width: '88px', height: '88px' }} />
                                    <Box>
                                        <Typography sx={titleStyle}>Pasien Umum/asuransi</Typography>
                                        <Box sx={descriptionBoxStyle}>
                                            <Typography>Pasien yang berobat di rumah sakit dengan membayar sendiri seluruh biaya perawatan dan pengobatan yang dibutuhkan.</Typography>
                                            <ArrowForwardIosIcon sx={{ color: "#7367F0" }} />
                                        </Box>
                                    </Box>
                                </Card>
                            </Link>

                            {/* Pasien Umum */}
                            <Link to="#" style={{ textDecoration: "none" }}>
                                <Card sx={cardStyle}>
                                    <Avatar alt="Kode Booking" src="/src/img/meidicine.png" sx={{ width: '88px', height: '88px' }} />
                                    <Box>
                                        <Typography sx={titleStyle}>Pasien non BPJS kesehatan</Typography>
                                        <Box sx={descriptionBoxStyle}>
                                            <Typography>Pasien yang berobat di rumah sakit dengan membayar sendiri seluruh biaya perawatan dan pengobatan yang dibutuhkan.</Typography>
                                            <ArrowForwardIosIcon sx={{ color: "#7367F0" }} />
                                        </Box>
                                    </Box>
                                </Card>
                            </Link>
                        </Stack>
                        <Button
                            sx={{
                                padding: "10px 20px",
                                backgroundColor: "#8F85F3",
                                color: "white",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: 600,
                                mt: '2%',
                                width: "60%",
                                border: '1px solid #8F85F3',
                                ":hover": { backgroundColor: 'inherit', color: '#8F85F3' }
                            }}
                            onClick={handleBack}
                        >
                            Kembali ke pilihan sebelumnya
                        </Button>
                    </>
                )}


                {infoTicket && (
                    <InformasiTicketAPI
                        clinic="clinic"
                        jadwalKonsul={"sabtu"}
                        namaDokter="udin"
                        nomorAntrian={'1'}
                        tanggalReservasi="20 agus"
                    />
                )}

            </Box >
        </>
    )
}

const cardStyle = {
    display: "flex",
    flexDirection: "row",
    borderRadius: "24px",
    backgroundColor: "#F1F0FE",
    padding: "24px",
    gap: "16px",
    boxShadow: "none",

    // display: "flex",
    // flexDirection: "column",
    width: "96%",
    height: "100px",
    // borderRadius: "24px",
    // backgroundColor: "#F1F0FE",
    // padding: "24px",
    // gap: "16px",
    // boxShadow: "none", // Remove shadow
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
