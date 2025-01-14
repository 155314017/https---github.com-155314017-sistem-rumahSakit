import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function CustomDateTimePicker() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker
                    sx={{
                        width: '258px',
                        '& .MuiInputBase-root': {
                            height: '38px',
                            overflow: 'hidden',
                            boxSizing: 'border-box',
                        },
                        '& .MuiInputBase-input': {
                            padding: '10px 12px',
                            height: '100%',
                        },
                        '& .MuiFormLabel-root': {
                            position: 'absolute',
                            left: '12px', 
                            top: '50%',
                            transform: 'translateY(-50%)', 
                            transition: '0.2s',
                            backgroundColor: 'white', 
                            padding: '0 4px', 
                        },
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
