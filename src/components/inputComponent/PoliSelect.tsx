import React from 'react';
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { ExpandMoreOutlined } from "@mui/icons-material";

interface PoliSelectProps {
    value: string;
    onChange: (event: SelectChangeEvent<string>) => void;
}

const PoliSelect: React.FC<PoliSelectProps> = ({ value, onChange }) => {
    return (
        <FormControl sx={{ mb: 2, width: '100%' }}>
            <Select
                labelId="poli-label"
                value={value}
                onChange={onChange}
                sx={{  height:'38px'}}
                IconComponent={ExpandMoreOutlined}
            >
                <MenuItem sx={{ color: '#8F85F3' }} value="poli1">Poli Umum</MenuItem>
                <MenuItem sx={{ color: '#8F85F3' }} value="poli2">Poli Gigi</MenuItem>
                <MenuItem sx={{ color: '#8F85F3' }} value="poli3">Poli Anak</MenuItem>
            </Select>
        </FormControl>
    );
};

export default PoliSelect;
