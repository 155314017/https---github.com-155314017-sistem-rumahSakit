import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatePickerCustom() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={['DatePicker']} >
                <DatePicker sx={{width:'100%', borderRadius:'8px'}} />
            </DemoContainer>
        </LocalizationProvider>
    );
}
