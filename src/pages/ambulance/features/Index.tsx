import { Box, Grid } from '@mui/system'
import { CircularProgress, Typography } from '@mui/material'

// components
import CardAdd from '../../../components/small/card/CardAdd'
import MediumCard from '../../../components/small/card/MediumCard'
import Header from '../../../components/medium/Header'
import SideBar from '../../../components/SideBar/SideBar'
import AlertSuccess from '../../../components/small/alert/AlertSuccess'

// icon
import MinorCrashIcon from '@mui/icons-material/MinorCrash'
import AddBoxIcon from '@mui/icons-material/AddBox'

import TableAmbulance from '../../../pages/ambulance/features/TableAmbulance'

//hooks
import useIndex from "../hooks/useIndex";
export default function Index() {
    const{
        data,
        successAddAmbulance,
        successDeleteAmbulance,
        successEditAmbulance,
        showTemporarySuccessDelete,
        loading,
        setPageNumber,
        setOrderBy,
        totalElements,
    }=useIndex()
  return (
    <Box>
      <SideBar />

      <Box p={2} sx={{ marginLeft: '130px' }}>
        <Header />
        <Box>
          {successAddAmbulance && <AlertSuccess label="Success adding ambulance" />}
          {successDeleteAmbulance && <AlertSuccess label="Success delete ambulance" />}
          {successEditAmbulance && <AlertSuccess label="Success edit ambulance" />}
          <Typography sx={{ fontSize: '32px', fontWeight: '700', py: 5 }}>Ambulance</Typography>
          <Grid container spacing={3} flex={1} mb={3}>
            <MediumCard
              icon={MinorCrashIcon}
              title="Total Ambulance"
              subtitle={loading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : totalElements.toString()  || "0"}
            />
            <CardAdd icon={AddBoxIcon} title="Tambah Ambulance" link="/tambahAmbulance" />
          </Grid>

          <TableAmbulance 
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
