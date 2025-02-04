/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, InputBase, Popover, IconButton, Button } from '@mui/material';
import { ExpandMoreOutlined } from '@mui/icons-material';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const CustomTimePicker = ({ typeId, onChange }: { typeId: string; onChange: (scheduleId: string, schedule: string) => void; }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedDate] = useState<Dayjs | null>(dayjs());
    // const [inputValue, setInputValue] = useState<string>('');
    const [availableTimes, setAvailableTimes] = useState<{ [date: string]: { timeRange: string, scheduleId: string, disabled: boolean }[] }>({});
    const [exclusionTimes, setExclusionTimes] = useState<{ [date: string]: { timeRange: string, disabled: boolean }[] }>({});
    const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);
    const [selectedTimeRange, setSelectedTimeRange] = useState<string | null>(null);
    const [maxCapacities, setMaxCapacities] = useState<{ id: any, maxCapacity: number }[]>([]);
    const [fullBook, setFullBook] = useState<boolean[]>([]);

    const fetchSchedules = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/schedule-interval/by-type-id/daily?`, {
                params: {
                    typeId,
                    date: dayjs().date(),
                    month: dayjs().month() + 1,
                    year: dayjs().year(),
                },
            });
            console.log(response)
            const capacities = response.data.data.map((item: { id: any; maxCapacity: any; }) => ({
                id: item.id,
                maxCapacity: item.maxCapacity
            }));
            setMaxCapacities(capacities);
            const initialItems = new Array(capacities.length).fill(false);
            setFullBook(initialItems);
            console.log('KAPASITAS: ', capacities);

            if (Array.isArray(response.data.data)) {
                const times = response.data.data.reduce((acc: { [date: string]: { timeRange: string, scheduleId: string, disabled: boolean }[] }, schedule: any) => {
                    const formattedDate = dayjs(schedule.date).format('YYYY-MM-DD');
                    if (!acc[formattedDate]) acc[formattedDate] = [];
                    const startTime = dayjs().hour(schedule.startTime[0]).minute(schedule.startTime[1]).format('HH:mm');
                    const endTime = dayjs().hour(schedule.endTime[0]).minute(schedule.endTime[1]).format('HH:mm');

                    const timeRange = `${startTime} - ${endTime}`;
                    acc[formattedDate].push({
                        timeRange,
                        scheduleId: schedule.id,
                        disabled: false,
                    });
                    return acc;
                }, {});
                setAvailableTimes(times);
            }
        } catch (error) {
            console.error('Error fetching schedules:', error);
        }
    };

    const fetchExclusion = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/exclusion-interval/by-type-id/daily?`, {
                params: {
                    typeId,
                    date: dayjs().date(),
                    month: dayjs().month() + 1,
                    year: dayjs().year(),
                },
            });
            if (Array.isArray(response.data.data)) {
                const exclusions = response.data.data.reduce((acc: { [date: string]: { timeRange: string, disabled: boolean }[] }, exclusion: any) => {
                    const formattedDate = dayjs(exclusion.date).format('YYYY-MM-DD');
                    if (!acc[formattedDate]) acc[formattedDate] = [];

                    const startTime = dayjs().hour(exclusion.startTime[0]).minute(exclusion.startTime[1]).format('HH:mm');
                    const endTime = dayjs().hour(exclusion.endTime[0]).minute(exclusion.endTime[1]).format('HH:mm');

                    acc[formattedDate].push({
                        timeRange: `${startTime} - ${endTime}`,
                        disabled: true,
                    });
                    return acc;
                }, {});
                setExclusionTimes(exclusions);
            }
        } catch (error) {
            console.error('Error fetching exclusions:', error);
        }
    };

    const fetchCapacity = async (scheduleIntervalId: any, maxCapacity: number, index: number) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/registration/by-schedule-interval-id/by-schedule-date?`, {
                params: {
                    scheduleIntervalId,
                    date: dayjs().date(),
                    month: dayjs().month() + 1,
                    year: dayjs().year(),
                },
            });

            console.log('compare: ', response.data.data);

            const currentCapacity = response.data.data;
            // for (let index = 0; index < maxCapacities.length; index++) {
            // console.log('index: ', index)
            if (currentCapacity >= maxCapacity) {
                console.log(`Schedule ID ${scheduleIntervalId} sudah full book!`);
                const newItems = [...fullBook];
                newItems[index] = true;
                setFullBook(newItems);
            } else {
                console.log(`Schedule ID ${scheduleIntervalId} masih sisa book!`);
                const newItems = [...fullBook];
                newItems[index] = false;
                setFullBook(newItems);
            }
            // }
            console.log('hasil: ', fullBook);
            console.log('index: ', index);
        } catch (error) {
            console.error('Error fetching exclusions:', error);
        }
    };

    useEffect(() => {
        fetchSchedules();
        fetchExclusion();
    }, [typeId]);

    useEffect(() => {
        for (let index = 0; index < maxCapacities.length; index++) {
            const { id, maxCapacity } = maxCapacities[index];
            fetchCapacity(id, maxCapacity, index);
        }
    }, [maxCapacities]);


    useEffect(() => {
        console.log('yyyy: ', fullBook);
    })

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleTimeSelect = (timeRange: string, scheduleId: string) => {
        // const formattedDate = selectedDate?.locale('id').format('DD MMMM YYYY');
        // const selectedTime = `${formattedDate} ${timeRange}`;
        // setInputValue(selectedTime);
        setSelectedScheduleId(scheduleId);
        setSelectedTimeRange(timeRange);
    };

    const handleSave = () => {
        if (selectedScheduleId && selectedTimeRange) {
            const selectedSchedule = `${selectedTimeRange}`;
            console.log(`Saving: ScheduleId: ${selectedScheduleId}, TimeRange: ${selectedSchedule}`);
            onChange(selectedScheduleId, selectedSchedule);
            handleClose();
        } else {
            console.log("Error: Schedule ID or Time Range not selected");
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
                <InputBase
                    value={selectedTimeRange}
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
                    <Box sx={{ display: 'flex', padding: 2, minWidth: '250px', maxWidth: 'fit-content' }}>
                        <Box sx={{ minWidth: '200px', overflowY: 'auto', maxHeight: '300px', padding: '0 10px' }}>
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                                {selectedDate && availableTimes[selectedDate.format('YYYY-MM-DD')]?.map((item, index) => (
                                    <Button
                                        key={item.scheduleId}
                                        onClick={() => handleTimeSelect(item.timeRange, item.scheduleId)}
                                        variant="text"
                                        disabled={item.disabled || exclusionTimes[selectedDate.format('YYYY-MM-DD')]?.some(exclusion => exclusion.disabled) || fullBook[index]}
                                        sx={{
                                            maxWidth: '200px',
                                            padding: 1,
                                            height: '60px',
                                            borderRadius: '100px',
                                            bgcolor: 'transparent',
                                            color: '#0A0A0D',
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            alignItems: 'center',
                                            border: selectedTimeRange === item.timeRange ? '1px solid #7367F0' : 'none',
                                            '&:hover': {
                                                border: '1px solid #7367F0',
                                            },
                                        }}
                                    >
                                        {item.timeRange}
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

export default CustomTimePicker;
