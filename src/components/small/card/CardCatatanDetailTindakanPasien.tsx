import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

export default function CardCatatanDetailTindakanPasien() {
    return (
        <Stack gap={2} >
            <Box
                sx={{
                    bgcolor: '#EEEEF2',
                    width: '97%',
                    height: 'fit-content',
                    padding: '16px',
                    borderRadius: '12px',
                    mt: 2
                }}
            >
                <Typography>Senin, 19/Juli/2024</Typography>
            </Box>
            <Stack
                sx={{
                    bgcolor: '#FFFFFF',
                    border: '1px solid #A8A8BD',
                    padding: '32px',
                    borderRadius: '16px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        // gap: 2
                    }}
                >
                    <Typography>Perawat yang bertugas</Typography>
                    <li style={{ marginLeft: '20px' }} />
                    <Typography>Jam laporan dibikin</Typography>
                </Box>
                <Box>
                    <hr style={{
                        border: 'none',
                        background: 'repeating-linear-gradient(to right, #747487, #747487 10px, transparent 10px, transparent 20px)',  // Segmen tanpa celah putih
                        height: '2px',
                        margin: '20px 0'
                    }} />
                </Box>
                <Box>
                    <Typography>Pasien datang dengan keluhan dada berdebar</Typography>
                </Box>


            </Stack>

            <Stack
                sx={{
                    bgcolor: '#FFFFFF',
                    border: '1px solid #A8A8BD',
                    padding: '32px',
                    borderRadius: '16px',
                    mt: 1
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        // gap: 2
                    }}
                >
                    <Typography>Perawat yang bertugas</Typography>
                    <li style={{ marginLeft: '20px' }} />
                    <Typography>Jam laporan dibikin</Typography>
                </Box>
                <Box>
                    <hr style={{
                        border: 'none',
                        background: 'repeating-linear-gradient(to right, #747487, #747487 10px, transparent 10px, transparent 20px)',  // Segmen tanpa celah putih
                        height: '2px',
                        margin: '20px 0'
                    }} />
                </Box>
                <Box>
                    <Typography>Pasien datang dengan keluhan dada berdebar</Typography>
                </Box>


            </Stack>
            <Box></Box>
        </Stack>
    )
}
