/* eslint-disable react-hooks/exhaustive-deps */
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
    const [exclusionTimes, setExclusionTimes] = useState<{ [date: string]: { timeRange: string, disabled: boolean }[] }>({});
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);

    const fetchSchedules = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/schedule-interval/by-type-id?typeId=${typeId}`);
            if (Array.isArray(response.data.data) && response.data.data.length > 0) {
                const schedules = response.data.data.map((item: any) => ({
                    id: item.id,
                    title: item.title || '',
                    startTime: item.startTime,
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
                processSchedules(schedules);
            }
        } catch (error) {
            console.error('Error fetching schedules:', error);
        }
    };

    const fetchExclusion = async (date: Dayjs) => {
        try {
            // const dateFormatted = date.format('YYYY-MM-DD');
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/exclusion-interval/by-type-id/daily?`, {
                params: {
                    typeId,
                    date: date.date(),
                    month: date.month() + 1,
                    year: date.year(),
                },
            });
            if (Array.isArray(response.data.data) && response.data.data.length > 0) {
                const exclusions = processExclusionData(response.data.data);
                setExclusionTimes(exclusions);
            }
        } catch (error) {
            console.error('Error fetching exclusions for the date:', error);
        }
    };

    const fetchExclusionMonthly = async () => {
        try {
            // const dateFormatted = dayjs().format('YYYY-MM-DD');
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/exclusion-interval/by-type-id/monthly?`, {
                params: {
                    typeId,
                    date: '01',
                    month: dayjs().month() + 1,
                    year: dayjs().year(),
                },
            });
            console.log('data exclusion month: ', response.data.data);
            if (Array.isArray(response.data.data) && response.data.data.length > 0) {
                const exclusions = processExclusionData(response.data.data);
                setExclusionTimes(exclusions);
            }
        } catch (error) {
            console.error('Error fetching exclusions for the date:', error);
        }
    };

    useEffect(() => {
        fetchSchedules();
        fetchExclusionMonthly();
    }, [typeId]);

    const processSchedules = (schedules: any[]): void => {
        if (!Array.isArray(schedules) || schedules.length === 0) {
            setAvailableDates(new Set());
            setAvailableTimes({});
            return;
        }

        const times: { [date: string]: { timeRange: string; scheduleId: string; disabled: boolean }[] } = {};
        const dates = new Set<string>();
        const now = dayjs();
        const startDate = now.startOf('day');
        const endDate = startDate.add(1, 'year');

        for (let date = startDate; date.isBefore(endDate, 'day'); date = date.add(1, 'day')) {
            const formattedDate = date.format('YYYY-MM-DD');
            const dayName = date.locale('en').format('dddd').toLowerCase();

            schedules.forEach((schedule: any) => {
                if (schedule[dayName]) {
                    if (!times[formattedDate]) {
                        times[formattedDate] = [];
                    }

                    const timeRange = `${schedule.startTime[0].toString().padStart(2, '0')}:${schedule.startTime[1]
                        .toString()
                        .padStart(2, '0')} - ${schedule.endTime[0].toString().padStart(2, '0')}:${schedule.endTime[1]
                            .toString()
                            .padStart(2, '0')}`;
                    times[formattedDate].push({
                        timeRange,
                        scheduleId: schedule.id,
                        disabled: false,
                    });

                    dates.add(formattedDate);
                }
            });
        }

        setAvailableDates(dates);
        setAvailableTimes(times);

        // Debugging output
        console.log('Available Dates:', dates);
        console.log('Available Times:', times);
    };

    const processExclusionData = (exclusionData: any[]) => {
        const exclusionTimes: { [date: string]: { timeRange: string; disabled: boolean }[] } = {};

        exclusionData.forEach((exclusion) => {
            const startDate = dayjs(exclusion.startDate);
            const endDate = dayjs(exclusion.endDate);
            const startTime = dayjs().hour(exclusion.startTime[0]).minute(exclusion.startTime[1]);
            const endTime = dayjs().hour(exclusion.endTime[0]).minute(exclusion.endTime[1]);

            let currentDate = startDate;
            while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
                const formattedDate = currentDate.format('YYYY-MM-DD');
                if (!exclusionTimes[formattedDate]) {
                    exclusionTimes[formattedDate] = [];
                }

                const timeRange = `${startTime.format('HH:mm')} - ${endTime.format('HH:mm')}`;
                exclusionTimes[formattedDate].push({
                    timeRange,
                    disabled: true,
                });

                currentDate = currentDate.add(1, 'day');
            }
        });

        // Debugging output
        console.log('Exclusion Times:', exclusionTimes);

        return exclusionTimes;
    };



    const checkDisabledDates = () => {
        if (!availableDates.size || !availableTimes) {
            return;
        }

        const newAvailableDates = new Set<string>();

        availableDates.forEach((date) => {
            const dateFormatted = date;
            const timeSlots = availableTimes[dateFormatted] || [];

            // Cek apakah ada satu timeslot yang aktif/tidak ter-disable
            const isAnySlotActive = timeSlots.some((slot) => {
                const exclusion = exclusionTimes[dateFormatted]?.some((exclusion) => exclusion.disabled);
                return !exclusion && !slot.disabled; // Pastikan slot aktif (tidak ter-disable)
            });

            if (isAnySlotActive) {
                newAvailableDates.add(dateFormatted);
            }
        });

        if (newAvailableDates.size !== availableDates.size) {
            setAvailableDates(newAvailableDates);
        }
    };


    useEffect(() => {
        if (dataLoaded) {
            checkDisabledDates();
        }
    }, [availableDates, availableTimes, exclusionTimes, dataLoaded]);

    useEffect(() => {
        if (!dataLoaded && availableDates.size && availableTimes) {
            setDataLoaded(true);
        }
    }, [availableDates, availableTimes, exclusionTimes, dataLoaded]);


    const handleDateSelect = (newDate: Dayjs) => {
        setSelectedDate(newDate);
        fetchExclusion(newDate);
        setSelectedTimeRange(null);
        setInputValue('');
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
        const formattedDate = dayjs(selectedDate).format('DD/MMM/YYYY');
        const timeRange = selectedTimeRange.split(' - ').join(' - ');
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
                                onChange={handleDateSelect}
                                shouldDisableDate={(date) => {
                                    if (!dataLoaded) return false;
                                    const formattedDate = date.format('YYYY-MM-DD');
                                    // Pastikan jika tidak ada exclusion dan tanggal tersebut ada dalam availableDates
                                    return !availableDates.has(formattedDate) || exclusionTimes[formattedDate]?.some(exclusion => exclusion.disabled);
                                }}

                                slotProps={{
                                    day: {
                                        sx: {
                                            '&.Mui-selected': {
                                                backgroundColor: 'transparent !important',
                                                border: '1px solid #8F85F3 !important',
                                                color: 'black',
                                                '&:hover': {
                                                    border: '1px solid #8F85F3 !important',
                                                },
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
                                        disabled={disabled || exclusionTimes[selectedDate.format('YYYY-MM-DD')]?.some(exclusion => {
                                            // const [exclusionStartTime, exclusionEndTime] = exclusion.timeRange.split(' - ');
                                            // const [scheduleStartTime, scheduleEndTime] = timeRange.split(' - ');

                                            // const exclusionStartHour = parseInt(exclusionStartTime.split(':')[0]);
                                            // const exclusionEndHour = parseInt(exclusionEndTime.split(':')[0]);
                                            // const scheduleStartHour = parseInt(scheduleStartTime.split(':')[0]);
                                            // const scheduleEndHour = parseInt(scheduleEndTime.split(':')[0]);

                                            // return exclusion.disabled && !isActive;
                                            return exclusion.disabled;
                                        })}
                                        sx={{
                                            width: '100%',
                                            padding: 1,
                                            height: '60px',
                                            borderRadius: '100px',
                                            bgcolor: 'transparent',
                                            color: '#0A0A0D',
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            alignItems: 'center',
                                            border: selectedTimeRange === timeRange ? '1px solid #7367F0' : 'none',
                                            '&:hover': {
                                                border: '1px solid #7367F0',
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
                            Batal
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
