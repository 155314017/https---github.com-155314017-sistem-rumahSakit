import { Box, Grid } from "@mui/system";
import { Typography } from "@mui/material";
import SideBar from "../../../components/SideBar/SideBar";
import Header from "../../../components/medium/Header";
import MediumCard from "../../../components/medium/MediumCard";
import CardAdd from "../../../components/medium/CardAdd";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TablePegawai from "../../../pages/pegawai/features/TablePegawai";

export default function Pegawai() {
    return (
        <Box>
            <SideBar />

            <Box p={2} sx={{ marginLeft: "130px" }}>
                <Header />
                <Box>
                    <Typography sx={{ fontSize: "32px", fontWeight: "700", py: 5 }}>
                        Pegawai
                    </Typography>
                    <Grid container spacing={3} flex={1} mb={3}>
                        <MediumCard icon={BusinessOutlinedIcon} title="Total Dokter Spesialis" subtitle="89" />
                        <MediumCard icon={BusinessOutlinedIcon} title="Total Dokter Umum" subtitle="127" /> 
                        <MediumCard icon={BusinessOutlinedIcon} title="Total Perawat" subtitle="267" />
                        <MediumCard icon={BusinessOutlinedIcon} title="Total Admin" subtitle="108" />
                        <MediumCard icon={BusinessOutlinedIcon} title="Total Manajemen" subtitle="48" />
                        <CardAdd icon={AddBoxIcon} title="Tambah Pegawai" link="/tambahPegawai" />
                    </Grid>
                    <TablePegawai/>
                </Box>
            </Box>
        </Box>
    );
}
