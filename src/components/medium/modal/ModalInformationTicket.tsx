import { IconButton, Modal } from '@mui/material';
import { Button, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import my from "../../../assets/img/String.png";
import logo from "../../../assets/img/St.carolus.png";
interface ModalInformationTicketProps {
    open: boolean;
    onClose: () => void;
    nomorAntrian: number;
    namaDokter: string;
    clinic: string;
    tanggalReservasi: string;
    jadwalKonsul: string;
}

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 506,
    height: 504,
    bgcolor: "#FFFFFF",
    border: "1px solid #A8A8BD",
    boxShadow: 24,
    p: 4,
    borderRadius: "32px",
    padding: '25px',
    overflow: 'hidden',
};

const ModalInformationTicket: React.FC<ModalInformationTicketProps> = ({
    open, onClose, nomorAntrian, namaDokter, clinic, tanggalReservasi, jadwalKonsul
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropProps={{
                style: {
                    backgroundColor: "rgba(211, 211, 211, 0.2)",
                },
            }}
            disableAutoFocus
            disableEnforceFocus
        >
            <Box sx={style}>
                {/* Close Icon */}
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: '#A8A8BD',
                        zIndex: 100, 
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <CardMedia
                    component="img"
                    height="162px"
                    sx={{ width: '200px', position: 'absolute', left: '63%', zIndex: '1', top: '1%' }}
                    image={my}
                    alt="Example Image"
                />

                {/* Modal Content */}
                <Box display={"flex"} flexDirection={"column"} gap={"17px"} marginLeft={"4%"}>
                    <CardMedia
                        component="img"
                        height="52"
                        sx={{ width: "112px", objectFit: "cover" }}
                        image={logo}
                        alt="Example Logo"
                    />
                    <Typography color="#0A0A0D" fontSize={"20px"} fontWeight={"600"} >
                        Rumah sakit St. Carolus
                    </Typography>
                    <Typography color="#A8A8BD" fontSize={"16px"} >
                        Jl. Salemba Raya No.41, RT.3/RW.5, Paseban, Kec. Senen, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10440
                    </Typography>

                    {/* Queue Info */}
                    <Box display={"flex"} flexDirection={"column"}>
                        <Typography fontSize={"16px"}>Nomor antrian</Typography>
                        <Typography fontSize={"48px"} fontWeight={"600"}>{nomorAntrian}</Typography>
                    </Box>

                    {/* Details */}
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Box display={"flex"} flexDirection={"column"} gap={2}>
                            <Box>
                                <Typography sx={titleStyle}>Dokter yang bertugas</Typography>
                                <Typography sx={dataTextStyle}>{namaDokter}</Typography>
                            </Box>
                            <Box>
                                <Typography sx={titleStyle}>Tanggal reservasi</Typography>
                                <Typography sx={dataTextStyle}>{tanggalReservasi}</Typography>
                            </Box>
                        </Box>

                        <Box display={"flex"} flexDirection={"column"} gap={2}>
                            <Box display={"flex"} flexDirection={"column"}>
                                <Typography sx={titleStyle}>Poli yang dituju</Typography>
                                <Typography sx={dataTextStyle}>{clinic}</Typography>
                            </Box>
                            <Box display={"flex"} flexDirection={"column"}>
                                <Typography sx={titleStyle}>Jadwal konsultasi</Typography>
                                <Typography sx={dataTextStyle}>{jadwalKonsul}</Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Download Button */}
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
                            borderRadius: '8px',
                            '&:hover': {
                                backgroundColor: '#6E68E2',
                            }
                        }}
                    >
                        Unduh tiket
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalInformationTicket;

const dataTextStyle = {
    color: "#0A0A0D",
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "20px",
    textDecoration: "none",
};

const titleStyle = {
    color: "#747487",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "18px",
    textDecoration: "none",
};
