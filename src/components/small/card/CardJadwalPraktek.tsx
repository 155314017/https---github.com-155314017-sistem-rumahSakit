import React, { useState } from 'react';
import { Typography, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function CardJadwalPraktek() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            border={'1px solid #C5C5D3'}
            borderRadius={'16px'}
            padding={2}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography>Jadwal Praktek</Typography>
                <IconButton onClick={handleToggleCollapse} size="small">
                    {isCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </IconButton>
            </Box>

            {!isCollapsed && (
                <Box display={'flex'} flexDirection={'column'} gap={1} mt={2}>
                    <Box display={'flex'} justifyContent="space-between">
                        <Typography>Jumlah Sesi</Typography>
                        <Typography>2 Sesi</Typography>
                    </Box>

                    <Box display={'flex'} justifyContent="space-between">
                        <Typography>Jam mulai sesi 1</Typography>
                        <Typography>07:00-12:00</Typography>
                    </Box>

                    <Box display={'flex'} justifyContent="space-between">
                        <Typography>Jam mulai sesi 2</Typography>
                        <Typography>13:00-14:00</Typography>
                    </Box>
                </Box>
            )}
        </Box>
    );
}
