import { useState, useEffect } from "react";
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import moment from "moment";

// icon
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Header() {
  const [time, setTime] = useState({
    hours: moment().format("h"),
    minutes: moment().format("mm"),
    period: moment().format("a"),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime({
        hours: moment().format("h"),
        minutes: moment().format("mm"),
        period: moment().format("a"),
      });
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

          <Box sx={{ display: "flex", gap: 0.5 }}>
            <Typography fontSize="18px" fontWeight={700}>
              {time.hours}
            </Typography>
            <Typography
              component="span"
              fontSize="18px"
              fontWeight={700}
              sx={{
                animation: "blink 0.5s steps(2, start) infinite",
                "@keyframes blink": {
                  "0%": { opacity: 0 },
                  "50%": { opacity: 0 },
                  "100%": { opacity: 1 },
                },
              }}
            >
              :
            </Typography>
            <Typography fontSize="18px" fontWeight={700}>
              {time.minutes} {time.period}
            </Typography>
          </Box>
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
