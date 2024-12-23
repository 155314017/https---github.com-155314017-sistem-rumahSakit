import { Container, Box, Typography, Button, FormControl, OutlinedInput, CircularProgress } from "@mui/material";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import bgImage from "../../../assets/img/String.png";
import AlertSuccess from "../../../components/small/alert/AlertSuccess";
import DropdownListAPI from '../../../components/small/dropdownlist/DropdownListAPI';
import ImageUploaderGroupAPI from '../../../components/medium/imageComponent/ImageGroupUploaderAPI';
import DropdownList from '../../../components/small/dropdownlist/DropdownList';

//hooks
import useEditRuangan from "../hooks/useEditRuangan";



export default function EditRuangan() {
    const {
        formik,
        handleImageChange,
        successAlert,
        errorAlert,
        loading,
        apiUrl,
        gedungOptions,
        jenisRuangan
    } = useEditRuangan();

    return (
        <Container sx={{ py: 2 }}>
            <BreadCrumbs
                breadcrumbItems={[
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Ruangan", href: "/ruangan" },
                    { label: "Edit Ruangan", href: "/editRuangan" },
                ]}
                onBackClick={() => window.history.back()}
            />
            <Box mt={3}>
                <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}>
                    <Typography fontSize="20px" fontWeight="700">Edit Ruangan</Typography>
                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="bg-image" />
                    </Box>

                    <Box
                        position={"absolute"}
                        sx={{
                            top: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                            display: "flex",
                        }}
                    >
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
                                    bgcolor: "#fff",
                                    borderRadius: "0px 15px 0px 0px ",
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                width: "600px",
                                height: "50px",
                                bgcolor: "#F1F0FE",
                                borderRadius: "0px 0px 22px 22px",
                            }}
                        />

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
                                    bgcolor: "#fff",
                                    borderRadius: "15px 0px 0px 0px ",
                                }}
                            />
                        </Box>
                    </Box>

                    <ImageUploaderGroupAPI onChange={handleImageChange} apiUrl={apiUrl} />

                    <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
                        <Typography sx={{ fontSize: "16px" }}>Nama Ruangan<span style={{ color: "red" }}>*</span></Typography>
                        <FormControl fullWidth sx={{ my: 1 }}>
                            <OutlinedInput
                                id="namaKlinik"
                                name="namaKlinik"
                                size="small"
                                placeholder={loading ? "" : "Masukkan Nama ruangan"}
                                value={loading ? "" : formik.values.namaKlinik}
                                onChange={formik.handleChange}
                                onBlur={() => formik.setTouched({ ...formik.touched, namaKlinik: true })}
                                error={formik.touched.namaKlinik && Boolean(formik.errors.namaKlinik)}
                                startAdornment={loading ? <CircularProgress size={20} /> : null}
                                disabled={loading}
                            />
                            {formik.touched.namaKlinik && formik.errors.namaKlinik && (
                                <Typography color="error">{formik.errors.namaKlinik}</Typography>
                            )}
                        </FormControl>

                        <Typography sx={{ fontSize: "16px" }}>Pilih Gedung<span style={{ color: "red" }}>*</span></Typography>
                        <DropdownListAPI
                            options={gedungOptions.map(({ id, name }) => ({ value: id, label: name }))}
                            placeholder={loading ? "" : "Pilih gedung"}
                            defaultValue={loading ? "" : formik.values.masterBuildingId}
                            onChange={(selectedOptionValue) => {
                                formik.setFieldValue('masterBuildingId', selectedOptionValue);
                            }}
                            loading={loading}
                        />

                        <Typography sx={{ fontSize: "16px", mt: 1 }}>Jenis Ruangan<span style={{ color: "red" }}>*</span></Typography>
                        <DropdownList
                            options={jenisRuangan}
                            placeholder={loading ? "" : "Pilih jenis ruangan"}
                            onChange={(selectedValue) => {
                                formik.setFieldValue('jenisRuangan', selectedValue);
                            }}
                            defaultValue={loading ? "" : formik.values.jenisRuangan}
                            loading={loading}
                        />

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

                    {successAlert && <AlertSuccess label="Ruangan updated successfully" />}
                    {errorAlert && <AlertSuccess label="Error updating ruangan" />}
                </Box>
            </Box>
        </Container>
    );
}
