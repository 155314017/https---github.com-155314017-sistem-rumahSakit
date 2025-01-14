import  { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { Dayjs } from 'dayjs'; // Mengimpor tipe secara eksplisit

export default function ModalPilihTanggal() {
    const [open, setOpen] = useState(false); // State untuk membuka/menutup modal
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null); // State untuk tanggal yang dipilih

    // Handler untuk membuka modal
    const handleOpen = () => {
        setOpen(true);
    };

    // Handler untuk menutup modal
    const handleClose = () => {
        setOpen(false);
    };

    // Handler untuk menyimpan tanggal
    const handleSave = () => {
        console.log('Tanggal yang dipilih:', selectedDate?.format('YYYY-MM-DD'));
        setOpen(false);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
                {/* Tombol untuk membuka modal */}
                <Button variant="contained" onClick={handleOpen}>
                    Pilih Tanggal
                </Button>

                {/* Modal untuk memilih tanggal */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Pilih Tanggal</DialogTitle>
                    <DialogContent>
                        <DatePicker
                            value={selectedDate}
                            onChange={(newValue) => setSelectedDate(newValue)}
                            slots={{
                                textField: TextField, 
                            }}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    margin: 'normal',
                                },
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Batal
                        </Button>
                        <Button onClick={handleSave} color="primary" variant="contained">
                            Simpan
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </LocalizationProvider>
    );
}
