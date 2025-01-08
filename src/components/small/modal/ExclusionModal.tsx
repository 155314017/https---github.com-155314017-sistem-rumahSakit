import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DateCalendar, DateTimePicker } from "@mui/x-date-pickers";
import { Box } from "@mui/system";
import DropdownList from "../dropdownlist/DropdownList";

interface ExclusionModalProps {
    open: boolean;             // Menentukan apakah modal terbuka
    onClose: () => void;       // Callback ketika modal ditutup
}

const ExclusionModal: React.FC<ExclusionModalProps> = ({ open, onClose }) => {
    const typeExclusion = [
        { value: 1, label: "Cuti" },
        { value: 2, label: "Operasi" },
    ];
    return (
        <Dialog open={open} onClose={onClose}
        >
            <DialogTitle sx={{ position: "relative" }}>
                add exclusion
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

            <DialogContent>
                <Box
                    sx={{
                        padding: "24px",
                        border: "1px solid black",
                        borderRadius: '16px',
                        borderColor: '#A8A8BD',
                    }}
                >
                    <Typography>Select Date</Typography>
                    <DateCalendar
                        // value={selectedDate}
                        // onChange={(newValue) => {
                        //     setSelectedDate(newValue);
                        //     setSelectedTimeRange(null);
                        //     setInputValue('');
                        // }}
                        // shouldDisableDate={(date) => !availableDates.has(date.format('YYYY-MM-DD'))}
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

                <Box
                    sx={{
                        padding: "24px",
                        border: "1px solid black",
                        borderRadius: '16px',
                        borderColor: '#A8A8BD',
                        mt: 3
                    }}
                >
                    <Typography>Type Exclusion</Typography>
                    <DropdownList loading={false} options={typeExclusion} placeholder="Type Exclusion" />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button sx={{
                    bgcolor: '#8F85F3',
                    color: 'white',
                    width: '100%',
                    borderRadius: '8px'
                }}
                    onClick={onClose}
                    autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ExclusionModal;
