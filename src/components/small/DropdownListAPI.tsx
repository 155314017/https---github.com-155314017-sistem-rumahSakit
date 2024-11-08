import { useState, useEffect } from "react";
import { Box, Select, MenuItem, CircularProgress } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface Option {
    value: string;
    label: string;
}

interface DropdownListProps {
    options: Option[];
    placeholder: string;
    onChange?: (value: string, label: string) => void; 
    defaultValue?: string;
    loading: boolean;
}

export default function DropdownListAPI({
    options,
    placeholder,
    onChange,
    defaultValue = "",
    loading
}: DropdownListProps) {
    const [selectedOption, setSelectedOption] = useState<string>(defaultValue);

    useEffect(() => {
        // Set the selected option based on defaultValue
        setSelectedOption(defaultValue);
    }, [defaultValue]);

    const handleChange = (event: SelectChangeEvent<string>) => {
        const value = event.target.value;
        const selected = options.find(option => option.value === value);

        setSelectedOption(value); 

        if (onChange) {
            onChange(value, selected ? selected.label : ""); 
        }
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            width="100%"
            sx={{
                borderRadius: "8px",
                height: "38px",
            }}
        >
            <Select
                value={selectedOption} 
                onChange={handleChange}
                displayEmpty
                startAdornment={loading ? <CircularProgress size={20} /> : null}
                sx={{
                    flex: 1,
                    height: "43px",
                    borderRadius: "8px",
                    border: "1px solid #A8A8BD",
                    color: "#A8A8BD",
                    bgcolor: "#fafafa",
                }}
                inputProps={{ "aria-label": "select dropdown" }}
            >
                <MenuItem value="">
                    <em>{placeholder}</em>
                </MenuItem>
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value} sx={{ color: "#8F85F3" }}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
}