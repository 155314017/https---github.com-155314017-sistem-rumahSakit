import { Box } from "@mui/material";
import QueueDashboard from "../dashboard/features/QueueDashboard";
import SideBarQueueDashboard from "../../components/SideBar/SideBarQueueDashboard";
import HeaderNameClinic from "../../components/medium/HeaderNameClinic";

export default function HomeQueue() {
    return (
        <Box>
            <SideBarQueueDashboard />

            <Box p={2} sx={{ marginLeft: "130px" }}>
                <HeaderNameClinic />
                <Box>
                    <QueueDashboard />
                </Box>
            </Box>
        </Box>
    );
}
