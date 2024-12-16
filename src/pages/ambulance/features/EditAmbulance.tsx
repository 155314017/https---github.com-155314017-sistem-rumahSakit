import { Container, Box } from '@mui/system'
import { Typography, Button } from '@mui/material'
import bgImage from '../../../assets/img/String.png'
import 'dayjs/locale/id'

// components
import BreadCrumbs from '../../../components/medium/BreadCrumbs'
import CustomTimePicker from '../../../components/small/CustomTimePicker'
import InputCurrencyIdr from '../../../components/inputComponent/InputCurrencyIdr'
import ImageUploaderGroupAPI from '../../../components/medium/ImageGroupUploaderAPI'
import DropdownListAPI from '../../../components/small/DropdownListAPI'

// hooks
import useEditAmbulance from '../hooks/useEditAmbulance'

export default function EditAmbulance() {
  const {
    formik,
    handleImageChange,
    setSelectedDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    breadcrumbItems,
    apiUrl,
    selectedDays,
    initialOperationalCost
  } = useEditAmbulance()

  return (
    <Container sx={{ py: 2 }}>
      <BreadCrumbs breadcrumbItems={breadcrumbItems} onBackClick={() => window.history.back()} />

      <Box mt={3}>
        <Box
          position="relative"
          p={3}
          sx={{ borderRadius: '24px', bgcolor: '#fff', overflow: 'hidden' }}
        >
          <Typography fontSize="20px" fontWeight="700">
            Edit Ambulance
          </Typography>

          <Box position="absolute" sx={{ top: 0, right: 0 }}>
            <img src={bgImage} alt="bg-image" />
          </Box>

          <ImageUploaderGroupAPI onChange={handleImageChange} apiUrl={apiUrl} />

          <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
            <Typography sx={{ fontSize: '16px' }}>
              Biaya Tarif<span style={{ color: 'red' }}>*</span>
            </Typography>
            <InputCurrencyIdr
              onChange={value => {
                formik.setFieldValue('operationalCost', value)
              }}
              defaultValue={initialOperationalCost}
            />
            <Box
              display={'flex'}
              flexDirection={'column'}
              border={'1px solid #A8A8BD'}
              borderRadius={'16px'}
              padding={'16px'}
              mt={2}
            >
              <Typography mb={'15px'}>Jam Operasional</Typography>
              <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                gap={'32px'}
              >
                <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                  <Typography>Hari</Typography>
                  <DropdownListAPI
                    options={[
                      { value: '1', label: 'Senin' },
                      { value: '2', label: 'Selasa' },
                      { value: '3', label: 'Rabu' },
                      { value: '4', label: 'Kamis' },
                      { value: '5', label: 'Jumat' },
                      { value: '6', label: 'Sabtu' },
                      { value: '7', label: 'Minggu' }
                    ]}
                    placeholder="Pilih hari"
                    onChange={(value: string) => setSelectedDay(value)}
                    loading={false}
                    defaultValue={selectedDays}
                  />
                </Box>

                <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                  <Typography>Jam mulai</Typography>
                  <CustomTimePicker
                    value={startTime}
                    onChange={newValue => setStartTime(newValue)}
                  />
                </Box>

                <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                  <Typography>Jam selesai</Typography>
                  <CustomTimePicker value={endTime} onChange={newValue => setEndTime(newValue)} />
                </Box>
              </Box>
              
            </Box>
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
                ':hover': {
                  bgcolor: '#a098f5',
                  boxShadow: 'none'
                }
              }}
              disabled={!formik.isValid || !formik.dirty}
            >
              Simpan
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
