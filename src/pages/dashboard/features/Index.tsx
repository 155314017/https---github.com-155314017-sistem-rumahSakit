import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import MediumCard from '../../../components/medium/MediumCard'

// icon
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import BedIcon from '@mui/icons-material/Bed'
import PeopleIcon from '@mui/icons-material/People'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import CardAdd from '../../../components/medium/CardAdd'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'

// table
import TableRuangan from '../../../Backup/ruangan/TableRuangan'
import TablePegawai from '../../../Backup/pegawai/TablePegawai'
import TableGedung from '../../../Backup/gedung/TableGedung'
import TableFasilitas from '../../../Backup/fasilitas/TableFasilitas'
import TableDokter from '../../../Backup/dokter/TableDokter'
import TableAmbulance from '../../../Backup/ambulance/TableAmbulance'
import TableKlinik from '../../../Backup/klinik/TableKlinik'
import TableKonter from '../../../Backup/konter/TableKonter'
import TablePasien from '../../../Backup/pasien/TablePasien'
import AlertSuccess from '../../../components/small/AlertSuccess'





//hooks
import useIndex from "../hooks/useIndex";
export default function Index() {
    const{dataClinic,
        dataRoom,
        dataFacility,
        dataDoctor,
        fetchData,
        successLogin,
        successDeleteBuilding,
        successDeleteRoom,
        successDeleteFacility,
        successDeleteAmbulance,
        successDeleteClinic,
        successDeleteCounter,
        isLoading,
        showTemporarySuccessDeleteRoom,
        showTemporarySuccessDeleteBuilding,
        showTemporarySuccessDeleteFacility,
        showTemporarySuccessDeleteAmbulance,
        showTemporarySuccessDeleteClinic,
        showTemporarySuccessDeleteCounter

    }=useIndex()
  return (
    <Box>
      <Box sx={{ py: 5 }}>
        {successDeleteBuilding && <AlertSuccess label="Success delete Building" />}
        {successDeleteRoom && <AlertSuccess label="Success delete Room" />}
        {successDeleteFacility && <AlertSuccess label="Success delete Facility" />}
        {successDeleteAmbulance && <AlertSuccess label="Success delete Ambulance" />}
        {successDeleteClinic && <AlertSuccess label="Success delete Clinic" />}
        {successDeleteCounter && <AlertSuccess label="Success delete Counter" />}
        {successLogin && <AlertSuccess label="Success Login" />}
        <Typography sx={{ fontSize: '32px', fontWeight: '700' }}>Dashboard</Typography>
      </Box>
      <Grid container spacing={3} flex={1} justifyContent={'space-between'}>
        <MediumCard
          icon={MeetingRoomIcon}
          title="Total Ruangan"
          subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : dataRoom.length.toString()}
        />
        <MediumCard
          icon={BedIcon}
          title={'Ruangan tersedia'}
          subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : dataRoom.length.toString()}
        />
        <MediumCard icon={PeopleIcon} title={'Total pegawai'} subtitle={'10'} />
        <MediumCard
          icon={LocalHospitalIcon}
          title="Total poliklinik"
          subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : dataClinic.length.toString()}
        />
        <MediumCard
          icon={MedicalServicesIcon}
          title="Total dokter"
          subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : dataDoctor.length.toString()}
        />
        <MediumCard
          icon={MonitorHeartIcon}
          title="Total fasilitas"
          subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : dataFacility.length.toString()}
        />
        <CardAdd icon={RoomPreferencesIcon} title="Tambah ruangan" link="/tambahRuangan" />
        <CardAdd icon={PersonAddIcon} title="Tambah pegawai" link="/tambahPegawai" />
      </Grid>

      <Stack mt={3} spacing={3}>
        <TableGedung fetchDatas={fetchData} onSuccessDelete={showTemporarySuccessDeleteBuilding} />
        <TableRuangan fetchDatas={fetchData} onSuccessDelete={showTemporarySuccessDeleteRoom} />
        <TablePegawai />
        <TableFasilitas
          fetchDatas={fetchData}
          onSuccessDelete={showTemporarySuccessDeleteFacility}
        />
        <TableDokter />
        <TableAmbulance
          fetchDatas={fetchData}
          onSuccessDelete={showTemporarySuccessDeleteAmbulance}
        />
        <TableKlinik fetchDatas={fetchData} onSuccessDelete={showTemporarySuccessDeleteClinic} />
        <TableKonter fetchDatas={fetchData} onSuccessDelete={showTemporarySuccessDeleteCounter} />
        <TablePasien />
      </Stack>
    </Box>
   
  )
}
