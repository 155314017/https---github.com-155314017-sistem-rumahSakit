import { Box, CardMedia } from "@mui/material";
import register from "../../../../assets/img/registerImg.jpg";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Typography } from "@mui/material";


export default function PilihKategoriPasien() {
  return (
    <Box 
    sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      <CardMedia
        component="img"
        sx={{
          width: "560px",
          height:"229px",
          borderRadius: "24px",
          position: "relative",
          marginTop: "112px",
          "@media (max-width: 600px)": {
            width: "100%"}
        }
        }
        image={register}
        alt="Example Image"/>
        <Box>
                <Typography id="modal-modal-description" sx={{mb:2 , fontSize: '18px', fontWeight: 600 }}>
                    Pilih Kategori Pasien
                </Typography>
                <Box
                    sx={{ display: "flex", flexDirection: "column", gap:2 }}
                >
                    <Link
                        to="/tambahPasien/BPJS"
                        style={{ textDecoration: "none" }}
                    >
                        <Card
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "85%",
                                height: "128px",
                                borderRadius: "24px",
                                backgroundColor: "#F1F0FE",
                                padding: "24px",
                                gap: "16px",
                                boxShadow: "none", // Remove shadow
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#7367F0",
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    lineHeight: "20px",
                                    textDecoration: "none",
                                }}
                            >
                                Pasien BPJS
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", textDecoration: "none" }}>
                                <Typography sx={{ textDecoration: "none" }}>
                                    dimana sudah terdaftar dalam program BPJS, sudah memiliki kartu dan berhak mendapatkan pelayanan kesehatan
                                </Typography>
                                <ArrowForwardIosIcon sx={{ color: "#7367F0" }} />
                            </Box>
                        </Card>

                    </Link>

                    <Link
                        to="/tambahPasien/Umum"
                        style={{ textDecoration: "none" }}
                    >
                        <Card
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "85%",
                                height: "128px",
                                borderRadius: "24px",
                                backgroundColor: "#F1F0FE",
                                padding: "24px",
                                gap: "16px",
                                boxShadow: "none", // Remove shadow
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#7367F0",
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    lineHeight: "20px",
                                    textDecoration: "none",
                                }}
                            >
                                Pasien umum
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", textDecoration: "none" }}>
                                <Typography sx={{ textDecoration: "none" }}>
                                    Pasien yang berobat di rumah sakit dengan membayar sendiri seluruh biaya perawatan dan pengobatan yang dibutuhkan.
                                </Typography>
                                <ArrowForwardIosIcon sx={{ color: "#7367F0" }} />
                            </Box>
                        </Card>
                    </Link>
                </Box>
            </Box>

        

      
    </Box>
  )
}
