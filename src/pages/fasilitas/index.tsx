import { Box, Grid } from "@mui/system";
import { Typography } from "@mui/material";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/medium/Header";
import MediumCard from "../../components/medium/MediumCard";
import CardAdd from "../../components/medium/CardAdd";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TableFasilitas from "./TableFasilitas";
import TableSubFasilitas from "./TableSubFasilitas";

export default function Fasilitas() {
    return (
        <Box>
            <SideBar />

            <Box p={2} sx={{ marginLeft: "130px" }}>
                <Header />
                <Box>
                    <Typography sx={{ fontSize: "32px", fontWeight: "700", py: 5 }}>
                        Fasilitas
                    </Typography>
                    <Grid container spacing={3} flex={1} mb={3}>
                        <MediumCard icon={BusinessOutlinedIcon} title="Total Fasilitas" subtitle="10" />
                        <MediumCard icon={BusinessOutlinedIcon} title="Total Sub Fasilitas" subtitle="10" />
                        <CardAdd icon={AddBoxIcon} title="Tambah Fasilitas" link="/tambahFasilitas" />
                        <CardAdd icon={AddBoxIcon} title="Tambah Sub Fasilitas" link="/tambahFasilitas" />
                    </Grid>
                    <Box display={"flex"} flexDirection={"column"} gap={5} >
                        <TableFasilitas />
                        <TableSubFasilitas/>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
