import { Box } from "@mui/material";
import QueueDashboard from "../dashboard/features/QueueDashboard";
import SideBarQueueDashboard from "../../components/SideBar/SideBarQueueDashboard";
import HeaderNameClinic from "../../components/medium/HeaderNameClinic";
import { useState } from "react";

export default function HomeQueue() {
    const [selectedValue, setSelectedValue] = useState<string | null>("Dasboard");

    
    return (
        <Box>
            <SideBarQueueDashboard onSelect={setSelectedValue} />

            <Box p={2} sx={{ marginLeft: "130px" }}>
                <HeaderNameClinic />
                <Box>
                    <QueueDashboard  selectedValue={selectedValue}/>
                </Box>
            </Box>
        </Box>
    );
}
