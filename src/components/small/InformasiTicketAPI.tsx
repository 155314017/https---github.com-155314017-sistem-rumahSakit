/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from "react";
import { Button, CardMedia, IconButton, Typography, CircularProgress, Snackbar, Alert } from "@mui/material";
import { Box } from "@mui/system";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import my from "../../assets/img/String.png";
import logo from "../../assets/img/St.carolus.png";
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PrintIcon from "@mui/icons-material/Print";
import ModalUbahNoHp from "./modal/ModalUbahNoHp";
import AlertSuccess from "./alert/AlertSuccess";
type InformasiTicketProps = {
  nomorAntrian?: string | undefined;
  namaDokter: string | undefined;
  clinic: string | undefined;
  tanggalReservasi: string | undefined;
  jadwalKonsul: string | null | undefined;
  bookingCode?: string;
  bgcolor?: string;
  patienDataSent?: any;
  registrationId?: string;
  offline?: boolean
  onClose?: () => void;
};

const InformasiTicketAPI = ({
  nomorAntrian,
  namaDokter,
  clinic,
  tanggalReservasi,
  jadwalKonsul,
  bookingCode,
  bgcolor = "#ffffff",
  onClose,
  patienDataSent,
  registrationId,
  offline
}: InformasiTicketProps) => {

  const [showButton, setShowButton] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertDownloaded, setAlertDownloaded] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [patientData, setPatientData] = useState<any>({});
  const [successChangePhone, setSuccessChangePhone] = useState(false);


  const showTemporaryAlertSuccessChangePhone = async () => {
    setSuccessChangePhone(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setSuccessChangePhone(false)
  }

  useEffect(() => {
    if (patienDataSent) {
      setPatientData(patienDataSent);
      console.log(nomorAntrian)
      console.log('data: ', patienDataSent);
    }
  }, [patientData]);

  const downloadTicketAsPDF = async () => {
    if (!ticketRef.current) return;

    try {
      setShowButton(false);

      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      pdf.save(`ticket antrian}.pdf`);
    } catch (error) {
      console.error("Gagal mengunduh PDF: ", error);
    } finally {
      setShowButton(true);
      showTemporaryAlertSuccessDownload();
    }
  };
  const showTemporaryAlertSuccess = async () => {
    setResendSuccess(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setResendSuccess(false);
  };

  const handleResendClick = async () => {
    setLoading(true);
    try {
      showTemporaryAlertSuccess();
      setLoading(false);
    } catch {
      setLoading(false);
      alert("Terjadi kesalahan saat mengirim ulang kode. Silakan coba lagi.");
    }
    setIsCounting(true);
    setSecondsLeft(60);
    setLoading(false);
  };
  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isCounting && secondsLeft > 0) {
      const timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    if (secondsLeft === 0) {
      setIsCounting(false);
    }
  }, [isCounting, secondsLeft]);

  const handleEditClick = () => {
    setShowModal(true);
  }

  const showTemporaryAlertSuccessDownload = async () => {
    setAlertDownloaded(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setAlertDownloaded(false)
  }

  return (
    <Box width={"100%"} >
      {alertDownloaded && <AlertSuccess label="Tiket antrian berhasil di unduh" />}
      {successChangePhone && <AlertSuccess label="No handphone dan tiket berhasil dikirim dan di ganti." />}
      <Snackbar
        open={showAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity="success"
          sx={{
            backgroundColor: "#DFF4DC",
            color: "#4CAF50",
            border: "1px solid #4CAF50",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            zIndex: 1500,
          }}
        >
          Tiket antrian konter berhasil di cetak
        </Alert>
      </Snackbar>

      <Snackbar
        open={resendSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={() => setResendSuccess(false)}
      >
        <Alert
          onClose={() => setResendSuccess(false)}
          severity="success"
          sx={{
            backgroundColor: "#DFF4DC",
            color: "#4CAF50",
            border: "1px solid #4CAF50",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            zIndex: 1500,
          }}
        >
          Tiket antrian konter berhasil di cetak
        </Alert>
      </Snackbar>

      <Box
        bgcolor={'white'}
        maxWidth={626}
        maxHeight={'fit-content'}
        borderRadius={'32px'}
        padding={'22px'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
        alignItems={'start'}
        gap={2}
        position={'relative'}
        boxShadow={'0px 4px 10px rgba(0, 0, 0, 0.1)'}
        marginBottom={'24px'}

      >
        <Typography fontWeight={600} fontSize={24} color="#0A0A0D">
          Tiket antrian poli
        </Typography>
        <Typography fontWeight={400} fontSize={18} color="#747487">
          Berikut adalah tiket antrian poli Anda, Silahkan unduh tiket dengan mengklik tombol unduh dibawah.
        </Typography>
      </Box>
      <Box
        ref={ticketRef}
        width={"606px"}
        borderRadius={"32px"}
        bgcolor={bgcolor}
        position={"relative"}
        padding={"25px"}
        sx={{ overflow: "hidden", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", }}
      >
        {showModal && (
          <ModalUbahNoHp hitFunction={showTemporaryAlertSuccessChangePhone} open={showModal} onClose={() => setShowModal(false)} patienDataSent={patientData} registrationId={registrationId} />
        )}
        {onClose && (
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#A8A8BD",
              zIndex: 10,
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
        <CardMedia
          component="img"
          height="162px"
          sx={{
            width: "200px",
            position: "absolute",
            left: "63%",
            zIndex: 1,
            top: "1%",
          }}
          image={my}
          alt="Example Image"
        />
        <Box display={"flex"} flexDirection={"column"} gap={"17px"} marginLeft={"4%"}  >
          <CardMedia
            component="img"
            height="52"
            sx={{ width: "112px", objectFit: "cover" }}
            image={logo}
            alt="Example Logo"
          />
          <Typography color="#0A0A0D" fontSize={"20px"} fontWeight={"600"}>
            Rumah sakit St. Carolus
          </Typography>
          <Typography color="#A8A8BD" fontSize={"16px"}>
            Jl. Salemba Raya No.41, RT.3/RW.5, Paseban, Kec. Senen, Kota Jakarta
            Pusat, Daerah Khusus Ibukota Jakarta 10440
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #c5a8ff",
              borderRadius: "8px",
              backgroundColor: "#f5f0ff",
              padding: "8px 16px",
              color: "#7b49c4",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            <InfoOutlinedIcon sx={{ marginRight: "8px" }} />
            <Typography>
              Harap datang 15 menit sebelum jadwal konsultasi
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            {bookingCode !== "" && (
              <>
                <Typography fontSize={"16px"}>{nomorAntrian ? "Nomor antrian" : "Booking Code"}</Typography>
                <Typography fontSize={"48px"} fontWeight={"600"}>
                  {nomorAntrian ? nomorAntrian : bookingCode}
                </Typography>
              </>
            )}
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            gap={"80px"}
            justifyContent={"space-between"}
            maxWidth={"87%"}
          // bgcolor={'red'}
          >
            <Box  >
              <Typography>Dokter yang bertugas</Typography>
              <Typography fontSize={"18px"} fontWeight={"600"} lineHeight={"20px"}>
                {namaDokter}
              </Typography>
            </Box>
            <Box>
              <Typography>Poli yang dituju</Typography>
              <Typography fontSize={"18px"} fontWeight={"600"} lineHeight={"20px"}>
                {clinic}
              </Typography>
            </Box>
          </Box>
          {bookingCode !== "" ? (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              maxWidth={"100%"}
            // bgcolor={'red'}
            >
              <Box display={"flex"} flexDirection={"column"}>
                <Typography>Tanggal reservasi</Typography>
                <Typography maxWidth={"90%"} fontSize={"18px"} fontWeight={"600"} lineHeight={"20px"}>
                  {tanggalReservasi}
                </Typography>
              </Box>
              <Box display={"flex"} flexDirection={"column"}>
                <Typography>Jadwal konsultasi</Typography>
                <Typography maxWidth={"60%"} fontSize={"18px"} fontWeight={"600"} lineHeight={"20px"}>
                  {jadwalKonsul}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              maxWidth={"100%"}
            // bgcolor={'red'}
            >
              <Box display={"flex"} flexDirection={"column"}>
                <Typography>Tanggal reservasi</Typography>
                <Typography maxWidth={"90%"} fontSize={"18px"} fontWeight={"600"} lineHeight={"20px"}>
                  {tanggalReservasi}
                </Typography>
              </Box>
              <Box display={"flex"} flexDirection={"column"}>
                <Typography>Jadwal konsultasi</Typography>
                <Typography maxWidth={"60%"} fontSize={"18px"} fontWeight={"600"} lineHeight={"20px"}>
                  {jadwalKonsul}
                </Typography>
              </Box>
            </Box>
          )}
          {showButton && (
            <Button
              fullWidth
              sx={{
                width: "100%",
                height: "48px",
                marginTop: "20px",
                backgroundColor: "#8F85F3",
                color: "white",
                border: "1px solid",
                borderColor: "#8F85F3",
                borderRadius: "8px",
              }}
              onClick={downloadTicketAsPDF}
              startIcon={<PrintIcon />}
            >
              Cetak tiket
            </Button>




          )}
          <Button variant="outlined" onClick={onClose}
            sx={{
              padding: "10px 20px",
              backgroundColor: "transparent",
              color: "#8F85F3",
              borderRadius: "8px",
              fontWeight: 600,
              width: "100%",
              border: '1px solid #8F85F3',
              ':hover': {
                bgcolor: '#8F85F3',
                color: 'white',
              }

            }}
          >
            Kembali ke halaman utama
          </Button>
          {!offline && (
            <Box
            display={"flex"}
            flexDirection={"row"}
            gap={"5px"}
            justifyContent={"space-between"}
            width={"95%"}
            
          >
            <Typography color={"#A8A8BD"} fontSize={"16px"} fontWeight={400}>Tidak mendapatkan tiket booking?</Typography>
            <Typography
              onClick={!isCounting ? handleResendClick : undefined}
              sx={{
                cursor: isCounting ? 'default' : 'pointer',
                color: isCounting ? '#ccc' : '#8F85F3',
                textDecoration: 'none',
                fontSize: '16px',
              }}
            >
              {loading ? <CircularProgress size={18} sx={{ color: '#8F85F3' }} /> :
                (isCounting ? `${formatTime()}` : 'Kirim ulang')
              }
            </Typography>
            <Typography sx={{ cursor: 'pointer' }} color={"#8F85F3"} fontSize={"16px"} fontWeight={400} alignItems="right" onClick={handleEditClick}>Ubah</Typography>
          </Box>
            
          )}
          
        </Box>
      </Box>
    </Box>
  );
};

export default InformasiTicketAPI;
