import { Box, Grid } from "@mui/system";
import { Typography } from "@mui/material";
import SideBar from "../../../components/SideBar/SideBar";
import Header from "../../../components/header/Header";
import MediumCard from "../../../components/small/card/MediumCard";
import CardAdd from "../../../components/small/card/CardAdd";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TableDokter from "./TableDokter";
import useIndex from "../hooks/useIndex";

export default function Index() {
    const { data } = useIndex()
    return (
        <Box>
            <SideBar />

            <Box p={2} sx={{ marginLeft: "130px" }}>
                <Header />
                <Box>
                    <Typography sx={{ fontSize: "32px", fontWeight: "700", py: 5 }}>
                        Dokter
                    </Typography>
                    <Grid container spacing={3}
                        sx={{
                            flex: 1,
                            mb: 3,
                            display: 'flex',
                            flexDirection: 'row',
                            '@media (max-width: 1100px)': {
                                flexDirection: 'column'
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 2,
                                width: '49%',
                                '@media (max-width: 1100px)': {
                                    width: 'auto'
                                },
                            }}
                        >
                            <MediumCard icon={BusinessOutlinedIcon} title="Total Dokter Spesialis" subtitle={data.length.toString()} />
                            <MediumCard icon={BusinessOutlinedIcon} title="Total Dokter Umum" subtitle={data.length.toString()} />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '25%',
                                '@media (max-width: 1100px)': {
                                    width: '49%'
                                },
                            }}
                        >
                            <CardAdd icon={AddBoxIcon} title="Tambah Pegawai" link="/tambahPegawai" />
                        </Box>
                    </Grid>
                    <TableDokter />
                </Box>
            </Box>
        </Box>
    )
}
