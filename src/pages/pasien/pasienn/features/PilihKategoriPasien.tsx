import { Box, CardMedia, IconButton, Button, CircularProgress, Typography, TextField } from "@mui/material";
import register from "../../../../assets/img/registerImg.jpg";
import bgImg from "../../../../assets/img/Bg-desktop.svg"
// import ModalKodeBooking from "../../../../components/small/modal/ModalKodeBooking";
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field } from "formik";
import { Stack } from "@mui/system";
import InformasiTicketAPI from "../../../../components/small/InformasiTicketAPI";
import 'dayjs/locale/id';
import injuryImg from "../../../../assets/img/injury-pana 1.png"
import medicineImg from "../../../../assets/img/meidicine.png"
import qrcodeImg from "../../../../assets/img/qrcode.png"
import fillingImg from "../../../../assets/img/filling.png"
import CardAntrianCounter from "../../../../components/small/card/CardAntrianCounter";
import PasienCard from "../../../../components/small/card/PasienCard";
import usePilihKategoriPasien from "../hooks/usePilihKategoriPasien";
import AlertWarning from "../../../../components/small/alert/AlertWarning";
import BreadCrumbBasic from "../../../../components/medium/BreadCrumbBasic";

export default function PilihKategoriPasien() {
    const {
        mainPages,
        setMainPages,
        inputCodePages,
        setInputCodePages,
        isLoading,
        setIsLoading,
        infoTicket,
        setInfoTicket,
        tiketAntrianKonter,
        setTiketAntrianKonter,
        noDataBooking,
        setNoDataBooking,
        dataKodeBooking,
        bookingCodeSchema,
        style,
        onSubmitKodeBooking,
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
                {inputCodePages && (
                    <Box>
                        <Box sx={{
                                                        position: 'relative',
                                                        top: -300,
                                                        left: 15,
                                                        // right: "auto",
                                                        zIndex: 1000,
                                                        padding: '16px',
                                                        width: {
                                                            xs: '90%',
                                                            sm: '84%',
                                                            md: '90%',
                                                            lg: '100%',
                                                        },
                                                        maxWidth: '760px',
                                                        
                                                        // bgcolor: 'blue'
                                    
                                                    }}>
                                                       
                                                        <BreadCrumbBasic
                                                            title="Masukkan kode booking"
                                                            description="Berfungsi untuk pasien yang sudah melakukan pendaftaran online untuk check-in nomor antrian."
                                                            onBackClick={() => window.history.back()}
                                                        />
                                                
                                    
                                                       
                                                    </Box>
                    
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
                                                    width: "100%",
                                                    height: "48px",
                                                    marginTop: "10px",
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "8px",
                                                        backgroundColor: touched.bookingCode && errors.bookingCode ? "#ffcccc" : "inherit",
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
                                                inputProps={{
                                                    style: {
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
                    </Box>
                )}
                {mainPages && (
                    <Box
                        sx={{
                            width: 'fit-content',
                            maxWidth: '904px',
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
                            <Typography id="modal-modal-description" fontWeight={600} fontSize={'24px'} lineHeight={'26px'} fontFamily={'roboto'}>
                                Pilih Kategori Pasien
                            </Typography>
                            <Typography color="#747487" fontWeight={400} fontSize={'18px'} maxWidth={'85%'} lineHeight={'20px'} fontFamily={'roboto'}>
                                Membantu tenaga medis dalam memberikan perawatan yang lebih terorganisir, sesuai dengan tingkat kebutuhan pasien.
                            </Typography>
                        </Box>

                        <Stack direction="column" width={'100%'} spacing={0}>
                            {/* Kode Booking */}
                            <PasienCard
                                avatarSrc={qrcodeImg}
                                description="Berfungsi untuk pasien yang sudah melakukan pendaftaran online untuk check-in nomor antrian."
                                title="Masukkan Kode Booking"
                                bgColor="#F1F0FE"
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
                                bgColor="#F1F0FE"
                            />

                            {/* Pasien Umum */}
                            <PasienCard
                                href="/tambahPasien/umum/offline"
                                avatarSrc={injuryImg}
                                title="Pasien Asuransi"
                                description="Pasien yang berobat di rumah sakit dengan biaya yang di cover oleh pihak asuransi."
                                bgColor="#F1F0FE"
                            />

                            {/* Pasien BPJS */}
                            <PasienCard
                                avatarSrc={medicineImg}
                                title="Pasien non BPJS kesehatan"
                                description="Pasien yang berobat di rumah sakit dengan biaya yang di cover oleh pemerintah."
                                bgColor="#F1F0FE"
                            />


                        </Stack>
                    </Box>
                )}

                <Box>
                    {infoTicket && (
                        <InformasiTicketAPI
                            clinic={dataKodeBooking?.namaKlinik}
                            jadwalKonsul={dataKodeBooking?.jadwalKonsul}
                            namaDokter={dataKodeBooking?.namaDokter}
                            tanggalReservasi={dataKodeBooking?.tanggalReserve}
                            nomorAntrian={queueData?.queueNumber || 0}
                            offline={true}
                            onClose={() => {
                                console.log("Tombol close ditekan");
                                setInfoTicket(false);
                                setMainPages(true);
                            }}
                        />



                    )}
                </Box>

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