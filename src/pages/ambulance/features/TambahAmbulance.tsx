import { Container, Box } from '@mui/system'
import { Typography, Button, IconButton } from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'

// components
import BreadCrumbs from '../../../components/medium/BreadCrumbs'
import ImageUploaderGroup from '../../../components/medium/imageComponent/ImageUploaderGroup'
import CustomTimePicker from '../../../components/small/CustomTimePicker'
import DropdownList from '../../../components/small/dropdownlist/DropdownList'
import InputCurrencyIdr from '../../../components/inputComponent/InputCurrencyIdr'

// hooks
import useTambahAmbulance from '../hooks/useTambahAmbulance'

import 'dayjs/locale/id'
import TestKalender from '../../../components/medium/TestKalender'

export default function TambahAmbulance() {
  const {
    handleTambahHari,
    handleImageChange,
    handleDeleteSchedule,
    breadcrumbItems,
    formik,
    setSelectedDay,
    setStartTime,
    setEndTime,
    startTime,
    endTime,
    schedules,
    setCurrentPage,
    getPageStyle,
    getBorderStyle,
    currentPage
  } = useTambahAmbulance()

  return (
    <>
      <Container sx={{ py: 2, minWidth: '1500px' }}>
        <BreadCrumbs breadcrumbItems={breadcrumbItems} onBackClick={() => window.history.back()} />

        <Box mt={3}>
          <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#FAFAFA", overflow: "hidden" }}>
            {/* Membuat bentuk lengkung atas */}

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
              Tambah Ambulance
            </Typography>

            <Box
              sx={{ display: "flex", flexDirection: "row", mt: 2, mb: 2, gap: 24 }}
            >
              <Box display={"flex"} flexDirection={"row"} width={"500px"}>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems="center"
                  onClick={() => setCurrentPage(1)}
                  sx={getPageStyle(1)}
                  mx={0}
                >
                  <Box sx={getBorderStyle(1)}>1</Box>
                  <Typography sx={{ ml: 1 }}>
                    Informasi Ambulance
                  </Typography>
                </Box>
              </Box>

              <Box display={"flex"} flexDirection={"row"} width={"500px"}>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems="center"
                  onClick={() => setCurrentPage(2)}
                  sx={getPageStyle(2)}
                  mx={0}
                >
                  <Box sx={getBorderStyle(2)}>2</Box>
                  <Typography sx={{ ml: 1 }}>
                    Jam Operasional
                  </Typography>
                </Box>
              </Box>

            </Box>
            {currentPage === 1 && (
              <>
                <Typography fontSize="20px" fontWeight="700" mb="32px" mt="54px">
                  Informasi Ambulance
                </Typography>
                <ImageUploaderGroup onChange={handleImageChange} />
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                  mt={3}
                  onSubmit={formik.handleSubmit}
                >
                  <Typography sx={{ fontSize: '16px' }}>
                    Biaya Tarif<span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <InputCurrencyIdr
                    onChange={value => {
                      formik.setFieldValue('operationalCost', value)
                    }}
                    defaultValue={0}
                  />
                  {/* Tombol Submit */}
                  <Button
                    type="submit"
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
                    disabled={!formik.isValid || !formik.dirty} // Opsional
                  >
                    Selanjutnya
                  </Button>
                </Box>
              </>
            )}
            {currentPage === 2 && (
              <>
                <TestKalender />
                <Button
                  type="submit"
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
                    ':hover': { bgcolor: '#a098f5', boxShadow: 'none' }
                  }}
                  disabled={!formik.isValid || !formik.dirty}
                >
                  Simpan
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </>
  )
}
