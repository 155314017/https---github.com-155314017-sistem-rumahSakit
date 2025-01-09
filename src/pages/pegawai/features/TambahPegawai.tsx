/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Container,
    Box,
    Typography,
    Button,
    FormControl,
    OutlinedInput,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    FormControlLabel,
    Radio,
    RadioGroup,
    Checkbox,
    Divider
} from "@mui/material";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import bgImage from "../../../assets/img/String.png";
import DropdownList from "../../../components/small/dropdownlist/DropdownList";

//hooks
import useTambahPegawai, { Exclusion } from "../hooks/useTambahPegawai";
import InputCurrencyIdr from "../../../components/inputComponent/InputCurrencyIdr";
import PhoneInput from "react-phone-input-2";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MiniSwitchCustom from "../../../components/small/Switch/MiniSwitchCustom";
import DropdownListTime from "../../../components/small/dropdownlist/DropdownListTime";
import ExclusionModal from "../../../components/small/modal/ExclusionModal";

export default function TambahPegawai() {
    const {
        currentPage,
        setCurrentPage,
        labels,
        StyledTableRow,
        StyledTableContainer,
        breadcrumbItems,
        rolePegawai,
        formik,
        getPageStyle,
        getBorderStyle,
        checkedItems,
        menuActions,
        selectAllChecked,
        handleCheckboxChange,
        handleSelectAll,
        handleSelectAllActions,
        handleIndividualCheckboxChange,
        gender,
        setGender,
        senin,
        setSenin,
        selasa,
        setSelasa,
        rabu,
        setRabu,
        kamis,
        setKamis,
        jumat,
        setJumat,
        sabtu,
        setSabtu,
        minggu,
        setMinggu,
        jamOperasional,
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
        handleSubmitPage3,
        addExclusion,
        exclusions,
        removeExclusion,

    } = useTambahPegawai();
    const isSelectAllActionsDisabled = checkedItems.slice(1).every(item => !item);
    const handleSaveExclusion = (exclusion: Omit<Exclusion, 'id'>) => {
        addExclusion(exclusion);
    };
    return (
        <Container sx={{ py: 2 }}>
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box mt={3}>
                <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}>
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
                                    bgcolor: "#fff",
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
                                    bgcolor: "#fff",
                                    borderRadius: "15px 0px 0px 0px ",
                                }}
                            />
                        </Box>
                    </Box>
                    {/* ---------- */}
                    <Typography fontSize="20px" fontWeight="700">Formulir Tambah Pegawai</Typography>
                    <Box
                        sx={{ display: "flex", flexDirection: "row", mt: 2, mb: 2, gap: 24 }}
                    >
                        <Box display={"flex"} flexDirection={"row"} width={"290px"}>
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
                                    Biodata Pegawai
                                </Typography>
                            </Box>
                        </Box>

                        <Box display={"flex"} flexDirection={"row"} width={"290px"}>
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
                                    Jadwal Dokter
                                </Typography>
                            </Box>
                        </Box>
                        <Box display={"flex"} flexDirection={"row"} width={"290px"}>
                            <Box
                                display={"flex"}
                                flexDirection={"row"}
                                alignItems="center"
                                onClick={() => setCurrentPage(3)} // Perbaiki halaman 3
                                sx={getPageStyle(3)} // Perbaiki halaman 3
                                mx={2}
                            >
                                <Box sx={getBorderStyle(3)}>3</Box>
                                <Typography sx={{ ml: 1 }}>
                                    Hak Akses Pegawai
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="bg-image" />
                    </Box>

                    {currentPage === 1 && (
                        <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
                            <Typography fontWeight={600} fontSize={"16px"} mb={4} >1. Biodata</Typography>

                            {/* NIP */}
                            <Typography sx={{ fontSize: "16px" }}>NIP (Nomor Induk Pegawai) </Typography>
                            <FormControl fullWidth sx={{ my: 1 }}>
                                <OutlinedInput
                                    id="nip"
                                    name="nip"
                                    size="small"
                                    placeholder="Masukkan NIP"
                                    disabled
                                    sx={{ bgcolor: '#EEEEF2' }}
                                    value={formik.values.nip}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.setTouched({ ...formik.touched, nip: true })}
                                    error={formik.touched.nip && Boolean(formik.errors.nip)}
                                />
                            </FormControl>

                            {/* NIK */}
                            <Typography sx={{ fontSize: "16px" }}>NIK (Nomor Induk KTP) </Typography>
                            <FormControl fullWidth sx={{ my: 1 }}>
                                <OutlinedInput
                                    id="nik"
                                    name="nik"
                                    size="small"
                                    placeholder="Masukkan NIK"
                                    sx={{ bgcolor: 'inherit' }}
                                    value={formik.values.nik}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.setTouched({ ...formik.touched, nik: true })}
                                    error={formik.touched.nik && Boolean(formik.errors.nik)}
                                />
                            </FormControl>

                            {/* Nama Pegawai */}
                            <Typography sx={{ fontSize: "16px" }}>Nama Pegawai<span style={{ color: "red" }}>*</span></Typography>
                            <FormControl fullWidth sx={{ my: 1 }}>
                                <OutlinedInput
                                    id="namaPegawai" // Perbaiki nama field
                                    name="namaPegawai" // Perbaiki nama field
                                    size="small"
                                    placeholder="Masukkan Nama Pegawai"
                                    value={formik.values.namaPegawai} // Perbaiki nama field
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.setTouched({ ...formik.touched, namaPegawai: true })} // Perbaiki nama field
                                    error={formik.touched.namaPegawai && Boolean(formik.errors.namaPegawai)} // Perbaiki nama field
                                />
                                {formik.touched.namaPegawai && formik.errors.namaPegawai && (
                                    <Typography color="error">{formik.errors.namaPegawai}</Typography>
                                )}
                            </FormControl>

                            {/* Tanggal Lahir */}
                            <Typography sx={{ fontSize: "16px" }}>Tanggal Lahir<span style={{ color: "red" }}>*</span></Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    value={formik.values.tanggalLahir ? dayjs(formik.values.tanggalLahir) : null} // Perbaiki value
                                    onChange={(newValue: Dayjs | null) => {
                                        if (newValue) {
                                            const formattedDate = newValue.format("YYYY-MM-DD");
                                            formik.setFieldValue("tanggalLahir", formattedDate);
                                            console.log("tanggalLahir", formattedDate);
                                        }
                                    }}
                                    slotProps={{
                                        textField: {
                                            placeholder: "Tanggal Lahir",
                                            error: formik.touched.tanggalLahir && Boolean(formik.errors.tanggalLahir),
                                            helperText: formik.touched.tanggalLahir && formik.errors.tanggalLahir,
                                            sx: {
                                                borderRadius: '8px',
                                                height: '60px',
                                                width: '100%',
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '8px',
                                                    height: '44px',
                                                },
                                            },
                                        },
                                    }}
                                />
                            </LocalizationProvider>

                            {/* Alamat Tinggal */}
                            <Typography sx={{ fontSize: "16px" }}>Alamat Tempat Tinggal<span style={{ color: "red" }}>*</span></Typography>
                            <FormControl fullWidth sx={{ my: 1 }}>
                                <OutlinedInput
                                    id="alamatTinggal"
                                    name="alamatTinggal"
                                    size="small"
                                    placeholder="Masukkan alamat tempat tinggal pegawai"
                                    value={formik.values.alamatTinggal}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.setTouched({ ...formik.touched, alamatTinggal: true })}
                                    error={formik.touched.alamatTinggal && Boolean(formik.errors.alamatTinggal)}
                                    sx={{ height: '107px', alignItems: 'flex-start', borderRadius: '8px' }}
                                />
                                {formik.touched.alamatTinggal && formik.errors.alamatTinggal && (
                                    <Typography color="error">{formik.errors.alamatTinggal}</Typography>
                                )}
                            </FormControl>

                            {/* Jenis Kelamin */}
                            <Typography>Jenis Kelamin<span style={{ color: 'red' }} >*</span></Typography>

                            <Box
                                display={'flex'}
                                flexDirection={'row'}
                                padding={"3px"}
                                border={"1px solid #A8A8BD"}
                                mt={2}
                                borderRadius={"12px"}
                                pl={2}
                            >
                                <RadioGroup
                                    row // Mengatur radio button secara horizontal
                                    value={gender}
                                    onChange={(event) => {
                                        setGender(event.target.value);
                                        formik.setFieldValue("jenisKelamin", event.target.value); // Perbaiki nama field
                                        console.log(event.target.value);
                                    }}
                                >
                                    <FormControlLabel
                                        value="pria"
                                        control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />}
                                        label="Pria"
                                    />
                                    <FormControlLabel
                                        value="wanita"
                                        control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />}
                                        label="Wanita"
                                    />
                                </RadioGroup>
                            </Box>

                            {/* Status */}
                            <Typography mt={2} >Status<span style={{ color: 'red' }} >*</span></Typography>
                            <FormControl sx={{ width: '100%' }} >
                                <OutlinedInput
                                    id="status"
                                    name="status"
                                    size="small"
                                    placeholder="Masukkan status pegawai"
                                    sx={{ borderRadius: '8px' }}
                                    value={formik.values.status}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.setTouched({ ...formik.touched, status: true })}
                                    error={formik.touched.status && Boolean(formik.errors.status)}
                                />
                                {formik.touched.status && formik.errors.status && (
                                    <Typography color="error">{formik.errors.status}</Typography>
                                )}
                            </FormControl>

                            {/* Email */}
                            <Typography mt={2} >Email<span style={{ color: 'red' }} >*</span></Typography>
                            <FormControl sx={{ width: '100%' }} >
                                <OutlinedInput
                                    id="email"
                                    name="email"
                                    size="small"
                                    placeholder="Masukkan email pegawai"
                                    sx={{ borderRadius: '8px' }}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.setTouched({ ...formik.touched, email: true })}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <Typography color="error">{formik.errors.email}</Typography>
                                )}
                            </FormControl>

                            {/* No. Handphone */}
                            <Typography mt={2} >No. Handphone<span style={{ color: 'red' }} >*</span></Typography>
                            <PhoneInput
                                country={"id"}
                                value={formik.values.nomorHandphone}
                                onChange={(phone) => formik.setFieldValue("nomorHandphone", phone)}
                                inputStyle={{
                                    height: "48px",
                                    borderRadius: "8px",
                                    border: formik.touched.nomorHandphone && formik.errors.nomorHandphone ? "1px solid #f44336" : "1px solid #ccc",
                                    padding: "10px 40px 10px 60px",
                                    backgroundColor: formik.touched.nomorHandphone && formik.errors.nomorHandphone ? "#ffcccc" : 'inherit',
                                    fontSize: "16px",
                                    width: "100%",
                                    marginTop: "10px",
                                }}
                                buttonStyle={{
                                    borderRadius: "8px 0 0 8px",
                                    border: "1px solid #ccc",
                                }}
                                containerStyle={{
                                    marginBottom: "10px",
                                    width: "100%",
                                }}
                                onBlur={() => formik.setTouched({ ...formik.touched, nomorHandphone: true })}
                            />
                            {formik.touched.nomorHandphone && formik.errors.nomorHandphone && (
                                <Typography color="error">{formik.errors.nomorHandphone}</Typography>
                            )}

                            {/* Role Pegawai */}
                            <Typography mt={2} >Role Pegawai<span style={{ color: 'red' }} >*</span></Typography>
                            <DropdownList
                                onChange={value => formik.setFieldValue('rolePegawai', value)}
                                placeholder='Pilih role pegawai'
                                options={rolePegawai}
                                loading={false}
                            />
                            {formik.touched.rolePegawai && formik.errors.rolePegawai && (
                                <Typography color="error">{formik.errors.rolePegawai}</Typography>
                            )}

                            {/* Jenis Spesialisasi */}
                            <Typography mt={2} >Jenis Spesialisasi<span style={{ color: 'red' }} >*</span></Typography>
                            <DropdownList
                                onChange={value => formik.setFieldValue('jenisSpesialis', value)}
                                placeholder='Pilih jenis spesialisasi'
                                options={rolePegawai}
                                loading={false}
                            />
                            {formik.touched.jenisSpesialis && formik.errors.jenisSpesialis && (
                                <Typography color="error">{formik.errors.jenisSpesialis}</Typography>
                            )}

                            {/* Klinik */}
                            <Typography mt={2} >Klinik<span style={{ color: 'red' }} >*</span></Typography>
                            <DropdownList
                                onChange={value => formik.setFieldValue('namaKlinik', value)}
                                placeholder='Pilih klinik'
                                options={rolePegawai}
                                loading={false}
                            />
                            {formik.touched.namaKlinik && formik.errors.namaKlinik && (
                                <Typography color="error">{formik.errors.namaKlinik}</Typography>
                            )}

                            {/* Tipe Antrian */}
                            <Typography mt={2} >Tipe Antrian<span style={{ color: 'red' }} >*</span></Typography>
                            <DropdownList
                                onChange={value => formik.setFieldValue('tipeAntrian', value)}
                                placeholder='Pilih tipe antrian'
                                options={rolePegawai}
                                loading={false}
                            />
                            {formik.touched.tipeAntrian && formik.errors.tipeAntrian && (
                                <Typography color="error">{formik.errors.tipeAntrian}</Typography>
                            )}

                            {/* Biaya Penanganan */}
                            <Typography sx={{ fontSize: '16px', mt: 2 }}>
                                Biaya Tarif<span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <InputCurrencyIdr
                                onChange={value => formik.setFieldValue('biayaPenanganan', value)}
                                defaultValue={0}
                            />
                            {formik.touched.biayaPenanganan && formik.errors.biayaPenanganan && (
                                <Typography color="error">{formik.errors.biayaPenanganan}</Typography>
                            )}

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
                    )}

                    {currentPage === 2 && (
                        <Box mt={3} border={'1px solid #C5C5D3'} p={'24px'} borderRadius={'16px'} >
                            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}  >
                                <Typography>Jadwal Praktek</Typography>
                                <Typography
                                    onClick={handleOpenModal}
                                    sx={{
                                        color: "#8F85F3",
                                        cursor: "pointer",
                                    }}
                                >
                                    + add exclusion
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <ExclusionModal
                                        open={isModalOpen}
                                        onClose={handleCloseModal}
                                        onSave={handleSaveExclusion}
                                    />
                                </LocalizationProvider>

                            </Box>

                            <Box display={'flex'} flexDirection={'column'} gap={3} >
                                <Box mt={2} >
                                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} mb={2} >
                                        <MiniSwitchCustom label="Senin" colorLabel="black" onChangeValue={() => setSenin(!senin)} />
                                        {senin && (
                                            <Box
                                                ml='auto'
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Box
                                                    display="flex"
                                                    flexDirection="row"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    gap={2}
                                                >
                                                    <DropdownListTime
                                                        onChange={(value) => console.log(value)}
                                                        placeholder="Pilih jam mulai"
                                                        options={jamOperasional}
                                                        loading={false}
                                                    />
                                                    <Typography>-</Typography>
                                                    <DropdownListTime
                                                        onChange={(value) => console.log(value)}
                                                        placeholder="Pilih jam selesai"
                                                        options={jamOperasional}
                                                        loading={false}
                                                    />
                                                </Box>
                                            </Box>
                                        )}
                                        {!senin && (
                                            <Typography
                                                sx={{
                                                    color: '#747487',
                                                    bgcolor: '#EEEEF2',
                                                    padding: '2px 16px 2px 16px',
                                                    border: '1px solid #747487',
                                                    borderRadius: '100px'
                                                }}
                                            >Tidak bekerja pada hari ini</Typography>
                                        )}
                                    </Box>
                                    <Divider sx={{ color: '#C5C5D3' }} />
                                </Box>
                                <Box mt={2} >
                                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} mb={2} >
                                        <MiniSwitchCustom label="Selasa" colorLabel="black" onChangeValue={() => setSelasa(!selasa)} />
                                        {selasa && (
                                            <Box
                                                ml='auto'
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Box
                                                    display="flex"
                                                    flexDirection="row"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    gap={2}
                                                >
                                                    <DropdownListTime
                                                        onChange={(value) => console.log(value)}
                                                        placeholder="Pilih jam mulai"
                                                        options={jamOperasional}
                                                        loading={false}
                                                    />
                                                    <Typography>-</Typography>
                                                    <DropdownListTime
                                                        onChange={(value) => console.log(value)}
                                                        placeholder="Pilih jam selesai"
                                                        options={jamOperasional}
                                                        loading={false}
                                                    />
                                                </Box>
                                            </Box>
                                        )}
                                        {!selasa && (
                                            <Typography
                                                sx={{
                                                    color: '#747487',
                                                    bgcolor: '#EEEEF2',
                                                    padding: '2px 16px 2px 16px',
                                                    border: '1px solid #747487',
                                                    borderRadius: '100px'
                                                }}
                                            >Tidak bekerja pada hari ini</Typography>
                                        )}
                                    </Box>
                                    <Divider sx={{ color: '#C5C5D3' }} />
                                </Box>
                                <Box mt={2} >
                                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} mb={2} >
                                        <MiniSwitchCustom label="Rabu" colorLabel="black" onChangeValue={() => setRabu(!rabu)} />
                                        {rabu && (
                                            <Box
                                                ml='auto'
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Box
                                                    display="flex"
                                                    flexDirection="row"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    gap={2}
                                                >
                                                    <DropdownListTime
                                                        onChange={(value) => console.log(value)}
                                                        placeholder="Pilih jam mulai"
                                                        options={jamOperasional}
                                                        loading={false}
                                                    />
                                                    <Typography>-</Typography>
                                                    <DropdownListTime
                                                        onChange={(value) => console.log(value)}
                                                        placeholder="Pilih jam selesai"
                                                        options={jamOperasional}
                                                        loading={false}
                                                    />
                                                </Box>
                                            </Box>
                                        )}
                                        {!rabu && (
                                            <Typography
                                                sx={{
                                                    color: '#747487',
                                                    bgcolor: '#EEEEF2',
                                                    padding: '2px 16px 2px 16px',
                                                    border: '1px solid #747487',
                                                    borderRadius: '100px'
                                                }}
                                            >Tidak bekerja pada hari ini</Typography>
                                        )}
                                    </Box>
                                    <Divider sx={{ color: '#C5C5D3' }} />
                                </Box>
                                <Box mt={2} >
                                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} mb={2} >
                                        <MiniSwitchCustom label="Kamis" colorLabel="black" onChangeValue={() => setKamis(!kamis)} />
                                        {kamis && (
                                            <Box
                                                ml='auto'
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Box
                                                    display="flex"
                                                    flexDirection="row"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    gap={2}
                                                >
                                                    <DropdownListTime
                                                        onChange={(value) => console.log(value)}
                                                        placeholder="Pilih jam mulai"
                                                        options={jamOperasional}
                                                        loading={false}
                                                    />
                                                    <Typography>-</Typography>
                                                    <DropdownListTime
                                                        onChange={(value) => console.log(value)}
                                                        placeholder="Pilih jam selesai"
                                                        options={jamOperasional}
                                                        loading={false}
                                                    />
                                                </Box>
                                            </Box>
                                        )}
                                        {!kamis && (
                                            <Typography
                                                sx={{
                                                    color: '#747487',
                                                    bgcolor: '#EEEEF2',
                                                    padding: '2px 16px 2px 16px',
                                                    border: '1px solid #747487',
                                                    borderRadius: '100px'
                                                }}
                                            >Tidak bekerja pada hari ini</Typography>
                                        )}
                                    </Box>
                                    <Divider sx={{ color: '#C5C5D3' }} />
                                </Box>
                                <Box mt={2} >
                                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} mb={2} >
                                        <MiniSwitchCustom label="Jumat" colorLabel="black" onChangeValue={() => setJumat(!jumat)} />
                                        {jumat && (
                                            <Box
                                                ml='auto'
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Box
                                                    display="flex"
                                                    flexDirection="row"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    gap={2}
                                                >
                                                    <DropdownListTime
                                                        onChange={(value) => console.log(value)}
                                                        placeholder="Pilih jam mulai"
                                                        options={jamOperasional}
                                                        loading={false}
                                                    />
                                                    <Typography>-</Typography>
                                                    <DropdownListTime
                                                        onChange={(value) => console.log(value)}
                                                        placeholder="Pilih jam selesai"
                                                        options={jamOperasional}
                                                        loading={false}
                                                    />
                                                </Box>
                                            </Box>
                                        )}
                                        {!jumat && (
                                            <Typography
                                                sx={{
                                                    color: '#747487',
                                                    bgcolor: '#EEEEF2',
                                                    padding: '2px 16px 2px 16px',
                                                    border: '1px solid #747487',
                                                    borderRadius: '100px'
                                                }}
                                            >Tidak bekerja pada hari ini</Typography>
                                        )}
                                    </Box>
                                    <Divider sx={{ color: '#C5C5D3' }} />
                                </Box>
                                <Box mt={2} >
                                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} mb={2} >
                                        <MiniSwitchCustom label="Sabtu" colorLabel="black" onChangeValue={() => setSabtu(!sabtu)} />
                                        {sabtu && (
                                            <Box
                                                ml='auto'
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Box
                                                    display="flex"
                                                    flexDirection="row"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    gap={2}
                                                >
                                                    <DropdownListTime
                                                        onChange={(value) => console.log(value)}
                                                        placeholder="Pilih jam mulai"
                                                        options={jamOperasional}
                                                        loading={false}
                                                    />
                                                    <Typography>-</Typography>
                                                    <DropdownListTime
                                                        onChange={(value) => console.log(value)}
                                                        placeholder="Pilih jam selesai"
                                                        options={jamOperasional}
                                                        loading={false}
                                                    />
                                                </Box>
                                            </Box>
                                        )}
                                        {!sabtu && (
                                            <Typography
                                                sx={{
                                                    color: '#747487',
                                                    bgcolor: '#EEEEF2',
                                                    padding: '2px 16px 2px 16px',
                                                    border: '1px solid #747487',
                                                    borderRadius: '100px'
                                                }}
                                            >Tidak bekerja pada hari ini</Typography>
                                        )}
                                    </Box>
                                    <Divider sx={{ color: '#C5C5D3' }} />
                                </Box>
                                <Box mt={2} >
                                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} mb={2} >
                                        <MiniSwitchCustom label="Minggu" colorLabel="black" onChangeValue={() => setMinggu(!minggu)} />
                                        {minggu && (
                                            <Box
                                                ml='auto'
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Box
                                                    display="flex"
                                                    flexDirection="row"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    gap={2}
                                                >
                                                    <DropdownListTime
                                                        onChange={(value) => console.log(value)}
                                                        placeholder="Pilih jam mulai"
                                                        options={jamOperasional}
                                                        loading={false}
                                                    />
                                                    <Typography>-</Typography>
                                                    <DropdownListTime
                                                        onChange={(value) => console.log(value)}
                                                        placeholder="Pilih jam selesai"
                                                        options={jamOperasional}
                                                        loading={false}
                                                    />
                                                </Box>
                                            </Box>
                                        )}
                                        {!minggu && (
                                            <Typography
                                                sx={{
                                                    color: '#747487',
                                                    bgcolor: '#EEEEF2',
                                                    padding: '2px 16px 2px 16px',
                                                    border: '1px solid #747487',
                                                    borderRadius: '100px'
                                                }}
                                            >Tidak bekerja pada hari ini</Typography>
                                        )}
                                    </Box>
                                    <Divider sx={{ color: '#C5C5D3' }} />
                                </Box>
                            </Box>
                            {/* Tambahkan daftar exclusions di sini */}
                            {exclusions.length > 0 && (
                                <Box mt={3}>
                                    <Typography variant="h6" gutterBottom>
                                        Daftar Exclusion
                                    </Typography>
                                    <StyledTableContainer
                                        sx={{
                                            mt: 2,
                                            boxShadow: "none",
                                            mb: 2,
                                            maxHeight: "610px",
                                            borderRadius: "16px",
                                        }}>
                                        <Table stickyHeader sx={{ width: '100%' }}>
                                            <TableHead >
                                                <TableRow >
                                                    <TableCell
                                                        width="25%"
                                                        sx={{
                                                            fontSize: '14px',
                                                            fontWeight: 700,
                                                            color: '#292B2C',
                                                            bgcolor: '#F1F0FE',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        Tanggal
                                                    </TableCell>
                                                    <TableCell
                                                        width="25%"
                                                        sx={{
                                                            fontSize: '14px',
                                                            fontWeight: 700,
                                                            color: '#292B2C',
                                                            bgcolor: '#F1F0FE',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        Type
                                                    </TableCell>
                                                    <TableCell
                                                        width="25%"
                                                        sx={{
                                                            fontSize: '14px',
                                                            fontWeight: 700,
                                                            color: '#292B2C',
                                                            bgcolor: '#F1F0FE',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        Time
                                                    </TableCell>
                                                    <TableCell
                                                        width="25%"
                                                        sx={{
                                                            fontSize: '14px',
                                                            fontWeight: 700,
                                                            color: '#292B2C',
                                                            bgcolor: '#F1F0FE',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        Aksi
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {exclusions.map((exclusion) => (
                                                    <TableRow key={exclusion.id}>
                                                        <TableCell
                                                            sx={{
                                                                color: '#292B2C',
                                                                fontSize: '14px',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap',
                                                                maxWidth: '150px',
                                                                textTransform: 'capitalize',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            {exclusion.date}
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{
                                                                color: '#292B2C',
                                                                fontSize: '14px',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap',
                                                                maxWidth: '150px',
                                                                textTransform: 'capitalize',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            {exclusion.type}
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{
                                                                color: '#292B2C',
                                                                fontSize: '14px',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap',
                                                                maxWidth: '150px',
                                                                textTransform: 'capitalize',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            {exclusion.time}
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{
                                                                color: '#292B2C',
                                                                fontSize: '14px',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap',
                                                                maxWidth: '150px',
                                                                textTransform: 'capitalize',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            <Typography
                                                                onClick={() => removeExclusion(exclusion.id)}
                                                                sx={{
                                                                    color: '#8F85F3',
                                                                    cursor:'pointer'
                                                                }}
                                                            >
                                                                Hapus
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </StyledTableContainer>
                                </Box>
                            )}
                            <Button
                                // type="submit"
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
                            // disabled={!formik.isValid || !formik.dirty} // Opsional
                            >
                                Selanjutnya
                            </Button>
                        </Box>
                    )}

                    {currentPage === 3 && (
                        <Box mt={3}>
                            <Typography fontWeight={600} fontSize={"16px"} mb={4}>
                                1. Hak Akses Pegawai
                            </Typography>
                            <Box>
                                <Box mt={3}>
                                    <StyledTableContainer
                                        sx={{
                                            mt: 2,
                                            boxShadow: "none",
                                            mb: 2,
                                            maxHeight: "610px",
                                            borderRadius: "16px",
                                        }}
                                    >
                                        <Table stickyHeader sx={{ width: "100%" }}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell
                                                        width={"15%"}
                                                        sx={{
                                                            fontSize: "14px",
                                                            fontWeight: 700,
                                                            color: "#292B2C",
                                                            bgcolor: "#F1F0FE",
                                                        }}
                                                        align="left"
                                                    >
                                                        Nama Menu
                                                    </TableCell>
                                                    <TableCell
                                                        width={"15%"}
                                                        sx={{
                                                            fontSize: "14px",
                                                            fontWeight: 700,
                                                            color: "#292B2C",
                                                            bgcolor: "#F1F0FE",
                                                        }}
                                                        align="left"
                                                    >
                                                        Tindakan Akses
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {/* Checkbox Pilih Semua Menu */}
                                                <StyledTableRow>
                                                    <TableCell
                                                        sx={{ color: "#292B2C", fontSize: "14px" }}
                                                        align="left"
                                                    >
                                                        <FormControlLabel
                                                            sx={{ color: '#747487', fontWeight: 400, fontSize: '16px' }}
                                                            control={
                                                                <Checkbox
                                                                    sx={{
                                                                        color: '#A8A8BD',
                                                                        borderRadius: '4px',
                                                                        '&.Mui-checked': {
                                                                            color: '#7367F0',
                                                                        },
                                                                    }}
                                                                    checked={checkedItems[0]}
                                                                    onChange={handleSelectAll}
                                                                />
                                                            }
                                                            label="Pilih semua menu"
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        sx={{ color: "#292B2C", fontSize: "14px", textTransform: "capitalize" }}
                                                    >
                                                        <FormControlLabel
                                                            sx={{ color: '#747487', fontWeight: 400, fontSize: '16px' }}
                                                            control={
                                                                <Checkbox
                                                                    sx={{
                                                                        color: '#A8A8BD',
                                                                        borderRadius: '4px',
                                                                        '&.Mui-checked': {
                                                                            color: '#7367F0',
                                                                        },
                                                                    }}
                                                                    checked={selectAllChecked}
                                                                    onChange={handleSelectAllActions}
                                                                    disabled={isSelectAllActionsDisabled} // Tambahkan properti disabled
                                                                />
                                                            }
                                                            label="Pilih semua tindakan"
                                                        />
                                                    </TableCell>
                                                </StyledTableRow>

                                                {labels.slice(1).map((label, index) => (
                                                    <StyledTableRow key={index}>
                                                        <TableCell
                                                            sx={{ color: "#292B2C", fontSize: "14px" }}
                                                            align="left"
                                                        >
                                                            <FormControlLabel
                                                                sx={{ color: '#747487', fontWeight: 400, fontSize: '16px' }}
                                                                control={
                                                                    <Checkbox
                                                                        sx={{
                                                                            color: '#A8A8BD',
                                                                            borderRadius: '4px',
                                                                            '&.Mui-checked': {
                                                                                color: '#7367F0',
                                                                            },
                                                                        }}
                                                                        checked={checkedItems[index + 1]}
                                                                        onChange={handleCheckboxChange(index + 1)}
                                                                    />
                                                                }
                                                                label={label}
                                                            />
                                                        </TableCell>
                                                        <TableCell
                                                            align="left"
                                                            sx={{ color: "#292B2C", fontSize: "14px", textTransform: "capitalize" }}
                                                        >
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <FormControlLabel
                                                                    sx={{ color: '#747487', fontWeight: 400, fontSize: '16px' }}
                                                                    control={
                                                                        <Checkbox
                                                                            sx={{
                                                                                color: '#A8A8BD',
                                                                                borderRadius: '4px',
                                                                                '&.Mui-checked': {
                                                                                    color: '#7367F0',
                                                                                },
                                                                            }}
                                                                            checked={menuActions[index].view}
                                                                            onChange={handleIndividualCheckboxChange(index, 'view')}
                                                                            disabled={!checkedItems[index + 1]}
                                                                        />
                                                                    }
                                                                    label="View"
                                                                />
                                                                <FormControlLabel
                                                                    sx={{ color: '#747487', fontWeight: 400, fontSize: '16px' }}
                                                                    control={
                                                                        <Checkbox
                                                                            sx={{
                                                                                color: '#A8A8BD',
                                                                                borderRadius: '4px',
                                                                                '&.Mui-checked': {
                                                                                    color: '#7367F0',
                                                                                },
                                                                            }}
                                                                            checked={menuActions[index].edit}
                                                                            onChange={handleIndividualCheckboxChange(index, 'edit')}
                                                                            disabled={!checkedItems[index + 1]}
                                                                        />
                                                                    }
                                                                    label="Edit"
                                                                />
                                                                <FormControlLabel
                                                                    sx={{ color: '#747487', fontWeight: 400, fontSize: '16px' }}
                                                                    control={
                                                                        <Checkbox
                                                                            sx={{
                                                                                color: '#A8A8BD',
                                                                                borderRadius: '4px',
                                                                                '&.Mui-checked': {
                                                                                    color: '#7367F0',
                                                                                },
                                                                            }}
                                                                            checked={menuActions[index].delete}
                                                                            onChange={handleIndividualCheckboxChange(index, 'delete')}
                                                                            disabled={!checkedItems[index + 1]}
                                                                        />
                                                                    }
                                                                    label="Delete"
                                                                />
                                                            </Box>
                                                        </TableCell>
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </StyledTableContainer>
                                    <Button
                                        onClick={handleSubmitPage3} // Panggil handler saat klik
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
                                    >
                                        Selanjutnya
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Container >
    );
}
