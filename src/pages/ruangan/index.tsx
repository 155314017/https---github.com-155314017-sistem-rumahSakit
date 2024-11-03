import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/system";
import { Typography } from "@mui/material";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/medium/Header";
import MediumCard from "../../components/medium/MediumCard";
import CardAdd from "../../components/medium/CardAdd";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TableRuangan from "./TableRuangan";
import { RoomServices, RoomDataItem } from "../../services/Admin Tenant/ManageRoom/RoomServices";

export default function Ruangan() {

    const [data, setData] = useState<RoomDataItem[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            console.log('fetching data . . . ')
            try {
                const result = await RoomServices();
                console.log('result : ' + result)
                setData(result);
            } catch (error) {
                console.log('Failed to fetch data from API' + error);
            }
        };

        fetchData();
    }, []);

    return (
        <Box>
            <SideBar />

            <Box p={2} sx={{ marginLeft: "130px" }}>
                <Header />
                <Box>
                    <Typography sx={{ fontSize: "32px", fontWeight: "700", py: 5 }}>
                        Ruangan
                    </Typography>
                    <Grid container spacing={3} flex={1} mb={3}>
                        <MediumCard icon={BusinessOutlinedIcon} title="Total Ruangan" subtitle={data.length.toString() || "0"} />
                        <CardAdd icon={AddBoxIcon} title="Tambah Ruangan" link="/tambahRuangan" />
                    </Grid>
                    <TableRuangan />
                </Box>
            </Box>
        </Box>
    );
}
