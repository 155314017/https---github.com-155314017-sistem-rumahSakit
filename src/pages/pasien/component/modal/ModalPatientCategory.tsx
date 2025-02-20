/* eslint-disable @typescript-eslint/no-unused-expressions */
import type React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import { Avatar, Button, Card, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Stack } from '@mui/system';
import ModalKodeBooking from '../../../../components/medium/modal/ModalKodeBooking';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    border: '1px solid #A8A8BD',
    boxShadow: 2,
    p: 3,
    borderRadius: '16px',
};

interface ModalPatientCategoryProps {
    open: boolean;
    onClose: () => void;
}

const ModalPatientCategory: React.FC<ModalPatientCategoryProps> = ({ open, onClose }) => {
    const [openModalKodeBooking, setOpenModalKodeBooking] = useState(false);
    const [openModalPilihPembayaran, setOpenModalPilihPembayaran] = useState(false);

    const handleKodeBooking = () => {
        onClose();
        setOpenModalKodeBooking(true);
    };
    const handleBack = () => {
        setOpenModalPilihPembayaran(false);
    }

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                BackdropProps={{
                    style: {
                        backgroundColor: 'rgba(211, 211, 211, 0.2)',
                    },
                }}
            >
                <Box sx={style}>
                    <IconButton
                        onClick={() => {
                            onClose;
                            setOpenModalPilihPembayaran(false);
                        }}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: '#A8A8BD',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {!openModalPilihPembayaran && (
                        <>
                            <Typography id="modal-modal-title" sx={{ mt: 2, fontSize: '18px', fontWeight: 600 }}>
                                Pilih kategori pasien
                            </Typography>
                            <Typography id="modal-modal-description" mb={2} color='#747487'>
                                Membantu tenaga medis dalam memberikan perawatan yang lebih terorganisir, sesuai dengan tingkat kebutuhan pasien.
                            </Typography>

                            <Stack direction="column" spacing={3}>
                                {/* Pasien BPJS */}
                                <Link to="#" style={{ textDecoration: "none" }} onClick={() => setOpenModalPilihPembayaran(true)} >
                                    <Card sx={cardStyle}>
                                        <Avatar alt="Kode Booking" src="/src/img/meidicine.png" sx={{ width: '88px', height: '88px' }} />
                                        <Box>
                                            <Typography sx={titleStyle}>Pasien Lama</Typography>
                                            <Box sx={descriptionBoxStyle}>
                                                <Typography>Pasien yang pernah datang sebelumnya untuk keperluan berobat.</Typography>
                                                <ArrowForwardIosIcon sx={{ color: "#7367F0" }} />
                                            </Box>
                                        </Box>
                                    </Card>
                                </Link>

                                {/* Pasien Umum */}
                                <Link to="#" style={{ textDecoration: "none" }} onClick={() => setOpenModalPilihPembayaran(true)} >
                                    <Card sx={cardStyle}>
                                        <Avatar alt="Kode Booking" src="/src/img/filling.png" sx={{ width: '88px', height: '88px' }} />
                                        <Box>
                                            <Typography sx={titleStyle}>Pasien Baru</Typography>
                                            <Box sx={descriptionBoxStyle}>
                                                <Typography>Pasien yang baru pertama kali datang ke rumah sakit untuk keperluan berobat. </Typography>
                                                <ArrowForwardIosIcon sx={{ color: "#7367F0" }} />
                                            </Box>
                                        </Box>
                                    </Card>
                                </Link>

                                {/* Masukkan Kode Booking */}
                                <Link to="#" style={{ textDecoration: "none" }} onClick={handleKodeBooking}>
                                    <Card sx={cardStyle}>
                                        <Avatar alt="Kode Booking" src="/src/img/qrcode.png" sx={{ width: '88px', height: '88px' }} />
                                        <Box>
                                            <Typography sx={titleStyle}>Masukkan kode booking</Typography>
                                            <Box sx={descriptionBoxStyle}>
                                                <Typography>Berfungsi untuk pasien yang sudah melakukan pendaftaran online untuk check-in nomor antrian.</Typography>
                                                <ArrowForwardIosIcon sx={{ color: "#7367F0" }} />
                                            </Box>
                                        </Box>
                                    </Card>
                                </Link>
                            </Stack>
                        </>
                    )}

                    {openModalPilihPembayaran && (
                        <>

                            <Typography id="modal-modal-title" sx={{ mt: 2, fontSize: '18px', fontWeight: 600 }}>
                                Pilih kategori pasien
                            </Typography>
                            <Typography id="modal-modal-description" mb={2} color='#747487'>
                                Membantu tenaga medis dalam memberikan perawatan yang lebih terorganisir, sesuai dengan tingkat kebutuhan pasien.
                            </Typography>

                            <Stack direction="column" spacing={3}>
                                {/* Pasien BPJS */}
                                <Link to="/tambahPasien/Umum" style={{ textDecoration: "none" }}>
                                    <Card sx={cardStyle}>
                                        <Avatar alt="Kode Booking" src="/src/img/filling.png" sx={{ width: '88px', height: '88px' }} />
                                        <Box>
                                            <Typography sx={titleStyle}>Pasien Umum/asuransi</Typography>
                                            <Box sx={descriptionBoxStyle}>
                                                <Typography>Pasien yang berobat di rumah sakit dengan membayar sendiri seluruh biaya perawatan dan pengobatan yang dibutuhkan.</Typography>
                                                <ArrowForwardIosIcon sx={{ color: "#7367F0" }} />
                                            </Box>
                                        </Box>
                                    </Card>
                                </Link>

                                {/* Pasien Umum */}
                                <Link to="#" style={{ textDecoration: "none" }}>
                                    <Card sx={cardStyle}>
                                        <Avatar alt="Kode Booking" src="/src/img/meidicine.png" sx={{ width: '88px', height: '88px' }} />
                                        <Box>
                                            <Typography sx={titleStyle}>Pasien non BPJS kesehatan</Typography>
                                            <Box sx={descriptionBoxStyle}>
                                                <Typography>Pasien yang berobat di rumah sakit dengan membayar sendiri seluruh biaya perawatan dan pengobatan yang dibutuhkan.</Typography>
                                                <ArrowForwardIosIcon sx={{ color: "#7367F0" }} />
                                            </Box>
                                        </Box>
                                    </Card>
                                </Link>
                                <Button
                                    sx={{
                                        padding: "10px 20px",
                                        backgroundColor: "#8F85F3",
                                        color: "white",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: 600,
                                        width: "100%",
                                        border: '1px solid #8F85F3',
                                        ":hover": { backgroundColor: 'inherit', color: '#8F85F3' }
                                    }}
                                    onClick={handleBack}
                                >
                                    Kembali ke pilihan sebelumnya
                                </Button>
                            </Stack>
                        </>
                    )}
                </Box>
            </Modal>

            <ModalKodeBooking open={openModalKodeBooking} onClose={() => setOpenModalKodeBooking(false)} />

        </>
    );
};

export default ModalPatientCategory;

const cardStyle = {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    height: "80px",
    borderRadius: "24px",
    backgroundColor: "#F1F0FE",
    padding: "24px",
    gap: "16px",
    boxShadow: "none",
};

const titleStyle = {
    color: "#7367F0",
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "20px",
    textDecoration: "none",
};

const descriptionBoxStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textDecoration: "none",
};
