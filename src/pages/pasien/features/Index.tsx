import { Box, Grid } from "@mui/system";
import { Typography } from "@mui/material";
import SideBar from "../../../components/SideBar/SideBar";
import Header from "../../../components/header/Header";
import MediumCard from "../../../components/small/card/MediumCard";
import CardAddOnClick from "../../../components/small/card/CardAddOnClick";
import TablePasien from "../../../pages/pasien/features/TablePasien";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';

//hooks
import useIndex from "../hooks/useIndex";
import ModalKategoriPasien from "../../../components/medium/modal/ModalKategoriPasien";
export default function Index() {
    const {
        data,
        open,
        setOpen,
        showTemporarySuccessDelete,
        setOrderBy,
        setPageNumber,
        totalElements
    } = useIndex();
    return (
        <Box>
            <SideBar />

            <Box p={2} sx={{ marginLeft: "130px" }}>
                <Header />
                <Box>
                    <Typography sx={{ fontSize: "32px", fontWeight: "700", py: 5 }}>
                        Pasien
                    </Typography>
                    <Grid container
                        sx={{
                            flex: 1,
                            mb: 3,
                            gap: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            maxWidth: '50%',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                width: '49%'
                            }}
                        >
                            <MediumCard icon={BusinessOutlinedIcon} title="Total Pasien" subtitle={data.length.toString()} />
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
                        onSuccessDelete={showTemporarySuccessDelete}
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
