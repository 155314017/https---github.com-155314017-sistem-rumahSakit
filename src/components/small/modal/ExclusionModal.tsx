/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Typography,
    Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DateCalendar } from "@mui/x-date-pickers";
import DropdownList from "../dropdownlist/DropdownList";
import type { Dayjs } from "dayjs";
import type { Exclusion } from "../../../pages/pegawai/hooks/useTambahPegawai";
import DropdownListTime from "../dropdownlist/DropdownListTime";

interface ExclusionModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (exclusion: Omit<Exclusion, 'id'>) => void;
}

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

const ExclusionModal: React.FC<ExclusionModalProps> = ({ open, onClose, onSave }) => {
    const typeExclusion = [
        { value: 1, label: "Cuti" },
        { value: 2, label: "Operasi" },
    ];

    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedType, setSelectedType] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [errors, setErrors] = useState({
        date: '',
        type: '',
        startTime: '',
        endTime: '',
    });

    const timeStringToMinutes = (timeStr: string): number => {
        const [time, modifier] = timeStr.split(' ');
        // eslint-disable-next-line prefer-const
        let [hours, minutes] = time.split(':').map(Number);
        if (modifier.toLowerCase() === 'pm' && hours !== 12) {
            hours += 12;
        }
        if (modifier.toLowerCase() === 'am' && hours === 12) {
            hours = 0;
        }
        return hours * 60 + minutes;
    };

    const validateTimes = (currentStart: string, currentEnd: string) => {
        const tempErrors = { ...errors };
        let isValid = true;

        if (selectedType === "Operasi") {
            if (currentStart && currentEnd) {
                const startMinutes = timeStringToMinutes(currentStart);
                const endMinutes = timeStringToMinutes(currentEnd);

                if (startMinutes > endMinutes) {
                    tempErrors.startTime = 'Jam mulai tidak boleh lebih dari jam selesai.';
                    tempErrors.endTime = 'Jam selesai tidak boleh kurang dari jam mulai.';
                    isValid = false;
                    console.error('Jam mulai tidak boleh lebih dari jam selesai.');
                } else {
                    tempErrors.startTime = '';
                    tempErrors.endTime = '';
                }
            } else {
                tempErrors.startTime = '';
                tempErrors.endTime = '';
            }
        }

        setErrors(tempErrors);
        return isValid;
    };

    // Validation Function
    const validate = () => {
        const tempErrors = { date: '', type: '', startTime: '', endTime: '' };
        let isValid = true;

        if (!selectedDate) {
            tempErrors.date = 'Tanggal wajib diisi.';
            isValid = false;
        }

        if (!selectedType) {
            tempErrors.type = 'Tipe exclusion wajib dipilih.';
            isValid = false;
        }

        if (selectedType === "Operasi") {
            if (!startTime) {
                tempErrors.startTime = 'Jam mulai wajib diisi.';
                isValid = false;
            }
            if (!endTime) {
                tempErrors.endTime = 'Jam selesai wajib diisi.';
                isValid = false;
            }
            if (startTime && endTime) {
                const startMinutes = timeStringToMinutes(startTime);
                const endMinutes = timeStringToMinutes(endTime);
                if (startMinutes > endMinutes) {
                    tempErrors.startTime = 'Jam mulai tidak boleh lebih dari jam selesai.';
                    tempErrors.endTime = 'Jam selesai tidak boleh kurang dari jam mulai.';
                    isValid = false;
                    console.error('Start time cannot be after end time.');
                }
            }
        }

        setErrors(tempErrors);
        return isValid;
    };

    // Save Data Function
    const handleSave = () => {
        if (validate()) {
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            const formattedDate = selectedDate!.format('YYYY-MM-DD');
            const exclusionData: Omit<Exclusion, 'id'> = {
                date: formattedDate,
                type: selectedType,
                time: ""
            };

            if (selectedType === "Operasi") {
                exclusionData.time = `${startTime} - ${endTime}`;
            } else {
                exclusionData.time = '-';
            }

            onSave(exclusionData);
            setSelectedDate(null);
            setSelectedType('');
            setStartTime('');
            setEndTime('');
            setErrors({ date: '', type: '', startTime: '', endTime: '' });
            onClose();
        }
    };

    const isFormValid = () => {
        if (!selectedDate || !selectedType) return false;
        if (selectedType === "Operasi") {
            if (!startTime || !endTime) return false;
            const startMinutes = timeStringToMinutes(startTime);
            const endMinutes = timeStringToMinutes(endTime);
            if (startMinutes > endMinutes) return false;
        }
        return true;
    };

    const handleStartTimeChange = (value: string) => {
        setStartTime(value);
        validateTimes(value, endTime);
    };

    const handleEndTimeChange = (value: string) => {
        setEndTime(value);
        validateTimes(startTime, value);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: '20px',
                },
            }}>
            <DialogTitle sx={{ position: "relative" }}>
                Add Exclusion
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent
                sx={{
                    minWidth: '550px',
                    maxWidth: '550px',
                    paddingY: '32px',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    scrollbarWidth: 'none',
                    '-ms-overflow-style': 'none',
                }}
            >
                {/* Field Tanggal */}
                <Box
                    sx={{
                        padding: "12px 16px 12px 16px",
                        border: "1px solid #A8A8BD",
                        borderRadius: '16px',
                        mb: 3,
                        backgroundColor: 'transparent',
                        borderColor: errors.date ? 'red' : '#A8A8BD',
                    }}
                >
                    <Typography>Select Date<span style={{ color: "red" }}>*</span></Typography>
                    <DateCalendar
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
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
                    {errors.date && (
                        <Typography variant="caption" color="error">
                            {errors.date}
                        </Typography>
                    )}
                </Box>

                {/* Field Type Exclusion */}
                <Box
                    sx={{
                        padding: "24px",
                        border: "1px solid #A8A8BD",
                        borderRadius: '16px',
                        backgroundColor: 'transparent',
                        borderColor: errors.type ? 'red' : '#A8A8BD',
                    }}
                >
                    <Typography>Type Exclusion<span style={{ color: "red" }}>*</span></Typography>
                    <DropdownList
                        loading={false}
                        options={typeExclusion}
                        placeholder="Type Exclusion"
                        onChange={(value) => setSelectedType(value)}
                        defaultValue={selectedType}
                    />
                    {errors.type && (
                        <Typography variant="caption" color="error">
                            {errors.type}
                        </Typography>
                    )}

                    {/* Field Waktu Operasi */}
                    {selectedType === "Operasi" && (
                        <Box
                            ml='auto'
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            mt={2}
                        >
                            <Box
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                                justifyContent="center"
                                gap={2}
                                sx={{
                                    backgroundColor: 'transparent',
                                    borderRadius: '8px',
                                    padding: '8px',
                                    border: 'none',
                                }}
                            >
                                <Box sx={{ width: '100%' }}>
                                    <DropdownListTime
                                        onChange={handleStartTimeChange}
                                        placeholder="Pilih jam mulai"
                                        options={jamOperasional}
                                        loading={false}
                                        value={startTime}
                                        error={!!errors.startTime} // Pass error prop
                                    />
                                    {/* {errors.startTime && (
                                        <Typography variant="caption" color="error">
                                            {errors.startTime}
                                        </Typography>
                                    )} */}
                                </Box>
                                <Typography>-</Typography>
                                <Box sx={{ width: '100%' }}>
                                    <DropdownListTime
                                        onChange={handleEndTimeChange}
                                        placeholder="Pilih jam selesai"
                                        options={jamOperasional}
                                        loading={false}
                                        value={endTime}
                                        error={!!errors.endTime} // Pass error prop
                                    />
                                    {/* {errors.endTime && (
                                        <Typography variant="caption" color="error">
                                            {errors.endTime}
                                        </Typography>
                                    )} */}
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
            </DialogContent>

            <DialogActions>
                <Button
                    sx={{
                        mb: 2,
                        bgcolor: '#8F85F3',
                        color: 'white',
                        width: '100%',
                        borderRadius: '8px',
                        '&:disabled': {
                            bgcolor: '#cccccc',
                            color: '#666666',
                        },
                    }}
                    onClick={handleSave}
                    disabled={!isFormValid()}
                    autoFocus
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );

};

export default ExclusionModal;
