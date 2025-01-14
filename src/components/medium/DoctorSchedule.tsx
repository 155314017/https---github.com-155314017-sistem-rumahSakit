import type React from 'react';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { TextField, Typography } from '@mui/material';
import 'react-calendar/dist/Calendar.css';

interface DoctorAvailability {
    availableDates: Date[];
}

const DoctorSchedule: React.FC<DoctorAvailability> = ({ availableDates }) => {
    const [date] = useState<Date | null>(null);

    // Fungsi untuk memeriksa apakah tanggal tersedia
    const isDateAvailable = (date: Date) => {
        return availableDates.some(
            (availableDate) => availableDate.toDateString() === date.toDateString()
        );
    };

    return (
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
            <Typography variant="h6" gutterBottom>
                Pilih Tanggal Operasi
            </Typography>
            <Calendar
                // onChange={setDate}
                value={date}
                tileDisabled={({ date }) => !isDateAvailable(date)}
            />
            <TextField
                label="Tanggal yang dipilih"
                value={date ? date.toDateString() : ''}
                fullWidth
                margin="normal"
                variant="outlined"
                InputProps={{
                    readOnly: true,
                }}
            />
        </div>
    );
};

export default DoctorSchedule;
