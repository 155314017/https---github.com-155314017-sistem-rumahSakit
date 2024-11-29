import { Box, Grid } from '@mui/system'
import { Typography } from '@mui/material'

// components
import CardAdd from '../../../components/medium/CardAdd'
import MediumCard from '../../../components/medium/MediumCard'
import Header from '../../../components/medium/Header'
import SideBar from '../../../components/SideBar/SideBar'
import AlertSuccess from '../../../components/small/AlertSuccess'

// icon
import MinorCrashIcon from '@mui/icons-material/MinorCrash'
import AddBoxIcon from '@mui/icons-material/AddBox'

import TableAmbulance from '../../ambulance/TableAmbulance'

//hooks
import useIndex from "../hooks/useIndex";
export default function Index() {
    const{
        fetchData,
        data,
        successAddBuilding,
        successDeleteBuilding,
        successEditBuilding,
        showTemporarySuccessDelete,
    }=useIndex()
  return (
    <Box>
      <SideBar />

      <Box p={2} sx={{ marginLeft: '130px' }}>
        <Header />
        <Box>
          {successAddBuilding && <AlertSuccess label="Success adding ambulance" />}
          {successDeleteBuilding && <AlertSuccess label="Success delete ambulance" />}
          {successEditBuilding && <AlertSuccess label="Success edit ambulance" />}
          <Typography sx={{ fontSize: '32px', fontWeight: '700', py: 5 }}>Ambulance</Typography>
          <Grid container spacing={3} flex={1} mb={3}>
            <MediumCard
              icon={MinorCrashIcon}
              title="Total Ambulance"
              subtitle={data.length.toString()}
            />
            <CardAdd icon={AddBoxIcon} title="Tambah Ambulance" link="/tambahAmbulance" />
          </Grid>

          <TableAmbulance fetchDatas={fetchData} onSuccessDelete={showTemporarySuccessDelete} />
        </Box>
      </Box>
    </Box>
  )
}
