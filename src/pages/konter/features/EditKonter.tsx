import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import bgImage from "../../../assets/img/String.png";
import AlertSuccess from "../../../components/small/alert/AlertSuccess";
import DropdownList from "../../../components/small/dropdownlist/DropdownList";
import CustomTimePicker from "../../../components/small/CustomTimePicker";
import ImageUploaderGroupAPI from '../../../components/medium/imageComponent/ImageGroupUploaderAPI';
import "dayjs/locale/id";
import DropdownListAPI from '../../../components/small/dropdownlist/DropdownListAPI';
import { Container, Box, Typography, Button, FormControl, OutlinedInput } from "@mui/material";

//hooks
import useEditKonter from "../hooks/useEditKonter";
export default function EditKonter() {
    const {
        formik,
    handleImageChange,
    handleTambahHari,
    breadcrumbItems,
    setSelectedDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    successAlert,
    errorAlert,
    jenisKonter,
    selectedDays,
    apiUrl
    }=useEditKonter();
  return (
    <Container sx={{ py: 2 }}>
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box mt={3}>
                <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}>
                    <Typography fontSize="20px" fontWeight="700">Edit Konter</Typography>
                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="bg-image" />
                    </Box>

                    <ImageUploaderGroupAPI onChange={handleImageChange} apiUrl={apiUrl} />

                    <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
                        <Typography sx={{ fontSize: "16px" }}>Nama Konter<span style={{ color: "red" }}>*</span></Typography>
                        <FormControl fullWidth sx={{ my: 1 }}>
                            <OutlinedInput
                                id="namaKonter"
                                name="namaKonter"
                                size="small"
                                placeholder="Masukkan Nama konter"
                                value={formik.values.namaKonter}
                                onChange={formik.handleChange}
                                onBlur={() => formik.setTouched({ ...formik.touched, namaKonter: true })}
                                error={formik.touched.namaKonter && Boolean(formik.errors.namaKonter)}
                            />
                            {formik.touched.namaKonter && formik.errors.namaKonter && (
                                <Typography color="error">{formik.errors.namaKonter}</Typography>
                            )}
                        </FormControl>

                        <Typography sx={{ fontSize: "16px" }}>Pilih Konter<span style={{ color: "red" }}>*</span></Typography>
                        <DropdownList
                            options={jenisKonter}
                            placeholder="Pilih konter"
                            // onChange={}
                            loading={false}
                        />

                        <Typography sx={{ fontSize: "16px", mt: 1 }}>Lokasi Konter<span style={{ color: "red" }}>*</span></Typography>
                        <FormControl fullWidth sx={{ my: 1 }}>
                            <OutlinedInput
                                id="lokasiKonter"
                                name="lokasiKonter"
                                size="small"
                                placeholder="Masukkan lokasi konter"
                                value={formik.values.lokasiKonter}
                                onChange={formik.handleChange}
                                onBlur={() => formik.setTouched({ ...formik.touched, lokasiKonter: true })}
                                error={formik.touched.lokasiKonter && Boolean(formik.errors.lokasiKonter)}
                                sx={{ height: '107px', alignItems: 'flex-start', borderRadius: '8px' }}
                            />
                            {formik.touched.lokasiKonter && formik.errors.lokasiKonter && (
                                <Typography color="error">{formik.errors.lokasiKonter}</Typography>
                            )}
                        </FormControl>

                        <Box display={'flex'} flexDirection={'column'} border={'1px solid #A8A8BD'} borderRadius={'16px'} padding={'16px'} mt={2} >
                            <Typography mb={'15px'} >Jam Operasional</Typography>
                            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} gap={'32px'} >
                                {/* Hari */}
                                <Box display={'flex'} flexDirection={'column'} width={'100%'} >
                                    <Typography>Hari</Typography>
                                    <DropdownListAPI
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
                                        defaultValue={selectedDays}
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
                                onClick={handleTambahHari}
                            >
                                + Tambah hari
                            </Button>
                        </Box>

                        <Button
                            type="submit"
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
                <AlertSuccess label="Success adding counter" />
            )}
            {errorAlert && (
                <AlertSuccess label="Error adding counter" />
            )}
        </Container>
  )
}
