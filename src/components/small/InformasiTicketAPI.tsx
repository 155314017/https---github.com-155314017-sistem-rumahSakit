import { useRef, useState } from "react";
import { Button, CardMedia, IconButton, Typography, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import my from "../../assets/img/String.png";
import logo from "../../assets/img/St.carolus.png";
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

type InformasiTicketProps = {
  nomorAntrian: any | undefined;
  namaDokter: string | undefined;
  clinic: string | undefined;
  tanggalReservasi: string | undefined;
  jadwalKonsul: string | null | undefined;
  bookingCode: string;
  bgcolor?: string;
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
}: InformasiTicketProps) => {

  // Untuk menyembunyikan/menampilkan tombol
  const [showButton, setShowButton] = useState(true);

  const ticketRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [resendSuccess, setResendSuccess] = useState(false);

  const downloadTicketAsPDF = async () => {
    if (!ticketRef.current) return;

    try {
      // Sembunyikan tombol sebelum screenshot
      setShowButton(false);

      // Atur properti scale agar hasil lebih tajam
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2, // Coba ubah ke 2 atau 3 sesuai kebutuhan
        useCORS: true, // Pastikan gambar bisa diakses (jika cross-origin)
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      // Proporsi tinggi disesuaikan dengan lebar PDF
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      pdf.save(`ticket-${nomorAntrian || "antrian"}.pdf`);
    } catch (error) {
      console.error("Gagal mengunduh PDF: ", error);
    } finally {
      // Tampilkan tombol kembali
      setShowButton(true);
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

  return (
    <Box width={"100%"}>
    <Box 
                            bgcolor={'white'}
                            maxWidth={506}
                            maxHeight={'fit-content'}
                            borderRadius={'32px'}
                            padding={'24px'}
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
      width={"506px"}
      borderRadius={"32px"}
      bgcolor={bgcolor}
      position={"relative"}
      padding={"25px"}
      // Pastikan overflow tampak rapi
      sx={{ overflow: "hidden" }}
    >
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
      <Box display={"flex"} flexDirection={"column"} gap={"17px"} marginLeft={"4%"}>
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
          <Typography fontSize={"16px"}>Nomor antrian</Typography>
          <Typography fontSize={"48px"} fontWeight={"600"}>
            {nomorAntrian}
          </Typography>
          {bookingCode !== "" && (
            <>
              <Typography fontSize={"16px"}>Booking Code</Typography>
              <Typography fontSize={"48px"} fontWeight={"600"}>
                {bookingCode}
              </Typography>
            </>
          )}
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={"60px"}
          justifyContent={"space-between"}
          maxWidth={"80%"}
        >
          <Box>
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
            gap={"80px"}
            justifyContent={"space-between"}
            maxWidth={"80%"}
          >
            <Box display={"flex"} flexDirection={"column"}>
              <Typography>Tanggal reservasi</Typography>
              <Typography fontSize={"18px"} fontWeight={"600"} lineHeight={"20px"}>
                {tanggalReservasi}
              </Typography>
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography>Jadwal konsultasi</Typography>
              <Typography fontSize={"18px"} fontWeight={"600"} lineHeight={"20px"}>
                {jadwalKonsul}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box
            display={"flex"}
            flexDirection={"row"}
            gap={"80px"}
            justifyContent={"space-between"}
            width={"80%"}
          >
            <Box display={"flex"} flexDirection={"column"}>
              <Typography>Tanggal reservasi</Typography>
              <Typography fontSize={"18px"} fontWeight={"600"} lineHeight={"20px"}>
                {tanggalReservasi}
              </Typography>
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography>Jadwal konsultasi</Typography>
              <Typography fontSize={"18px"} fontWeight={"600"} lineHeight={"20px"}>
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
          >
            Unduh tiket 2.0
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
                  textDecoration: isCounting ? 'none' : 'underline',
                  fontSize: '16px',
                  }}
                  >
                  {loading ? <CircularProgress size={18} sx={{ color: '#8F85F3' }} /> :
                  (isCounting ? `${formatTime()}` : 'Kirim ulang')
                  }
                  </Typography>
                  <Typography color={"#8F85F3"} fontSize={"16px"} fontWeight={400} alignItems="right">Ubah</Typography>
                </Box>
      </Box>
    </Box>
    </Box>
  );
};

export default InformasiTicketAPI;
