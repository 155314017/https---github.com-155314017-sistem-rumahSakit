//component
import { Container, Box, Typography, Button, FormControl, OutlinedInput,IconButton  } from "@mui/material";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import bgImage from "../../../assets/img/String.png";
import AlertSuccess from "../../../components/small/alert/AlertSuccess";
import CustomTimePicker from "../../../components/small/CustomTimePicker";
import ImageUploaderGroupAPI from '../../../components/medium/imageComponent/ImageGroupUploaderAPI';
import DropdownListAPI from '../../../components/small/dropdownlist/DropdownListAPI';
import "dayjs/locale/id";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


//hooks
import useEditKlinik from "../hooks/useEditKlinik";


export default function EditKlinik() {
    const {
        formik,
    breadcrumbItems,
    setSelectedDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    showTemporaryAlertSuccess,
    errorAlert,
    successAlert,
    handleImageChange,
    handleDeleteSchedule,
    handleEditSchedule,
    handleSaveAndAddDay,
    schedules,
    statusEdit,
    selectedDay,
    id
    }=useEditKlinik();
  return (
    <Container sx={{ py: 2 }}>
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box mt={3}>
                <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}>
                    <Typography fontSize="20px" fontWeight="700">Edit Klinik</Typography>
                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="bg-image" />
                    </Box>

                    <ImageUploaderGroupAPI onChange={handleImageChange} parentId={id || ''}/>

                    <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
                        <Typography sx={{ fontSize: "16px" }}>Nama Klinik<span style={{ color: "red" }}>*</span></Typography>
                        <FormControl fullWidth sx={{ my: 1 }}>
                            <OutlinedInput
                                id="namaKlinik"
                                name="namaKlinik"
                                size="small"
                                placeholder="Masukkan Nama klinik"
                                value={formik.values.namaKlinik}
                                onChange={formik.handleChange}
                                onBlur={() => formik.setTouched({ ...formik.touched, namaKlinik: true })}
                                error={formik.touched.namaKlinik && Boolean(formik.errors.namaKlinik)}
                            />
                            {formik.touched.namaKlinik && formik.errors.namaKlinik && (
                                <Typography color="error">{formik.errors.namaKlinik}</Typography>
                            )}
                        </FormControl>

                        <Typography sx={{ fontSize: "16px" }}>Deskripsi Klinik<span style={{ color: "red" }}>*</span></Typography>
                        <FormControl fullWidth sx={{ my: 1 }}>
                            <OutlinedInput
                                id="deskripsiKlinik"
                                name="deskripsiKlinik"
                                size="small"
                                placeholder="Masukkan deskripsi klinik"
                                value={formik.values.deskripsiKlinik}
                                onChange={formik.handleChange}
                                onBlur={() => formik.setTouched({ ...formik.touched, deskripsiKlinik: true })}
                                error={formik.touched.deskripsiKlinik && Boolean(formik.errors.deskripsiKlinik)}
                                sx={{ height: '107px', alignItems: 'flex-start', borderRadius: '8px' }}
                            />
                            {formik.touched.deskripsiKlinik && formik.errors.deskripsiKlinik && (
                                <Typography color="error">{formik.errors.deskripsiKlinik}</Typography>
                            )}
                        </FormControl>

                        <Box display={'flex'} flexDirection={'column'} border={'1px solid #A8A8BD'} borderRadius={'16px'} padding={'16px'} mt={2} >
                            <Typography mb={'15px'} >Jam Operasional</Typography>
                            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} gap={'32px'} >
                                {/* Hari */}
                                <Box display={'flex'} flexDirection={'column'} width={'100%'} >
                                    <Typography>Hari</Typography>
                                    <DropdownListAPI
                                    defaultValue={selectedDay || ''}
                                        options={[
                                            { value: "1", label: "Senin" },
                                            { value: "2", label: "Selasa" },
                                            { value: "3", label: "Rabu" },
                                            { value: "4", label: "Kamis" },
                                            { value: "5", label: "Jumat" },
                                            { value: "6", label: "Sabtu" },
                                            { value: "7", label: "Minggu" },
                                        ]}
                                        placeholder="Pilih hari"
                                        onChange={(value: string) => setSelectedDay(value)}
                                        loading={false}
                                    />
                                </Box>

                                {/* Jam Mulai */}
                                <Box display={'flex'} flexDirection={'column'} width={'100%'} >
                                    <Typography>Jam mulai</Typography>
                                    <CustomTimePicker
                                        value={startTime}
                                        onChange={(newValue) => setStartTime(newValue)}
                                    />
                                </Box>

                                {/* Jam Selesai */}
                                <Box display={'flex'} flexDirection={'column'} width={'100%'} >
                                    <Typography>Jam selesai</Typography>
                                    <CustomTimePicker
                                        value={endTime}
                                        onChange={(newValue) => setEndTime(newValue)}
                                    />
                                </Box>
                            </Box>
                            <Button
                                fullWidth
                                sx={{
                                    mt: 2,
                                    bgcolor: 'transparent',
                                    color: '#8F85F3',
                                    border: '1px solid #8F85F3',
                                    ":hover": { bgcolor: '#8F85F3', color: 'white' },
                                }}
                                onClick={handleSaveAndAddDay}
                            >
                                {statusEdit? 'Simpan' : '+ Tambah hari'}
                            </Button>

                            {schedules.map((schedule, index) => (
                                <Box
                                    key={index}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    mt={2}
                                    sx={{
                                    border: '1px solid black',
                                    padding: '4px',
                                    borderRadius: '6px',
                                    }}
                                >
                                    <Typography>
                                    {schedule.day},  {schedule.startTime ? schedule.startTime : 'N/A'} - {schedule.endTime ? schedule.endTime : 'N/A'}
                                    </Typography>
                                    <Box>
                                    <IconButton color="primary" onClick={() => handleEditSchedule(index)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDeleteSchedule(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    </Box>
                                </Box>
                                ))}
                        </Box>

                        <Button
                            type="submit"
                            onClick={showTemporaryAlertSuccess}
                            variant="contained"
                            color="inherit"
                            sx={{
                                mt: 3,
                                width: "100%",
                                bgcolor: "#8F85F3",
                                color: "#fff",
                                textTransform: "none",
                                borderRadius: "8px",
                                ":hover": { bgcolor: "#a098f5" },
                            }}
                            disabled={!formik.isValid || !formik.dirty}
                        >
                            Simpan
                        </Button>
                    </Box>
                </Box>
            </Box>
            {successAlert && (
                <AlertSuccess label="Success adding clinic" />
            )}
            {errorAlert && (
                <AlertSuccess label="Error adding clinic" />
            )}
        </Container>
  )
}
