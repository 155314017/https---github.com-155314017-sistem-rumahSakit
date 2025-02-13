import { Box, Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import bgImage from "../../../assets/img/String.png";

//icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from "react";

interface CardPanggilPasienProps {
    onSkipQueue: () => void; // Parameter for skip queue action
    onViewDetails: () => void; // Parameter for view details action
  }
const CardPanggilPasien: React.FC<CardPanggilPasienProps> = ({
    onSkipQueue,
    onViewDetails
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    
    return (
        <Box>
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
                            bgcolor: '#8F85F3', color: '#ffff', border: '1px solid #8F85F3', padding: 1, px: 5, height: '44px', width: '45%', '&:hover': {
                                backgroundColor: "#ffff", color: '#8F85F3',
                            },
                        }}>
                            Panggil Pasien
                        </Button>
                    </Box>

                </Stack>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'top', // Position the menu below the button
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom', // Align the top of the menu with the bottom of the button
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
                <MenuItem onClick={() => { onSkipQueue(); handleMenuClose(); }}>
                    <Typography
                        sx={{
                        fontFamily: 'Roboto',
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '18px',
                        letterSpacing: '0%',
                        color: '#8F85F3', // Text color,
                        padding: '8px',
                        }}
                    >
                        Lewati Antrian
                    </Typography>
                    </MenuItem>
                    <MenuItem onClick={() => { onViewDetails(); handleMenuClose(); }}>
                    <Typography
                        sx={{
                        fontFamily: 'Roboto',
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '18px',
                        letterSpacing: '0%',
                        color: '#8F85F3', // Text color
                        padding: '8px',
                        }}
                    >
                        Lihat Detail
                    </Typography>
                    </MenuItem>
            </Menu>
        </Box>
    )
};

export default CardPanggilPasien;
