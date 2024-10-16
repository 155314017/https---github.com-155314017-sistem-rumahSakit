import { Box } from "@mui/system";
// import regisImg from "../../../img/registerPasienImage.png";
import regisImg from "../../../assets/img/registerImg.jpg";
// import logo from "../../../img/St.carolus.png";
import { Button, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import CardRawatJalan from "../../../components/medium/CardRawatJalan";

export default function KategoriPasien() {
  const [pasienBaru, setPasienBaru] = useState(true);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box>
        <CardMedia
          component="img"
          sx={{
            width: "50%",
            height: "100vh",
            objectFit: "cover",
            position: "fixed",
            top: "0",
            left: "0",
          }}
          image={regisImg}
          alt="Example Image"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          right: "0",
          top: "0",
          width: "50%",
          flexDirection: "column",
          gap: 5,
          height: "100vh",
          bgcolor: "#fff",  
        }}
      >

        <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <Typography
            sx={{ fontSize: "32px", fontWeight: "600", lineHeight: "34px" }}
          >
            Pilih kategori pasien
          </Typography>
          <Typography
            sx={{ fontSize: "18px", lineHeight: "20px", color: "#A8A8BD", mb: 3 }}
          >
            Desc
          </Typography>
          {pasienBaru && (
            <>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "24px" }}
              >
                <Link
                  to="/rawatjalan/lama/bpjs"
                  style={{ textDecoration: "none" }}
                >
                  <CardRawatJalan
                    title="Pasien BPJS"
                    text="dimana sudah terdaftar dalam program BPJS, sudah memiliki kartu dan berhak mendapatkan pelayanan kesehatan"
                  />
                </Link>

                <Link
                  to="/rawatjalan/lama/umum"
                  style={{ textDecoration: "none" }}
                >
                  <CardRawatJalan
                    title="Pasien umum"
                    text="Pasien yang berobat di rumah sakit dengan membayar sendiri seluruh biaya perawatan dan pengobatan yang dibutuhkan."
                  />
                </Link>
              </Box>

              <Button
                onClick={() => setPasienBaru(false)}
                fullWidth
                sx={{
                  width: "434px",
                  height: "44px",
                  marginTop: "20px",
                  backgroundColor: "transparent",
                  color: "#8F85F3",
                  border: "1px solid",
                  borderColor: "#8F85F3",
                  ":hover": { backgroundColor: "#8F85F3", color: "white" },
                }}
              >
                Kembali ke halaman data pasien
              </Button>
            </>
          )}

          {!pasienBaru && (
            <>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "24px" }}
              >
                <Link
                  to="/rawatjalan/baru/bpjs"
                  style={{ textDecoration: "none" }}
                >
                  <CardRawatJalan
                    title="Pasien BPJS"
                    text="dimana sudah terdaftar dalam program BPJS, sudah memiliki kartu dan berhak mendapatkan pelayanan kesehatan"
                  />
                </Link>

                <Link
                  to="/rawatjalan/baru/umum"
                  style={{ textDecoration: "none" }}
                >
                  <CardRawatJalan
                    title="Pasien umum"
                    text="Pasien yang berobat di rumah sakit dengan membayar sendiri seluruh biaya perawatan dan pengobatan yang dibutuhkan."
                  />
                </Link>
              </Box>

              <Button
                onClick={() => setPasienBaru(true)}
                fullWidth
                sx={{
                  width: "434px",
                  height: "44px",
                  marginTop: "20px",
                  backgroundColor: "transparent",
                  color: "#8F85F3",
                  border: "1px solid",
                  borderColor: "#8F85F3",
                  ":hover": { backgroundColor: "#8F85F3", color: "white" },
                }}
              >
                Daftar pasien lama
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
