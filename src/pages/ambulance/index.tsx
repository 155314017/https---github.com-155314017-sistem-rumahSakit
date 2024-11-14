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
import { useLocation, useNavigate } from "react-router-dom";
import AlertSuccess from "../../components/small/AlertSuccess";

export default function Ambulance() {

  const [data, setData] = useState<AmbulanceDataItem[]>([]);
  const [successAddBuilding, setSuccessAddBuilding] = useState(false);
  const [successDeleteBuilding, setSuccessDeleteBuilding] = useState(false);
  const [successEditBuilding, setSuccessEditBuilding] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


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


  useEffect(() => {
    if (location.state && location.state.successAdd) {
      showTemporaryAlertSuccess();
      console.log(location.state.message);
      navigate(location.pathname, { replace: true, state: undefined }); //clear state
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (location.state && location.state.successEdit) {
      showTemporarySuccessEdit();
      console.log(location.state.message);
      navigate(location.pathname, { replace: true, state: undefined }); //clear state
    }
  }, [location.state, navigate]);

  const showTemporaryAlertSuccess = async () => {
    console.log("Adding ambulance successful");
    setSuccessAddBuilding(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setSuccessAddBuilding(false);
  };

  const showTemporarySuccessDelete = async () => {
    console.log("Deleting ambulance successful");
    setSuccessDeleteBuilding(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setSuccessDeleteBuilding(false);
  };

  const showTemporarySuccessEdit = async () => {
    console.log("Editing ambulance successful");
    setSuccessEditBuilding(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setSuccessEditBuilding(false);
  };

  return (
    <Box>
      <SideBar />

      <Box p={2} sx={{ marginLeft: "130px" }}>
        <Header />
        <Box>
          {successAddBuilding && (
            <AlertSuccess label="Success adding ambulance" />
          )}
          {successDeleteBuilding && (
            <AlertSuccess label="Success delete ambulance" />
          )}
          {successEditBuilding && (
            <AlertSuccess label="Success edit ambulance" />
          )}
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

          <TableAmbulance fetchDatas={fetchData} onSuccessDelete={showTemporarySuccessDelete} />
        </Box>
      </Box>
    </Box>
  );
}
