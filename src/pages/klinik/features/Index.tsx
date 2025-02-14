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
    const {
        data,
        isLoading,
        successAddClinic,
        successDeleteClinic,
        successEditClinic,
        showTemporarySuccessDelete,
        setPageNumber,
        setOrderBy,
        totalElements
    } = useIndex();
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
                    <Grid container
                        sx={{
                            flex: 1,
                            mb: 3,
                            gap: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            maxWidth: '50%',
                            justifyContent: 'space-between',
                            '@media (min-width: 1010px) and (max-width: 1194px)': {
                                maxWidth: '55%'
                            },
                            '@media (min-width: 900px) and (max-width: 1010px)': {
                                maxWidth: '60%'
                            },
                            '@media (min-width: 750px) and (max-width: 900px)': {
                                maxWidth: '70%'
                            },
                            '@media  (max-width: 750px)': {
                                maxWidth: '100%'
                            }

                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                width: '49%'
                            }}
                        >
                            <MediumCard icon={BusinessOutlinedIcon} title="Total Ruangan" subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : data.length.toString() || "0"} />
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
                        onSuccessDelete={showTemporarySuccessDelete}
                        setPageNumber={setPageNumber}
                        setOrderBy={setOrderBy}
                        totalElements={totalElements}
                    />
                </Box>
            </Box>
        </Box>
    )
}
