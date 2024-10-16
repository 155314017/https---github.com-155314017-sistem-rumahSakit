import React, { useState } from 'react';
import { Box, Button, TextField, Popover} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

interface Props {
    value: Dayjs | null;
    onChange: (newValue: Dayjs | null) => void;
}

const CustomTimePicker: React.FC<Props> = ({ value, onChange }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const startHour = 7;
    const endHour = 18;

    const renderTimeButtons = () => {
        const timeSlots = Array.from({ length: endHour - startHour }, (_, i) => startHour + i);

        return (
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, p: 2 }}>
                {timeSlots.map((hour) => (
                    <Button
                        key={hour}
                        onClick={() => {
                            const newValue = dayjs().hour(hour).minute(0).second(0);
                            onChange(newValue);
                            handleClose(); 
                        }}
                        variant={value?.hour() === hour ? "contained" : "outlined"}
                        sx={{
                            bgcolor: value?.hour() === hour ? '#1976d2' : 'transparent',
                            color: value?.hour() === hour ? '#fff' : '#000',
                            '&:hover': {
                                bgcolor: value?.hour() === hour ? '#115293' : '#e0e0e0',
                            },
                        }}
                    >
                        {`${hour.toString().padStart(2, '0')}:00`}
                    </Button>
                ))}
            </Box>
        );
    };

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TextField
                value={value ? value.format('HH:mm') : ''}
                placeholder="Select time"
                variant="outlined"
                size="small"
                sx={{ height:'38px', borderRadius:'8px' }}
                fullWidth
                InputProps={{
                    readOnly: true, 
                }}
                onClick={handleOpen} 
            />
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {renderTimeButtons()}
            </Popover>
        </LocalizationProvider>
    );
};

export default CustomTimePicker;
