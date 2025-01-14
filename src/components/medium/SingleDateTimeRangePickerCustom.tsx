import type React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { type Dayjs } from "dayjs";

const hours = Array.from({ length: 12 }, (_, i) => i + 7); // Jam dari 07 hingga 18
const minutes = ["00", "15", "30", "45"];

const DateTimeRangePicker: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [startTime, setStartTime] = useState({ hour: "07", minute: "00" });
  const [endTime, setEndTime] = useState({ hour: "08", minute: "00" });
  const [selectedRange, setSelectedRange] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    const formattedDate = selectedDate ? selectedDate.format("MM/DD/YYYY") : "";
    const formattedStart = `${startTime.hour}:${startTime.minute}`;
    const formattedEnd = `${endTime.hour}:${endTime.minute}`;
    setSelectedRange(`${formattedDate} ${formattedStart} - ${formattedEnd}`);
    handleClose();
  };

  return (
    <Box>
      {/* Input untuk memilih tanggal dan rentang waktu */}
      <TextField
        label="Date & Time Range"
        value={selectedRange}
        onClick={handleOpen}
        fullWidth
        InputProps={{
          readOnly: true,
        }}
      />

      {/* Dialog untuk memilih tanggal dan waktu */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Select Date & Time Range
          </Typography>

          {/* Pilih Tanggal */}
          <Box mb={3}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
            />
          </Box>

          <Grid container spacing={2}>
            {/* Start Time */}
            <Grid item xs={6}>
              <Typography variant="subtitle1">Start Time</Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    select
                    label="Hour"
                    value={startTime.hour}
                    onChange={(e) =>
                      setStartTime((prev) => ({
                        ...prev,
                        hour: e.target.value,
                      }))
                    }
                    fullWidth
                  >
                    {hours.map((hour) => (
                      <MenuItem key={hour} value={hour.toString().padStart(2, "0")}>
                        {hour.toString().padStart(2, "0")}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    select
                    label="Minute"
                    value={startTime.minute}
                    onChange={(e) =>
                      setStartTime((prev) => ({
                        ...prev,
                        minute: e.target.value,
                      }))
                    }
                    fullWidth
                  >
                    {minutes.map((minute) => (
                      <MenuItem key={minute} value={minute}>
                        {minute}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>

            {/* End Time */}
            <Grid item xs={6}>
              <Typography variant="subtitle1">End Time</Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    select
                    label="Hour"
                    value={endTime.hour}
                    onChange={(e) =>
                      setEndTime((prev) => ({
                        ...prev,
                        hour: e.target.value,
                      }))
                    }
                    fullWidth
                  >
                    {hours.map((hour) => (
                      <MenuItem key={hour} value={hour.toString().padStart(2, "0")}>
                        {hour.toString().padStart(2, "0")}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    select
                    label="Minute"
                    value={endTime.minute}
                    onChange={(e) =>
                      setEndTime((prev) => ({
                        ...prev,
                        minute: e.target.value,
                      }))
                    }
                    fullWidth
                  >
                    {minutes.map((minute) => (
                      <MenuItem key={minute} value={minute}>
                        {minute}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary" type="button">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" type="button">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DateTimeRangePicker;
