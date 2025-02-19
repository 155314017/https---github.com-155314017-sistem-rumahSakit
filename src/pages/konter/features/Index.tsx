import { Box, Grid } from "@mui/system";
import { Typography, CircularProgress } from "@mui/material";
import SideBar from "../../../components/SideBar/SideBar";
import Header from "../../../components/header/Header";
import MediumCard from "../../../components/small/card/MediumCard";
import CardAdd from "../../../components/small/card/CardAdd";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TableKonter from "./TableCounter";
import AlertSuccess from "../../../components/small/alert/AlertSuccess";

//hooks
import useIndex from "../hooks/useIndex";
import { gridContainerStyle } from "../../../style/ts/gridContainerStyle";
export default function Index() {
    const {
        data,
        loading,
        setPageNumber,
        setOrderBy,
        totalElements,
        isSuccess,
        message,
        showAlert,
        refetch
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
                        Konter
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
                            <MediumCard icon={BusinessOutlinedIcon} title="Daftar Konter" subtitle={loading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : data.length.toString()} />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                width: '49%'
                            }}
                        >
                            <CardAdd icon={AddBoxIcon} title="Tambah Konter" link="/tambahKonter" />
                        </Box>
                    </Grid>
                    <TableKonter
                        data={data}
                        onSuccessDelete={() => { showAlert('Counter deleted successfully!'); refetch() }}
                        setPageNumber={setPageNumber}
                        setOrderBy={setOrderBy}
                        totalElements={totalElements}
                    />
                </Box>
            </Box>
        </Box>
    )
}
