import { Box, Grid } from "@mui/system";
import { Typography } from "@mui/material";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/medium/Header";
import MediumCard from "../../components/medium/MediumCard";
import CardAdd from "../../components/medium/CardAdd";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TableKlinik from "./TableKlinik";
import { useEffect, useState } from "react";
import { Clinic, DataItem } from "../../services/Admin Tenant/ManageClinic/Clinic";

export default function Klinik() {
    const [data, setData] = useState<DataItem[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            console.log('fetching data . . . ')
            try {
                const result = await Clinic();
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
                        Klinik
                    </Typography>
                    <Grid container spacing={3} flex={1} mb={3}>
                        <MediumCard icon={BusinessOutlinedIcon} title="Daftar Klinik" subtitle={data.length.toString()} />
                        <CardAdd icon={AddBoxIcon} title="Tambah Klinik" link="/tambahKlinik" />
                    </Grid>
                    <TableKlinik/>
                </Box>
            </Box>
        </Box>
    );
}
