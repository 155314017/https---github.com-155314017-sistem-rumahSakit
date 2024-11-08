import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import TableGedung from "./TableGedung";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/medium/Header";
import MediumCard from "../../components/medium/MediumCard";
import CardAdd from "../../components/medium/CardAdd";
import { Building, BuildingDataItem } from "../../services/Admin Tenant/ManageBuilding/Building";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AlertSuccess from "../../components/small/AlertSuccess";

export default function Gedung() {
  const [data, setData] = useState<BuildingDataItem[]>([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    console.log('Fetching data...');
    try {
      setLoading(true);
      const result = await Building();
      console.log('Result:', result);
      setData(result);
      setLoading(false);
    } catch (error) {
      console.log('Failed to fetch data from API', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showTemporaryAlertSuccess = async () => {
    console.log("DELETEEEDDD")
    setSuccessAlert(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setSuccessAlert(false);
  };

  return (
    <Box>
      <SideBar />

      <Box p={2} sx={{ marginLeft: "130px" }}>
        <Header />
        <Box>
          {successAlert && (
            <AlertSuccess label="Success delete building" />
          )}
          <Typography sx={{ fontSize: "32px", fontWeight: "700", py: 5 }}>
            Gedung
          </Typography>
          <Grid container flex={1} mb={3} gap={3}>
            <MediumCard icon={BusinessOutlinedIcon} title="Total Gedung" subtitle={loading ? ". . ." : data.length.toString() || "0"} />
            <CardAdd icon={AddBoxIcon} title="Tambah Gedung" link="/tambahGedung" />
          </Grid>
          <TableGedung fetchDatas={fetchData} sukses={showTemporaryAlertSuccess} />
        </Box>
      </Box>
    </Box>
  );
}
