/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    IconButton,
} from '@mui/material';
import DropdownListTime, { Option } from '../small/dropdownlist/DropdownListTime';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

interface DayOperationalProps {
    dayName: string;
    jamOperasional: Option[];
}

interface Session {
    id: number;
    start: string;
    end: string;
    isStartInvalid: boolean;
    isEndInvalid: boolean;
}

const DayOperational: React.FC<DayOperationalProps> = ({ dayName, jamOperasional }) => {
    const capitalizeFirstLetter = (str: string) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const [sessions, setSessions] = useState<Session[]>([]);

    const addSession = () => {
        const newId = sessions.length > 0 ? Math.max(...sessions.map(s => s.id)) + 1 : 1;
        setSessions([...sessions, { id: newId, start: '', end: '', isStartInvalid: false, isEndInvalid: false }]);
    };

    const removeSession = (id: number) => {
        setSessions(sessions.filter(session => session.id !== id));
    };

    const handleSessionChange = (id: number, field: 'start' | 'end', value: string) => {
        setSessions(prevSessions =>
            prevSessions.map(session => {
                if (session.id === id) {
                    const updatedSession = { ...session, [field]: value };

                    // Find corresponding Option objects
                    const startOption = jamOperasional.find(option => option.label === (field === 'start' ? value : session.start));
                    const endOption = jamOperasional.find(option => option.label === (field === 'end' ? value : session.end));

                    // Initialize error flags
                    let isStartInvalid = false;
                    let isEndInvalid = false;

                    if (startOption && endOption) {
                        if (startOption.value > endOption.value) {
                            if (field === 'start') {
                                isStartInvalid = true;
                                isEndInvalid = false;
                                console.error('Start time cannot be after end time.');
                            } else {
                                isEndInvalid = true;
                                isStartInvalid = false;
                                console.error('End time cannot be before start time.');
                            }
                        } else {
                            isStartInvalid = false;
                            isEndInvalid = false;
                        }
                    }

                    return { ...updatedSession, isStartInvalid, isEndInvalid };
                }
                return session;
            })
        );
    };

    return (
        <Box bgcolor={'white'} border={'1px solid #C5C5D3'} padding={2} borderRadius={'16px'}>
            <Box display="flex" flexDirection="column" alignItems="flex-start" mb={2}>
                <Typography variant="h6">{capitalizeFirstLetter(dayName)}</Typography>
                <Box
                    ml="auto"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-end"
                    justifyContent="flex-start"
                    width="100%"
                    mt={2}
                >
                    {sessions.map((session) => (
                        <Box
                            key={session.id}
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="flex-start"
                            gap={2}
                            mb={2}
                            width="100%"
                        >
                            <DropdownListTime
                                onChange={(value: any) => handleSessionChange(session.id, 'start', value)}
                                placeholder="Pilih jam mulai"
                                options={jamOperasional}
                                loading={false}
                                value={session.start}
                                error={session.isStartInvalid}
                            />
                            <Typography>-</Typography>
                            <DropdownListTime
                                onChange={(value: any) => handleSessionChange(session.id, 'end', value)}
                                placeholder="Pilih jam selesai"
                                options={jamOperasional}
                                loading={false}
                                value={session.end}
                                error={session.isEndInvalid}
                            />
                            <IconButton
                                aria-label="remove session"
                                onClick={() => removeSession(session.id)}
                                size="small"
                                sx={{ mt: 0, border: '1px solid #8F85F3', borderRadius: '8px' }}
                            >
                                <DeleteForeverOutlinedIcon sx={{ color: '#8F85F3' }} fontSize="medium" />
                            </IconButton>
                        </Box>
                    ))}
                    <Button
                        sx={{
                            width: '100%',
                            borderColor: '#8F85F3',
                            color: '#8F85F3',
                            ':hover': {
                                bgcolor: '#8F85F3',
                                color: 'white'
                            }
                        }}
                        variant="outlined"
                        onClick={addSession}
                    >
                        + Tambah Sesi
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default DayOperational;
