import { Box, CardMedia, IconButton, Button, CircularProgress, Typography, TextField } from "@mui/material";
import register from "../../../../assets/img/registerImg.jpg";
import bgImg from "../../../../assets/img/Bg-desktop.svg"
// import ModalKodeBooking from "../../../../components/small/modal/ModalKodeBooking";
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field } from "formik";
import { Stack } from "@mui/system";
import InformasiTicketAPI from "../../../../components/small/InformasiTicketAPI";
import 'dayjs/locale/id';
import medicineImg from "../../../../assets/img/meidicine.png"
import qrcodeImg from "../../../../assets/img/qrcode.png"
import fillingImg from "../../../../assets/img/filling.png"
import CardAntrianCounter from "../../../../components/small/card/CardAntrianCounter";
import PasienCard from "../../../../components/small/card/PasienCard";
import usePilihKategoriPasien from "../hooks/usePilihKategoriPasien";
import AlertWarning from "../../../../components/small/alert/AlertWarning";

export default function PilihKategoriPasien() {
    const {
        // setOpenModalKodeBooking,
        // openModalKodeBooking,
        // openModalPilihPembayaran,
        // setOpenModalPilihPembayaran,
        mainPages,
        setMainPages,
        inputCodePages,
        setInputCodePages,
        isLoading,
        setIsLoading,
        infoTicket,
        setInfoTicket,
        nomorAntrian,
        tiketAntrianKonter,
        setTiketAntrianKonter,
        noDataBooking,
        setNoDataBooking,
        dataKodeBooking,
        // handleBack,
        // pasienBaru,
        bookingCodeSchema,
        style,
        onSubmitKodeBooking,
        needAdmin,
        queueData,
        tanggalReservasi
    } = usePilihKategoriPasien();

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
                    height: "auto",
                    minHeight: "100vh",
                    backgroundImage: `url(${bgImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            >
                {noDataBooking && <AlertWarning teks="Kode booking tidak terdaftar" />}
                {/* Halaman Utama */}
                {/* {mainPages && (
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
                                    height: 'fit-content',
                                    borderRadius: '24px',
                                    gap: '4px',
                                    padding: '24px',
                                    my: '2%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: 2,
                                }}
                            >
                                <Typography id="modal-modal-description" fontWeight={600} fontSize={'24px'} lineHeight={'26px'}>
                                    Pilih Kategori Pasien
                                </Typography>
                                <Typography color="#747487" fontWeight={400} fontSize={'18px'} maxWidth={'85%'}>
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
                )} */}

                {/* Halaman Input Kode Booking */}
                {inputCodePages && (
                    <Box sx={{ ...style }}>

                        <IconButton
                            onClick={() => {
                                setInputCodePages(false);
                                setMainPages(true);
                                setNoDataBooking(false);
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
                                await onSubmitKodeBooking(values.bookingCode);
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
                                                    '&:focus-within .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#8F85F3',
                                                    },
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
                                            disabled={!isValid || !dirty}
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
                {mainPages && (
                    <Box
                        sx={{
                            width: 'fit-content',
                            height: 'fit-content',
                        }}
                    >
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
                        <Box
                            sx={{
                                bgcolor: '#ffffff',
                                width: '96%',
                                height: 'fit-content',
                                borderRadius: '24px',
                                gap: '4px',
                                padding: '24px',
                                my: '2%',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: 2

                            }}
                        >
                            {/* <Typography id="modal-modal-title" fontWeight={600} fontSize={'24px'} lineHeight={'26px'}>
                                Pilih metode pembayaran
                            </Typography>
                            <Typography color="#747487" fontWeight={400} fontSize={'18px'}>
                                Cara yang digunakan untuk menyelesaikan transaksi.
                            </Typography> */}
                             <Typography id="modal-modal-description" fontWeight={600} fontSize={'24px'} lineHeight={'26px'}>
                                    Pilih Kategori Pasien
                                </Typography>
                                <Typography color="#747487" fontWeight={400} fontSize={'18px'} maxWidth={'85%'}>
                                    Membantu tenaga medis dalam memberikan perawatan yang lebih terorganisir, sesuai dengan tingkat kebutuhan pasien.
                                </Typography>
                        </Box>

                        <Stack direction="column" width={'100%'} spacing={0}>
                            {/* Kode Booking */}
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

                            
                            {/* Pasien Umum */}
                            <PasienCard
                                href="/tambahPasien/umum/offline"
                                avatarSrc={fillingImg}
                                title="Pasien Umum"
                                description="Pasien yang berobat di rumah sakit dengan membayar sendiri seluruh biaya perawatan dan pengobatan yang dibutuhkan."
                                bgColor="#D5D1FB"
                            />

                            {/* Pasien Umum */}
                            <PasienCard
                                href="/tambahPasien/umum/offline"
                                avatarSrc={fillingImg}
                                title="Pasien Asuransi"
                                description="Pasien yang berobat di rumah sakit dengan membayar sendiri seluruh biaya perawatan dan pengobatan yang dibutuhkan."
                                bgColor="#D5D1FB"
                            />

                            {/* Pasien BPJS */}
                            <PasienCard
                                avatarSrc={medicineImg}
                                title="Pasien non BPJS kesehatan"
                                description="Pasien yang berobat di rumah sakit dengan membayar sendiri seluruh biaya perawatan dan pengobatan yang dibutuhkan."
                                bgColor="#D5D1FB"
                            />

                            
                        </Stack>
                        {/* <Button
                            sx={{
                                padding: "10px 20px",
                                backgroundColor: "#8F85F3",
                                color: "white",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: 600,
                                mt: '2%',
                                mb: '2%',
                                boxShadow: 2,
                                width: "100%",
                                border: '1px solid #8F85F3',
                                ":hover": { backgroundColor: 'inherit', color: '#8F85F3' }
                            }}
                            onClick={handleBack}
                        >
                            Kembali ke pilihan sebelumnya
                        </Button> */}
                    </Box>
                )}


                {infoTicket && (
                    <InformasiTicketAPI
                        clinic={dataKodeBooking?.namaKlinik}
                        jadwalKonsul={dataKodeBooking?.jadwalKonsul}
                        namaDokter={dataKodeBooking?.namaDokter}
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
                        nomorAntrian={queueData?.queueNumber || 0}
                        tanggalReservasi={tanggalReservasi || ""}
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