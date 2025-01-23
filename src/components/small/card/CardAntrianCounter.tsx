import type { FC } from "react";
import { Box, Typography, IconButton, Button, Alert, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import html2canvas from "html2canvas";
import { useState } from "react";
import PrintIcon from "@mui/icons-material/Print";

interface CardAntrianCounterProps {
  nomorAntrian: string | number;
  tanggalReservasi: string;
  onClose: () => void;
}

const CardAntrianCounter: FC<CardAntrianCounterProps> = ({ nomorAntrian,tanggalReservasi, onClose }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleDownload = async () => {
    const element = document.getElementById("card-antrian-counter");
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement("a");
      link.download = "nomor-antrian.jpg";
      link.href = canvas.toDataURL();
      link.click();

      // Show alert after download
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <Box>
      <Snackbar
        open={showAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center"  }}
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
                            marginBottom={'44px'}
                            
                            >
                                <Typography fontWeight={600} fontSize={24} color="#0A0A0D">
                                Tiket antrian poli
                                </Typography>
                                <Typography fontWeight={400} fontSize={18} color="#747487">
                                Berikut adalah tiket antrian poli Anda, Silahkan unduh tiket dengan mengklik tombol unduh dibawah.
                                </Typography>
                            </Box>

      <Box
        id="card-antrian-counter"
        bgcolor={"white"}
        maxWidth={606}
        maxHeight={"fit-content"}
        borderRadius={"32px"}
        padding={"32px"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"start"}
        gap={2}
        position={"relative"}
        boxShadow={"0px 4px 10px rgba(0, 0, 0, 0.1)"}
      >
        {/* Tombol Close */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#A8A8BD",
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Header */}
        <Box textAlign={"start"} mb={2}>
          <Typography fontWeight={600} fontSize={"20px"}>
            Rumah Sakit St. Carolus
          </Typography>
          <Typography
            fontWeight={400}
            fontSize={"16px"}
            color="#A8A8BD"
            lineHeight={1.5}
          >
            Jl. Salemba Raya No.41, RT.3/RW.5, Paseban, Kec. Senen, Kota Jakarta
            Pusat, Daerah Khusus Ibukota Jakarta 10440
          </Typography>
        </Box>

        {/* Nomor Antrian */}
        <Box textAlign={"start"} mb={2}>
          <Typography fontWeight={400} fontSize={"16px"} color="#747487">
            Nomor antrian konter
          </Typography>
          <Typography fontWeight={600} fontSize={"48px"} color="#0A0A0D">
            {nomorAntrian}
          </Typography>
        </Box>

        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
          gap={"24px"}
          right={"24px"}
          left={"24px"}
        >
          <Box textAlign={"start"} mb={2}>
            <Typography fontWeight={400} fontSize={"16px"} color="#747487">
              Tanggal reservasi
            </Typography>
            <Typography fontWeight={600} fontSize={"18px"} color="#0A0A0D">
              {tanggalReservasi}
            </Typography>
          </Box>
          <Box textAlign={"start"} mb={2}>
            <Typography fontWeight={400} fontSize={"16px"} color="#747487">
              Tipe
            </Typography>
            <Typography fontWeight={600} fontSize={"18px"} color="#0A0A0D">
              Perubahan data diri
            </Typography>
          </Box>
        </Box>

        {/* Footer */}
        <Typography
          fontWeight={400}
          fontSize={"16px"}
          color="#747487"
          textAlign={"start"}
          lineHeight={1.5}
        >
          Silahkan menuju konter dengan menyiapkan kartu tanda penduduk (KTP)
          untuk melengkapi data diri Anda, terimakasih.
        </Typography>

        {/* Tombol Aksi */}
        <Box display="flex" gap={2} mt={2} flexDirection={"column"} width={"100%"}>
          <Button
            onClick={handleDownload}
            startIcon={<PrintIcon />}
            sx={{
              padding: "10px 20px",
              backgroundColor: "#8F85F3",
              color: "white",
              borderRadius: "8px",
              fontWeight: 600,
              width: "100%",
              border: "1px solid #8F85F3",
              ":hover": {
                bgcolor: "transparent",
                color: "#8F85F3",
              },
            }}
          >
            Cetak tiket
          </Button>
          <Button
            variant="outlined"
            
            onClick={onClose}
            sx={{
              padding: "10px 20px",
              backgroundColor: "transparent",
              color: "#8F85F3",
              borderRadius: "8px",
              fontWeight: 600,
              width: "100%",
              border: "1px solid #8F85F3",
              ":hover": {
                bgcolor: "#8F85F3",
                color: "white",
              },
            }}
          >
            
            Kembali ke halaman utama
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CardAntrianCounter;
