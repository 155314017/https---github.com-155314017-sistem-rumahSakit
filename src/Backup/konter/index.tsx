import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/system";
import { Typography, CircularProgress } from "@mui/material";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/medium/Header";
import MediumCard from "../../components/medium/MediumCard";
import CardAdd from "../../components/medium/CardAdd";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TableKonter from "./TableKonter";
import { CounterServices, CounterDataItem } from "../../services/Admin Tenant/ManageCounter/CounterServices";
import { useLocation, useNavigate } from "react-router-dom";
import AlertSuccess from "../../components/small/AlertSuccess";

export default function Konter() {
    const [data, setData] = useState<CounterDataItem[]>([]);
    const [successAddBuilding, setSuccessAddBuilding] = useState(false);
    const [successDeleteBuilding, setSuccessDeleteBuilding] = useState(false);
    const [successEditBuilding, setSuccessEditBuilding] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const result = await CounterServices();
            setData(result);
            setIsLoading(false)
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
            navigate(location.pathname, { replace: true, state: undefined }); //clear state
        }
    }, [location.state, navigate]);

    useEffect(() => {
        if (location.state && location.state.successEdit) {
            showTemporarySuccessEdit();
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
                        <AlertSuccess label="Success adding counter" />
                    )}
                    {successDeleteBuilding && (
                        <AlertSuccess label="Success delete counter" />
                    )}
                    {successEditBuilding && (
                        <AlertSuccess label="Success edit counter" />
                    )}
                    <Typography sx={{ fontSize: "32px", fontWeight: "700", py: 5 }}>
                        Konter
                    </Typography>
                    <Grid container spacing={3} flex={1} mb={3}>
                        <MediumCard icon={BusinessOutlinedIcon} title="Daftar Konter" subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : data.length.toString()} />
                        <CardAdd icon={AddBoxIcon} title="Tambah Konter" link="/tambahKonter" />
                    </Grid>
                    <TableKonter fetchDatas={fetchData} onSuccessDelete={showTemporarySuccessDelete} />
                </Box>
            </Box>
        </Box>
    );
}
