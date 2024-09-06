import { Box } from "@mui/material";
import SideBar from "../components/SideBar/SideBar";
import Dashboard from "./dashboard";
import LongCard from "../components/medium/LongCard";

export default function Home() {
  return (
    <Box>
      <SideBar />

      <Box p={2} sx={{ marginLeft: "358px" }}>
        <LongCard role="admin" username="Admin" />
        <Box>
          <Dashboard />
        </Box>
      </Box>
    </Box>
  );
}
