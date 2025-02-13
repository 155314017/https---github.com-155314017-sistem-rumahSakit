import { Box } from '@mui/system'
import { Chip, Typography } from '@mui/material';


export default function CardAppointmentCard() {
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
                        <Typography sx={titleText}>Status</Typography>
                        <Chip label="Antrian" sx={{ backgroundColor: "#D5D1FB", color: "black", border: '1px solid #7367F0' }} />
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography sx={titleText} mt={1}>
                            Jadwal konsultasi
                        </Typography>
                        <Typography sx={detailText}>
                            29/Jul/2024, 13:00-14:00
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography sx={titleText} mt={1}>
                            Nomor antrian
                        </Typography>
                        <Typography sx={detailText}>1</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography sx={titleText} mt={1}>
                            Keluhan
                        </Typography>
                        <Typography sx={detailText}>Sesak nafas</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography sx={titleText} mt={1}>
                            Jenis kunjungan
                        </Typography>
                        <Typography sx={detailText}>Konsultasi</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography sx={titleText} mt={1}>
                            Jenis pendaftaran
                        </Typography>
                        <Chip label="Onsite" sx={{ backgroundColor: "#C2ECE8", color: "black", border: '1px solid #084C47' }} />
                    </Box>

                </Box>
                <Box display="flex" justifyContent="center" textAlign="center" mt={2}>
                    <Typography
                        sx={{
                            color: '#8F85F3',
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '18px',
                            mt: 3,
                            alignItems: 'center'
                        }}
                    >
                        Lihat selengkapnya
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

const titleText = {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#0A0A0D'
}

const detailText = {
    color: '#0A0A0D',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '16px'
}