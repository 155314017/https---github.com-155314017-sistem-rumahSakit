/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, InputBase, Popover, IconButton, Button, Grid } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import { ExpandMoreOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import 'dayjs/locale/id';
dayjs.locale('id');


const dummyMonthlySchedule = {
    daysOfWeek: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
    },
    exclusionInterval: [
        { date: '2025-01-18', allday: true },
        { date: '2025-01-15', allday: true },
    ],
};

const dummyDailySchedule = {
    scheduleInterval: [
        {
            intervalId: 1,
            startTime: '08:00',
            endTime: '12:00',
            monday: true,
            tuesday: true,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
        },
        {
            intervalId: 2,
            startTime: '13:00',
            endTime: '17:00',
            monday: true,
            tuesday: false,
            wednesday: true,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
        },
        {
            intervalId: 3,
            startTime: '09:00',
            endTime: '11:00',
            monday: false,
            tuesday: true,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
        },
        {
            intervalId: 4,
            startTime: '14:00',
            endTime: '16:00',
            monday: false,
            tuesday: true,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
        },
        {
            intervalId: 5,
            startTime: '10:00',
            endTime: '13:00',
            monday: false,
            tuesday: false,
            wednesday: true,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
        },
        {
            intervalId: 6,
            startTime: '15:00',
            endTime: '18:00',
            monday: false,
            tuesday: false,
            wednesday: true,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
        },
        {
            intervalId: 7,
            startTime: '08:00',
            endTime: '10:00',
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: true,
            friday: false,
            saturday: false,
            sunday: false,
        },
        {
            intervalId: 8,
            startTime: '11:00',
            endTime: '13:00',
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: true,
            friday: false,
            saturday: false,
            sunday: false,
        },
        {
            intervalId: 9,
            startTime: '09:00',
            endTime: '12:00',
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: true,
            saturday: false,
            sunday: false,
        },
        {
            intervalId: 10,
            startTime: '14:00',
            endTime: '17:00',
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: true,
            saturday: false,
            sunday: false,
        },
        {
            intervalId: 11,
            startTime: '10:00',
            endTime: '12:00',
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: true,
            sunday: true,
        },
        {
            intervalId: 12,
            startTime: '13:00',
            endTime: '15:00',
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: true,
            sunday: true,
        },
        {
            intervalId: 13,
            startTime: '08:00',
            endTime: '11:00',
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: true,
        },
        {
            intervalId: 14,
            startTime: '14:00',
            endTime: '16:00',
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: true,
        },
    ],
    exclusionInterval: [
        // { date: '2025-01-01', scheduleIntervalId: 1, allday: false },
        { date: '2025-01-08', scheduleIntervalId: 2, allday: false },
        { date: '2025-01-22', scheduleIntervalId: 5, allday: false },
    ],
};

const CustomCalender = ({ doctorId, onChange }: { doctorId: string; onChange: (scheduleId: string, schedule: string) => void; }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
    const [selectedTimeRange, setSelectedTimeRange] = useState<string | null>(null);
    const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [availableTimes, setAvailableTimes] = useState<{ [date: string]: { timeRange: string, scheduleId: string }[] }>({});
    const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());

    useEffect(() => {
        processSchedules(dummyMonthlySchedule, dummyDailySchedule);
    }, []);

    const processSchedules = (
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        monthlyData: { daysOfWeek?: { [key: string]: boolean }; exclusionInterval: any[] },
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        dailyData: { scheduleInterval: any[]; exclusionInterval: any[] }
    ): void => {
        const times: { [date: string]: { timeRange: string; scheduleId: string; disabled: boolean }[] } = {};
        const dates = new Set<string>();
        const now = dayjs();

        const startDate = now.startOf('day');
        const endDate = startDate.add(1, 'year');

        for (let date = startDate; date.isBefore(endDate, 'day'); date = date.add(1, 'day')) {
            const formattedDate = date.format('YYYY-MM-DD');
            const dayName = date.locale('en').format('dddd').toLowerCase();

            if (monthlyData.daysOfWeek?.[dayName]) {
                dates.add(formattedDate);
            }

            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            // biome-ignore lint/complexity/noForEach: <explanation>
                        dailyData.scheduleInterval.forEach((schedule: any) => {
                if (schedule[dayName]) {
                    if (!times[formattedDate]) {
                        times[formattedDate] = [];
                    }

                    // const scheduleStart = date.set('hour', parseInt(schedule.startTime.split(':')[0])).set('minute', parseInt(schedule.startTime.split(':')[1]));
                    // biome-ignore lint/style/useNumberNamespace: <explanation>
                                        const scheduleEnd = date.set('hour', parseInt(schedule.endTime.split(':')[0])).set('minute', parseInt(schedule.endTime.split(':')[1]));
                    const isPast = scheduleEnd.isBefore(now);

                    // Periksa apakah waktu ini ada di exclusionInterval
                    const isExcluded = dailyData.exclusionInterval.some(
                        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                        (exclusion: any) =>
                            exclusion.date === formattedDate &&
                            exclusion.scheduleIntervalId === schedule.intervalId &&
                            exclusion.allday === false
                    );

                    times[formattedDate].push({
                        timeRange: `${schedule.startTime} - ${schedule.endTime}`,
                        scheduleId: schedule.intervalId.toString(),
                        disabled: isPast || isExcluded, // Disable jika waktu sudah lewat atau ada di exclusion
                    });
                }
            });
        }

        // Handle tanggal dengan exclusion allday: true
        // biome-ignore lint/complexity/noForEach: <explanation>
                monthlyData.exclusionInterval.forEach(({ date, allday }: any) => {
            const formattedDate = dayjs(date).format('YYYY-MM-DD');
            if (allday) {
                dates.delete(formattedDate); // Jika allday true, hapus tanggal
                delete times[formattedDate];
            }
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
            <Box>
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
                                onChange={(newValue) => {
                                    setSelectedDate(newValue);
                                    setSelectedTimeRange(null);
                                    setInputValue('');
                                }}
                                shouldDisableDate={(date) => !availableDates.has(date.format('YYYY-MM-DD'))}
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
                                    gridTemplateColumns: 'repeat(3, 1fr)', // Maksimal 3 kolom
                                    gap: '10px', // Jarak antar tombol
                                }}
                            >
                                {selectedDate && availableTimes[selectedDate.format('YYYY-MM-DD')]?.map(({ timeRange, scheduleId, disabled }) => (
                                    <Button
                                        key={timeRange}
                                        onClick={() => handleTimeSelect(timeRange, scheduleId)}
                                        variant="text"
                                        disabled={disabled} // Tambahkan properti disabled
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

export default CustomCalender;
