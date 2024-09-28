import { useState, useEffect } from "react";
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";

// icon
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Header() {
  const [time, setTime] = useState<string>(moment().format("h:mm a"));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(moment().format("h:mm a"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box display={"flex"} gap={2} justifyContent={"space-between"}>
      <Box
        sx={{
          bgcolor: "#fff",
          height: "48px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          px: 2,
        }}
      >
        {/* time and role */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccessTimeIcon />
          <Typography fontSize="18px" fontWeight={700}>
            {time}
          </Typography>
        </Box>
        <Typography fontSize="18px" sx={{ mx: 1 }}>
          -
        </Typography>
        <Typography fontSize="18px">Role</Typography>
      </Box>

      {/* avatar and notify */}
      <Box
        sx={{
          height: "48px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 2,
        }}
      >
        <IconButton sx={{ color: "#8F85F3", bgcolor: "#fff" }}>
          <NotificationsNoneOutlinedIcon />
        </IconButton>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          sx={{
            cursor: "pointer",
            bgcolor: "#fff",
            borderRadius: "100px",
            pr: 1,
          }}
        >
          <Avatar>AP</Avatar>
          <KeyboardArrowDownIcon sx={{ color: "#8F85F3" }} />
        </Box>
      </Box>
    </Box>
  );
}
