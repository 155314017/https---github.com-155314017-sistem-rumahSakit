import { Avatar, Box, CardMedia, IconButton, Button, CircularProgress, Typography, TextField } from "@mui/material";
import register from "../../../../assets/img/registerImg.jpg";
import bgImg from "../../../../assets/img/Bg-desktop.svg"
import { Link } from "react-router-dom";
import { Card } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ModalKodeBooking from "../../../../components/small/ModalKodeBooking";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {  Stack } from "@mui/system";
import InformasiTicketAPI from "../../../../components/small/InformasiTicketAPI";
import GenerateQueuePatientServices from "../../../../services/Patient Tenant/GenerateQueuePatientServices";

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

const bookingCodeSchema = Yup.object({
    bookingCode: Yup.string()
        // .min(6, "Booking kode minimal 6 digit")
        // .max(6, "Booking kode maksimal 6 digit")
        .required("Booking kode wajib diisi"),
});

export default function PilihKategoriPasien() {
    const [openModalKodeBooking, setOpenModalKodeBooking] = useState(false);
    const [openModalPilihPembayaran, setOpenModalPilihPembayaran] = useState(false);
    const [mainPages, setMainPages] = useState(true);
    const [inputCodePages, setInputCodePages] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [infoTicket, setInfoTicket] = useState(false);
    const [nomorAntrian, setNomorAntrian] = useState<string | number>(0);
    const [tiketAntrianKonter, setTiketAntrianKonter] = useState(false);
    const [errCode, setErrCode] = useState(false)

    const handleBack = () => {
        setOpenModalPilihPembayaran(false);
        setMainPages(true);
    }

    const pasienBaru = async () => {
        const counterId = "f2ac5cf2-b023-4756-ac33-b7b493d065dd" //nanti diganti
        setTiketAntrianKonter(true);
        setMainPages(false);
        try {
            const response = await GenerateQueuePatientServices(counterId)
            console.log(response);
            setNomorAntrian(response);
            console.log(response)

        } catch {
            console.log('error')
        }

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
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100vh",
                    backgroundImage: `url(${bgImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            >
                {/* Halaman Utama */}
                {mainPages && (
                    <Box >
                        <CardMedia
                            component="img"
                            sx={{
                                width: "100%",
                                height: "350px",
                                borderRadius: "24px",
                                position: "relative",
                                marginTop: "20px",
                                boxShadow: 2
                            }}
                            image={register}
                            alt="Example Image"
                        />
                        <Box width={'100%'}>
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
                                    boxShadow: 2
                                }}
                            >
                                <Typography id="modal-modal-description" fontWeight={600} fontSize={'24px'} lineHeight={'26px'}>
                                    Pilih Kategori Pasien
                                </Typography>
                                <Typography color="#747487" fontWeight={400} fontSize={'18px'}>
                                    Membantu tenaga medis dalam memberikan perawatan yang lebih terorganisir, sesuai dengan tingkat kebutuhan pasien.
                                </Typography>
                            </Box>
                            <Box
                                sx={{ display: "flex", flexDirection: "column", gap: 0 }}
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
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            borderRadius: "24px",
                                            padding: "16px",
                                            boxShadow: 2,
                                            marginBottom: "16px",
                                            bgcolor: '#D5D1FB'
                                        }}
                                    >
                                        <Avatar alt="Kode Booking" src="/src/img/meidicine.png" sx={{ width: '88px', height: '88px' }} />
                                        <Box sx={{ marginLeft: "16px" }}>
                                            <Typography sx={{ color: "#7367F0", fontSize: "18px", fontWeight: "600" }}>
                                                Pasien Lama
                                            </Typography>
                                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                                                <Typography sx={{ textDecoration: "none", maxWidth: '80%' }}>
                                                    Dimana sudah terdaftar dalam program BPJS, sudah memiliki kartu, dan berhak mendapatkan pelayanan kesehatan.
                                                </Typography>
                                                <ArrowForwardIosIcon sx={{ color: "#7367F0" }} />
                                            </Box>
                                        </Box>
                                    </Card>
                                </Link>

                                <Link
                                    to=""
                                    style={{ textDecoration: "none" }}
                                    onClick={pasienBaru}
                                >
                                    <Card
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            borderRadius: "24px",
                                            padding: "16px",
                                            boxShadow: 2,
                                            marginBottom: "16px",
                                            bgcolor: '#D5D1FB'
                                        }}
                                    >
                                        <Avatar alt="Kode Booking" src="/src/img/filling.png" sx={{ width: '88px', height: '88px' }} />
                                        <Box sx={{ marginLeft: "16px" }}>
                                            <Typography sx={{ color: "#7367F0", fontSize: "18px", fontWeight: "600" }}>
                                                Pasien Baru
                                            </Typography>
                                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                                                <Typography sx={{ textDecoration: "none", maxWidth: '80%' }}>
                                                    Dimana sudah terdaftar dalam program BPJS, sudah memiliki kartu, dan berhak mendapatkan pelayanan kesehatan.
                                                </Typography>
                                                <ArrowForwardIosIcon sx={{ color: "#7367F0" }} />
                                            </Box>
                                        </Box>
                                    </Card>
                                </Link>

                                <Link to="#" style={{ textDecoration: "none" }} onClick={() => {
                                    setInputCodePages(true);
                                    setMainPages(false);
                                }} >
                                    <Card
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            borderRadius: "24px",
                                            padding: "16px",
                                            boxShadow: 2,
                                            marginBottom: "16px",
                                            bgcolor: '#D5D1FB'
                                        }}
                                    >
                                        <Avatar alt="Kode Booking" src="/src/img/qrcode.png" sx={{ width: '88px', height: '88px' }} />
                                        <Box sx={{ marginLeft: "16px" }}>
                                            <Typography sx={{ color: "#7367F0", fontSize: "18px", fontWeight: "600" }}>
                                                Masukkan Kode Booking
                                            </Typography>
                                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", width: '120%', justifyContent: 'space-between' }}>
                                                <Typography sx={{ textDecoration: "none" }}>
                                                    Berfungsi untuk pasien yang sudah melakukan pendaftaran online untuk check-in nomor antrian.
                                                </Typography>
                                                <ArrowForwardIosIcon sx={{ color: "#7367F0" }} />
                                            </Box>
                                        </Box>
                                    </Card>
                                </Link>
                            </Box>
                        </Box>
                        <ModalKodeBooking open={openModalKodeBooking} onClose={() => setOpenModalKodeBooking(false)} />
                    </Box>
                )}

                {/* Halaman Input Kode Booking */}
                {inputCodePages && (
                    <Box sx={{ ...style }}>
                        <IconButton
                            onClick={() => {
                                setInputCodePages(false);
                                setMainPages(true);
                                setErrCode(false);
                                setIsLoading(false)
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
                            initialValues={{ bookingCode: "" }}
                            validationSchema={bookingCodeSchema}
                            enableReinitialize
                            onSubmit={async (values) => {
                                console.log("Kode booking:", values.bookingCode);
                                setIsLoading(true);
                                console.log(values.bookingCode)
                                const bookingCode = { bookingCode: values.bookingCode };
                                try {
                                    const response = await axios.post(
                                        'https://hms.3dolphinsocial.com:8083/v1/patient/check-in',
                                        bookingCode,
                                        {
                                            headers: {
                                                'Content-Type': 'application/json'
                                            }
                                        }
                                    )
                                    console.log("respon: ", response)
                                    setOpenModalKodeBooking(false);
                                    setInfoTicket(true);
                                    setIsLoading(false);
                                } catch (err: any) {
                                    console.log(err.status)
                                    setErrCode(true)
                                }
                            }}
                        >
                            {({ errors, touched, setFieldValue, values, isValid, dirty }) => (
                                <Form>
                                    <Field name="bookingCode">
                                        {() => (
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                placeholder="Masukkan kode booking"
                                                value={values.bookingCode}
                                                onChange={(e) => setFieldValue("bookingCode", e.target.value)}
                                                error={Boolean(errors.bookingCode && touched.bookingCode)}
                                                helperText={errors.bookingCode && touched.bookingCode ? errors.bookingCode : ""}
                                                sx={{
                                                    borderRadius: "8px",
                                                    fontSize: "16px",
                                                    marginBottom: "16px",
                                                }}
                                                inputProps={{
                                                    style: {
                                                        padding: "10px",
                                                        textAlign: "center",
                                                    },
                                                }}
                                            />
                                        )}
                                    </Field>

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
                                            {errCode ? "Tidak ada data booking" :
                                                (isLoading ? (
                                                    <CircularProgress size={25} sx={{ color: "white" }} />
                                                ) : (
                                                    "Submit"
                                                ))
                                            }

                                        </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                )}
                {openModalPilihPembayaran && (
                    <Box>
                        <CardMedia
                            component="img"
                            sx={{
                                width: "100%",
                                height: "350px",
                                borderRadius: "24px",
                                position: "relative",
                                marginTop: "-25px",
                                boxShadow: 2
                            }
                            }
                            image={register}
                            alt="Example Image"
                        />
                        <Box
                            sx={{
                                bgcolor: '#ffffff',
                                width: '95%',
                                height: '100px',
                                borderRadius: '24px',
                                gap: '4px',
                                padding: '24px',
                                my: '2%',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadowL: 2

                            }}
                        >
                            <Typography id="modal-modal-title" fontWeight={600} fontSize={'24px'} lineHeight={'26px'}>
                                Pilih metode pembayaran
                            </Typography>
                            <Typography color="#747487" fontWeight={400} fontSize={'18px'}>
                                Cara yang digunakan untuk menyelesaikan transaksi.
                            </Typography>
                        </Box>

                        <Stack direction="column" width={'100%'} spacing={3}>
                            {/* Pasien BPJS */}
                            <Link to="/tambahPasien/umum/offline" style={{ textDecoration: "none" }}>
                                <Card
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        borderRadius: "24px",
                                        padding: "16px",
                                        boxShadow: 2,
                                        marginBottom: "16px",
                                        bgcolor: '#D5D1FB'
                                    }}
                                >
                                    <Avatar alt="Kode Booking" src="/src/img/filling.png" sx={{ width: '88px', height: '88px' }} />
                                    <Box >
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
                                <Card
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        borderRadius: "24px",
                                        padding: "16px",
                                        boxShadow: 2,
                                        marginBottom: "16px",
                                        bgcolor: '#D5D1FB'
                                    }}
                                >
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
                                boxShadow: 2,
                                width: "100%",
                                border: '1px solid #8F85F3',
                                ":hover": { backgroundColor: 'inherit', color: '#8F85F3' }
                            }}
                            onClick={handleBack}
                        >
                            Kembali ke pilihan sebelumnya
                        </Button>
                    </Box>
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

                {tiketAntrianKonter && (
                    <Box
                        bgcolor={'white'}
                        maxWidth={506}
                        maxHeight={288}
                        borderRadius={'32px'}
                        padding={'24px'}
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'space-between'} /* Konten tersebar rapi */
                        alignItems={'center'} /* Konten berada di tengah horizontal */
                        gap={3}
                        position={'relative'} /* Untuk positioning tombol Close */
                        boxShadow={'0px 4px 10px rgba(0, 0, 0, 0.1)'} /* Tambahan shadow agar lebih elegan */
                    >
                        {/* Tombol Close */}
                        <IconButton
                            onClick={() => {
                                setInputCodePages(false);
                                setMainPages(true);
                                setTiketAntrianKonter(false);
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

                        {/* Bagian Header */}
                        <Box textAlign={'center'} mb={2}>
                            <Typography fontWeight={600} fontSize={'20px'}>
                                Rumah Sakit St. Carolus
                            </Typography>
                            <Typography
                                fontWeight={400}
                                fontSize={'14px'}
                                color="#A8A8BD"
                                lineHeight={1.5}
                            >
                                Jl. Salemba Raya No.41, RT.3/RW.5, Paseban, Kec. Senen, Kota Jakarta
                                Pusat, Daerah Khusus Ibukota Jakarta 10440
                            </Typography>
                        </Box>

                        {/* Bagian Nomor Antrian */}
                        <Box textAlign={'center'} mb={2}>
                            <Typography fontWeight={400} fontSize={'16px'} color="#747487">
                                Nomor antrian konter
                            </Typography>
                            <Typography fontWeight={600} fontSize={'48px'} color="#6B63D1">
                                {nomorAntrian}
                            </Typography>
                        </Box>

                        {/* Bagian Footer */}
                        <Typography
                            fontWeight={400}
                            fontSize={'14px'}
                            color="#747487"
                            textAlign={'center'}
                            lineHeight={1.5}
                        >
                            Silahkan menuju konter dengan menyiapkan kartu tanda penduduk (KTP) untuk
                            melengkapi data diri Anda, terimakasih.
                        </Typography>
                    </Box>
                )}

            </Box >
        </>
    );
}

// const cardStyle = {
//     display: "flex",
//     flexDirection: "row",
//     borderRadius: "24px",
//     backgroundColor: "#F1F0FE",
//     padding: "24px",
//     gap: "16px",
//     boxShadow: "none",
//     width: "96%",
//     height: "100px",
// };

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
    // maxWidth: "80%",
    justifyContent: "space-between",
    // bgcolor: 'red',
    width: "100%",

};