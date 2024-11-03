import { useEffect, useState } from "react";
import { Box, Grid,  Typography } from "@mui/material";
import TableGedung from "./TableGedung";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/medium/Header";
import MediumCard from "../../components/medium/MediumCard";
import CardAdd from "../../components/medium/CardAdd";
import { Building, BuildingDataItem } from "../../services/Admin Tenant/ManageBuilding/Building";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';


export default function Gedung() {
  const [data, setData] = useState<BuildingDataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetching data . . . ')
      try {
        const result = await Building();
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
            Gedung
          </Typography>
          <Grid container flex={1} mb={3} gap={3}>
            <MediumCard icon={BusinessOutlinedIcon} title="Total Gedung" subtitle={data.length.toString() || "0"} />
            <CardAdd icon={AddBoxIcon} title="Tambah Gedung" link="/tambahGedung" />
          </Grid>
          <TableGedung />
        </Box>
      </Box>
    </Box>
  );
}
