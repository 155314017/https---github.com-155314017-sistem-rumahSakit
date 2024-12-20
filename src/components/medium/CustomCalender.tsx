import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, InputBase, Popover, IconButton, Button, Grid } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import { ExpandMoreOutlined } from '@mui/icons-material';
import axios from 'axios';
import { useEffect, useState } from 'react';

const formatDate = (timestamp: number) => dayjs.unix(timestamp).format('YYYY-MM-DD');
const formatTime = (timestamp: number) => dayjs.unix(timestamp).format('HH:mm');

type CalenderProps = {
    doctorId: string;
    onChange: (scheduleId: string, schedule: string) => void;
};

const CustomCalender = ({ doctorId, onChange }: CalenderProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
    const [selectedTimeRange, setSelectedTimeRange] = useState<string | null>(null);
    const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [schedules, setSchedules] = useState<string[]>([]);
    const [availableTimes, setAvailableTimes] = useState<{ [date: string]: { timeRange: string, scheduleId: string }[] }>({});
    const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetchSchedules();
    }, [doctorId]);

    const fetchSchedules = async () => {
        try {
            const response = await axios.get(
                `https://hms.3dolphinsocial.com:8083/v1/manage/doctor/schedules/${doctorId}`
            );
            if (response.data && response.data.data) {
                setSchedules(response.data.data);
                processSchedules(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching schedules:', error);
        }
    };

    const processSchedules = (scheduleData: any[]) => {
        const times: { [date: string]: { timeRange: string, scheduleId: string }[] } = {};
        const dates: Set<string> = new Set();

        scheduleData.forEach((schedule) => {
            const startDate = formatDate(schedule.startDateTime);
            const startTime = formatTime(schedule.startDateTime);
            const endTime = formatTime(schedule.endDateTime);
            const timeRange = `${startTime} - ${endTime}`;

            dates.add(startDate);

            if (!times[startDate]) {
                times[startDate] = [];
            }

            times[startDate].push({ timeRange, scheduleId: schedule.id });
        });

        setAvailableDates(dates);
        setAvailableTimes(times);
    };

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleTimeSelect = (timeRange: string, scheduleId: string) => {
        if (!selectedDate) return;

        const formattedDate = selectedDate.format('MM/DD/YYYY');
        const selectedTime = `${formattedDate} ${timeRange}`;
        setSelectedTimeRange(selectedTime);
        setInputValue(selectedTime);
        setSelectedScheduleId(scheduleId);
    };

    const handleSave = () => {
        if (!selectedScheduleId || !selectedTimeRange || !selectedDate) return;
        const formattedDate = dayjs(selectedDate).format('DD/MMM/YYYY');
        const timeRange = selectedTimeRange.split(' ').slice(-3).join(' ');
        const selectedSchedule = `${formattedDate}, ${timeRange}`;

        onChange(selectedScheduleId, selectedSchedule);
        handleClose();
    };

    const now = dayjs();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
                <InputBase value={inputValue}
                    onClick={handleOpen}
                    placeholder="Pilih jadwal"
                    readOnly
                    sx={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '10px 40px 10px 10px',
                        width: '100%',
                        height: '40px',
                        backgroundColor: 'inherit',
                        color: '#333',
                        cursor: 'pointer',
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
                                cursor: 'pointer',
                            }}
                            onClick={handleOpen}
                        >
                            <ExpandMoreOutlined />
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
                    <Box sx={{ display: 'flex', padding: 2, width: '800px' }}>
                        <Box sx={{ width: '50%' }}>
                            <DateCalendar
                                value={selectedDate}
                                onChange={(newValue) => {
                                    setSelectedDate(newValue);
                                    setSelectedTimeRange(null);
                                    setInputValue('');
                                }}
                                shouldDisableDate={(date) =>
                                    !availableDates.has(date.format('YYYY-MM-DD')) || date.isBefore(now, 'day')
                                }
                                slotProps={{
                                    day: {
                                        sx: {
                                            '&.Mui-selected': {
                                                backgroundColor: '#8F85F3',
                                                color: '#fff',
                                                '&:hover': {
                                                    backgroundColor: '#6E6CB2',
                                                },
                                            },
                                            '&.Mui-selected:focus': {
                                                backgroundColor: '#8F85F3',
                                            },
                                        },
                                    },
                                }}
                            />
                        </Box>

                        <Box sx={{ width: '50%' }}>
                            <Grid container spacing={1}>
                                {selectedDate &&
                                    availableTimes[selectedDate.format('YYYY-MM-DD')]?.map(({ timeRange, scheduleId }) => {
                                        const [start, end] = timeRange.split(' - ').map((t) =>
                                            dayjs(`${selectedDate.format('YYYY-MM-DD')}T${t}`)
                                        );
                                        const isDisabled = start.isBefore(now);

                                        return (
                                            <Grid item xs={4} key={timeRange}>
                                                <Button
                                                    onClick={() => handleTimeSelect(timeRange, scheduleId)}
                                                    variant="text"
                                                    disabled={isDisabled}
                                                    sx={{
                                                        width: '120px',
                                                        padding: 0,
                                                        height: '68px',
                                                        borderRadius: '100px',
                                                        bgcolor: selectedTimeRange === timeRange ? '#8F85F3' : 'transparent',
                                                        color: isDisabled ? '#ccc' : '#000',
                                                        border: selectedTimeRange === timeRange ? '1px solid #8F85F3' : '#8F85F3',
                                                        '&:hover': {
                                                            border: '1px solid #8F85F3',
                                                        },
                                                    }}
                                                >
                                                    {timeRange}
                                                </Button>
                                            </Grid>
                                        );
                                    })}
                            </Grid>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4, padding: '10px 20px' }}>
                        <Button
                            onClick={handleClose}
                            sx={{
                                width: '50%',
                                border: '1px solid #8F85F3',
                                color: '#8F85F3',
                                '&:hover': {
                                    backgroundColor: '#8F85F3',
                                    color: '#fff',
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            sx={{
                                width: '50%',
                                backgroundColor: '#8F85F3',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#8F85F3',
                                },
                            }}
                        >
                            Simpan
                        </Button>
                    </Box>
                </Popover>
            </Box>
        </LocalizationProvider>
    );
};

export default CustomCalender;