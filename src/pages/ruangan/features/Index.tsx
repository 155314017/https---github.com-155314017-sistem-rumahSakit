import { Box, Grid } from "@mui/system";
import { CircularProgress, Typography } from "@mui/material";
import SideBar from "../../../components/SideBar/SideBar";
import Header from "../../../components/medium/Header";
import MediumCard from "../../../components/small/card/MediumCard";
import CardAdd from "../../../components/small/card/CardAdd";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TableRuangan from "../../../pages/ruangan/features/TableRuangan";
import AlertSuccess from "../../../components/small/alert/AlertSuccess";

//hooks
import useIndex from "../hooks/useIndex";

export default function Index() {
    const {
        roomData,
        successAddRoom,
        successDeleteRoom,
        successEditRoom,
        isLoading,
        showTemporarySuccessDelete,
        totalElements,
        setPageNumber,
        setOrderBy,
        dataIdBuilding
    } = useIndex();

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
                        <MediumCard icon={BusinessOutlinedIcon} title="Total Ruangan" subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : totalElements || "0"} />
                        <CardAdd icon={AddBoxIcon} title="Tambah Ruangan" link="/tambahRuangan" />
                    </Grid>
                    <TableRuangan
                        data={roomData}
                        onSuccessDelete={showTemporarySuccessDelete}
                        setPageNumber={setPageNumber}
                        setOrderBy={setOrderBy}
                        totalElements={totalElements}
                        dataIdBuilding={dataIdBuilding}
                    />
                </Box>
            </Box>
        </Box>
    );
}
