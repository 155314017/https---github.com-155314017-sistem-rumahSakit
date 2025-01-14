import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Popover,
  Button,
} from "@mui/material";
import moment from "moment";
import Cookies from "js-cookie";

// icon
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ClockIcon } from "../../assets/icons/ClockIcon";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [notifyAnchorEl, setNotifyAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [time, setTime] = useState({
    hours: moment().format("h"),
    minutes: moment().format("mm"),
    period: moment().format("a"),
  });
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>('');

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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotifyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setNotifyAnchorEl(event.currentTarget);
  };

  const handleNotifyClose = () => {
    setNotifyAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const notifyOpen = Boolean(notifyAnchorEl);
  const id = open ? "simple-popover" : undefined;
  const notifyId = notifyOpen ? "notify-popover" : undefined;

  const logOut = () => {
    // sessionStorage.clear();
    Cookies.remove('accessToken');
    navigate('/', { state: { successLogOut: true } })
  }

  useEffect(() => {
    const name = sessionStorage.getItem('username')
    setUsername(name);
  });

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
          color: "#747487"
        }}
      >
        {/* time and role */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ClockIcon />

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography fontSize="18px" fontWeight={700}>
              {time.hours}
            </Typography>
            <Typography
              component="span"
              fontSize="20px"
              fontWeight={700}
              sx={{
                animation: "blink 0.75s steps(2, start) infinite",
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
        {/* notify icon */}
        <IconButton
          sx={{ color: "#8F85F3", bgcolor: "#fff" }}
          onClick={handleNotifyClick}
        >
          <NotificationsNoneOutlinedIcon />
        </IconButton>
        <Popover
          id={notifyId}
          open={notifyOpen}
          anchorEl={notifyAnchorEl}
          onClose={handleNotifyClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Box p={2}>
            <Typography fontWeight={700}>No new notifications</Typography>
          </Box>
        </Popover>

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
          <IconButton size="small" onClick={handleClick}>
            <KeyboardArrowDownIcon sx={{ color: "#8F85F3" }} />
          </IconButton>
        </Box>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Box p={2}>
            <Box display="flex" alignItems="center" gap={1} pr={10}>
              <Avatar>AP</Avatar>
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                    textTransform: "capitalize",
                  }}
                >
                  {username}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    textTransform: "capitalize",
                    color: "#A8A8BD",
                  }}
                >
                  role
                </Typography>
              </Box>
            </Box>

            <Box display="flex" flexDirection="column" gap={1} pt={2}>
              <Button fullWidth sx={{ justifyContent: "flex-start" }}>
                <Typography
                  fontSize={"14px"}
                  color="#8F85F3"
                  sx={{ textTransform: "capitalize" }}
                >
                  Pengaturan
                </Typography>
              </Button>
              <Button
                onClick={logOut}
                fullWidth
                sx={{ justifyContent: "flex-start" }}
              >
                <Typography
                  fontSize={"14px"}
                  color="#8F85F3"
                  sx={{ textTransform: "capitalize" }}
                >
                  Keluar
                </Typography>
              </Button>
            </Box>
          </Box>
        </Popover>
      </Box>
    </Box>
  );
}
