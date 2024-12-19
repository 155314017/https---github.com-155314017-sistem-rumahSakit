import { Box } from "@mui/system";
// import regisImg from "../../../img/registerPasienImage.png";
import regisImg from "../../../../assets/img/registerImg.jpg";
// import logo from "../../../img/St.carolus.png";
import { Button, CardMedia, Typography } from "@mui/material";

import CardRawatJalan from "../../../../components/medium/CardRawatJalan";

//hooks
import useKategoriPasien from "../hooks/useKategoriPasien";

export default function KategoriPasien() {
  const {
    pasienBaru,
    setPasienBaru,
    navigate,
    patientId,
    notFound,
    show
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
        {show && (
          
        
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
                  {/* <Link
                    to="/rawatjalan/bpjs"
                    style={{ textDecoration: "none" }}
                  > */}
                  <CardRawatJalan
                    onClick={() => navigate("/rawatjalan/bpjs")}
                    title="Pasien BPJS"
                    text="dimana sudah terdaftar dalam program BPJS, sudah memiliki kartu dan berhak mendapatkan pelayanan kesehatan"
                  />
                  {/* </Link> */}

                  {/* <Link
                    to="/rawatjalan/umum"
                    style={{ textDecoration: "none" }}
                  > */}
                  <CardRawatJalan
                    onClick={() => navigate("/rawatjalan/umum", { state: { succesSendData: true, data: patientId } })}
                    title="Pasien umum"
                    text="Pasien yang berobat di rumah sakit dengan membayar sendiri seluruh biaya perawatan dan pengobatan yang dibutuhkan."
                  />
                  {/* </Link> */}
                </Box>

                <Button
                  // onClick={() => setPasienBaru(false)}
                  onClick={() => navigate('/register/penanggungJawab')}
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
                  {/* <Link
                    to="/rawatjalan/bpjs"
                    style={{ textDecoration: "none" }}
                  > */}
                  <CardRawatJalan
                    onClick={() => navigate("/rawatjalan/bpjs")}
                    title="Pasien BPJS"
                    text="dimana sudah terdaftar dalam program BPJS, sudah memiliki kartu dan berhak mendapatkan pelayanan kesehatan"
                  />
                  {/* </Link> */}

                  {/* <Link
                    to="/rawatjalan/umum"
                    state={{ succesSendData: true, data: patientId }}
                    style={{ textDecoration: "none" }}
                  > */}
                  <CardRawatJalan
                    onClick={() => navigate("/rawatjalan/umum", { state: { succesSendData: true, data: patientId } })}
                    title="Pasien umum"
                    text="Pasien yang berobat di rumah sakit dengan membayar sendiri seluruh biaya perawatan dan pengobatan yang dibutuhkan."
                  />
                  {/* </Link> */}

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
          )}
          {notFound && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        p: 5,
                        position: "absolute",
                        width: "60%",
                        flexDirection: 'column',
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ fontSize: '32px', fontWeight: '600', maxWidth: '410px' }}>
                            Data Not Found  !
                        </Typography>
                        <Typography sx={{ color: '#A8A8BD', fontSize: '18px', marginBottom: '30px', maxWidth: '410px', fontWeight: '400' }}>
                            Are you sure you filled the field ?? Look sus !
                        </Typography>
                        <Typography sx={{ color: '#A8A8BD', fontSize: '18px', marginBottom: '30px', maxWidth: '410px', fontWeight: '400' }}>
                            Keep playing kiddos !
                        </Typography>
                    </Box>
                </Box>
            )}
        </Box>
        


      </Box>
    </>
  );
}
