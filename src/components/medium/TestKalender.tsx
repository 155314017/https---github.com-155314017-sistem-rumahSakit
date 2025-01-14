/* eslint-disable @typescript-eslint/no-explicit-any */

import type React from 'react';
import { useState, useRef, useEffect, type MouseEvent } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../../../node_modules/@fullcalendar/common/main.css';
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
import DayOperational from './DayOperational';
import ModalPilihTanggal from '../small/modal/ModalPilihTanggal';

// Interface Event
interface Event {
    id: string;
    title: string;
    start: string;
    end?: string;
    allDay?: boolean;
}

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

const jamOperasional = [
    { value: 1, label: "07:00 am" },
    { value: 2, label: "08:00 am" },
    { value: 3, label: "09:00 am" },
    { value: 4, label: "10:00 am" },
    { value: 5, label: "11:00 am" },
    { value: 6, label: "12:00 pm" },
    { value: 7, label: "01:00 pm" },
    { value: 8, label: "02:00 pm" },
    { value: 9, label: "03:00 pm" },
    { value: 10, label: "04:00 pm" },
    { value: 11, label: "05:00 pm" },
    { value: 12, label: "06:00 pm" },
    { value: 13, label: "07:00 pm" },
    { value: 14, label: "08:00 pm" },
    { value: 15, label: "09:00 pm" },
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

const StyledContainer = styled(Container)(({ theme }) => ({
    borderRadius: '16px',
    minWidth: '100%',
    padding: theme.spacing(4),
    '& .fc-event': {
        backgroundColor: theme.palette.secondary.main,
        border: 'none',
        borderRadius: theme.shape.borderRadius,
        color: '#fff',
        fontSize: '0.875rem',
    },
    '& .fc-event:hover': {
        backgroundColor: theme.palette.secondary.dark,
    },
    '& .fc-timegrid-slot': {
        borderBottom: '1px solid #e0e0e0',
    },
    '& .fc-col-header-cell': {
        borderTop: 'none',
    },
}));

const TestKalender: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([
        {
            id: '1',
            title: 'Praktik Sesi 1',
            start: '2025-01-21T10:00:00',
            end: '2025-01-21T11:00:00',
        },
        {
            id: '2',
            title: 'Praktik Sesi 2',
            start: '2025-01-20T09:00:00',
            end: '2025-01-25T17:00:00',
        },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(dayjs());

    useEffect(() => {
        console.log('Tanggal yang diformat: ', currentDate.format('dddd, D MMMM YYYY'));
    }, [currentDate]);

    const [closeAnimation, setCloseAnimation] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        dateStart: '',
        timeStart: '',
        dateEnd: '',
        timeEnd: '',
    });

    const [currentView, setCurrentView] = useState<string>('dayGridMonth');
    const calendarRef = useRef<FullCalendar>(null);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleDateChange = (date: string | null) => {
        setSelectedDate(date);
        handleCloseModal();
    };

    dayjs.locale('id');
    const handleChangeTipeJadwal = (value: string) => {
        if (value === 'Praktek') {
            console.log("Praktek");
            setOpenExclusion(false);
            setOpen(true);
        } else if (value === 'Pengecualian') {
            console.log("Pengecualian");
            setOpen(false);
            setOpenExclusion(true);
        }
    };
    const tipeJadwal = [
        { value: 1, label: "Praktek" },
        { value: 2, label: "Pengecualian" },
    ];

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);

    const [openExclusion, setOpenExclusion] = useState(false);
    const [newExclusion, setNewExclusion] = useState({
        exclusionTitle: '',
        exclusionDateStart: '',
        exclusionTimeStart: '',
        exclusionDateEnd: '',
        exclusionTimeEnd: '',
        exclusionNotes: '',
    });

    // Handler untuk membuka menu
    const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Handler untuk menutup menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Handler untuk memilih jenis modal
    const handleMenuSelect = (type: 'Praktek' | 'Pengecualian') => {
        handleMenuClose();
        if (type === 'Praktek') {
            setCloseAnimation(false);
            setOpen(true);
        } else if (type === 'Pengecualian') {
            setCloseAnimation(false);
            setOpenExclusion(true);
        }
    };

    // Handler untuk menutup modal Praktek
    const handleClose = () => {
        setCloseAnimation(true); 
        setTimeout(() => {
            setOpen(false); // Tutup modal setelah animasi selesai
            setNewEvent({
                title: '',
                dateStart: '',
                timeStart: '',
                dateEnd: '',
                timeEnd: '',
            }); // Reset state setelah modal tertutup
        }, 500); 
    };

    // Handler untuk menutup modal Pengecualian
    const handleCloseExclusion = () => {
        setCloseAnimation(true); // Aktifkan animasi keluar
        setTimeout(() => {
            setOpenExclusion(false); 
            setNewExclusion({
                exclusionTitle: '',
                exclusionDateStart: '',
                exclusionTimeStart: '',
                exclusionDateEnd: '',
                exclusionTimeEnd: '',
                exclusionNotes: '',
            }); // Reset state setelah modal tertutup
        }, 500); 
    };

    // Handler untuk perubahan input pada form Praktek
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    // Handler untuk perubahan input pada form Pengecualian
    const handleChangeExclusion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewExclusion({ ...newExclusion, [e.target.name]: e.target.value });
    };

    // Handler tombol Prev
    const handlePrev = () => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.prev(); // Navigasi ke periode sebelumnya
            setCurrentDate(dayjs(calendarApi.getDate())); // Update tanggal
        }
    };

    // Handler tombol Next
    const handleNext = () => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.next(); // Navigasi ke periode berikutnya
            setCurrentDate(dayjs(calendarApi.getDate())); // Update tanggal
        }
    };

    const handleAddEvent = () => {
        const { title, dateStart, timeStart, dateEnd, timeEnd } = newEvent;

        if (title && dateStart && timeStart) {
            const startDateTime = `${dateStart}T${timeStart}`;
            const endDateTime = dateEnd && timeEnd ? `${dateEnd}T${timeEnd}` : undefined;

            if (endDateTime && dayjs(endDateTime).isBefore(dayjs(startDateTime))) {
                alert('Tanggal selesai tidak boleh sebelum tanggal mulai.');
                return;
            }

            const eventToAdd: Event = {
                id: (events.length + 1).toString(),
                title,
                start: startDateTime,
                end: endDateTime,
            };
            setEvents([...events, eventToAdd]);
            handleClose();
        } else {
            alert('Harap isi judul, tanggal mulai, dan waktu mulai.');
        }
    };

    // Handler untuk menambahkan pengecualian
    const handleAddExclusion = () => {
        const { exclusionTitle, exclusionDateStart, exclusionTimeStart, exclusionDateEnd, exclusionTimeEnd, exclusionNotes } = newExclusion;

        if (exclusionTitle && exclusionDateStart && exclusionTimeStart) {
            const startDateTime = `${exclusionDateStart}T${exclusionTimeStart}`;
            const endDateTime = exclusionDateEnd && exclusionTimeEnd ? `${exclusionDateEnd}T${exclusionTimeEnd}` : undefined;

            if (endDateTime && dayjs(endDateTime).isBefore(dayjs(startDateTime))) {
                alert('Tanggal selesai tidak boleh sebelum tanggal mulai.');
                return;
            }

            const exclusionToAdd: Event = {
                id: (events.length + 1).toString(),
                title: exclusionTitle,
                start: startDateTime,
                end: endDateTime,
                allDay: false, 
            };

            setEvents([...events, exclusionToAdd]);
            handleCloseExclusion();
        } else {
            alert('Harap isi judul, tanggal mulai, dan waktu mulai.');
        }
    };

    // Handle perubahan view kalender
    const handleViewChange = (view: string) => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.changeView(view); // Ubah tampilan kalender
        }
        setCurrentView(view); // Simpan pilihan view
    };

    useEffect(() => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.gotoDate('2025-01-13'); // Pindahkan ke tanggal awal 
        }
    }, []);

    return (
        <>
            <GlobalStyles />

            <Box bgcolor={'white'} width={'94%'} ml={'2%'} border={'1px solid #C5C5D3'} borderRadius={'16px'} padding={0}>
                <StyledContainer>
                    <Box maxWidth={'100%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} mb={'2%'}>
                        <Typography>Jadwal Praktek</Typography>
                        <div>
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
                                sx={{
                                    color: 'red'
                                }}
                            >
                                <MenuItem onClick={() => handleMenuSelect('Praktek')}>Praktek</MenuItem>
                                <MenuItem onClick={() => handleMenuSelect('Pengecualian')}>Pengecualian</MenuItem>
                            </Menu>
                        </div>
                    </Box>
                    <Box display="flex" flexDirection="row" gap={4}>
                        <Box width="35%" display="flex" flexDirection="column" gap={3}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="id">
                                <Box sx={{ border: '1px solid #C5C5D3', borderRadius: '16px', padding: 2 }}>
                                    <DateCalendar
                                        value={currentDate}
                                        onMonthChange={(newMonth) => {
                                            if (calendarRef.current) {
                                                const calendarApi = calendarRef.current.getApi();
                                                calendarApi.gotoDate(newMonth.format('YYYY-MM-DD')); 
                                            }
                                            setCurrentDate(newMonth); // Perbarui state
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

                        <Box width="85%" display="flex" flexDirection="column" gap={3} padding={'8px 0 8px 0'} borderRadius={'16px'}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Typography variant="h5">{currentDate.format('dddd, D MMMM YYYY')}</Typography>

                                    <Box display="flex" gap={0}>
                                        <NavigateBeforeIcon sx={{ cursor: 'pointer' }} onClick={handlePrev} />
                                        <NavigateNextIcon sx={{ cursor: 'pointer' }} onClick={handleNext} />
                                    </Box>
                                </Box>
                                <Box display="flex" alignItems="center" flexDirection={'row'} gap={2}>
                                    <Typography>Format</Typography>
                                    <FormControl size="small">
                                        <Select
                                            value={currentView}
                                            onChange={(e) => handleViewChange(e.target.value as string)}
                                        >
                                            <MenuItem value="dayGridMonth">Bulan</MenuItem>
                                            <MenuItem value="timeGridWeek">Minggu</MenuItem>
                                            <MenuItem value="timeGridDay">Hari</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>

                            <FullCalendar
                                ref={calendarRef}
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                locale="id"
                                timeZone="local"
                                initialDate={currentDate.format('YYYY-MM-DD')}
                                headerToolbar={false}
                                height="85vh"
                                events={events}
                                selectable
                                dayMaxEvents
                            />
                        </Box>
                    </Box>

                    {/* Modal Tambah Jadwal Praktek */}
                    <StyledDialog
                        open={open}
                        onClose={handleClose}
                        classes={{ paper: closeAnimation ? 'slideOut' : '' }}
                    >
                        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} maxWidth={'95%'} >
                            <DialogTitle>Tambah Jadwal Baru</DialogTitle>
                            <CloseOutlined sx={{ cursor: 'pointer' }} onClick={handleClose} />
                        </Box>
                        <DialogContent>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Typography>Tipe Jadwal</Typography>
                                <DropdownList defaultValue='Praktek' onChange={handleChangeTipeJadwal} loading={false} options={tipeJadwal} placeholder='Pilih tipe jadwal' />
                                <Box borderRadius={'16px'} padding={2} border={'1px solid #C5C5D3'} display="flex" gap={2} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} >
                                    <Typography fontSize={'16px'} fontWeight={600} lineHeight={'18px'}  >Jam</Typography>
                                    <Box display="flex" gap={2} flexDirection={'row'} >
                                        <DropdownListTime placeholder='Jam mulai' loading={false} options={jamOperasional} />
                                        <DropdownListTime placeholder='Jam selesai' loading={false} options={jamOperasional} />
                                    </Box>
                                </Box>
                                <Box display="flex" gap={2} flexDirection={'column'} border={'1px solid #C5C5D3'} borderRadius={'16px'} padding={2} >
                                    <Typography fontSize={'16px'} fontWeight={600} lineHeight={'18px'} >Ulang pada hari</Typography>
                                    <Box display={'flex'} flexDirection={'row'} gap={2} >
                                        <Button sx={{ border: '1px solid #8F85F3', color: '#8F85F3', borderRadius: '16px', padding: 1, '&:hover': { bgcolor: '#8F85F3', color: 'white' } }} >Min</Button>
                                        <Button sx={{ border: '1px solid #8F85F3', color: '#8F85F3', borderRadius: '16px', padding: 1, '&:hover': { bgcolor: '#8F85F3', color: 'white' } }} >Sen</Button>
                                        <Button sx={{ border: '1px solid #8F85F3', color: '#8F85F3', borderRadius: '16px', padding: 1, '&:hover': { bgcolor: '#8F85F3', color: 'white' } }} >Sel</Button>
                                        <Button sx={{ border: '1px solid #8F85F3', color: '#8F85F3', borderRadius: '16px', padding: 1, '&:hover': { bgcolor: '#8F85F3', color: 'white' } }} >Rab</Button>
                                        <Button sx={{ border: '1px solid #8F85F3', color: '#8F85F3', borderRadius: '16px', padding: 1, '&:hover': { bgcolor: '#8F85F3', color: 'white' } }} >Kam</Button>
                                        <Button sx={{ border: '1px solid #8F85F3', color: '#8F85F3', borderRadius: '16px', padding: 1, '&:hover': { bgcolor: '#8F85F3', color: 'white' } }} >Jum</Button>
                                        <Button sx={{ border: '1px solid #8F85F3', color: '#8F85F3', borderRadius: '16px', padding: 1, '&:hover': { bgcolor: '#8F85F3', color: 'white' } }} >Sab</Button>
                                    </Box>
                                </Box>
                                <TextField
                                    placeholder="Masukkan catatan"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            borderRadius: '16px',
                                        },
                                    }}
                                />

                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button sx={{ padding: 1, mb: '1%', bgcolor: '#8F85F3', color: 'white', borderRadius: '8px' }} onClick={handleAddEvent} fullWidth >Simpan</Button>
                        </DialogActions>
                    </StyledDialog>

                    {/* Modal Tambah Jadwal Pengecualian */}
                    <StyledDialog
                        open={openExclusion}
                        onClose={handleCloseExclusion}
                        classes={{ paper: closeAnimation ? 'slideOut' : '' }}
                    >
                        <DialogTitle>Tambah Pengecualian Baru</DialogTitle>
                        <DialogContent>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Typography>Tipe Jadwal</Typography>
                                <DropdownList defaultValue='Pengecualian' onChange={handleChangeTipeJadwal} loading={false} options={tipeJadwal} placeholder='Pilih tipe jadwal' />
                                <Typography>Judul jadwal</Typography>
                                <TextField sx={{
                                    '& .MuiInputBase-root': {
                                        borderRadius: '8px',
                                    },
                                }}
                                    placeholder='Masukkan judul jadwal'
                                />
                                <Box borderRadius={'16px'} padding={2} border={'1px solid #C5C5D3'} display="flex" gap={2} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} >
                                    <Typography fontSize={'16px'} fontWeight={600} lineHeight={'18px'}  >Jam</Typography>
                                    <Box display="flex" gap={2} flexDirection={'row'} >
                                        <DropdownListTime placeholder='Jam mulai' loading={false} options={jamOperasional} />
                                        <DropdownListTime placeholder='Jam selesai' loading={false} options={jamOperasional} />
                                    </Box>
                                </Box>
                                <Box display="flex" gap={2} flexDirection={'column'} border={'1px solid #C5C5D3'} borderRadius={'16px'} padding={2}>
                                    <Typography fontSize={'16px'} fontWeight={600} lineHeight={'18px'}>Tanggal</Typography>
                                    <Box display={'flex'} flexDirection={'row'} gap={2}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <Box>
                                                <Typography>Mulai</Typography>
                                                <DatePicker
                                                    slots={{
                                                        textField: TextField,
                                                    }}
                                                    slotProps={{
                                                        textField: {
                                                            fullWidth: true,
                                                            margin: 'normal',
                                                        },
                                                    }}
                                                    value={null} 
                                                    onChange={(newValue) => console.log(newValue)} 
                                                />
                                            </Box>
                                            <Typography>-</Typography>
                                            <Box>
                                                <Typography>Selesai</Typography>
                                                <DatePicker
                                                    slots={{
                                                        textField: TextField,
                                                    }}
                                                    slotProps={{
                                                        textField: {
                                                            fullWidth: true,
                                                            margin: 'normal',
                                                        },
                                                    }}
                                                    value={null} 
                                                    onChange={(newValue) => console.log(newValue)} 
                                                />
                                            </Box>
                                        </LocalizationProvider>
                                    </Box>
                                </Box>

                                <TextField
                                    placeholder="Masukkan catatan"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            borderRadius: '16px',
                                        },
                                    }}
                                />

                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleAddExclusion} fullWidth sx={{ padding: 1, mb: '1%', bgcolor: '#8F85F3', color: 'white', borderRadius: '8px' }}>Tambah</Button>
                        </DialogActions>
                    </StyledDialog>
                </StyledContainer>
            </Box>
        </>
    );
};

export default TestKalender;
