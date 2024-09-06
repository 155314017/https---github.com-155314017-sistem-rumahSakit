import { Box, Typography, Stack } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

interface LongCardProps {
  role: string;
  username: string;
}

export default function LongCard({role, username}: LongCardProps) {
  return (
    <Box>
      <Box
        height={"92px"}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          border: "1px solid #A8A8BD",
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          p={2}
          px={4}
        >
          <Stack>
            <Typography
              fontSize={"16px"}
              color="#A8A8BD"
              textTransform={"capitalize"}
            >
              {role}
            </Typography>
            <Typography
              fontSize={"20px"}
              fontWeight={"700"}
              textTransform={"capitalize"}
            >
              {username}
            </Typography>
          </Stack>

          <NotificationsNoneOutlinedIcon
            height={20}
            width={20}
            sx={{ color: "#8F85F3" }}
          />
        </Box>
      </Box>
    </Box>
  );
}
