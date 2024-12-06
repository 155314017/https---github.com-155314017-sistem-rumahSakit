import { Box, Grid } from "@mui/system";
import { Typography, CircularProgress } from "@mui/material";
import SideBar from "../../../components/SideBar/SideBar";
import Header from "../../../components/medium/Header";
import MediumCard from "../../../components/medium/MediumCard";
import CardAdd from "../../../components/medium/CardAdd";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TableKlinik from "../../../Backup/klinik/TableKlinik";
import AlertSuccess from "../../../components/small/AlertSuccess";

//hooks
import useIndex from "../hooks/useIndex";

export default function Index() {
    const { data, isLoading, fetchData, successAddBuilding, successDeleteBuilding, successEditBuilding, showTemporarySuccessDelete } = useIndex();
  return (
    <Box>
    <SideBar />

    <Box p={2} sx={{ marginLeft: "130px" }}>
        <Header />
        <Box>
            {successAddBuilding && (
                <AlertSuccess label="Success adding clinic" />
            )}
            {successDeleteBuilding && (
                <AlertSuccess label="Success delete clinic" />
            )}
            {successEditBuilding && (
                <AlertSuccess label="Success edit clinic" />
            )}
            <Typography sx={{ fontSize: "32px", fontWeight: "700", py: 5 }}>
                Klinik
            </Typography>
            <Grid container spacing={3} flex={1} mb={3}>
                <MediumCard icon={BusinessOutlinedIcon} title="Daftar Klinik" subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : data.length.toString()} />
                <CardAdd icon={AddBoxIcon} title="Tambah Klinik" link="/tambahKlinik" />
            </Grid>
            <TableKlinik fetchDatas={fetchData} onSuccessDelete={showTemporarySuccessDelete} />
        </Box>
    </Box>
</Box>
  )
}