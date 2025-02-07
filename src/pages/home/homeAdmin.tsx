import { Box } from "@mui/material";
import SideBar from "../../components/SideBar/SideBar";
import Dashboard from "../dashboard/features/Index";
import Header from "../../components/medium/Header";

export default function HomeAdmin() {
  return (
    <Box>
      <SideBar />

      <Box p={2} sx={{ marginLeft: "130px" }}>
        <Header />
        <Box>
          <Dashboard />
        </Box>
      </Box>
    </Box>
  );
}
