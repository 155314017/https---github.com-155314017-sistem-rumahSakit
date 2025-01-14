/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useRef, useEffect, type MouseEvent } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '@fullcalendar/common/main.css';
import 'dayjs/locale/id';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import {
    Container,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box,
    Select,
    MenuItem,
    FormControl,
    Menu,
    Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { DateCalendar, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import CardJadwalPraktek from '../small/card/CardJadwalPraktek';
import CardJadwalExclusion from '../small/card/CardJadwalExclusion';
import DropdownList from '../small/dropdownlist/DropdownList';
import DropdownListTime from '../small/dropdownlist/DropdownListTime';
import { CloseOutlined } from '@mui/icons-material';

// Interface Event
interface Event {
    id: string;
    title: string;
    start: string;
    end?: string;
    allDay?: boolean;
    type?: string;
    senin?: boolean;
    selasa?: boolean;
    rabu?: boolean;
    kamis?: boolean;
    jumat?: boolean;
    sabtu?: boolean;
    minggu?: boolean;
    notes?: string;
}

// Styled Dialog with slide animations
const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        position: 'fixed',
        top: 0,
        right: 0,
        margin: 0,
        borderTopLeftRadius: '16px',
        borderBottomLeftRadius: '16px',
        minHeight: '100%',
        width: '40vw',
        maxWidth: 'none',
        boxShadow: theme.shadows[5],
        animation: 'slideIn 0.5s ease-out',
        '&.slideOut': {
            animation: 'slideOut 0.5s ease-in forwards',
        },
    },
}));

// Operational hours
const jamOperasional = [
    { value: "07:00 am", label: "07:00 am" },
    { value: "08:00 am", label: "08:00 am" },
    { value: "09:00 am", label: "09:00 am" },
    { value: "10:00 am", label: "10:00 am" },
    { value: "11:00 am", label: "11:00 am" },
    { value: "12:00 pm", label: "12:00 pm" },
    { value: "01:00 pm", label: "01:00 pm" },
    { value: "02:00 pm", label: "02:00 pm" },
    { value: "03:00 pm", label: "03:00 pm" },
    { value: "04:00 pm", label: "04:00 pm" },
    { value: "05:00 pm", label: "05:00 pm" },
    { value: "06:00 pm", label: "06:00 pm" },
    { value: "07:00 pm", label: "07:00 pm" },
    { value: "08:00 pm", label: "08:00 pm" },
    { value: "09:00 pm", label: "09:00 pm" },
];

