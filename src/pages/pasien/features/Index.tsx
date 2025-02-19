import { Box, Grid } from "@mui/system";
import { CircularProgress, Typography } from "@mui/material";
import SideBar from "../../../components/SideBar/SideBar";
import Header from "../../../components/header/Header";
import MediumCard from "../../../components/small/card/MediumCard";
import CardAddOnClick from "../../../components/small/card/CardAddOnClick";
import TablePasien from "./TablePatient";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';

//hooks
import useIndex from "../hooks/useIndex";
import ModalKategoriPasien from "../../../components/medium/modal/ModalPatientCategory";
import AlertSuccess from "../../../components/small/alert/AlertSuccess";
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
        setOpen,
        open
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
                        Pasien
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
                            <MediumCard icon={BusinessOutlinedIcon} title="Total Pasien" subtitle={loading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : totalElements.toString() || "0"}/>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                width: '49%'
                            }}
                        >
                            <CardAddOnClick
                                icon={AddBoxIcon}
                                title="Tambah Pasien"
                                link="/add-patient"
                                onClick={() => setOpen(true)}
                            />
                        </Box>
                    </Grid>
                    <TablePasien
                        data={data}
                        onSuccessDelete={() => showAlert("Success delete patient")}
                        setPageNumber={setPageNumber}
                        setOrderBy={setOrderBy}
                        totalElements={totalElements}
                    />
                </Box>
            </Box>

            <ModalKategoriPasien open={open} onClose={() => setOpen(false)} />
        </Box>
    )
}
