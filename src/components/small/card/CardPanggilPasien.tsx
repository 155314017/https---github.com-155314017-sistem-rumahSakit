import { Box, Button, Stack, Typography } from "@mui/material";
import bgImage from "../../../assets/img/String.png";

//icon
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function CardPanggilPasien() {
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
                        }}>
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
        </Box>
    );
}
