import { useRef, useState } from "react";
import { Button, CardMedia, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import my from "../../assets/img/String.png";
import logo from "../../assets/img/St.carolus.png";
import CloseIcon from '@mui/icons-material/Close';

type InformasiTicketProps = {
  namaDokter: string | undefined;
  clinic: string | undefined;
  tanggalReservasi: string | undefined;
  jadwalKonsul: string | null | undefined;
  bookingCode: string;
  bgcolor?: string;
  onClose?: () => void;
};

const InformasiTicketAPI = ({
  namaDokter,
  clinic,
  tanggalReservasi,
  jadwalKonsul,
  bookingCode,
  bgcolor = "#ffffff",
  onClose,
}: InformasiTicketProps) => {

  const [showButton, setShowButton] = useState(true);

  const ticketRef = useRef<HTMLDivElement>(null);

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
    }
  };

  return (
    <Box
      ref={ticketRef}
      width={"506px"}
      borderRadius={"32px"}
      bgcolor={bgcolor}
      position={"relative"}
      padding={"25px"}
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
        <Box display={"flex"} flexDirection={"column"}>
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
          maxWidth={"75%"}
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
            width={"103%"}
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
      </Box>
    </Box>
  );
};

export default InformasiTicketAPI;
