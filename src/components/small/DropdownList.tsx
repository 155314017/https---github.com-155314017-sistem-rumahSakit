import { useState, useEffect } from "react";
import { Box, Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface Option {
  value: number;
  label: string;
}

interface DropdownListProps {
  options: Option[];
  placeholder: string;
  onChange?: (value: string) => void;
  defaultValue?: string; // Add this line
}

export default function DropdownList({
  options,
  placeholder,
  onChange,
  defaultValue = "", // Set a default value for the prop
}: DropdownListProps) {
  const [selectedOption, setSelectedOption] = useState<string>(defaultValue);

  useEffect(() => {
    setSelectedOption(defaultValue); // Update selectedOption when defaultValue changes
  }, [defaultValue]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
    if (onChange) {
      onChange(event.target.value); // Triggering external onChange function
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
        {options.map((option, index) => (
          <MenuItem key={index} value={option.label} sx={{ color: "#8F85F3" }}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
