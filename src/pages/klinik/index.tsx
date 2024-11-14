import { Box, Grid } from "@mui/system";
import { Typography } from "@mui/material";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/medium/Header";
import MediumCard from "../../components/medium/MediumCard";
import CardAdd from "../../components/medium/CardAdd";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TableKlinik from "./TableKlinik";
import { useEffect, useState } from "react";
import { Clinic, ClinicDataItem } from "../../services/Admin Tenant/ManageClinic/Clinic";
import { useLocation, useNavigate } from "react-router-dom";
import AlertSuccess from "../../components/small/AlertSuccess";

export default function Klinik() {
    const [data, setData] = useState<ClinicDataItem[]>([]);
    const [successAddBuilding, setSuccessAddBuilding] = useState(false);
    const [successDeleteBuilding, setSuccessDeleteBuilding] = useState(false);
    const [successEditBuilding, setSuccessEditBuilding] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();


    const fetchData = async () => {
        console.log('fetching data . . . ')
        try {
            const result = await Clinic();
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
        console.log("Adding building successful");
        setSuccessAddBuilding(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessAddBuilding(false);
    };

    const showTemporarySuccessDelete = async () => {
        console.log("Deleting building successful");
        setSuccessDeleteBuilding(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessDeleteBuilding(false);
    };

    const showTemporarySuccessEdit = async () => {
        console.log("Editing building successful");
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
                        <MediumCard icon={BusinessOutlinedIcon} title="Daftar Klinik" subtitle={data.length.toString()} />
                        <CardAdd icon={AddBoxIcon} title="Tambah Klinik" link="/tambahKlinik" />
                    </Grid>
                    <TableKlinik fetchDatas={fetchData} onSuccessDelete={showTemporarySuccessDelete} />
                </Box>
            </Box>
        </Box>
    );
}