// Keyframes for animations
const GlobalStyles = styled('style')`
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;

// Styled Container for FullCalendar
const StyledContainer = styled(Container)(({ theme }) => ({
    borderRadius: '16px',
    minWidth: '100%',
    padding: theme.spacing(4),
    '& .fc-event': {
        backgroundColor: '#8F85F3',
        border: 'none',
        borderRadius: theme.shape.borderRadius,
        color: '#fff',
        fontSize: '0.875rem',
        alignItems: 'center',
        justifyContent: 'center',
    },
    '& .fc-timegrid-slot': {
        borderBottom: '1px solid #e0e0e0',
    },
    '& .fc-daygrid-day-number': {
        color: 'black',
    },
    '& .fc-col-header-cell': {
        border: 'none',
        textAlign: 'center',
    },
}));

const TestKalender: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([
        {
            id: '1',
            title: 'Praktek',
            start: dayjs().add(1, 'day').format('YYYY-MM-DDT10:00:00'),
            end: dayjs().add(1, 'day').format('YYYY-MM-DDT11:00:00'),
            type: 'Praktek',
            senin: true,
            selasa: false,
            rabu: true,
            kamis: true,
            jumat: false,
            sabtu: false,
            minggu: false,
        },
        {
            id: '2',
            title: 'Praktek',
            start: dayjs().subtract(1, 'day').format('YYYY-MM-DDT09:00:00'),
            end: dayjs().subtract(1, 'day').format('YYYY-MM-DDT17:00:00'),
            type: 'Praktek',
            senin: false,
            selasa: false,
            rabu: false,
            kamis: false,
            jumat: false,
            sabtu: false,
            minggu: false,
        },
    ]);
    const [open, setOpen] = useState(false);
    const [openExclusion, setOpenExclusion] = useState(false);
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [closeAnimation, setCloseAnimation] = useState(false);
    const [newEvent, setNewEvent] = useState({
        type: 'Praktek',
        startTime: '',
        endTime: '',
        senin: false,
        selasa: false,
        rabu: false,
        kamis: false,
        jumat: false,
        sabtu: false,
        minggu: false,
        notes: '',
    });
    const [newExclusion, setNewExclusion] = useState({
        exclusionTitle: '',
        exclusionDateStart: '',
        exclusionTimeStart: '',
        exclusionDateEnd: '',
        exclusionTimeEnd: '',
        exclusionNotes: '',
    });
    const [currentView, setCurrentView] = useState<string>('dayGridMonth');
    const calendarRef = useRef<FullCalendar>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const [errorPraktek, setErrorPraktek] = useState<string>('');
    const [errorExclusion, setErrorExclusion] = useState<string>('');

    const days = [
        { label: 'Min', value: 'minggu' },
        { label: 'Sen', value: 'senin' },
        { label: 'Sel', value: 'selasa' },
        { label: 'Rab', value: 'rabu' },
        { label: 'Kam', value: 'kamis' },
        { label: 'Jum', value: 'jumat' },
        { label: 'Sab', value: 'sabtu' },
    ];

    const tipeJadwal = [
        { value: 1, label: "Praktek" },
        { value: 2, label: "Pengecualian" },
    ];

    // Log formatted current date whenever it changes
    useEffect(() => {
        console.log('Tanggal yang diformat: ', currentDate.format('dddd, D MMMM YYYY'));
    }, [currentDate]);

    // Mengarahkan FullCalendar ke currentDate setiap kali currentDate berubah
    useEffect(() => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.gotoDate(currentDate.format('YYYY-MM-DD'));
        }
    }, [currentDate]);

    // Render event content
    const renderEventContent = (eventInfo: any) => {
        return (
            <div style={{ textAlign: 'center' }}>
                <strong>{eventInfo.event.title}</strong>
            </div>
        );
    };

    const handleEventChange = (field: keyof typeof newEvent, value: string | boolean) => {
        setNewEvent({ ...newEvent, [field]: value });
    };

    const handleExclusionChange = (field: keyof typeof newExclusion, value: string) => {
        setNewExclusion({ ...newExclusion, [field]: value });
    };


    // Handlers untuk menu
    const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Handler untuk memilih jenis modal
    const handleMenuSelect = (type: 'Praktek' | 'Pengecualian') => {
        handleMenuClose();
        if (type === 'Praktek') {
            setCloseAnimation(false);
            setOpen(true);
            setOpenExclusion(false);
        } else if (type === 'Pengecualian') {
            setCloseAnimation(false);
            setOpenExclusion(true);
            setOpen(false);
        }
    };

    // Handler untuk memilih tipe jadwal dari DropdownList
    const handleChangeTipeJadwal = (value: string) => {
        if (value === 'Praktek') {
            setCloseAnimation(false);
            setOpen(true);
            setOpenExclusion(false);
        } else if (value === 'Pengecualian') {
            setCloseAnimation(false);
            setOpenExclusion(true);
            setOpen(false);
        }
    };

    // Validasi untuk Praktek
    const validatePraktek = () => {
        const { type, startTime, endTime } = newEvent;
        const isAnyDaySelected = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'].some(day => newEvent[day as keyof typeof newEvent]);
        if (!type || !startTime || !endTime || !isAnyDaySelected) {
            setErrorPraktek('Harap isi tipe jadwal, waktu mulai, waktu selesai, dan pilih setidaknya satu hari.');
            return false;
        }
        const start = dayjs(startTime, ['hh:mm a', 'hh:mm A']);
        const end = dayjs(endTime, ['hh:mm a', 'hh:mm A']);
        if (end.isBefore(start)) {
            setErrorPraktek('Waktu selesai tidak boleh sebelum waktu mulai.');
            return false;
        }
        setErrorPraktek('');
        return true;
    };

    // Validasi untuk Pengecualian
    const validateExclusion = () => {
        const { exclusionTitle, exclusionDateStart, exclusionTimeStart, exclusionDateEnd, exclusionTimeEnd } = newExclusion;
        if (!exclusionTitle || !exclusionDateStart || !exclusionTimeStart) {
            setErrorExclusion('Harap isi judul, tanggal mulai, dan waktu mulai.');
            return false;
        }
        if (exclusionDateEnd && exclusionTimeEnd) {
            const startDateTime = dayjs(`${exclusionDateStart}T${exclusionTimeStart}`);
            const endDateTime = dayjs(`${exclusionDateEnd}T${exclusionTimeEnd}`);
            if (endDateTime.isBefore(startDateTime)) {
                setErrorExclusion('Tanggal selesai tidak boleh sebelum tanggal mulai.');
                return false;
            }
        }
        setErrorExclusion('');
        return true;
    };

    // Handlers for closing modals with animation
    const handleClosePraktek = () => {
        setCloseAnimation(true);
        setTimeout(() => {
            setOpen(false);
            setNewEvent({
                type: 'Praktek',
                startTime: '',
                endTime: '',
                senin: false,
                selasa: false,
                rabu: false,
                kamis: false,
                jumat: false,
                sabtu: false,
                minggu: false,
                notes: '',
            });
            setErrorPraktek('');
        }, 500);
    };

    const handleCloseExclusion = () => {
        setCloseAnimation(true);
        setTimeout(() => {
            setOpenExclusion(false);
            setNewExclusion({
                exclusionTitle: '',
                exclusionDateStart: '',
                exclusionTimeStart: '',
                exclusionDateEnd: '',
                exclusionTimeEnd: '',
                exclusionNotes: '',
            });
            setErrorExclusion('');
        }, 500);
    };

    // Handlers for form changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        handleEventChange(name as keyof typeof newEvent, value);
    };

    const handleChangeExclusion = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        handleExclusionChange(name as keyof typeof newExclusion, value);
    };

    // Toggle hari
    const toggleDay = (day: string) => {
        handleEventChange(day as keyof typeof newEvent, !newEvent[day as keyof typeof newEvent]);
    };

    // Calendar navigation
    const handlePrev = () => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.prev();
            setCurrentDate(dayjs(calendarApi.getDate()));
        }
    };

    const handleNext = () => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.next();
            setCurrentDate(dayjs(calendarApi.getDate()));
        }
    };

    // Function to calculate the next date based on selected day
    const getNextDateForDay = (dayValue: string): string => {
        const daysMap: { [key: string]: number } = {
            'senin': 1,
            'selasa': 2,
            'rabu': 3,
            'kamis': 4,
            'jumat': 5,
            'sabtu': 6,
            'minggu': 0,
        };
        const targetDay = daysMap[dayValue];
        const today = currentDate.day(); // day() returns 0 (Sun) to 6 (Sat)
        let daysToAdd = targetDay - today;
        if (daysToAdd < 0) daysToAdd += 7;
        const targetDate = currentDate.add(daysToAdd, 'day');
        return targetDate.format('YYYY-MM-DD');
    };

    // Adding new event (Praktek)
    const handleAddEvent = () => {
        if (validatePraktek()) {
            const { type, startTime, endTime, notes } = newEvent;
            const selectedDaysArray = Object.keys(newEvent).filter(day => 
                ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'].includes(day) && newEvent[day as keyof typeof newEvent]
            );

            const newEvents: Event[] = selectedDaysArray.map((day, index) => {
                const date = getNextDateForDay(day);
                // Convert time to 24-hour format
                const startTime24 = dayjs(startTime, ['hh:mm a', 'hh:mm A']).format('HH:mm:ss');
                const endTime24 = dayjs(endTime, ['hh:mm a', 'hh:mm A']).format('HH:mm:ss');
                return {
                    id: (events.length + index + 1).toString(),
                    title: type, // Menggunakan 'type' sebagai 'title' di FullCalendar
                    start: `${date}T${startTime24}`,
                    end: `${date}T${endTime24}`,
                    type: type,
                    [day]: true,
                    notes: notes,
                };
            });

            setEvents([...events, ...newEvents]);

            // Cetak data ke konsol
            console.log('Events Praktek Ditambahkan:', newEvents);

            handleClosePraktek();
        }
    };

    // Adding exclusion (Pengecualian)
    const handleAddExclusion = () => {
        if (validateExclusion()) {
            const { exclusionTitle, exclusionDateStart, exclusionTimeStart, exclusionDateEnd, exclusionTimeEnd, exclusionNotes } = newExclusion;

            const startDateTime = `${exclusionDateStart}T${exclusionTimeStart}`;
            const endDateTime = exclusionDateEnd && exclusionTimeEnd ? `${exclusionDateEnd}T${exclusionTimeEnd}` : undefined;

            const exclusionToAdd: Event = {
                id: (events.length + 1).toString(),
                title: exclusionTitle,
                start: startDateTime,
                end: endDateTime,
                allDay: false,
                notes: exclusionNotes,
            };

            setEvents([...events, exclusionToAdd]);

            // Cetak data ke konsol
            console.log('Event Pengecualian Ditambahkan:', exclusionToAdd);

            handleCloseExclusion();
        }
    };

    // Handle view change
    const handleViewChange = (view: string) => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.changeView(view);
        }
        setCurrentView(view);
    };

    // Initialize calendar date to currentDate on mount
    useEffect(() => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.gotoDate(currentDate.format('YYYY-MM-DD'));
        }
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <>
            <GlobalStyles />

            <Box
                bgcolor={'white'}
                width={'94%'}
                ml={'2%'}
                border={'1px solid #C5C5D3'}
                borderRadius={'16px'}
                padding={0}
            >
                <StyledContainer>
                    {/* Header */}
                    <Box
                        maxWidth={'100%'}
                        display={'flex'}
                        flexDirection={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        mb={'2%'}
                    >
                        <Typography variant="h6">Jadwal Praktek</Typography>
                        <Box>
                            <Button
                                variant="contained"
                                onClick={handleMenuOpen}
                                sx={{ bgcolor: '#8F85F3', color: 'white' }}
                            >
                                Tambah Jadwal
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={handleMenuClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem onClick={() => handleMenuSelect('Praktek')}>Praktek</MenuItem>
                                <MenuItem onClick={() => handleMenuSelect('Pengecualian')}>Pengecualian</MenuItem>
                            </Menu>
                        </Box>
                    </Box>

                    {/* Main Content */}
                    <Box display="flex" flexDirection="row" gap={4}>
                        {/* Sidebar */}
                        <Box width="35%" display="flex" flexDirection="column" gap={3}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="id">
                                <Box
                                    sx={{
                                        border: '1px solid #C5C5D3',
                                        borderRadius: '16px',
                                        padding: 2
                                    }}
                                >
                                    <DateCalendar
                                        value={currentDate}
                                        onMonthChange={(newMonth) => {
                                            setCurrentDate(newMonth);
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
                                        onChange={(value) => {
                                            if (value) {
                                                setCurrentDate(value);
                                            }
                                        }}
                                    />
                                </Box>
                            </LocalizationProvider>
                            <CardJadwalPraktek />
                            <CardJadwalExclusion />
                        </Box>

                        {/* Calendar */}
                        <Box
                            width="85%"
                            display="flex"
                            flexDirection="column"
                            gap={3}
                            padding={'8px 0'}
                            borderRadius={'16px'}
                        >
                            {/* Calendar Header */}
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box display="flex" alignItems="center" gap={2}>
                                    <Typography variant="h5">{currentDate.format('dddd, D MMMM YYYY')}</Typography>
                                    <Box display="flex" gap={0}>
                                        <NavigateBeforeIcon sx={{ cursor: 'pointer' }} onClick={handlePrev} />
                                        <NavigateNextIcon sx={{ cursor: 'pointer' }} onClick={handleNext} />
                                    </Box>
                                </Box>
                                <Box display="flex" alignItems="center" flexDirection={'row'} gap={2}>
                                    <Typography fontSize={'16px'} fontWeight={600} lineHeight={'18px'}>Format</Typography>
                                    <FormControl size="small">
                                        <Select
                                            value={currentView}
                                            onChange={(e) => handleViewChange(e.target.value as string)}
                                            sx={{
                                                minWidth: '200px',
                                                minHeight: '38px',
                                                borderRadius: '8px',
                                                border: '1px solid #A8A8BD',
                                            }}
                                        >
                                            <MenuItem sx={{ color: '#8F85F3' }} value="dayGridMonth">Bulan</MenuItem>
                                            <MenuItem sx={{ color: '#8F85F3' }} value="timeGridWeek">Minggu</MenuItem>
                                            <MenuItem sx={{ color: '#8F85F3' }} value="timeGridDay">Hari</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>

                            {/* FullCalendar */}
                            <FullCalendar
                                ref={calendarRef}
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                initialView={currentView}
                                locale="id"
                                timeZone="local"
                                headerToolbar={false}
                                height="85vh"
                                events={events}
                                selectable
                                dayMaxEvents
                                eventContent={renderEventContent}
                                editable
                            />
                        </Box>
                    </Box>

                    {/* Modal Tambah Jadwal Praktek */}
                    <StyledDialog
                        open={open}
                        onClose={handleClosePraktek}
                        classes={{ paper: closeAnimation ? 'slideOut' : '' }}
                    >
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            maxWidth={'95%'}
                        >
                            <DialogTitle>Tambah Jadwal Baru</DialogTitle>
                            <CloseOutlined sx={{ cursor: 'pointer' }} onClick={handleClosePraktek} />
                        </Box>
                        <DialogContent>
                            <Box display="flex" flexDirection="column" gap={2}>
                                {/* Tipe Jadwal */}
                                <Typography>Tipe Jadwal</Typography>
                                <DropdownList
                                    defaultValue='Praktek'
                                    onChange={handleChangeTipeJadwal}
                                    loading={false}
                                    options={tipeJadwal}
                                    placeholder='Pilih tipe jadwal'
                                />

                                {/* Waktu Mulai dan Selesai */}
                                <Box
                                    borderRadius={'16px'}
                                    padding={2}
                                    border={'1px solid #C5C5D3'}
                                    display="flex"
                                    gap={2}
                                    flexDirection={'row'}
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                >
                                    <Typography fontSize={'16px'} fontWeight={600} lineHeight={'18px'}>Jam</Typography>
                                    <Box display="flex" gap={2} flexDirection={'row'}>
                                        <DropdownListTime
                                            placeholder='Jam mulai'
                                            loading={false}
                                            options={jamOperasional}
                                            onChange={(value) => handleEventChange('startTime', value)}
                                        />
                                        <DropdownListTime
                                            placeholder='Jam selesai'
                                            loading={false}
                                            options={jamOperasional}
                                            onChange={(value) => handleEventChange('endTime', value)}
                                        />
                                    </Box>
                                </Box>

                                {/* Pilihan Hari */}
                                <Box
                                    display="flex"
                                    gap={2}
                                    flexDirection={'column'}
                                    border={'1px solid #C5C5D3'}
                                    borderRadius={'16px'}
                                    padding={2}
                                >
                                    <Typography fontSize={'16px'} fontWeight={600} lineHeight={'18px'}>Ulang pada hari</Typography>
                                    <Box display={'flex'} flexDirection={'row'} gap={2}>
                                        {days.map((day) => (
                                            <Button
                                                key={day.value}
                                                onClick={() => toggleDay(day.value)}
                                                sx={{
                                                    border: '1px solid #8F85F3',
                                                    color: newEvent[day.value as keyof typeof newEvent] ? '#fff' : '#8F85F3',
                                                    backgroundColor: newEvent[day.value as keyof typeof newEvent] ? '#8F85F3' : 'transparent',
                                                    borderRadius: '16px',
                                                    padding: 1,
                                                    '&:hover': {
                                                        bgcolor: '#8F85F3',
                                                        color: 'white',
                                                    },
                                                    transition: 'background-color 0.3s, color 0.3s',
                                                }}
                                            >
                                                {day.label}
                                            </Button>
                                        ))}
                                    </Box>
                                </Box>

                                {/* Catatan */}
                                <TextField
                                    name="notes"
                                    placeholder="Masukkan catatan"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            borderRadius: '16px',
                                        },
                                    }}
                                    value={newEvent.notes}
                                    onChange={handleChange}
                                />
                                {errorPraktek && <Alert severity="error">{errorPraktek}</Alert>}
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                sx={{
                                    padding: 1,
                                    mb: '1%',
                                    bgcolor: '#8F85F3',
                                    color: 'white',
                                    borderRadius: '8px'
                                }}
                                onClick={handleAddEvent}
                                fullWidth
                            >
                                Simpan
                            </Button>
                        </DialogActions>
                    </StyledDialog>

                    {/* Modal Tambah Jadwal Pengecualian */}
                    <StyledDialog
                        open={openExclusion}
                        onClose={handleCloseExclusion}
                        classes={{ paper: closeAnimation ? 'slideOut' : '' }}
                    >
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            maxWidth={'95%'}
                        >
                            <DialogTitle>Tambah Pengecualian Baru</DialogTitle>
                            <CloseOutlined sx={{ cursor: 'pointer' }} onClick={handleCloseExclusion} />
                        </Box>
                        <DialogContent>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Typography>Tipe Jadwal</Typography>
                                <DropdownList
                                    defaultValue='Pengecualian'
                                    onChange={handleChangeTipeJadwal}
                                    loading={false}
                                    options={tipeJadwal}
                                    placeholder='Pilih tipe jadwal'
                                />
                                <Typography>Judul jadwal</Typography>
                                <TextField
                                    name="exclusionTitle"
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            borderRadius: '8px',
                                        },
                                    }}
                                    placeholder='Masukkan judul jadwal'
                                    value={newExclusion.exclusionTitle}
                                    onChange={handleChangeExclusion}
                                />
                                <Box
                                    borderRadius={'16px'}
                                    padding={2}
                                    border={'1px solid #C5C5D3'}
                                    display="flex"
                                    gap={2}
                                    flexDirection={'row'}
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                >
                                    <Typography fontSize={'16px'} fontWeight={600} lineHeight={'18px'}>Jam</Typography>
                                    <Box display="flex" gap={2} flexDirection={'row'}>
                                        <DropdownListTime
                                            placeholder='Jam mulai'
                                            loading={false}
                                            options={jamOperasional}
                                            onChange={(value) => handleExclusionChange('exclusionTimeStart', value)}
                                        />
                                        <DropdownListTime
                                            placeholder='Jam selesai'
                                            loading={false}
                                            options={jamOperasional}
                                            onChange={(value) => handleExclusionChange('exclusionTimeEnd', value)}
                                        />
                                    </Box>
                                </Box>
                                <Box
                                    display="flex"
                                    gap={2}
                                    flexDirection={'column'}
                                    border={'1px solid #C5C5D3'}
                                    borderRadius={'16px'}
                                    padding={2}
                                >
                                    <Typography fontSize={'16px'} fontWeight={600} lineHeight={'18px'}>Tanggal</Typography>
                                    <Box display={'flex'} flexDirection={'row'} gap={2}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <Box>
                                                <Typography>Mulai</Typography>
                                                <DatePicker
                                                    name="exclusionDateStart"
                                                    slots={{ textField: TextField }}
                                                    slotProps={{
                                                        textField: {
                                                            fullWidth: true,
                                                            margin: 'normal',
                                                        },
                                                    }}
                                                    value={newExclusion.exclusionDateStart ? dayjs(newExclusion.exclusionDateStart) : null}
                                                    onChange={(newValue) => {
                                                        setNewExclusion({
                                                            ...newExclusion,
                                                            exclusionDateStart: newValue ? newValue.format('YYYY-MM-DD') : ''
                                                        });
                                                    }}
                                                />
                                            </Box>
                                            <Typography>-</Typography>
                                            <Box>
                                                <Typography>Selesai</Typography>
                                                <DatePicker
                                                    name="exclusionDateEnd"
                                                    slots={{ textField: TextField }}
                                                    slotProps={{
                                                        textField: {
                                                            fullWidth: true,
                                                            margin: 'normal',
                                                        },
                                                    }}
                                                    value={newExclusion.exclusionDateEnd ? dayjs(newExclusion.exclusionDateEnd) : null}
                                                    onChange={(newValue) => {
                                                        setNewExclusion({
                                                            ...newExclusion,
                                                            exclusionDateEnd: newValue ? newValue.format('YYYY-MM-DD') : ''
                                                        });
                                                    }}
                                                />
                                            </Box>
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                                <TextField
                                    name="exclusionNotes"
                                    placeholder="Masukkan catatan"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            borderRadius: '16px',
                                        },
                                    }}
                                    value={newExclusion.exclusionNotes}
                                    onChange={handleChangeExclusion}
                                />
                                {errorExclusion && <Alert severity="error">{errorExclusion}</Alert>}
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={handleAddExclusion}
                                fullWidth
                                sx={{
                                    padding: 1,
                                    mb: '1%',
                                    bgcolor: '#8F85F3',
                                    color: 'white',
                                    borderRadius: '8px'
                                }}
                            >
                                Tambah
                            </Button>
                        </DialogActions>
                    </StyledDialog>
                </StyledContainer>
            </Box>
        </>
    );
};

export default TestKalender;
