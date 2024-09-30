import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface PoliSelectProps {
    value: string;
    onChange: (event: SelectChangeEvent<string>) => void;
}

const PoliSelect: React.FC<PoliSelectProps> = ({ value, onChange }) => {
    return (
        <FormControl sx={{ mb: 2, width: '548px' }}>
            <Select
                labelId="poli-label"
                value={value}
                onChange={onChange}
                sx={{  height:'38px'}}
            >
                <MenuItem value="poli1">Poli Umum</MenuItem>
                <MenuItem value="poli2">Poli Gigi</MenuItem>
                <MenuItem value="poli3">Poli Anak</MenuItem>
            </Select>
        </FormControl>
    );
};

export default PoliSelect;
