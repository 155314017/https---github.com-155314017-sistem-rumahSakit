import { Box, Grid } from "@mui/system";
import { CircularProgress, Typography } from "@mui/material";
import SideBar from "../../../components/SideBar/SideBar";
import Header from "../../../components/header/Header";
import MediumCard from "../../../components/small/card/MediumCard";
import CardAdd from "../../../components/small/card/CardAdd";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TableRuangan from "../../../pages/ruangan/features/TableRuangan";
import AlertSuccess from "../../../components/small/alert/AlertSuccess";

//hooks
import useIndex from "../hooks/useIndex";
import { gridContainerStyle } from "../../../style/ts/gridContainerStyle";

export default function Index() {
    const {
        dataRoom,
        isLoading,
        showAlert,
        message,
        isSuccess,
        fetchData,
        totalElements,
        dataIdBuilding,
        setPageNumber,
        setOrderBy
    } = useIndex();

    return (
        <Box>
            <SideBar />

            <Box p={2} sx={{ marginLeft: "130px" }}>
                <Header />
                <Box>
                    {isSuccess && (
                        <AlertSuccess label={message} />
                    )}
                    <Typography sx={{ fontSize: "32px", fontWeight: "700", py: 5 }}>
                        Ruangan
                    </Typography>
                    <Grid container
                        sx={gridContainerStyle}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                width: '49%'
                            }}
                        >
                            <MediumCard icon={BusinessOutlinedIcon} title="Total Ruangan" subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : totalElements || "0"} />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                width: '49%'
                            }}
                        >
                            <CardAdd icon={AddBoxIcon} title="Tambah Ruangan" link="/tambahRuangan" />
                        </Box>
                    </Grid>
                    <TableRuangan
                        data={dataRoom}
                        onSuccessDelete={() => showAlert('Room deleted successfully!', 300)}
                        setPageNumber={setPageNumber}
                        setOrderBy={setOrderBy}
                        totalElements={totalElements}
                        dataIdBuilding={dataIdBuilding}
                        fetchData={fetchData}
                    />
                </Box>
            </Box>
        </Box>
    );
}
