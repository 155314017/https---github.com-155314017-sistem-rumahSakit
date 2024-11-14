import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/system";
import { Typography } from "@mui/material";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/medium/Header";
import MediumCard from "../../components/medium/MediumCard";
import CardAdd from "../../components/medium/CardAdd";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TableRuangan from "./TableRuangan";
import { RoomServices, RoomDataItem } from "../../services/Admin Tenant/ManageRoom/RoomServices";
import { useLocation, useNavigate } from "react-router-dom";
import AlertSuccess from "../../components/small/AlertSuccess";

export default function Ruangan() {
    const [data, setData] = useState<RoomDataItem[]>([]);
    const location = useLocation();
    const navigate = useNavigate();
    const [successAddRoom, setSuccessAddRoom] = useState(false);
    const [successDeleteRoom, setSuccessDeleteRoom] = useState(false);
    const [successEditRoom, setSuccessEditRoom] = useState(false);

    const fetchData = async () => {
        console.log('fetching data . . . ')
        try {
            const result = await RoomServices();
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
        setSuccessAddRoom(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessAddRoom(false);
    };

    const showTemporarySuccessDelete = async () => {
        console.log("Deleting building successful");
        setSuccessDeleteRoom(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessDeleteRoom(false);
    };

    const showTemporarySuccessEdit = async () => {
        console.log("Editing building successful");
        setSuccessEditRoom(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessEditRoom(false);
    };


    return (
        <Box>
            <SideBar />

            <Box p={2} sx={{ marginLeft: "130px" }}>
                <Header />
                <Box>
                    {successAddRoom && (
                        <AlertSuccess label="Success Adding Room" />
                    )}
                    {successDeleteRoom && (
                        <AlertSuccess label="Success Delete Room" />
                    )}
                    {successEditRoom && (
                        <AlertSuccess label="Success Edit Room" />
                    )}
                    <Typography sx={{ fontSize: "32px", fontWeight: "700", py: 5 }}>
                        Ruangan
                    </Typography>
                    <Grid container spacing={3} flex={1} mb={3}>
                        <MediumCard icon={BusinessOutlinedIcon} title="Total Ruangan" subtitle={data.length.toString() || "0"} />
                        <CardAdd icon={AddBoxIcon} title="Tambah Ruangan" link="/tambahRuangan" />
                    </Grid>
                    <TableRuangan fetchDatas={fetchData} onSuccessDelete={showTemporarySuccessDelete} />
                </Box>
            </Box>
        </Box>
    );
}
