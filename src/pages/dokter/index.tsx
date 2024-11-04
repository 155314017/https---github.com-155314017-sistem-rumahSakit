import { Box, Grid } from "@mui/system";
import { Typography } from "@mui/material";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/medium/Header";
import MediumCard from "../../components/medium/MediumCard";
import CardAdd from "../../components/medium/CardAdd";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TableDokter from "./TableDokter";
import { useEffect, useState } from "react";
import { DoctorServices, DoctorDataItem } from "../../services/Admin Tenant/ManageDoctor/DoctorServices";

export default function Dokter() {

    const [data, setData] = useState<DoctorDataItem[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            console.log('fetching data . . . ')
            try {
                const result = await DoctorServices();
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
                        Dokter
                    </Typography>
                    <Grid container spacing={3} flex={1} mb={3}>
                        <MediumCard icon={BusinessOutlinedIcon} title="Total Dokter Spesialis" subtitle="89" />
                        <MediumCard icon={BusinessOutlinedIcon} title="Total Dokter Umum" subtitle="127" />
                        <CardAdd icon={AddBoxIcon} title="Tambah Pegawai" link="/tambahPegawai" />  
                    </Grid>
                    <TableDokter/>
                </Box>
            </Box>
        </Box>
    );
}
