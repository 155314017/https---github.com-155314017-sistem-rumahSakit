import { useState, useEffect } from "react";
import {
  Box,
  Select,
  MenuItem,
  CircularProgress,
  SelectChangeEvent,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface Option {
  value: number;
  label: string;
}

interface DropdownListProps {
  options: Option[];
  placeholder: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  loading: boolean;
}

export default function DropdownListTime({
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
        // Gabungkan ikon jam dan spinner dalam startAdornment
        startAdornment={
          <Box sx={{ display: "flex", alignItems: "center", ml: 0, mr: 1 }}>
            {loading && <CircularProgress size={20} sx={{ mr: 1 }} />}
            <AccessTimeIcon fontSize="small" sx={{ color: "#8F85F3" }} />
          </Box>
        }
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
        // Menambahkan animasi dan scroll
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 240, // Batas tinggi menu dropdown (px)
              overflowY: "auto", // Memunculkan scroll saat konten melebihi maxHeight
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
              // Opsional, styling scrollbar agar lebih halus atau sesuai selera
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
