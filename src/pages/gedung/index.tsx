import { Box, Grid } from "@mui/system";
import { Typography } from "@mui/material";
import TableGedung from "./TableGedung";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/medium/Header";
import MediumCard from "../../components/medium/MediumCard";
import CardAdd from "../../components/medium/CardAdd";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function Gedung() {
  return (
    <Box>
      <SideBar />

      <Box p={2} sx={{ marginLeft: "130px" }}>
        <Header />
        <Box>
          <Typography sx={{ fontSize: "32px", fontWeight: "700", py: 5 }}>
            Gedung
          </Typography>
          <Grid container spacing={3} flex={1} mb={3}>
            <MediumCard icon={BusinessOutlinedIcon} title="Total Gedung" subtitle="10" />
            <CardAdd icon={AddBoxIcon} title="Tambah Gedung" link="/tambahGedung"/>
          </Grid>
          <TableGedung />
        </Box>
      </Box>
    </Box>
  );
}
