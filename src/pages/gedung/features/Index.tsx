import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import SideBar from "../../../components/SideBar/SideBar";
import Header from "../../../components/medium/Header";
import CardAdd from "../../../components/small/card/CardAdd";
import MediumCard from "../../../components/small/card/MediumCard";
import TableGedung from "../../../pages/gedung/features/TableGedung";

// icon
import AddBoxIcon from '@mui/icons-material/AddBox';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AlertSuccess from "../../../components/small/alert/AlertSuccess";
import useIndex from "../hooks/useIndex";

export default function Index() {
  const {
    data,
    successAddBuilding,
    successDeleteBuilding,
    successEditBuilding,
    loading,
    showTemporarySuccessDelete,
    setPageNumber,
    setOrderBy,
    totalElements
  } = useIndex();

  return (
    <Box>
      <SideBar />

      <Box p={2} sx={{ marginLeft: "130px" }}>
        <Header />
        <Box>
          {successAddBuilding && (
            <AlertSuccess label="Success adding building" />
          )}
          {successDeleteBuilding && (
            <AlertSuccess label="Success delete building" />
          )}
          {successEditBuilding && (
            <AlertSuccess label="Success edit building" />
          )}
          <Typography sx={{ fontSize: "32px", fontWeight: "700", py: 5 }}>
            Gedung
          </Typography>
          <Grid container
            sx={{
              flex: 1,
              mb: 3,
              gap: 1,
              display: 'flex',
              flexDirection: 'row',
              maxWidth: '50%',
              justifyContent: 'space-between',
              '@media (min-width: 1010px) and (max-width: 1194px)': {
                maxWidth: '55%'
              },
              '@media (min-width: 900px) and (max-width: 1010px)': {
                maxWidth: '60%'
              },
              '@media (min-width: 750px) and (max-width: 900px)': {
                maxWidth: '70%'
              },
              '@media  (max-width: 750px)': {
                maxWidth: '100%'
              }

            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '49%',
                // '@media (max-width: 1194px)': {
                //   width: '50%'
                // }
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
                // '@media (max-width: 1194px)': {
                //   width: '50%'
                // }
              }}
            >
              <CardAdd icon={AddBoxIcon} title="Tambah Gedung" link="/tambahGedung" />
            </Box>
          </Grid>
          <TableGedung
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
