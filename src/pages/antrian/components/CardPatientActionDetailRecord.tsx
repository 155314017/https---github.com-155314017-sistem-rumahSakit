import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

interface CardPatientActionDetailRecordProps {
    namaPerawat: string;
    jamLaporan: string;
    catatan: string;
}

const CardPatientActionDetailRecord: React.FC<CardPatientActionDetailRecordProps> = ({ namaPerawat, jamLaporan, catatan }) => {
    return (
        <Stack gap={2} mt={2}>
            <Stack
                sx={{
                    bgcolor: '#FFFFFF',
                    border: '1px solid #A8A8BD',
                    padding: '32px',
                    borderRadius: '16px'
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography>{namaPerawat}</Typography>
                    <li style={{ marginLeft: '20px' }} />
                    <Typography>{jamLaporan}</Typography>
                </Box>
                <Box>
                    <hr style={{
                        border: 'none',
                        background: 'repeating-linear-gradient(to right, #747487, #747487 10px, transparent 10px, transparent 20px)',
                        height: '2px',
                        margin: '20px 0'
                    }} />
                </Box>
                <Box>
                    <Typography>{catatan}</Typography>
                </Box>
            </Stack>
        </Stack>
    );
};

export default CardPatientActionDetailRecord;
