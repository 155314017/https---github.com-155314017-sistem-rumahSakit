import { Box } from '@mui/system'
import { Avatar, Typography } from '@mui/material';


interface CardBiodataPegawaiProps {
    tanggalDitambahkan: string | number;
    namaPegawai: string;
    jenisKelamin: string;
    alamat: string;
    nomorIndukPegawai: string;
    rolePegawai: string;
    noHandphone: string;
    dokumen: string;
    avatarUrl?: string;
    onUbahData?: () => void;
    onHapusData?: () => void;
}
export default function CardBiodataPegawai({
    tanggalDitambahkan,
    namaPegawai,
    nomorIndukPegawai,
    rolePegawai,
    avatarUrl,

}: CardBiodataPegawaiProps) {
    return (
        <Box
            position={"relative"}
            p={1}
            height="fit-content "
            width={'100%'}
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
            </Box>
            <Box p={2} >
                <Avatar alt={namaPegawai} src={avatarUrl} sx={{ width: '80px', height: '80px', mt: 3, mb: 3 }} />
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} maxWidth={'100%'} >

                    <Box maxWidth={'50%'} display={'flex'} flexDirection={'column'} gap={2} >

                        <Box display={'flex'} flexDirection={'column'} gap={1} >
                            <Typography>Tanggal ditambahkan</Typography>
                            <Typography fontSize={'16px'} fontWeight={600} > {tanggalDitambahkan}</Typography>
                        </Box>

                        <Box display={'flex'} flexDirection={'column'} gap={1} >
                            <Typography>Nama Pegawai</Typography>
                            <Typography fontSize={'16px'} fontWeight={600} >{namaPegawai}</Typography>
                        </Box>

                    </Box>

                    <Box maxWidth={'50%'} display={'flex'} flexDirection={'column'} gap={2} >

                        <Box display={'flex'} flexDirection={'column'} gap={1} >
                            <Typography>Nomor induk pegawai</Typography>
                            <Typography fontSize={'16px'} fontWeight={600} >{nomorIndukPegawai}</Typography>
                        </Box>

                        <Box display={'flex'} flexDirection={'column'} gap={1} >
                            <Typography>Role pegawai:</Typography>
                            <Typography fontSize={'16px'} fontWeight={600} >{rolePegawai}</Typography>
                        </Box>


                    </Box>


                </Box>
            </Box>

        </Box>
    )
}
