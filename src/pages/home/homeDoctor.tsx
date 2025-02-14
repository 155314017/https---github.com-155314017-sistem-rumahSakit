/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from "@mui/material";
import QueueDashboard from "../dashboard/features/QueueDashboard";
import SideBarQueueDashboard from "../../components/SideBar/SideBarQueueDashboard";
import HeaderNameClinic from "../../components/medium/HeaderNameClinic";

export default function HomeDoctor() {
    return (
        <Box>
            <SideBarQueueDashboard onSelect={function (value: string): void {
                throw new Error("Function not implemented.");
            }} />

            <Box p={2} sx={{ marginLeft: "130px" }}>
                <HeaderNameClinic />
                <Box>
                    <QueueDashboard />
                </Box>
            </Box>
        </Box>
    );
}
