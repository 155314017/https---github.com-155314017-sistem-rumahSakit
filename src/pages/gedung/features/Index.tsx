import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import SideBar from "../../../components/SideBar/SideBar";
import Header from "../../../components/header/Header";
import CardAdd from "../../../components/small/card/CardAdd";
import MediumCard from "../../../components/small/card/MediumCard";
import TableGedung from "../../../pages/gedung/features/TableGedung";

// icon
import AddBoxIcon from '@mui/icons-material/AddBox';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AlertSuccess from "../../../components/small/alert/AlertSuccess";
import useIndex from "../hooks/useIndex";
import { gridContainerStyle } from "../../../style/ts/gridContainerStyle";

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
    showTemporarySuccess,
    fetchData
    showAlert
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
          <Typography variant="h1" sx={{ fontSize: "32px", fontWeight: "700", py: 5 }}>
            Gedung
          </Typography>

          {/* grid layout card  */}
          <Grid container
            sx={gridContainerStyle}
          >
            <Box
              sx={{
                display: 'flex',
                width: '49%',
              }}
            >
              <MediumCard
                icon={BusinessOutlinedIcon}
                title="Total Gedung"
                subtitle={loading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : totalElements.toString() || "0"}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '49%',
              }}
            >
              <CardAdd icon={AddBoxIcon} title="Tambah Gedung" link="/tambahGedung" />
            </Box>
          </Grid>

          {/* table gedung  */}
          <TableGedung
            data={data}
            onSuccessDelete={() => showAlert('Gedung deleted successfully!')}
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
