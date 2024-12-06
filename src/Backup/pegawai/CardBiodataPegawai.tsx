import { Box } from '@mui/system'
import { Avatar, Typography } from '@mui/material';

export default function CardBiodataPegawai() {
    return (
        <Box
            position={"relative"}
            p={1}
            height="fit-content "
            sx={{ borderRadius: "24px", bgcolor: "#ffff", overflow: "hidden", pb: 4 }}
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
                        width: "80px",
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
                    Biodata Pegawai
                </Typography>
                <Box display={'flex'} flexDirection={'row'} gap={2}  >
                    <Typography fontSize={'16px'} color={'#8F85F3'} >Ubah data</Typography>
                    <Typography fontSize={'16px'} color={'#8F85F3'} >Hapus data</Typography>
                </Box>
            </Box>
            <Box p={2} >
                <Avatar alt="Cindy Baker" src="#" sx={{ width: '80px', height: '80px', mt: 3, mb: 3 }} />
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} maxWidth={'100%'} >

                    <Box maxWidth={'50%'} display={'flex'} flexDirection={'column'} gap={2} >

                        <Box display={'flex'} flexDirection={'column'} gap={1} >
                            <Typography>Tanggal ditambahkan</Typography>
                            <Typography fontSize={'16px'} fontWeight={600} >29/Juli/2024</Typography>
                        </Box>

                        <Box display={'flex'} flexDirection={'column'} gap={1} >
                            <Typography>Nama Pegawai</Typography>
                            <Typography fontSize={'16px'} fontWeight={600} >Ahmad Jaelani</Typography>
                        </Box>

                        <Box display={'flex'} flexDirection={'column'} gap={1} >
                            <Typography>Jenis Kelamin</Typography>
                            <Typography fontSize={'16px'} fontWeight={600} >Pria</Typography>
                        </Box>

                        <Box display={'flex'} flexDirection={'column'} gap={1} >
                            <Typography>Alamat Tempat Tinggal</Typography>
                            <Typography fontSize={'16px'} fontWeight={600} >Ruko Tmn Kb Jeruk Intercon Bl AA-4/5, Dki Jakarta</Typography>
                        </Box>

                    </Box>

                    <Box maxWidth={'50%'} display={'flex'} flexDirection={'column'} gap={2} >

                        <Box display={'flex'} flexDirection={'column'} gap={1} >
                            <Typography>Nomor induk pegawai</Typography>
                            <Typography fontSize={'16px'} fontWeight={600} >1902739721649124</Typography>
                        </Box>

                        <Box display={'flex'} flexDirection={'column'} gap={1} >
                            <Typography>Role pegawai:</Typography>
                            <Typography fontSize={'16px'} fontWeight={600} >Dokter Spesialis</Typography>
                        </Box>

                        <Box display={'flex'} flexDirection={'column'} gap={1} >
                            <Typography>No. Handphone</Typography>
                            <Typography fontSize={'16px'} fontWeight={600} >+6281263098903</Typography>
                        </Box>

                        <Box display={'flex'} flexDirection={'column'} gap={1} >
                            <Typography>Dokumen</Typography>
                            <Typography fontSize={'16px'} fontWeight={600} >Lihat dokumen</Typography>
                        </Box>

                    </Box>


                </Box>
            </Box>

        </Box>
    )
}