import type React from 'react';
import {Typography, Radio, FormControlLabel } from '@mui/material';

interface CustomRadioButtonProps {
    value: string;
    label: string;
    selectedValue: string;
    onChange: (value: string) => void;
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({ value, label, selectedValue, onChange }) => {
    return (
        <FormControlLabel
            control={
                <Radio
                    checked={selectedValue === value}
                    onChange={() => onChange(value)}
                />
            }
            label={<Typography>{label}</Typography>}
        />
    );
};


export default CustomRadioButton;
