import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/system";
import { Typography } from "@mui/material";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/medium/Header";
import MediumCard from "../../components/medium/MediumCard";
import CardAdd from "../../components/medium/CardAdd";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TableKonter from "./TableKonter";
import { CounterServices, CounterDataItem } from "../../services/Admin Tenant/ManageCounter/CounterServices";

export default function Konter() {
    const [data, setData] = useState<CounterDataItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log('fetching data . . . ')
            try {
                const result = await CounterServices();
                console.log('result : ' + result)
                setData(result);
                console.log(data)
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
                        Konter
                    </Typography>
                    <Grid container spacing={3} flex={1} mb={3}>
                        <MediumCard icon={BusinessOutlinedIcon} title="Daftar Konter" subtitle={data.length.toString()} />
                        <CardAdd icon={AddBoxIcon} title="Tambah Konter" link="/tambahKonter" />
                    </Grid>
                    <TableKonter />
                </Box>
            </Box>
        </Box>
    );
}
