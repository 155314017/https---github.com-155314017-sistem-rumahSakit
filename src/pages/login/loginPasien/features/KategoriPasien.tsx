import { Box } from "@mui/system";
import regisImg from "../../../../assets/img/registerImg.jpg";
import { Button, CardMedia, Typography } from "@mui/material";
import CardRawatJalan from "../../../../components/small/card/CardRawatJalan";

//hooks
import useKategoriPasien from "../hooks/useKategoriPasien";

export default function KategoriPasien() {
  const {
    pasienBaru,
    setPasienBaru,
    navigate,
    patient
  } = useKategoriPasien();

  return (
    <>
      <style>
        {`
            :root {
            background-color: #ffff
            }
            `}
      </style>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box position={'absolute'} >
          <Box sx={{ position: "relative" }}>
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

          {/* overlay */}
          <Box
            sx={{
              position: "fixed",
              bgcolor: "rgba(0, 0, 0, 0.5)",
              width: "50%",
              height: "100vh",
              top: "0",
              left: "0",
            }}
          ></Box>
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


          <Box sx={{ display: "flex", flexDirection: "column", gap: "14px", width: '80%' }}>
            <Typography
              sx={{ fontSize: "32px", fontWeight: "600", lineHeight: "34px" }}
            >
              Pilih kategori pasien
            </Typography>
            <Typography
              sx={{ fontSize: "18px", lineHeight: "20px", color: "#A8A8BD", mb: 3 }}
            >
              Membantu tenaga medis dalam memberikan perawatan yang lebih terorganisir, sesuai dengan tingkat kebutuhan pasien.
            </Typography>
            {pasienBaru && (
              <>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "24px" }}
                >
                  <CardRawatJalan
                    onClick={() => navigate("/rawatjalan/bpjs")}
                    title="Pasien BPJS"
                    text="dimana sudah terdaftar dalam program BPJS, sudah memiliki kartu dan berhak mendapatkan pelayanan kesehatan"
                  />
                  <CardRawatJalan
                    onClick={() => navigate("/rawatjalan/umum", { state: { succesSendData: true, data: patient } })}
                    title="Pasien umum"
                    text="Pasien yang berobat di rumah sakit dengan membayar sendiri seluruh biaya perawatan dan pengobatan yang dibutuhkan."
                  />
                </Box>

                <Button
                  onClick={() => navigate('/register/pasien')}
                  fullWidth
                  sx={{
                    width: "100%",
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
                  <CardRawatJalan
                    onClick={() => navigate("/rawatjalan/bpjs")}
                    title="Pasien BPJS"
                    text="dimana sudah terdaftar dalam program BPJS, sudah memiliki kartu dan berhak mendapatkan pelayanan kesehatan"
                  />
                  <CardRawatJalan
                    onClick={() => navigate("/rawatjalan/umum", { state: { succesSendData: true, data: patient } })}
                    title="Pasien umum"
                    text="Pasien yang berobat di rumah sakit dengan membayar sendiri seluruh biaya perawatan dan pengobatan yang dibutuhkan."
                  />
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
    </>
  );
}
