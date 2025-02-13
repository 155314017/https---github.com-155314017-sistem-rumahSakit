import { useState, useEffect } from "react";
import {
  Box,
  Select,
  MenuItem,
  CircularProgress,
  type SelectChangeEvent,
} from "@mui/material";

interface Option {
  value: number | string;
  label: string;
}

interface DropdownListProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  loading: boolean;
}

export default function DropdownList({
  options,
  placeholder,
  onChange,
  defaultValue = "",
  loading,
}: DropdownListProps) {
  const [selectedOption, setSelectedOption] = useState<string>(defaultValue);

  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      sx={{
        bgcolor: "transparent",
      }}
    >
      <Select
        value={selectedOption}
        onChange={handleChange}
        displayEmpty
        startAdornment={loading ? <CircularProgress size={20} /> : null}
        sx={{
          width: "100%",
          color: "#555",
          bgcolor: "#FFF",
          border: "1px solid #A8A8BD",
          borderRadius: "8px",
          height: "40px",
          transition: "border-color 0.3s ease-in-out",

          "&:hover": {
            borderColor: "#8F85F3",
          },
          "&.Mui-focused": {
            borderColor: "#8F85F3",
          },
          "& .MuiSelect-select": {
            padding: "0 16px",
          },
          "& fieldset": {
            border: "none",
          },
        }}
        inputProps={{ "aria-label": "select dropdown" }}
        MenuProps={{
          PaperProps: {
            sx: {
              animation: "fadeIn 0.2s ease-in-out",
              "@keyframes fadeIn": {
                "0%": { opacity: 0 },
                "100%": { opacity: 1 },
              },
            },
          },
        }}
      >
        <MenuItem value="">
          <em>{placeholder}</em>
        </MenuItem>

        {options.map((option, index) => (
          <MenuItem
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            value={option.label}
            sx={{
              color: "#8F85F3",
              "&:hover": {
                backgroundColor: "#F0F0FF",
              },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
