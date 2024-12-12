
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import TableGedung from "../../../pages/gedung/features/TableGedung";
import SideBar from "../../../components/SideBar/SideBar";
import Header from "../../../components/medium/Header";
import MediumCard from "../../../components/medium/MediumCard";
import CardAdd from "../../../components/medium/CardAdd";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AlertSuccess from "../../../components/small/AlertSuccess";
import useIndex from "../hooks/useIndex";

export default function Index() {
    const{data,
        successAddBuilding,
        successDeleteBuilding,
        successEditBuilding,
        loading,
        fetchData,
        showTemporarySuccessDelete,
        }=useIndex();
  return (
    <Box>
    <SideBar />

    <Box p={2} sx={{ marginLeft: "130px" }}>
      <Header />
      <Box>
        {successAddBuilding && (
          <AlertSuccess label="Success adding building" />
        )}
        {successDeleteBuilding && (
          <AlertSuccess label="Success delete building" />
        )}
        {successEditBuilding && (
          <AlertSuccess label="Success edit building" />
        )}
        <Typography sx={{ fontSize: "32px", fontWeight: "700", py: 5 }}>
          Gedung
        </Typography>
        <Grid container flex={1} mb={3} gap={3}>
          <MediumCard icon={BusinessOutlinedIcon} title="Total Gedung" subtitle={loading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : data.length.toString() || "0"} />
          <CardAdd icon={AddBoxIcon} title="Tambah Gedung" link="/tambahGedung" />
        </Grid>
        <TableGedung fetchDatas={fetchData} onSuccessDelete={showTemporarySuccessDelete} />
      </Box>
    </Box>
  </Box>
  )
}
