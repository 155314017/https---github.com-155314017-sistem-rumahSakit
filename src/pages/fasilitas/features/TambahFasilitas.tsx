
import { Container, Box, Typography, Button, FormControl, OutlinedInput } from "@mui/material";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import bgImage from "../../../assets/img/String.png";
import AlertSuccess from "../../../components/small/AlertSuccess";
import DropdownList from "../../../components/small/DropdownList";
import CustomTimePicker from "../../../components/small/CustomTimePicker";
import ImageUploaderGroup from '../../../components/medium/ImageUploaderGroup';
import InputCurrencyIdr from '../../../components/inputComponent/InputCurrencyIdr';
import DropdownListAPI from '../../../components/small/DropdownListAPI';
import useTambahFasilitas from '../hooks/useTambahFasilitas';




export default function TambahFasilitas() {
    const{breadcrumbItems,
        formik,
        setSelectedDay,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        setOperationalCost,
        handleTambahHari,
        gedungOptions,
        handleImageChange,
        errorAlert,
        successAlert,
        showTemporaryAlertSuccess}=useTambahFasilitas();
  return (
    <Container sx={{ py: 2 }}>
    <BreadCrumbs
        breadcrumbItems={breadcrumbItems}
        onBackClick={() => window.history.back()}
    />
    <Box mt={3}>
        <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}>
            <Typography fontSize="20px" fontWeight="700">Tambah Fasilitas</Typography>
            <Box position="absolute" sx={{ top: 0, right: 0 }}>
                <img src={bgImage} alt="bg-image" />
            </Box>

            <ImageUploaderGroup onChange={handleImageChange} />

            <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
                <Typography sx={{ fontSize: "16px" }}>Nama Fasilitas<span style={{ color: "red" }}>*</span></Typography>
                <FormControl fullWidth sx={{ my: 1 }}>
                    <OutlinedInput
                        id="namaFasilitas"
                        name="namaFasilitas"
                        size="small"
                        placeholder="Masukkan nama fasilitas"
                        value={formik.values.namaFasilitas}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.namaFasilitas && Boolean(formik.errors.namaFasilitas)}
                    />
                    {formik.touched.namaFasilitas && formik.errors.namaFasilitas && (
                        <Typography color="error">{formik.errors.namaFasilitas}</Typography>
                    )}
                </FormControl>

                <Typography sx={{ fontSize: "16px", mt: 2 }}>Pilih Gedung<span style={{ color: "red" }}>*</span></Typography>
                <DropdownListAPI
                    options={gedungOptions.map(({ id, name }) => ({ value: id, label: name }))}
                    placeholder="Pilih gedung"
                    onChange={(selectedOptionValue) => {
                        formik.setFieldValue('masterBuildingId', selectedOptionValue);
                    }}
                    loading={false}
                />

                <Typography sx={{ fontSize: "16px", mt: 2 }}>Deskripsi<span style={{ color: "red" }}>*</span></Typography>
                <FormControl fullWidth sx={{ my: 1 }}>
                    <OutlinedInput
                        id="deskripsiKlinik"
                        name="deskripsiKlinik"
                        size="small"
                        placeholder="Masukkan deskripsi"
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

                <Box display={'flex'} flexDirection={'column'} border={'1px solid #A8A8BD'} borderRadius={'16px'} padding={'16px'} mt={2}>
                    <Typography mb={'15px'} >Jam Operasional</Typography>
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} gap={'32px'} >
                        {/* Hari */}
                        <Box display={'flex'} flexDirection={'column'} width={'100%'} >
                            <Typography>Hari</Typography>
                            <DropdownList
                                options={[
                                    { value: 1, label: "Senin" },
                                    { value: 2, label: "Selasa" },
                                    { value: 3, label: "Rabu" },
                                    { value: 4, label: "Kamis" },
                                    { value: 5, label: "Jumat" },
                                    { value: 6, label: "Sabtu" },
                                    { value: 7, label: "Minggu" },
                                ]}
                                placeholder="Pilih hari"
                                onChange={(value: string) => {
                                    setSelectedDay(value);
                                }}
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
                        onClick={handleTambahHari}
                    >
                        + Tambah hari
                    </Button>
                </Box>

                <Typography sx={{ fontSize: "16px", mt: 3 }}>Biaya Penanganan<span style={{ color: "red" }}>*</span></Typography>
                {/* <InputCurrencyIdr /> */}
                <InputCurrencyIdr onChange={(value) => setOperationalCost(value)} defaultValue={0} />

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
        <AlertSuccess label="Success adding building" />
    )}
    {errorAlert && (
        <AlertSuccess label="Error adding building" />
    )}
</Container>
  )
}
