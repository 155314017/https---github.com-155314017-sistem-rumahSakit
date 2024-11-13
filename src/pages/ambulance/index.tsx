import { Box, Grid } from "@mui/system";
import { Typography } from "@mui/material";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/medium/Header";
import MediumCard from "../../components/medium/MediumCard";
import CardAdd from "../../components/medium/CardAdd";
import TableAmbulance from "../ambulance/TableAmbulance";

// icon
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useEffect, useState } from "react";
import { AmbulanceServices, AmbulanceDataItem } from "../../services/Admin Tenant/ManageAmbulance/AmbulanceServices";

export default function Ambulance() {

  const [data, setData] = useState<AmbulanceDataItem[]>([]);
  const [successAlert, setSuccessAlert] = useState(false);


  const fetchData = async () => {
    console.log('fetching data . . . ')
    try {
      const result = await AmbulanceServices();
      console.log('result : ' + result)
      setData(result);
    } catch (error) {
      console.log('Failed to fetch data from API' + error);
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
          <Typography sx={{ fontSize: "32px", fontWeight: "700", py: 5 }}>
            Ambulance
          </Typography>
          <Grid container spacing={3} flex={1} mb={3}>
            <MediumCard
              icon={MinorCrashIcon}
              title="Total Ambulance"
              subtitle={data.length.toString()}
            />
            <CardAdd
              icon={AddBoxIcon}
              title="Tambah Ambulance"
              link="/tambahAmbulance"
            />
          </Grid>

          <TableAmbulance fetchDatas={fetchData} sukses={showTemporaryAlertSuccess} />
        </Box>
      </Box>
    </Box>
  );
}
