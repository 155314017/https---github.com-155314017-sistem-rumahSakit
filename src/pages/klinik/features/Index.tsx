import { Box, Grid } from "@mui/system";
import { Typography, CircularProgress } from "@mui/material";
import SideBar from "../../../components/SideBar/SideBar";
import Header from "../../../components/medium/Header";
import MediumCard from "../../../components/small/card/MediumCard";
import CardAdd from "../../../components/small/card/CardAdd";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TableKlinik from "../../../pages/klinik/features/TableKlinik";
import AlertSuccess from "../../../components/small/alert/AlertSuccess";

//hooks
import useIndex from "../hooks/useIndex";

export default function Index() {
    const { data, isLoading, fetchData, successAddClinic, successDeleteClinic, successEditClinic, showTemporarySuccessDelete } = useIndex();
    return (
        <Box>
            <SideBar />

            <Box p={2} sx={{ marginLeft: "130px" }}>
                <Header />
                <Box>
                    {successAddClinic && (
                        <AlertSuccess label="Success adding clinic" />
                    )}
                    {successDeleteClinic && (
                        <AlertSuccess label="Success delete clinic" />
                    )}
                    {successEditClinic && (
                        <AlertSuccess label="Success edit clinic" />
                    )}
                    <Typography sx={{ fontSize: "32px", fontWeight: "700", py: 5 }}>
                        Klinik
                    </Typography>
                    <Grid container spacing={3} flex={1} mb={3}>
                        {/* <MediumCard icon={BusinessOutlinedIcon} title="Daftar Klinik" subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : data.length.toString()} /> */}
                        <MediumCard icon={BusinessOutlinedIcon} title="Total Ruangan" subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : data.length.toString() || "0"} />
                        <CardAdd icon={AddBoxIcon} title="Tambah Klinik" link="/tambahKlinik" />
                    </Grid>
                    <TableKlinik fetchDatas={fetchData} onSuccessDelete={showTemporarySuccessDelete} />
                </Box>
            </Box>
        </Box>
    )
}
