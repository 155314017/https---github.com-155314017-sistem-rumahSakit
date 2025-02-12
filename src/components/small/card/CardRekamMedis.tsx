import { Box } from '@mui/system'
import {  Typography } from '@mui/material';

export default function CardRekamMedis() {
    return (
        <Box
            position={"relative"}
            p={1}
            height="fit-content "
            width={'100%'}
            sx={{ borderRadius: "24px", bgcolor: "#FAFAFA", overflow: "hidden", pb: 4 }}
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
                            bgcolor: "#FAFAFA",
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
                            bgcolor: "#FAFAFA",
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
                    Data Pemeriksaan
                </Typography>
            </Box>
            <Box p={2} >
                <Box>

                </Box>
            </Box>

        </Box>
    )
}
