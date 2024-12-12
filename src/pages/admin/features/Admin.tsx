import { Box } from "@mui/material";
import SideBarAdmin from "../../../components/SideBar/SideBarAdmin";
import DashboardAdmin from "./DashboardAdmin";

export default function Admin() {
  return (
    <Box>
      <SideBarAdmin />

      <Box p={2} sx={{ marginLeft: "358px" }}>
        {/* <LongCard role="admin" username="Admin" /> */}
        <Box>
          <DashboardAdmin />
        </Box>
      </Box>
    </Box>
  );
}
