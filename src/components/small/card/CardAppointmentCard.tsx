import { Box } from '@mui/system'
import { Chip, Typography } from '@mui/material';


export default function CardAppointmentCard() {
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
                    Appointment
                </Typography>
            </Box>
            <Box p={2} justifyContent={'center'} display={'flex'} flexDirection={'column'}>


                <Box maxWidth={'100%'} display={'flex'} flexDirection={'column'} gap={2} justifyContent={'center'} >

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">Status</Typography>
                        <Chip label="Tensi" sx={{ backgroundColor: "#FFE082", color: "black" }} />
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" mt={1}>
                            <strong>Jadwal konsultasi</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            29/Jul/2024, 13:00-14:00
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" mt={1}>
                            <strong>Nomor antrian</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">1</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" mt={1}>
                            <strong>Keluhan</strong>
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>Sesak nafas</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" mt={1}>
                            <strong>Jenis kunjungan</strong>
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>Konsultasi</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" mt={1}>
                            <strong>Jenis pendaftaran</strong>
                        </Typography>
                        <Chip label="Onsite" sx={{ backgroundColor: "#A5D6A7", color: "black" }} />
                    </Box>

                </Box>
                <Box display="flex" justifyContent="center" textAlign="center" mt={2}>
                    <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
                        Lihat selengkapnya ▼
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}
