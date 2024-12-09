import { Button, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import my from "../../img/String.png"
import logo from "../../img/St.carolus.png"

type InformasiTicketProps = {
    nomorAntrian: any | undefined;
    namaDokter: string;
    clinic: string;
    tanggalReservasi: string;
    jadwalKonsul: string | null;
}

const InformasiTicketAPI = ({ nomorAntrian, namaDokter, clinic, tanggalReservasi, jadwalKonsul }: InformasiTicketProps) => {
    return (
        <Box width={"506px"} height={"504px"} borderRadius={"32px"} bgcolor={"#F1F0FE"} position={"relative"} padding={"25px"}>
            <CardMedia
                component="img"
                height="162px"
                sx={{ width: '200px', position: 'absolute', left: '63%', zIndex: '1', top: '1%' }}
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
                <Typography color="#0A0A0D" fontSize={"20px"} fontWeight={"600"} >Rumah sakit St. Carolus</Typography>
                <Typography color="#A8A8BD" fontSize={"16px"} >Jl. Salemba Raya No.41, RT.3/RW.5, Paseban, Kec. Senen, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10440</Typography>
                <Box display={"flex"} flexDirection={"column"} >
                    <Typography fontSize={"16px"} >Nomor antrian</Typography>
                    <Typography fontSize={"48px"} fontWeight={"600"} >{nomorAntrian}</Typography>
                </Box>
                <Box display={"flex"} flexDirection={"row"} gap={"60px"} >
                    <Box>
                        <Typography>Dokter yang bertugas</Typography>
                        <Typography fontSize={"18px"} fontWeight={"600"} lineHeight={"20px"} >{namaDokter}</Typography>
                    </Box>
                    <Box>
                        <Typography>Poli yang dituju</Typography>
                        <Typography fontSize={"18px"} fontWeight={"600"} lineHeight={"20px"} >{clinic}</Typography>

                    </Box>
                </Box>
                <Box display={"flex"} flexDirection={"row"} gap={"80px"} >
                    <Box display={"flex"} flexDirection={"column"} >
                        <Typography>Tanggal reservasi</Typography>
                        <Typography fontSize={"18px"} fontWeight={"600"} lineHeight={"20px"} >{tanggalReservasi}</Typography>
                    </Box>
                    <Box display={"flex"} flexDirection={"column"} >
                        <Typography>Jadwal konsultasi</Typography>
                        <Typography fontSize={"18px"} fontWeight={"600"} lineHeight={"20px"} >{jadwalKonsul}</Typography>
                    </Box>
                </Box>

                <Button
                    fullWidth
                    sx={{
                        width: '100%',
                        height: '48px',
                        marginTop: '20px',
                        backgroundColor: '#8F85F3',
                        color: 'white',
                        border: '1px solid',
                        borderColor: '#8F85F3',
                        borderRadius: '8px'
                    }}
                >
                    Unduh tiket
                </Button>
            </Box>

        </Box>
    )
}

export default InformasiTicketAPI;