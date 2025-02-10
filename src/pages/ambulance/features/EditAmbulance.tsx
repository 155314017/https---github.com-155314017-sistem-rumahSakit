import { Container, Box } from '@mui/system';
import { Typography, Button } from '@mui/material';
import bgImage from '../../../assets/img/String.png';
import 'dayjs/locale/id';
// components
import BreadCrumbs from '../../../components/medium/BreadCrumbs'
import InputCurrencyIdr from '../../../components/inputComponent/InputCurrencyIdr'
import ImageUploaderGroupAPI from '../../../components/medium/imageComponent/ImageGroupUploaderAPI'

// hooks
import useEditAmbulance from '../hooks/useEditAmbulance';
import TestKalender from '../../../components/medium/TestKalender';

export default function EditAmbulance() {
  const {
    handleImageChange,
    breadcrumbItems,
    formik,
    setCurrentPage,
    getPageStyle,
    getBorderStyle,
    currentPage,
    handleEditAmbulance,
    kalenderRef,
    idAmbulance,
    ambulanceData,
    scheduleDataPraktek,
    scheduleDataPengecualian 
  } = useEditAmbulance();



  return (
    <Container sx={{ py: 2, minWidth: '1500px' }}>
      <BreadCrumbs breadcrumbItems={breadcrumbItems} onBackClick={() => window.history.back()} />

      <Box mt={3}>
        <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#FAFAFA", overflow: "hidden" }}>
          {/* Bentuk lengkung atas */}
          <Box
            position={"absolute"}
            sx={{
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
            }}
          >
            {/* Lengkung kiri */}
            <Box
              sx={{
                width: "50px",
                height: "30px",
                bgcolor: "#F1F0FE",
              }}
            >
              <Box
                sx={{
                  width: "50px",
                  height: "30px",
                  bgcolor: "#FAFAFA",
                  borderRadius: "0px 15px 0px 0px ",
                }}
              />
            </Box>

            {/* Kotak tengah */}
            <Box
              sx={{
                width: "600px",
                height: "50px",
                bgcolor: "#F1F0FE",
                borderRadius: "0px 0px 22px 22px",
              }}
            />

            {/* Lengkung kanan */}
            <Box
              sx={{
                width: "50px",
                height: "30px",
                bgcolor: "#F1F0FE",
              }}
            >
              <Box
                sx={{
                  width: "50px",
                  height: "30px",
                  bgcolor: "#FAFAFA",
                  borderRadius: "15px 0px 0px 0px ",
                }}
              />
            </Box>
          </Box>

          <Typography fontSize="20px" fontWeight="700">
            Edit Ambulance
          </Typography>

          <Box
            sx={{ display: "flex", flexDirection: "row", mt: 2, mb: 2, justifyContent: 'space-between', ml: 2 }}
          >
            <Box display={"flex"} flexDirection={"row"} width={"400px"}>
              <Box
                display={"flex"}
                flexDirection={"row"}
                alignItems="center"
                onClick={() => setCurrentPage(1)}
                sx={getPageStyle(1)}
                mx={2}
              >
                <Box sx={getBorderStyle(1)}>1</Box>
                <Typography sx={{ ml: 1 }}>
                  Informasi Ambulance
                </Typography>
              </Box>
            </Box>

            <Box display={"flex"} flexDirection={"row"} width={"800px"}>
              <Box
                display={"flex"}
                flexDirection={"row"}
                alignItems="center"
                onClick={() => setCurrentPage(2)}
                sx={getPageStyle(2)}
                mx={2}
              >
                <Box sx={getBorderStyle(2)}>2</Box>
                <Typography sx={{ ml: 1 }}>
                  Jam Operasional
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box position="absolute" sx={{ top: 0, right: 0 }}>
            <img src={bgImage} alt="bg-image" />
          </Box>

          {currentPage === 1 && (
            <>
              <Typography fontSize="20px" fontWeight="700" mb="32px" mt="54px">
                Informasi Ambulance
              </Typography>
              <ImageUploaderGroupAPI onChange={handleImageChange} parentId={idAmbulance || ''} />
              <Box component="form" noValidate autoComplete="off" mt={3}>
                <Typography sx={{ fontSize: '16px' }}>
                  Biaya Tarif<span style={{ color: 'red' }}>*</span>
                </Typography>
                <InputCurrencyIdr
                  onChange={(value) => {
                    formik.setFieldValue('operationalCost', value);
                  }}
                  defaultValue={ambulanceData?.cost || 0}
                />
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{
                    mt: 8,
                    width: "100%",
                    bgcolor: "#8F85F3",
                    color: "#fff",
                    textTransform: "none",
                    borderRadius: "8px",
                    ":hover": { bgcolor: "#a098f5" },
                  }}
                  onClick={() => setCurrentPage(2)}
                >
                  Selanjutnya
                </Button>
              </Box>
            </>
          )}

          {currentPage === 2 && (
            <>
              <TestKalender 
                ref={kalenderRef} 
                initialData={scheduleDataPraktek} 
                initialDataPengecualian={scheduleDataPengecualian}
                typeId={idAmbulance} 
              />
              <Button
                onClick={handleEditAmbulance}
                variant="contained"

                color="inherit"
                sx={{
                  mt: 3,
                  width: '100%',
                  bgcolor: '#8F85F3',
                  color: '#fff',
                  textTransform: 'none',
                  borderRadius: '8px',
                  boxShadow: 'none',
                  ':hover': {
                    bgcolor: '#a098f5',
                    boxShadow: 'none',
                  },
                }}
              >
                Simpan
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}