import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import CardRawatJalan from '../medium/CardRawatJalan';
import { Card } from '@mui/material';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    border: '1px solid #A8A8BD',
    boxShadow: 2,
    p: 4,
    borderRadius: '16px'
};

interface ModalKategoriPasienProps {
    open: boolean;
    onClose: () => void;
}

function ModalKategoriPasien({ open, onClose }: ModalKategoriPasienProps): JSX.Element {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropProps={{
                style: {
                    backgroundColor: 'rgba(211, 211, 211, 0.4)',
                },
            }}
        >
            <Box sx={style}>
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
        </Modal>
    );
}


export default ModalKategoriPasien;
