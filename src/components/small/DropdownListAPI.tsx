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
    valueField?: keyof Option; // Use keyof to restrict it to valid keys of Option
    labelField?: keyof Option; // Same here for labelField
}

export default function DropdownListAPI({
    options,
    placeholder,
    onChange,
    defaultValue = "",
    loading,
    valueField = "value", // Default to "value"
    labelField = "label" // Default to "label"
}: DropdownListProps) {
    const [selectedOption, setSelectedOption] = useState<string>(defaultValue);

    // Update selectedOption when defaultValue changes
    useEffect(() => {
        setSelectedOption(defaultValue);
    }, [defaultValue]);

    const handleChange = (event: SelectChangeEvent<string>) => {
        const value = event.target.value;
        const selected = options.find(option => option[valueField] === value);

        setSelectedOption(value);

        if (onChange && selected) {
            const label = selected[labelField]; // Get the label based on labelField
            onChange(value, label);
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
                    <MenuItem key={option[valueField]} value={option[valueField]} sx={{ color: "#8F85F3" }}>
                        {option[labelField]} {/* Display the label based on labelField */}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
}
