import { Box, Grid } from "@mui/system";
import { Typography, CircularProgress } from "@mui/material";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/medium/Header";
import MediumCard from "../../components/medium/MediumCard";
import CardAdd from "../../components/medium/CardAdd";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TableFasilitas from "./TableFasilitas";
import TableSubFasilitas from "./TableSubFasilitas";
import { useEffect, useState } from "react";
import { FacilityServices, FacilityDataItem } from "../../services/ManageFacility/FacilityServices";
import { SubFacilityServices, SubFacilityDataItem } from "../../services/ManageSubFacility/SubFacility";
import { useLocation, useNavigate } from "react-router-dom";
import AlertSuccess from "../../components/small/AlertSuccess";

export default function Fasilitas() {
    const [data, setData] = useState<FacilityDataItem[]>([]);
    const [data1, setData1] = useState<SubFacilityDataItem[]>([]);
    //fasilitas
    const [successAddBuilding, setSuccessAddBuilding] = useState(false);
    const [successDeleteBuilding, setSuccessDeleteBuilding] = useState(false);
    const [successEditBuilding, setSuccessEditBuilding] = useState(false);
    //sub
    const [successAddSub, setSuccessAddSub] = useState(false);
    const [successDeleteSub, setSuccessDeleteSub] = useState(false);
    const [successEditSub, setSuccessEditSub] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();



    const fetchDataFacility = async () => {
        setIsLoading(true)
        try {
            const result = await FacilityServices();
            setData(result);
            setIsLoading(false)
        } catch (error) {
            console.log('Failed to fetch data from API' + error);
        }
    };
    useEffect(() => {
        fetchDataFacility();
    }, []);


    const fetchDataSubFacility = async () => {
        try {
            const result1 = await SubFacilityServices();
            setData1(result1);
        } catch (error) {
            console.log('Failed to fetch data from API' + error);
        }
    };
    useEffect(() => {
        fetchDataSubFacility();
    }, []);


    //Fasilitas
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

    

    //Sub Fasilitas

    useEffect(() => {
        if (location.state && location.state.successAddSub) {
            showTemporaryAlertSuccessSub();
            navigate(location.pathname, { replace: true, state: undefined }); //clear state
        }
    }, [location.state, navigate]);

    useEffect(() => {
        if (location.state && location.state.successEditSub) {
            showTemporarySuccessEditSub();
            navigate(location.pathname, { replace: true, state: undefined }); //clear state
        }
    }, [location.state, navigate]);

    const showTemporaryAlertSuccessSub = async () => {
        setSuccessAddSub(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessAddSub(false);
    };

    const showTemporarySuccessDeleteSub = async () => {
        setSuccessDeleteSub(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessDeleteSub(false);
    };

    const showTemporarySuccessEditSub = async () => {
        setSuccessEditSub(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessEditSub(false);
    };

    return (
        <Box>
            <SideBar />

            <Box p={2} sx={{ marginLeft: "130px" }}>
                <Header />
                <Box>
                    {/* alert fasilitas */}
                    {successAddBuilding && (
                        <AlertSuccess label="Success adding Fasilitas" />
                    )}
                    {successDeleteBuilding && (
                        <AlertSuccess label="Success delete Fasilitas" />
                    )}
                    {successEditBuilding && (
                        <AlertSuccess label="Success edit Fasilitas" />
                    )}

                    {/* alert sub */}
                    {successAddSub && (
                        <AlertSuccess label="Success adding SubFasilitas" />
                    )}
                    {successDeleteSub && (
                        <AlertSuccess label="Success delete SubFasilitas" />
                    )}
                    {successEditSub && (
                        <AlertSuccess label="Success edit SubFasilitas" />
                    )}
                    <Typography sx={{ fontSize: "32px", fontWeight: "700", py: 5 }}>
                        Fasilitas
                    </Typography>
                    <Grid container spacing={3} flex={1} mb={3}>
                        <MediumCard icon={BusinessOutlinedIcon} title="Total Fasilitas" subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : data.length.toString()} />
                        <MediumCard icon={BusinessOutlinedIcon} title="Total Sub Fasilitas" subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : data1.length.toString()} />
                        <CardAdd icon={AddBoxIcon} title="Tambah Fasilitas" link="/tambahFasilitas" />
                        <CardAdd icon={AddBoxIcon} title="Tambah Sub Fasilitas" link="/tambahSubFasilitas" />
                    </Grid>
                    <Box display={"flex"} flexDirection={"column"} gap={5} >
                        <TableFasilitas fetchDatas={fetchDataFacility} onSuccessDelete={showTemporarySuccessDelete} />
                        <TableSubFasilitas fetchDatas={fetchDataSubFacility} onSuccessDelete={showTemporarySuccessDeleteSub} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
