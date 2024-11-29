import { useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import TableGedung from "./TableGedung";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/medium/Header";
import MediumCard from "../../components/medium/MediumCard";
import CardAdd from "../../components/medium/CardAdd";
import { Building, BuildingDataItem } from "../../services/Admin Tenant/ManageBuilding/Building";
import { useLocation, useNavigate } from 'react-router-dom';
// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AlertSuccess from "../../components/small/AlertSuccess";

export default function Gedung() {
  const [data, setData] = useState<BuildingDataItem[]>([]);
  const [successAddBuilding, setSuccessAddBuilding] = useState(false);
  const [successDeleteBuilding, setSuccessDeleteBuilding] = useState(false);
  const [successEditBuilding, setSuccessEditBuilding] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await Building();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.log('Failed to fetch data from API', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (location.state && location.state.successAdd) {
      showTemporaryAlertSuccess();
      navigate(location.pathname, { replace: true, state: undefined }); //clear state
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (location.state && location.state.successEdit) {
      showTemporarySuccessEdit();
      navigate(location.pathname, { replace: true, state: undefined }); //clear state
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (location.state && location.state.successDelete) {
      showTemporarySuccessDelete();
      navigate(location.pathname, { replace: true, state: undefined }); //clear state
    }
  }, [location.state, navigate]);

  const showTemporaryAlertSuccess = async () => {
    setSuccessAddBuilding(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setSuccessAddBuilding(false);
  };

  const showTemporarySuccessDelete = async () => {
    setSuccessDeleteBuilding(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setSuccessDeleteBuilding(false);
  };

  const showTemporarySuccessEdit = async () => {
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
  );
}
