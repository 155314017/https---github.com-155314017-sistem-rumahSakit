import React, { useState } from 'react';
import { Typography, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import dayjs from 'dayjs';

interface Event {
    id: string;
    title: string;
    start: string;
    end?: string;
    allDay?: boolean;
    type?: string;
    notes?: string;
    color?: string;
    textColor?: string;
    borderColor?: string;
}

interface Session {
    id: string;
    startTime: string;
    endTime: string;
    selectedDays: string[];
    notes: string;
}

interface CardJadwalPraktekProps {
    sessions: Session[];
}

const CardJadwalPraktek: React.FC<CardJadwalPraktekProps> = ({ sessions }) => {
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
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={2}>
                    <Box width={'16px'} height={'16px'} borderRadius={'50%'} bgcolor={'#D5D1FB'} />
                    <Typography>Jadwal Praktek</Typography>
                </Box>
                <IconButton onClick={handleToggleCollapse} size="small">
                    {isCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </IconButton>
            </Box>
            {!isCollapsed && (
                <Box display={'flex'} flexDirection={'column'} gap={1} mt={2}>
                    <Box display={'flex'} justifyContent="space-between">
                        <Typography>Jumlah Sesi</Typography>
                        <Typography>{sessions.length} Sesi</Typography>
                    </Box>
                    {sessions.map((session) => (
                        <Box key={session.id} display={'flex'} flexDirection={'column'} gap={0.5}>
                            <Box display={'flex'} justifyContent="space-between">
                                <Typography>Jam</Typography>
                                <Typography>
                                    {dayjs(session.startTime, 'hh:mm a').format('hh:mm a')} - {dayjs(session.endTime, 'hh:mm a').format('hh:mm a')}
                                </Typography>
                            </Box>
                            <Box display={'flex'} justifyContent="space-between">
                                <Typography>Hari</Typography>
                                <Typography maxWidth={'50%'} >{session.selectedDays.map(day => day.charAt(0).toUpperCase() + day.slice(1)).join(', ')}</Typography>
                            </Box>
                            {session.notes && (
                                <Box display={'flex'} justifyContent="space-between">
                                    <Typography>Catatan</Typography>
                                    <Typography>{session.notes}</Typography>
                                </Box>
                            )}
                        </Box>
                    ))}
                    {sessions.length === 0 && (
                        <Typography>No Jadwal Praktek tersedia.</Typography>
                    )}
                </Box>
            )}
        </Box>
    );
}

export default CardJadwalPraktek;
