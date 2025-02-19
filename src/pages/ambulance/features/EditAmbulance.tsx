import { Container, Box } from '@mui/system';
import { Typography } from '@mui/material';
import bgImage from '../../../assets/img/String.png';
import 'dayjs/locale/id';
// components
import BreadCrumbs from '../../../components/medium/BreadCrumbs'
import InputCurrencyIdr from '../../../components/inputComponent/InputCurrencyIdr'
import ImageUploaderGroupAPI from '../../../components/inputComponent/ImageUploaderComponents/ImageGroupUploaderAPI'

// hooks
import useEditAmbulance from '../hooks/useEditAmbulance';
import CustomBigCalendar from '../../../components/medium/CustomBigCalendar';
import AlertSuccess from '../../../components/small/alert/AlertSuccess';
import CustomFrameTable from '../../../components/small/CustomFrameTable';
import CustomButtonFilled from '../../../components/small/button/CustomButtonFilled';
import PaginationTabs from '../../../components/small/stepper/PaginationTabs';

export default function EditAmbulance() {
  const {
    breadcrumbItems,
    formik,
    handleImageChange,
    id,
    message,
    isSuccess,
    scheduleDataPraktek,
    scheduleDataPengecualian,
    setCurrentPage,
    currentPage,
    handleEditAmbulance,
    ambulanceData,
    kalenderRef,
    tabs
  } = useEditAmbulance();



  return (
    <Container sx={{ py: 2, minWidth: '1500px' }}>
      <BreadCrumbs breadcrumbItems={breadcrumbItems} onBackClick={() => window.history.back()} />

      <Box mt={3}>
        <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#FAFAFA", overflow: "hidden" }}>
          <CustomFrameTable />

          <Typography fontSize="20px" fontWeight="700">
            Edit Ambulance
          </Typography>

          <Box
            sx={{ display: "flex", flexDirection: "row", mt: 2, mb: 2, justifyContent: 'space-between', ml: 2 }}
          >
            <PaginationTabs
              tabs={tabs}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Box>

          <Box position="absolute" sx={{ top: 0, right: 0 }}>
            <img src={bgImage} alt="bg-image" />
          </Box>

          {currentPage === 1 && (
            <>
              <Typography fontSize="20px" fontWeight="700" mb="32px" mt="54px">
                Informasi Ambulance
              </Typography>
              <ImageUploaderGroupAPI onChange={handleImageChange} parentId={id || ''} />
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
                <CustomButtonFilled
                  onClick={() => setCurrentPage(2)}
                  variant="contained"
                  text='Selanjutnya'
                />
              </Box>
            </>
          )}

          {currentPage === 2 && (
            <>
              <CustomBigCalendar
                ref={kalenderRef}
                initialData={scheduleDataPraktek}
                initialDataPengecualian={scheduleDataPengecualian}
                typeId={id}
              />
              <CustomButtonFilled
                onClick={handleEditAmbulance}
                variant="contained"
                text='Simpan'
              />
            </>
          )}
        </Box>
      </Box>
      {isSuccess && (
        <AlertSuccess label={message} />
      )}
    </Container>
  );
}