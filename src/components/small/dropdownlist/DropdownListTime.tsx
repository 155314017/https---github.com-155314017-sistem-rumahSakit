import { useState, useEffect } from "react";
import {
  Box,
  Select,
  MenuItem,
  CircularProgress,
  type SelectChangeEvent,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export interface Option {
  value: number;
  label: string;
}

interface DropdownListProps {
  options: Option[];
  placeholder: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  loading: boolean;
  value?: string;
  error?: boolean; // Added error prop
}

export default function DropdownListTime({
  options,
  placeholder,
  onChange,
  defaultValue = "",
  loading,
  value,
  error = false, 
}: DropdownListProps) {
  const [selectedOption, setSelectedOption] = useState<string>(value || defaultValue);

  useEffect(() => {
    setSelectedOption(value || defaultValue);
  }, [value, defaultValue]);

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
        startAdornment={
          <Box sx={{ display: "flex", alignItems: "center", ml: 0, mr: 1 }}>
            {loading && <CircularProgress size={20} sx={{ mr: 1 }} />}
            <AccessTimeIcon fontSize="small" sx={{ color: "#8F85F3" }} />
          </Box>
        }
        sx={{
          width: "100%",
          color: "#555",
          bgcolor: error ? "#FFCCCC" : "#FFF", 
          border: "1px solid #A8A8BD",
          borderRadius: "8px",
          height: "40px",
          transition: "border-color 0.3s ease-in-out, background-color 0.3s ease-in-out",
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
              maxHeight: 240, 
              overflowY: "auto", 
              animation: "fadeInAndScale 0.3s ease-in-out",
              "@keyframes fadeInAndScale": {
                "0%": {
                  opacity: 0,
                  transform: "scale(0.9)",
                },
                "100%": {
                  opacity: 1,
                  transform: "scale(1)",
                },
              },
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ccc",
                borderRadius: "4px",
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
