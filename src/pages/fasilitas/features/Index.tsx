import { Box, Grid } from "@mui/system";
import { Typography, CircularProgress } from "@mui/material";
import SideBar from "../../../components/SideBar/SideBar";
import Header from "../../../components/header/Header";
import MediumCard from "../../../components/small/card/MediumCard";
import CardAdd from "../../../components/small/card/CardAdd";
// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TableFasilitas from "./TableFacility";
import TableSubFasilitas from "./TableSubFacility";
import AlertSuccess from "../../../components/small/alert/AlertSuccess";

//hooks
import useIndex from "../hooks/useIndex";

export default function Index() {
    const {
        dataFacility,
        totalElementsSubfacility,
        refetchSub,
        isLoading,
        message,
        isSuccess,
        showAlert,
        totalElementsFacility,
        setOrderByFacility,
        setPageNumberFacility,
    } = useIndex()
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
                        Fasilitas
                    </Typography>
                    <Grid container
                        sx={{
                            flex: 1,
                            mb: 3,
                            gap: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            '@media (max-width: 1194px)': {
                                flexDirection: 'column',
                            }
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '49%',
                                gap: 2,
                                '@media (max-width: 1194px)': {
                                    width: 'auto',
                                }
                            }}
                        >
                            <MediumCard icon={BusinessOutlinedIcon} title="Total Fasilitas" subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : totalElementsFacility} />
                            <MediumCard icon={BusinessOutlinedIcon} title="Total Sub Fasilitas" subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : totalElementsSubfacility} />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '49%',
                                gap: 2,
                                '@media (max-width: 1194px)': {
                                    width: 'auto',
                                }
                            }}
                        >
                            <CardAdd icon={AddBoxIcon} title="Tambah Fasilitas" link="/tambahFasilitas" />
                            <CardAdd icon={AddBoxIcon} title="Tambah Sub Fasilitas" link="/tambahSubFasilitas" />
                        </Box>
                    </Grid>
                    <Box display={"flex"} flexDirection={"column"} gap={5} >
                        <TableFasilitas
                            data={dataFacility}
                            onSuccessDelete={() => showAlert('Fasilitas deleted successfully!', 300)}
                            setPageNumber={setPageNumberFacility}
                            setOrderBy={setOrderByFacility}
                            totalElements={totalElementsFacility}
                        />
                        <TableSubFasilitas fetchDatas={refetchSub} onSuccessDelete={() => showAlert('SubFasilitas deleted successfully!', 300)} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
