import { Box } from '@mui/system'
import { Avatar, Typography } from '@mui/material';
import { useState } from 'react';


interface CardBiodataPegawaiProps {
    nomorMR: string;
    namaLengkap: string;
    jenisKelamin: string;
    tanggalLahir: string;
    avatarUrl?: string;
    onUbahData?: () => void;
    onHapusData?: () => void;
}
export default function CardBiodataPegawai({
    nomorMR,
    namaLengkap,
    tanggalLahir,
    jenisKelamin,
    avatarUrl,

}: CardBiodataPegawaiProps) {

     const [showAll, setShowAll] = useState(false);
    
        const toggleShowAll = () => {
            setShowAll((prev) => !prev);
        };
    return (
        <Box
            position={"relative"}
            p={1}
            height="fit-content "
            width={'100%'}
            sx={{ borderRadius: "24px", bgcolor: "#ffff", overflow: "hidden", pb: 2 }}
        >

            {/* membuat bentuk lengkung atas */}
            <Box
                position={"absolute"}
                sx={{
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                }}
            >
                {/* lengkung kiri */}
                <Box
                    sx={{
                        width: "50px",
                        height: "30px",
                        bgcolor: "#F1F0FE",
                    }}
                >
                    <Box
                        sx={{
                            width: "50px",
                            height: "30px",
                            bgcolor: "#fff",
                            borderRadius: "0px 15px 0px 0px ",
                        }}
                    />
                </Box>

                {/* kotak tengah */}
                <Box
                    sx={{
                        width: "60px",
                        height: "40px",
                        bgcolor: "#F1F0FE",
                        borderRadius: "0px 0px 22px 22px",
                    }}
                />

                {/* lengkung kanan */}
                <Box
                    sx={{
                        width: "50px",
                        height: "30px",
                        bgcolor: "#F1F0FE",
                    }}
                >
                    <Box
                        sx={{
                            width: "50px",
                            height: "30px",
                            bgcolor: "#fff",
                            borderRadius: "15px 0px 0px 0px ",
                        }}
                    />
                </Box>
            </Box>
            {/* ---------- */}

            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mt={2} >
                <Typography
                    sx={{
                        textTransform: "capitalize",
                        fontWeight: "700",
                        fontSize: "20px",
                    }}
                >
                    Biodata Pasien
                </Typography>
            </Box>
            <Box p={2} display={'flex'} flexDirection={'column'} justifyContent={'center'}  >
                <Box display={'flex'} flexDirection={'column'} >
                    <Avatar alt={namaLengkap} src={avatarUrl} sx={{ width: '80px', height: '80px', mt: 3, mb: 3 }} />
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} maxWidth={'100%'} >

                        <Box maxWidth={'50%'} display={'flex'} flexDirection={'column'} gap={2} >

                            <Box display={'flex'} flexDirection={'column'} gap={1} >
                                <Typography color='#0A0A0D' fontSize={'16px'} fontWeight={400} lineHeight={'18px'} >Nomor MR</Typography>
                                <Typography fontSize={'16px'} lineHeight={'18px'} fontWeight={600} color='#0A0A0D' > {nomorMR}</Typography>
                            </Box>

                            <Box display={'flex'} flexDirection={'column'} gap={1} >
                                <Typography color='#0A0A0D' fontSize={'16px'} fontWeight={400} lineHeight={'18px'} >Tanggal Lahir</Typography>
                                <Typography fontSize={'16px'} lineHeight={'18px'} fontWeight={600} color='#0A0A0D' >{tanggalLahir}</Typography>
                            </Box>

                        </Box>

                        <Box maxWidth={'50%'} display={'flex'} flexDirection={'column'} gap={2} >

                            <Box display={'flex'} flexDirection={'column'} gap={1} >
                                <Typography color='#0A0A0D' fontSize={'16px'} fontWeight={400} lineHeight={'18px'} >Nama Lengkap</Typography>
                                <Typography fontSize={'16px'} lineHeight={'18px'} fontWeight={600} color='#0A0A0D' >{namaLengkap}</Typography>
                            </Box>

                            <Box display={'flex'} flexDirection={'column'} gap={1} >
                                <Typography color='#0A0A0D' fontSize={'16px'} fontWeight={400} lineHeight={'18px'} >Jenis Kelamin</Typography>
                                <Typography fontSize={'16px'} lineHeight={'18px'} fontWeight={600} color='#0A0A0D' >{jenisKelamin}</Typography>
                            </Box>
                        </Box>

                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <Typography
                        onClick={toggleShowAll}
                        sx={{
                            color: '#8F85F3',
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '18px',
                            mt: 3,
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                    >
                       {showAll ? "Tampilkan Lebih Sedikit" : "Lihat Selengkapnya"}
                    </Typography>
                </Box>
            </Box>

        </Box >
    )
}
