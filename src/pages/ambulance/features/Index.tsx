import { Box, Grid } from '@mui/system'
import { CircularProgress, Typography } from '@mui/material'

// components
import CardAdd from '../../../components/small/card/CardAdd'
import MediumCard from '../../../components/small/card/MediumCard'
import Header from '../../../components/header/Header'
import SideBar from '../../../components/SideBar/SideBar'
import AlertSuccess from '../../../components/small/alert/AlertSuccess'

// icon
import MinorCrashIcon from '@mui/icons-material/MinorCrash'
import AddBoxIcon from '@mui/icons-material/AddBox'

import TableAmbulance from '../../../pages/ambulance/features/TableAmbulance'

//hooks
import useIndex from "../hooks/useIndex";
import { gridContainerStyle } from '../../../style/ts/gridContainerStyle'
export default function Index() {
  const {
    data,
    loading,
    setPageNumber,
    isSuccess,
    message,
    setOrderBy,
    totalElements,
    handleSearchChange,
    fetchData,
    showAlert
  } = useIndex()
  return (
    <Box>
      <SideBar />

      <Box p={2} sx={{ marginLeft: '130px' }}>
        <Header />
        <Box>
          {/* alert notifikasi  */}
          {isSuccess && (
            <AlertSuccess label={message} />
          )}
          
          <Typography sx={{ fontSize: '32px', fontWeight: '700', py: 5 }}>Ambulance</Typography>
          <Grid container
            sx={gridContainerStyle}
          >
            <Box
              sx={{
                display: 'flex',
                width: '49%'
              }}
            >
              <MediumCard
                icon={MinorCrashIcon}
                title="Total Ambulance"
                subtitle={loading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : totalElements.toString() || "0"}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '49%'
              }}
            >
              <CardAdd icon={AddBoxIcon} title="Tambah Ambulance" link="/tambahAmbulance" />
            </Box>
          </Grid>

          <TableAmbulance
            data={data}
            onSuccessDelete={() => {showAlert('Ambulance deleted successfully!'); fetchData()}}
            setPageNumber={setPageNumber}
            setOrderBy={setOrderBy}
            totalElements={totalElements}
            onSearchChange={handleSearchChange}
            fetchData={fetchData}
          />
        </Box>
      </Box>
    </Box>
  )
}
