import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import MediumCard from '../../../components/small/card/MediumCard'

// icon
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import BedIcon from '@mui/icons-material/Bed'
import PeopleIcon from '@mui/icons-material/People'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import CardAdd from '../../../components/small/card/CardAdd'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'

// table
import TableRuangan from '../../ruangan/features/TableRoom'
import TablePegawai from '../../pegawai/features/TableEmployee'
import TableGedung from '../../gedung/features/TableBuilding'
import TableFasilitas from '../../fasilitas/features/TableFacility'
import TableDokter from '../../../pages/dokter/features/TableDokter'
import TableAmbulance from '../../../pages/ambulance/features/TableAmbulance'
import TableKlinik from '../../klinik/features/TableClinic'
import TableKonter from '../../konter/features/TableCounter'
import TablePasien from '../../pasien/features/TablePatient'
import AlertSuccess from '../../../components/small/alert/AlertSuccess'

//hooks
import useIndex from "../hooks/useIndex";
export default function Index() {
  const {
    dataRoom,
    dataFacility,
    dataDoctor,
    isLoading,
    dataIdBuilding,
    // showTemporarySuccessDeletePatient,
    dataBuilding,
    setPageNumber,
    totalElementsRoom,
    totalElementsBuilding,
    setOrderByBuilding,
    setOrderByRoom,
    setOrderByFacility,
    totalElementsAmbulance,
    totalElementsClinic,
    totalElementsCounter,
    totalElementsPatient,
    setOrderAmbulance,
    setOrderClinic,
    setOrderCounter,
    setOrderPatient,
    dataAmbulance,
    dataClinic,
    dataCounter,
    dataPatient,
    showAlert,
    message,
    isSuccess,
    refetchClinic,
  } = useIndex()
  return (
    <Box>
      <Box sx={{ py: 5 }}>
        {isSuccess && <AlertSuccess label={message} />}
        <Typography sx={{ fontSize: '32px', fontWeight: '700' }}>Dashboard</Typography>
      </Box>

      {/* note layout:
      destkop view {
        grid utama: row
        2 box pembungkus konten: width 49% 
      }

      tablet view {
        grid utama: column
        2 box pembungkus konten width auto
      } */}

      <Grid container spacing={2}
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          '@media (max-width: 980px)': {
            flexDirection: 'column'
          }
        }}
      >

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '49%',
            gap: 2,
            '@media (max-width: 980px)': {
              width: 'auto'
            }
          }}
        >
          <Grid display={'flex'} flexDirection={'row'} gap={2}  >
            <MediumCard
              icon={MeetingRoomIcon}
              title="Total Ruangan"
              subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : dataRoom.length.toString() || '0'}
            />
            <MediumCard
              icon={BedIcon}
              title={'Ruangan tersedia'}
              subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : dataRoom.length.toString() || '0'}
            />
          </Grid>

          <Grid display={'flex'} flexDirection={'row'} gap={2} >
            <MediumCard icon={PeopleIcon} title={'Total pegawai'} subtitle={'2'} />
            <MediumCard
              icon={LocalHospitalIcon}
              title="Total poliklinik"
              subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : dataClinic.length.toString() || '0'}
            />
          </Grid>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '49%',
            gap: 2,
            '@media (max-width: 980px)': {
              width: 'auto'
            }
          }}
        >
          <Grid display={'flex'} flexDirection={'row'} gap={2} >
            <MediumCard
              icon={MedicalServicesIcon}
              title="Total dokter"
              subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : dataDoctor.length.toString() || '0'}
            />
            <MediumCard
              icon={MonitorHeartIcon}
              title="Total fasilitas"
              subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : dataFacility.length.toString() || '0'}
            />
          </Grid>
          <Grid display={'flex'} flexDirection={'row'} gap={2} >
            <CardAdd icon={RoomPreferencesIcon} title="Tambah ruangan" link="/tambahRuangan" />
            <CardAdd icon={PersonAddIcon} title="Tambah pegawai" link="/tambahPegawai" />
          </Grid>
        </Box>
      </Grid>

      <Stack mt={3} spacing={3}>
        <TableGedung
          data={dataBuilding}
          onSuccessDelete={() => showAlert("Success delete Building", 300)}
          setPageNumber={setPageNumber}
          setOrderBy={setOrderByBuilding}
          totalElements={totalElementsBuilding}
        />
        <TableRuangan data={dataRoom} onSuccessDelete={() => showAlert("Success delete Room", 300)} setPageNumber={setPageNumber} setOrderBy={setOrderByRoom} totalElements={totalElementsRoom} dataIdBuilding={dataIdBuilding} />
        <TablePegawai />
        <TableFasilitas data={dataFacility} onSuccessDelete={() => showAlert("Success delete Fasilitas", 300)} setPageNumber={setPageNumber} setOrderBy={setOrderByFacility} totalElements={totalElementsRoom} />
        <TableDokter />
        <TableAmbulance
          data={dataAmbulance} onSuccessDelete={() => showAlert("Success delete Building", 300)} setPageNumber={setPageNumber} setOrderBy={setOrderAmbulance} totalElements={totalElementsAmbulance}
        />
        <TableKlinik data={dataClinic} onSuccessDelete={() => showAlert("Success delete Klinik", 300)} setPageNumber={setPageNumber} setOrderBy={setOrderClinic} totalElements={totalElementsClinic} fetchData={refetchClinic} />
        <TableKonter data={dataCounter} onSuccessDelete={() => showAlert("Success delete Konter", 300)} setPageNumber={setPageNumber} setOrderBy={setOrderCounter} totalElements={totalElementsCounter} />
        <TablePasien data={dataPatient} onSuccessDelete={() => showAlert("Success delete Pasien", 300)} setPageNumber={setPageNumber} setOrderBy={setOrderPatient} totalElements={totalElementsPatient} />
      </Stack>
    </Box>

  )
}
