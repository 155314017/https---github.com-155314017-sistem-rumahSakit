/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, InputBase, Popover, IconButton, Button } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { ExpandMoreOutlined } from '@mui/icons-material';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const CustomCalendar = ({ typeId, onChange }: { typeId: string; onChange: (scheduleId: string, schedule: string) => void; }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
    const [selectedTimeRange, setSelectedTimeRange] = useState<string | null>(null);
    const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [availableTimes, setAvailableTimes] = useState<{ [date: string]: { timeRange: string, scheduleId: string, disabled: boolean }[] }>({});
    const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());

    const dummySchedules = [
        {
            id: "1",
            title: "Morning Shift",
            startTime: [8, 0],
            endTime: [12, 0],
            typeId: "1",
            maxCapacity: 10,
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: false,
            sunday: false,
        },
        {
            id: "2",
            title: "Afternoon Shift",
            startTime: [13, 30],
            endTime: [16, 30],
            typeId: "2",
            maxCapacity: 8,
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: false,
        },
    ];

    const exclusionInterval = [
        { date: '2025-01-27', scheduleIntervalId: '1', allday: false },
    ];

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/schedule-interval/by-type-id?typeId=${typeId}`);
                console.log('response calendar: ', response.data.data);
                if (Array.isArray(response.data.data) && response.data.data.length > 0) {
                    const schedules = response.data.data.map((item: any) => ({
                        id: item.id,
                        title: item.title || '',
                        starTime: item.startTime,
                        endTime: item.endTime,
                        typeId: item.typeId,
                        monday: item.monday,
                        tuesday: item.tuesday,
                        wednesday: item.wednesday,
                        thursday: item.thursday,
                        friday: item.friday,
                        saturday: item.saturday,
                        sunday: item.sunday,
                    }));

                    console.log('proses: ', schedules);
                    processSchedules(schedules);
                } else {
                    console.warn('No schedules found. Using dummy schedules.');
                    processSchedules(dummySchedules);
                }
            } catch (error) {
                console.error('Error fetching schedules:', error);
                processSchedules(dummySchedules);
            }
        };



        fetchSchedules();
    }, [typeId]);

    const processSchedules = (schedules: any[]): void => {
        if (!Array.isArray(schedules) || schedules.length === 0) {
            console.warn('Schedules are empty or invalid.');
            setAvailableDates(new Set());
            setAvailableTimes({});
            return;
        }

        const times: { [date: string]: { timeRange: string; scheduleId: string; disabled: boolean }[] } = {};
        const dates = new Set<string>();
        const now = dayjs();

        const startDate = now.startOf("day");
        const endDate = startDate.add(1, "year");

        for (let date = startDate; date.isBefore(endDate, "day"); date = date.add(1, "day")) {
            const formattedDate = date.format("YYYY-MM-DD");
            const dayName = date.locale("en").format("dddd").toLowerCase();
            const exclusionForDate = exclusionInterval.find((exclusion) => exclusion.date === formattedDate);

            if (exclusionForDate) {
                if (exclusionForDate.allday) {
                    times[formattedDate] = [];
                    dates.add(formattedDate);
                } else {
                    schedules.forEach((schedule: any) => {
                        if (schedule.id === exclusionForDate.scheduleIntervalId) {
                            if (!times[formattedDate]) {
                                times[formattedDate] = [];
                            }

                            const timeRange = `${schedule.starTime[0].toString().padStart(2, "0")}:${schedule.starTime[1]
                                .toString()
                                .padStart(2, "0")} - ${schedule.endTime[0].toString().padStart(2, "0")}:${schedule.endTime[1]
                                    .toString()
                                    .padStart(2, "0")}`;
                            times[formattedDate].push({
                                timeRange,
                                scheduleId: schedule.id,
                                disabled: true,
                            });
                            dates.add(formattedDate);
                        }
                    });
                }
            } else {
                schedules.forEach((schedule: any) => {
                    if (schedule[dayName]) {
                        if (!times[formattedDate]) {
                            times[formattedDate] = [];
                        }

                        const timeRange = `${schedule.starTime[0].toString().padStart(2, "0")}:${schedule.starTime[1]
                            .toString()
                            .padStart(2, "0")} - ${schedule.endTime[0].toString().padStart(2, "0")}:${schedule.endTime[1]
                                .toString()
                                .padStart(2, "0")}`;
                        times[formattedDate].push({
                            timeRange,
                            scheduleId: schedule.id,
                            disabled: false,
                        });

                        dates.add(formattedDate);
                    }
                });
            }
        }

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
        const formattedDate = selectedDate.locale('id').format('DD MMMM YYYY');
        const selectedTime = `${formattedDate} ${timeRange}`;
        setSelectedTimeRange(timeRange);
        setInputValue(selectedTime);
        setSelectedScheduleId(scheduleId);
    };

    const handleSave = () => {
        if (!selectedScheduleId || !selectedTimeRange || !selectedDate) return;
        const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
        const timeRange = selectedTimeRange.split(' - ').join(' to ');
        const selectedSchedule = `${formattedDate}, ${timeRange}`;

        onChange(selectedScheduleId, selectedSchedule);
        handleClose();
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box >
                <InputBase
                    value={inputValue}
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
                        '& .css-yimnyd-MuiInputBase-input': {
                            cursor: 'pointer'
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
                // sx={{ cursor: 'pointer' }}
                >
                    <Box sx={{ display: 'flex', padding: 2, width: '800px', cursor: 'pointer' }}>
                        <Box sx={{ width: '50%' }}>
                            <DateCalendar

                                value={selectedDate}
                                onChange={(newValue) => {
                                    setSelectedDate(newValue);
                                    setSelectedTimeRange(null);
                                    setInputValue('');
                                }}
                                shouldDisableDate={(date) => {
                                    const exclusionForDate = exclusionInterval.find((exclusion) => exclusion.date === date.format('YYYY-MM-DD'));
                                    if (exclusionForDate && exclusionForDate.allday) {
                                        return true; // Disable seluruh tanggal
                                    }
                                    return !availableDates.has(date.format('YYYY-MM-DD'));  // Menonaktifkan tanggal jika tidak ada jadwal
                                }}
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

                        <Box sx={{ width: '50%', overflowY: 'auto', maxHeight: '300px', padding: '0 10px' }}>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: '10px',
                                }}
                            >
                                {selectedDate && availableTimes[selectedDate.format('YYYY-MM-DD')]?.map(({ timeRange, scheduleId, disabled }) => (
                                    <Button
                                        key={timeRange}
                                        onClick={() => handleTimeSelect(timeRange, scheduleId)}
                                        variant="text"
                                        disabled={disabled}
                                        sx={{
                                            width: '100%',
                                            padding: 1,
                                            height: '40px',
                                            borderRadius: '8px',
                                            bgcolor: selectedTimeRange === timeRange ? '#8F85F3' : 'transparent',
                                            color: selectedTimeRange === timeRange ? '#fff' : '#000',
                                            border: selectedTimeRange === timeRange ? '1px solid #8F85F3' : '1px solid #ccc',
                                            '&:hover': {
                                                border: '1px solid #8F85F3',
                                            },
                                        }}
                                    >
                                        {timeRange}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4, padding: '10px 20px' }}>
                        <Button
                            onClick={handleClose}
                            sx={{
                                width: '50%',
                                border: '1px solid #8F85F3',
                                color: '#8F85F3',
                                "&:hover": {
                                    backgroundColor: "#8F85F3",
                                    color: "#fff",
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

export default CustomCalendar;

