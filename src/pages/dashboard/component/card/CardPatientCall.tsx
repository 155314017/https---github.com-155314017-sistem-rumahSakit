import { Box, Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import bgImage from "../../../../assets/img/String.png";

//icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertSuccess from "../../../../components/small/alert/AlertSuccess";
import ModalConfirmationSkipPatient from "../../../../components/medium/modal/ModalConfirmationSkipPatient";


const CardPatientCall = () => {
    const [openModal, setOpenModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const [alertPanggil, setAlertPanggil] = useState(false);



    const [countdown, setCountdown] = useState(30);
    const [isCounting, setIsCounting] = useState(false);

    useEffect(() => {
            let interval: number | undefined;
            if (isCounting && countdown > 0) {
                interval = setInterval(() => {
                    setCountdown((prev) => prev - 1);
                }, 1000);
            } else if (countdown === 0) {
                setIsCounting(false);
                setCountdown(30);
            }
            return () => clearInterval(interval);
        }, [isCounting, countdown]);
    
        const startCountdown = () => {
            showTemporarySuccessCall();
            if (!isCounting) {
                setIsCounting(true);
            }
        };

        const showTemporarySuccessCall = async () => {
            setAlertPanggil(true)
            await new Promise(resolve => setTimeout(resolve, 3000))
            setAlertPanggil(false)
        }

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setAnchorEl(null); // Close the menu when modal is closed
    };

    return (
        <Box>
            {alertPanggil && (
                <AlertSuccess label="Pasien sedang dipanggil" />
            )}
            <Box
                height={"378px"}
                width={"100%"}
                sx={{
                    backgroundColor: "#fff",
                    borderRadius: "24px",
                }}
            >
                <Stack p={3} px={4} position="relative">
                    <Typography fontWeight={600} fontSize={'24px'} lineHeight={'26px'}  >Nomor antrian saat ini</Typography>
                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="card-bg" />
                    </Box>

                    <Box>
                        <Box mt={2} mb={2} >
                            <Typography fontWeight={400} fontSize={'18px'} lineHeight={'20px'} color="#747487">Nomor Antriam</Typography>
                            <Typography fontWeight={700} fontSize={'40px'} lineHeight={'44px'}  >PG-1</Typography>
                        </Box>

                        <Box display={"flex"} flexDirection={"row"} justifyContent={'space-between'} maxWidth={'80%'} >

                            <Box display={'flex'} flexDirection={'column'} gap={2} >
                                <Box>
                                    <Typography fontWeight={400} fontSize={'16px'} lineHeight={'18px'} color="#747487" >Nomor rekam medis</Typography>
                                    <Typography fontWeight={600} fontSize={'20px'} lineHeight={'22px'} >12345</Typography>
                                </Box>
                                <Box>
                                    <Typography fontWeight={400} fontSize={'16px'} lineHeight={'18px'} color="#747487"  >Nama Pasien</Typography>
                                    <Typography fontWeight={600} fontSize={'20px'} lineHeight={'22px'}  >Syahidan</Typography>
                                </Box>
                            </Box>

                            <Box display={'flex'} flexDirection={'column'} gap={2} >
                                <Box>
                                    <Typography fontWeight={400} fontSize={'16px'} lineHeight={'18px'} color="#747487"  >Jadwal Konsultasi</Typography>
                                    <Typography fontWeight={600} fontSize={'20px'} lineHeight={'22px'}  >Konsultasi</Typography>
                                </Box>
                                <Box>
                                    <Typography fontWeight={400} fontSize={'16px'} lineHeight={'18px'} color="#747487"  >Keluhan</Typography>
                                    <Typography fontWeight={600} fontSize={'20px'} lineHeight={'22px'}  >Sesak Nafas</Typography>
                                </Box>
                            </Box>

                        </Box>

                    </Box>

                    {/* Box navigasi */}
                    <Box display="flex" mt={8} justifyContent={'space-between'}>
                        <Button color="primary" sx={{
                            padding: '2px', mr: 1, bgcolor: '#ffff', border: '1px solid #8F85F3', color: '#8F85F3', width: '2%', borderRadius: '8px', height: '44px', '&:hover': {
                                backgroundColor: "#8F85F3", color: '#ffff',
                            },
                        }}
                            onClick={handleMenuClick}>
                            <MoreVertIcon />
                        </Button>
                        <Button color="primary" sx={{
                            padding: 1, px: 5, mr: 1, bgcolor: '#ffff', border: '1px solid #8F85F3', color: '#8F85F3', height: '44px', width: '45%', '&:hover': {
                                backgroundColor: "#8F85F3", color: '#ffff',
                            },
                        }}>
                            Proses Pasien
                        </Button>
                        <Button sx={{
                            bgcolor: isCounting ? "#ccc" : "#8F85F3", color: '#ffff', border: '1px solid #8F85F3', padding: 1, px: 5, height: '44px', width: '45%', '&:hover': {
                                backgroundColor: "#ffff", color: '#8F85F3',
                            },
                        }}
                        onClick={startCountdown}
                        disabled={isCounting}
                        >
                            {isCounting ? countdown : "Panggil Pasien"}
                        </Button>
                    </Box>

                </Stack>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: '16px',
                        border: '1px solid #A8A8BD',
                        width: '329px',
                        height: '120px',
                        gap: '8px',
                        borderWidth: '1px',
                        padding: '8px',
                        top: '0px',
                        left: '172px',

                    },
                }}
            >
                <MenuItem onClick={handleOpenModal}>
                    <Typography
                        sx={{
                            fontFamily: 'Roboto',
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '18px',
                            letterSpacing: '0%',
                            color: '#8F85F3',
                            padding: '8px',
                        }}
                    >
                        Lewati Antrian
                    </Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate('/detailRawat')}>
                    <Typography
                        sx={{
                            fontFamily: 'Roboto',
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '18px',
                            letterSpacing: '0%',
                            color: '#8F85F3',
                            padding: '8px',
                        }}
                    >
                        Lihat Detail
                    </Typography>
                </MenuItem>
            </Menu>
            <ModalConfirmationSkipPatient open={openModal} onClose={handleCloseModal} />
        </Box>
    )
};

export default CardPatientCall;
