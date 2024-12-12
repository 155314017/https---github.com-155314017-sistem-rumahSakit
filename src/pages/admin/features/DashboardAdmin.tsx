import { Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MediumCard from "../../../components/medium/MediumCard";


// icon 
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BedIcon from '@mui/icons-material/Bed';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CardAdd from "../../../components/medium/CardAdd";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

// table
// import TableRuangan from "../../../Backup/ruangan/TableRuangan";
// import TablePegawai from "../../../Backup/pegawai/TablePegawai";
import TableAntrianPasien from "./TableAntrianPasien";

export default function DashboardAdmin() {

  return (
    <Box mt={2}>
      <Grid container spacing={3} flex={1} justifyContent={"space-between"}>
        <MediumCard icon={MeetingRoomIcon} title={"Total Ruangan"} subtitle={"10"} />
        <MediumCard icon={BedIcon} title={"Ruangan tersedia"} subtitle={"10"} />
        <MediumCard icon={PeopleIcon} title={"Total pegawai"} subtitle={"10"} />
        <MediumCard icon={LocalHospitalIcon} title={"Total poliklinik"} subtitle={"10"} />
        <MediumCard icon={MedicalServicesIcon} title={"Total dokter"} subtitle={"10"} />
        <MediumCard icon={MonitorHeartIcon} title={"Total fasilitas"} subtitle={"10"} />
        <CardAdd icon={PersonAddIcon} title={"Tambah pegawai"} link={"Add new"} />
        <CardAdd icon={RoomPreferencesIcon} title={"Tambah ruangan"} link={"Add new"} />
      </Grid>

      <Stack mt={3} spacing={3}>
        <TableAntrianPasien />
        {/* <TablePegawai /> */}
      </Stack>
    </Box>
  );
}
