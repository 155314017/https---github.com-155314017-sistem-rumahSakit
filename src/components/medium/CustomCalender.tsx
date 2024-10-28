import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Box, Button, InputBase } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

interface CustomTimeViewProps {
    onChange: (value: Dayjs | null) => void;
    value: Dayjs | null;
    handleTimeSelect: (date: string, start: number, end: number) => void;
}

function renderCustomTimeViewClock({ onChange, value, handleTimeSelect }: CustomTimeViewProps): JSX.Element {
    if (!value) return <></>;

    const startHour = 7;
    const endHour = 18;
    const interval = 1;

    const timeSlots = Array.from({ length: endHour - startHour }, (_, i) => {
        const start = startHour + i;
        const end = start + interval;
        return { start, end };
    });

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
            {timeSlots.map(({ start, end }) => (
                <Button
                    key={`${start}-${end}`}
                    onClick={() => {
                        const newValue = dayjs(value).hour(start).minute(0).second(0);
                        onChange(newValue);
                        handleTimeSelect(newValue.format('YYYY-MM-DD'), start, end);
                    }}
                    variant={value?.hour() === start ? "contained" : "outlined"}
                    sx={{
                        bgcolor: value?.hour() === start ? '#8F85F3' : 'transparent',
                        color: value?.hour() === start ? '#fff' : '#000',
                        '&:hover': {
                            bgcolor: value?.hour() === start ? '#8F85F3' : '#e0e0e0',
                        },
                    }}
                >
                    {`${start.toString().padStart(2, '0')}:00 - ${end.toString().padStart(2, '0')}:00`}
                </Button>
            ))}
        </Box>
    );
}

export default function CustomDateTimePicker() {
    const [selectedTime, setSelectedTime] = React.useState<{ date: string; start: number; end: number } | null>(null);
    const [inputValue, setInputValue] = React.useState<string>('');

    const handleTimeChange = (newValue: Dayjs | null) => {
        if (newValue) {
            const startDate = newValue.format('YYYY-MM-DD');
            const startHour = newValue.hour();
            const endHour = startHour + 1;
            setInputValue(`${startDate} ${newValue.format('HH:mm')} - ${newValue.add(1, 'hour').format('HH:mm')}`);
            setSelectedTime({ date: startDate, start: startHour, end: endHour });
        } else {
            setInputValue('');
            setSelectedTime(null);
        }
    };

    const handleTimeSelect = (date: string, start: number, end: number) => {
        setSelectedTime({ date, start, end });
        setInputValue(`${date} ${start.toString().padStart(2, '0')}:00 - ${end.toString().padStart(2, '0')}:00`);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
                <DateTimePicker
                    value={selectedTime ? dayjs(`${selectedTime.date} ${selectedTime.end.toString().padStart(2, '0')}:00`) : null}
                    sx={{ width: '100%', bgcolor: 'red' }}
                    onChange={handleTimeChange}
                    viewRenderers={{
                        hours: (props) => renderCustomTimeViewClock({ ...props, value: selectedTime ? dayjs(`${selectedTime.date} ${selectedTime.start.toString().padStart(2, '0')}:00`) : null, handleTimeSelect }),
                    }}
                    defaultValue={dayjs('2024-10-24T08:00:00')}
                />
                <InputBase
                    value={inputValue}
                    onClick={() => setInputValue(selectedTime ? `${dayjs(selectedTime.date).format('DD/MM/YYYY')} ${selectedTime.start.toString().padStart(2, '0')}:00 - ${selectedTime.end.toString().padStart(2, '0')}:00` : '')}
                    placeholder="Select Date and Time"
                    readOnly
                    sx={{
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: '10px',
                        width: '100%',
                        backgroundColor: '#f5f5f5',
                        color: '#333',
                        '&:focus': {
                            borderColor: '#1976d2',
                        },
                    }}
                />
                <Button onClick={() => console.log(selectedTime)}>Submit</Button>
            </Box>
        </LocalizationProvider>
    );
}
