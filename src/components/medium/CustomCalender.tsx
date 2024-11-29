import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, InputBase, Popover, IconButton, Button, Grid } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import { ExpandMoreOutlined } from '@mui/icons-material';

export default function CustomCalender() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());
    const [selectedTimeRange, setSelectedTimeRange] = React.useState<string | null>(null);
    const [inputValue, setInputValue] = React.useState<string>('');
    const unavailableTimes = ['10:00-11:00', '17:00-18:00'];

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const generateTimeSlots = () => {
        const startHour = 7;
        const endHour = 18;

        return Array.from({ length: endHour - startHour }, (_, i) => {
            const start = startHour + i;
            const startTime = `${start.toString().padStart(2, '0')}:00`;
            const endTime = `${(start + 1).toString().padStart(2, '0')}:00`;

            // Cek apakah slot waktu ada dalam unavailableTimes
            const isDisabled = unavailableTimes.includes(`${startTime}-${endTime}`);

            return { startTime, endTime, isDisabled };
        });
    };

    const handleTimeSelect = (start: string, end: string) => {
        const formattedDate = selectedDate?.format('MM/DD/YYYY') || '';
        const timeRange = `${formattedDate} ${start}-${end}`;

        setSelectedTimeRange(timeRange);
        setInputValue(timeRange);
    };

    const handleSave = () => {
        if (selectedTimeRange) {
            // Log the selected date and time range to the console when saving
            console.log(`Selected Date and Time: ${selectedTimeRange}`);
            handleClose(); // Close the popover after saving
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
                <InputBase
                    value={inputValue}
                    onClick={handleOpen}
                    placeholder="Select Date and Time Range"
                    readOnly
                    sx={{
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: '10px 40px 10px 10px',
                        width: '100%',
                        height: '40px',
                        backgroundColor: '#f5f5f5',
                        color: '#333',
                        position: 'relative',
                        '&:focus': {
                            borderColor: '#1976d2',
                        },
                    }}
                    endAdornment={
                        <IconButton
                            sx={{
                                position: 'absolute',
                                right: 10,
                            }}
                            onClick={handleOpen}
                        >
                            <ExpandMoreOutlined/>
                        </IconButton>
                    }
                />

                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <Box sx={{ display: 'flex', padding: 2, maxWidth: '899px' }}>
                        {/* Pilih Tanggal */}
                        <Box sx={{ width: '50%' }}>
                            <DateCalendar
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                            />
                        </Box>

                        {/* Pilih Time Range */}
                        <Box sx={{ width: '50%' }}>
                            <Grid container spacing={1}>
                                {generateTimeSlots().map(({ startTime, endTime, isDisabled }) => (
                                    <Grid item xs={6} key={`${startTime}-${endTime}`}>
                                        <Button
                                            fullWidth
                                            onClick={() => !isDisabled && handleTimeSelect(startTime, endTime)}
                                            variant={selectedTimeRange?.includes(`${startTime}-${endTime}`) ? 'contained' : 'outlined'}
                                            sx={{
                                                bgcolor: selectedTimeRange?.includes(`${startTime}-${endTime}`)
                                                    ? '#8F85F3'
                                                    : isDisabled ? '#A8A8A8'
                                                        : 'transparent',
                                                color: selectedTimeRange?.includes(`${startTime}-${endTime}`)
                                                    ? '#fff'
                                                    : isDisabled ? '#D3D3D3'
                                                        : '#000',
                                                '&:hover': {
                                                    bgcolor: '#8F85F3',
                                                    color: '#fff',
                                                },
                                                borderColor: '#8F85F3',
                                                opacity: isDisabled ? 0.7 : 1,
                                                pointerEvents: isDisabled ? 'none' : 'auto',
                                            }}
                                            disabled={isDisabled}
                                        >
                                            {`${startTime} - ${endTime}`}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4, padding: '10px 20px' }}>
                        <Button onClick={handleClose}
                            sx={{
                                width: '50%',
                                border: '1px solid #8F85F3',
                                color: '#8F85F3',
                                "&:hover": {
                                    backgroundColor: "#8F85F3",
                                    color: 'white'
                                },
                            }}>
                            Batal
                        </Button>
                        <Button onClick={handleSave}
                            sx={{
                                width: '50%',
                                bgcolor: '#8F85F3',
                                color: 'white',
                                border: '1px solid #8F85F3',
                                "&:hover": {
                                    backgroundColor: "white",
                                    color: '#8F85F3',
                                },
                            }}>
                            Simpan
                        </Button>
                    </Box>
                </Popover>
            </Box >
        </LocalizationProvider >
    );
}
