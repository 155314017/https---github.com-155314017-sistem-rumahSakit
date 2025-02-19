import { Box, Grid } from "@mui/system";
import { Typography, CircularProgress } from "@mui/material";
import SideBar from "../../../components/SideBar/SideBar";
import Header from "../../../components/header/Header";
import MediumCard from "../../../components/small/card/MediumCard";
import CardAdd from "../../../components/small/card/CardAdd";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TableKlinik from "../../../pages/klinik/features/TableKlinik";
import AlertSuccess from "../../../components/small/alert/AlertSuccess";

//hooks
import useIndex from "../hooks/useIndex";
import { gridContainerStyle } from "../../../style/ts/gridContainerStyle";

export default function Index() {
    const {
        data,
        loading,
        setPageNumber,
        isSuccess,
        message,
        setOrderBy,
        totalElements,
        fetchData,
        showAlert
    } = useIndex();
    return (
        <Box>
            <SideBar />

            <Box p={2} sx={{ marginLeft: "130px" }}>
                <Header />
                <Box>
                    {/* alert notifikasi  */}
                    {isSuccess && (
                        <AlertSuccess label={message} />
                    )}
                    <Typography sx={{ fontSize: "32px", fontWeight: "700", py: 5 }}>
                        Klinik
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
                            <MediumCard icon={BusinessOutlinedIcon} title="Total Klinik
                            " subtitle={loading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : data.length.toString() || "0"} />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                width: '49%'
                            }}
                        >
                            <CardAdd icon={AddBoxIcon} title="Tambah Klinik" link="/tambahKlinik" />
                        </Box>
                    </Grid>
                    <TableKlinik
                        data={data}
                        onSuccessDelete={() => {showAlert('Clinic deleted successfuly'); fetchData();} }
                        setPageNumber={setPageNumber}
                        setOrderBy={setOrderBy}
                        totalElements={totalElements}
                        fetchData={fetchData}
                        
                    />
                </Box>
            </Box>
        </Box>
    )
}
