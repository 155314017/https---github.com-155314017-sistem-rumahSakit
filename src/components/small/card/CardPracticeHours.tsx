import { Box } from '@mui/system'
import { Typography } from '@mui/material';

interface DetailCardProps {
    title: string;
    data: {
        senin: string;
        selasa: string;
        rabu: string;
        kamis: string;
        jumat: string;
        sabtu: string;
        minggu: string;
    };
}

const CardJamPraktek: React.FC<DetailCardProps> = ({  data }) => {
    return (
        <div>
        <Box
            position={"relative"}
            p={3}
            height="fit-content"
            sx={{ borderRadius: "24px", bgcolor: "#ffff", overflow: "hidden" }}
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

            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} >
                <Typography
                    sx={{
                        textTransform: "capitalize",
                        fontWeight: "700",
                        fontSize: "20px",
                    }}
                >
                    Jam Praktek
                </Typography>
            </Box>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} maxWidth={'90%'} mt={3} >

                <Box maxWidth={'50%'} display={'flex'} flexDirection={'column'} gap={2} >

                    <Typography>Senin</Typography>
                    <Typography>Selasa</Typography>
                    <Typography>Rabu</Typography>
                    <Typography>Kamis</Typography>
                    <Typography>Jumat</Typography>
                    <Typography>Sabtu</Typography>
                    <Typography>Minggu</Typography>

                </Box>

                <Box maxWidth={'50%'} display={'flex'} flexDirection={'column'} gap={2} >

                    <Typography>{data.senin}</Typography>
                    <Typography>{data.selasa}</Typography>
                    <Typography>{data.rabu}</Typography>
                    <Typography>{data.kamis}</Typography>
                    <Typography>{data.jumat}</Typography>
                    <Typography>{data.sabtu}</Typography>
                    <Typography>{data.minggu}</Typography>

                </Box>


            </Box>

        </Box>
        </div>
    )
};

export default CardJamPraktek;
