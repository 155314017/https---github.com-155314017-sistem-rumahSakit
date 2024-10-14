import { bgcolor, Box } from '@mui/system'
import bgImage from "../../assets/img/String.png";
import { Avatar, Typography } from '@mui/material';

export default function CardBiodataPegawai() {
    return (
        <Box
            position={"relative"}
            p={3}
            height="400px"
            sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}
        >
            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} >
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
                    <Typography color={'#8F85F3'} >Ubah data</Typography>
                    <Typography color={'#8F85F3'} >Hapus data</Typography>
                </Box>
            </Box>
            <Avatar alt="Cindy Baker" src="#" sx={{ width: '80px', height: '80px', mt: 3 }} />
            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} maxWidth={'90%'} >

                <Box maxWidth={'50%'} display={'flex'} flexDirection={'column'} gap={2} >

                    <Box display={'flex'} flexDirection={'column'} >
                        <Typography>Tanggal ditambahkan</Typography>
                        <Typography>29/Juli/2024</Typography>
                    </Box>

                    <Box display={'flex'} flexDirection={'column'} >
                        <Typography>Nama Pegawai</Typography>
                        <Typography>Ahmad Jaelani</Typography>
                    </Box>

                    <Box display={'flex'} flexDirection={'column'} >
                        <Typography>Jenis Kelamin</Typography>
                        <Typography>Pria</Typography>
                    </Box>

                    <Box display={'flex'} flexDirection={'column'} >
                        <Typography>Alamat Tempat Tinggal</Typography>
                        <Typography>Ruko Tmn Kb Jeruk Intercon Bl AA-4/5, Dki Jakarta
                        </Typography>
                    </Box>

                </Box>

                <Box maxWidth={'50%'} display={'flex'} flexDirection={'column'} gap={2} >

                    <Box display={'flex'} flexDirection={'column'} >
                        <Typography>Nomor induk pegawai</Typography>
                        <Typography>1902739721649124</Typography>
                    </Box>

                    <Box display={'flex'} flexDirection={'column'} >
                        <Typography>Role pegawai:</Typography>
                        <Typography>Dokter Spesialis</Typography>
                    </Box>

                    <Box display={'flex'} flexDirection={'column'} >
                        <Typography>No. Handphone</Typography>
                        <Typography>+6281263098903</Typography>
                    </Box>

                    <Box display={'flex'} flexDirection={'column'} >
                        <Typography>Dokumen</Typography>
                        <Typography>Lihat dokumen</Typography>
                    </Box>

                </Box>


            </Box>

        </Box>
    )
}
