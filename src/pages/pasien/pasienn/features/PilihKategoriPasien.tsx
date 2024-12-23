import { Box, CardMedia, IconButton, Button, CircularProgress, Typography, TextField } from "@mui/material";
import register from "../../../../assets/img/registerImg.jpg";
import bgImg from "../../../../assets/img/Bg-desktop.svg"
import ModalKodeBooking from "../../../../components/small/ModalKodeBooking";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Stack } from "@mui/system";
import InformasiTicketAPI from "../../../../components/small/InformasiTicketAPI";
import GenerateQueuePatientServices from "../../../../services/Patient Tenant/GenerateQueuePatientServices";
import { GetDoctorServices } from "../../../../services/Admin Tenant/ManageDoctor/GetDoctorService";
import { getClinic } from "../../../../services/Admin Tenant/ManageClinic/GetClinic";
import dayjs from "dayjs";
import 'dayjs/locale/id';
import medicineImg from "../../../../img/meidicine.png"
import qrcodeImg from "../../../../img/qrcode.png"
import fillingImg from "../../../../img/filling.png"
import CardAntrianCounter from "../../../../components/small/CardAntrianCounter";
import PasienCard from "../../../../components/small/PasienCard";

const formatDate = (timestamp: number) => dayjs.unix(timestamp).locale('id').format('DD MMMM YYYY');
const formatTime = (timestamp: number) => dayjs.unix(timestamp).format('HH:mm');

type bookingCodeData = {
    nomorAntrian: string,
    namaDokter: string,
    namaKlinik: string,
    tanggalReserve: string,
    jadwalKonsul: string,
}

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
    const [dataKodeBooking, setDataKodeBooking] = useState<bookingCodeData>()

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
                                <PasienCard
                                    avatarSrc={medicineImg}
                                    description="Dimana sudah terdaftar dalam program BPJS, sudah memiliki kartu, dan berhak mendapatkan pelayanan kesehatan."
                                    title="Pasien Lama"
                                    bgColor="#D5D1FB"
                                    onClick={
                                        () => {
                                            setOpenModalPilihPembayaran(true);
                                            setMainPages(false);
                                        }
                                    }
                                />

                                <PasienCard
                                    avatarSrc={fillingImg}
                                    description="Dimana sudah terdaftar dalam program BPJS, sudah memiliki kartu, dan berhak mendapatkan pelayanan kesehatan."
                                    title="Pasien Baru"
                                    bgColor="#D5D1FB"
                                    onClick={
                                        pasienBaru
                                    }
                                />
                                <PasienCard
                                    avatarSrc={qrcodeImg}
                                    description=" Berfungsi untuk pasien yang sudah melakukan pendaftaran online untuk check-in nomor antrian."
                                    title="Masukkan Kode Booking"
                                    bgColor="#D5D1FB"
                                    onClick={
                                        () => {
                                            setInputCodePages(true);
                                            setMainPages(false);
                                        }
                                    }
                                />
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
                                    console.log("response: ", response.data.data.registrationDatum.scheduleDatum.startDateTime)

                                    const dateTime = formatDate(response.data.data.registrationDatum.scheduleDatum.startDateTime);
                                    const startTime = formatTime(response.data.data.registrationDatum.scheduleDatum.startDateTime);
                                    const endTime = formatTime(response.data.data.registrationDatum.scheduleDatum.endDateTime);
                                    const consultationSchedule = dateTime + ' ' + startTime + ' - ' + endTime
                                    const namaDokter = await GetDoctorServices(response.data.data.registrationDatum.doctorDataId)
                                    const namaKlinik = await getClinic(response.data.data.registrationDatum.masterClinicId)
                                    const dateReserve = dayjs(response.data.data.createdDateTime * 1000).format('YYYY-MM-DD HH:mm');
                                    const dataBooking = {
                                        nomorAntrian: response.data.data.queueNumber,
                                        namaDokter: namaDokter.name,
                                        namaKlinik: namaKlinik.name,
                                        tanggalReserve: dateReserve,
                                        jadwalKonsul: consultationSchedule,
                                    }
                                    setDataKodeBooking(dataBooking)
                                    setOpenModalKodeBooking(false);
                                    setInfoTicket(true);
                                    setIsLoading(false);
                                    setInputCodePages(false);
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

                            <PasienCard
                                href="/tambahPasien/umum/offline"
                                avatarSrc={fillingImg}
                                title="Pasien Umum/Asuransi"
                                description="Pasien yang berobat di rumah sakit dengan membayar sendiri seluruh biaya perawatan dan pengobatan yang dibutuhkan."
                                bgColor="#D5D1FB"
                            />

                            {/* Pasien Umum */}
                            <PasienCard
                                avatarSrc={medicineImg}
                                title="Pasien non BPJS kesehatan"
                                description="Pasien yang berobat di rumah sakit dengan membayar sendiri seluruh biaya perawatan dan pengobatan yang dibutuhkan."
                                bgColor="#D5D1FB"
                            />
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
                        clinic={dataKodeBooking?.namaKlinik}
                        jadwalKonsul={dataKodeBooking?.jadwalKonsul}
                        namaDokter={dataKodeBooking?.namaDokter}
                        nomorAntrian={dataKodeBooking?.nomorAntrian}
                        tanggalReservasi={dataKodeBooking?.tanggalReserve}
                        bookingCode=""
                        onClose={() => {
                            console.log("Tombol close ditekan");
                            setInfoTicket(false);
                            setMainPages(true);
                        }}
                    />


                )}

                {tiketAntrianKonter && (
                    <CardAntrianCounter
                        nomorAntrian={nomorAntrian}
                        onClose={() => {
                            setInputCodePages(false);
                            setMainPages(true);
                            setTiketAntrianKonter(false);
                        }
                        }
                    />
                )}

            </Box >
        </>
    );
}