// src/small/card/CardJadwalExclusion.tsx

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

interface CardJadwalExclusionProps {
    event: Event;
}

const CardJadwalExclusion: React.FC<CardJadwalExclusionProps> = ({ event }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const startDate = dayjs(event.start).format('DD MMMM YYYY');
    const endDate = event.end ? dayjs(event.end).format('DD MMMM YYYY') : '—';
    const startTime = dayjs(event.start).format('hh:mm A');
    const endTime = event.end ? dayjs(event.end).format('hh:mm A') : '—';

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            border={'1px solid #C5C5D3'}
            borderRadius={'16px'}
            padding={2}
            bgcolor={'#F9F9F9'}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={2}>
                    <Box width={'16px'} height={'16px'} borderRadius={'50%'} bgcolor={'#B8E0C9'} />
                    <Typography fontWeight={400} fontSize={'16px'} lineHeight={'18px'} >Jadwal pengecualian</Typography>
                </Box>
                <IconButton onClick={handleToggleCollapse} size="small">
                    {isCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </IconButton>
            </Box>
            {!isCollapsed && (
                <Box display={'flex'} flexDirection={'column'} gap={1} mt={2}>A
                    <Box display={'flex'} justifyContent="space-between">
                        <Typography fontWeight={600}>Judul Jadwal</Typography>
                        <Typography>{event.title}</Typography>
                    </Box>
                    <Box display={'flex'} justifyContent="space-between">
                        <Typography fontWeight={600}>Tanggal</Typography>
                        <Typography>{startDate} - {endDate}</Typography>
                    </Box>
                    <Box display={'flex'} justifyContent="space-between">
                        <Typography fontWeight={600}>Jam</Typography>
                        <Typography>{startTime} - {endTime}</Typography>
                    </Box>
                    {event.notes && (
                        <Box display={'flex'} flexDirection={'column'}>
                            <Typography fontWeight={600}>Catatan</Typography>
                            <Box
                                minHeight={'65px'}
                                height={'auto'}
                                bgcolor={'#EEEEF2'}
                                border={'1px solid #A8A8BD'}
                                padding={'10px 12px'}
                                borderRadius={'8px'}
                            >
                                <Typography>{event.notes}</Typography>
                            </Box>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
}

export default CardJadwalExclusion;
