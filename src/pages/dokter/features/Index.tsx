import { Box, Grid } from "@mui/system";
import { Typography } from "@mui/material";
import SideBar from "../../../components/SideBar/SideBar";
import Header from "../../../components/medium/Header";
import MediumCard from "../../../components/medium/MediumCard";
import CardAdd from "../../../components/medium/CardAdd";

// icon
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TableDokter from "./TableDokter";
import useIndex from "../hooks/useIndex";

export default function Index() {
    const{data} = useIndex()
  return (
    <Box>
            <SideBar />

            <Box p={2} sx={{ marginLeft: "130px" }}>
                <Header />
                <Box>
                    <Typography sx={{ fontSize: "32px", fontWeight: "700", py: 5 }}>
                        Dokter
                    </Typography>
                    <Grid container spacing={3} flex={1} mb={3}>
                        <MediumCard icon={BusinessOutlinedIcon} title="Total Dokter Spesialis" subtitle={data.length.toString()} />
                        <MediumCard icon={BusinessOutlinedIcon} title="Total Dokter Umum" subtitle={data.length.toString()} />
                        <CardAdd icon={AddBoxIcon} title="Tambah Pegawai" link="/tambahPegawai" />  
                    </Grid>
                    <TableDokter/>
                </Box>
            </Box>
        </Box>
  )
}
