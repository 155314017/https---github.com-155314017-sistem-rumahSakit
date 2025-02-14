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
} from "@mui/material";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import bgImage from "../../../assets/img/String.png";
import DropdownList from "../../../components/small/dropdownlist/DropdownList";

//hooks
import useTambahPegawai from "../hooks/useTambahPegawai";
import InputCurrencyIdr from "../../../components/inputComponent/InputCurrencyIdr";
import PhoneInput from "react-phone-input-2";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRef } from "react";
import CustomBigCalendar from "../../../components/medium/CustomBigCalendar";

interface PraktekData {
    id: string;
    startTime: string;
    endTime: string;
    selectedDay: string[];
    notes: string;
    type: string;
}

interface ExclusionData {
    id: string;
    start: string;
    end?: string;
    title: string;
    type: string;
    notes: string;
    allDay?: boolean;
}

interface KalenderData {
    praktek: PraktekData[];
    exclusion: ExclusionData[];
}

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

        handleSubmitPage3,


    } = useTambahPegawai();
    const isSelectAllActionsDisabled = checkedItems.slice(1).every(item => !item);
    const kalenderRef = useRef<{ getData: () => KalenderData }>(null);

    const handleSimpan = () => {
        if (kalenderRef.current) {
            const data = kalenderRef.current.getData();
            console.log('Praktek:', data.praktek);
            console.log('Exclusion:', data.exclusion);
            console.log('Praktek:', JSON.stringify(data.praktek, null, 2));
            console.log('Exclusion:', JSON.stringify(data.exclusion, null, 2));
        } else {
            console.log('Ref belum terhubung ke TestKalender');
        }
    };

    return (
        <Container sx={{ py: 2, minWidth: '100%' }}>
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
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
                    {/* ---------- */}
                    <Typography fontSize="20px" fontWeight="700">Formulir Tambah Pegawai</Typography>
                    <Box
                        sx={{ display: "flex", flexDirection: "row", mt: 2, mb: 2, justifyContent: 'space-between', ml: 2 }}
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
                                    sx={{
                                        width: "100%",
                                        height: "48px",
                                        marginTop: "10px",
                                        borderRadius: "8px",
                                        backgroundColor: formik.touched.nik && formik.errors.nik ? "#ffcccc" : "inherit",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            border: "1px solid #ccc",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: '#8F85F3',
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: '#8F85F3',
                                        },
                                        "& .MuiOutlinedInput-input": {
                                            padding: "10px",
                                            fontSize: "16px",
                                        },
                                    }}
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
                                    id="namaPegawai"
                                    name="namaPegawai"
                                    size="small"
                                    sx={{
                                        width: "100%",
                                        height: "48px",
                                        marginTop: "10px",
                                        borderRadius: "8px",
                                        backgroundColor: formik.touched.namaPegawai && formik.errors.namaPegawai ? "#ffcccc" : "inherit",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            border: "1px solid #ccc",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: '#8F85F3',
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: '#8F85F3',
                                        },
                                        "& .MuiOutlinedInput-input": {
                                            padding: "10px",
                                            fontSize: "16px",
                                        },
                                    }}
                                    placeholder="Masukkan Nama Pegawai"
                                    value={formik.values.namaPegawai}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.setTouched({ ...formik.touched, namaPegawai: true })}
                                    error={formik.touched.namaPegawai && Boolean(formik.errors.namaPegawai)}
                                />
                                {/* {formik.touched.namaPegawai && formik.errors.namaPegawai && (
                                    <Typography color="error">{formik.errors.namaPegawai}</Typography>
                                )} */}
                            </FormControl>

                            {/* Tanggal Lahir */}
                            <Typography sx={{ fontSize: "16px" }}>Tanggal Lahir<span style={{ color: "red" }}>*</span></Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    value={formik.values.tanggalLahir ? dayjs(formik.values.tanggalLahir) : null}
                                    onChange={(newValue: Dayjs | null) => {
                                        if (newValue) {
                                            const formattedDate = newValue.format("YYYY-MM-DD");
                                            formik.setFieldValue("tanggalLahir", formattedDate);
                                        }
                                    }}
                                    slotProps={{
                                        textField: {
                                            placeholder: "Masukkan Tanggal Lahir",
                                            error: formik.touched.tanggalLahir && Boolean(formik.errors.tanggalLahir),
                                            helperText: formik.touched.tanggalLahir && formik.errors.tanggalLahir,
                                            sx: {
                                                width: "100%",
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '8px',
                                                    height: '50px',
                                                    backgroundColor: formik.touched.tanggalLahir && formik.errors.tanggalLahir ? "#ffcccc" : "inherit",
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        border: "1px solid #ccc",
                                                    },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#8F85F3',
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#8F85F3',
                                                    },
                                                },
                                                '& .MuiInputBase-input': {
                                                    padding: "10px",
                                                    fontSize: "16px",
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
                                    sx={{
                                        width: "100%",
                                        height: "48px",
                                        marginTop: "10px",
                                        borderRadius: "8px",
                                        backgroundColor: formik.touched.alamatTinggal && formik.errors.alamatTinggal ? "#ffcccc" : "inherit",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            border: "1px solid #ccc",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: '#8F85F3',
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: '#8F85F3',
                                        },
                                        "& .MuiOutlinedInput-input": {
                                            padding: "10px",
                                            fontSize: "16px",
                                        },
                                    }}
                                    placeholder="Masukkan alamat tempat tinggal pegawai"
                                    value={formik.values.alamatTinggal}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.setTouched({ ...formik.touched, alamatTinggal: true })}
                                    error={formik.touched.alamatTinggal && Boolean(formik.errors.alamatTinggal)}
                                />
                                {/* {formik.touched.alamatTinggal && formik.errors.alamatTinggal && (
                                    <Typography color="error">{formik.errors.alamatTinggal}</Typography>
                                )} */}
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
                                    row
                                    value={gender}
                                    onChange={(event) => {
                                        setGender(event.target.value);
                                        formik.setFieldValue("jenisKelamin", event.target.value);
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
                            <Typography mt={2} >Status perkawinan<span style={{ color: 'red' }} >*</span></Typography>
                            <FormControl sx={{ width: '100%' }} >
                                <OutlinedInput
                                    id="status"
                                    name="status"
                                    size="small"
                                    placeholder="Masukkan status pegawai"
                                    sx={{
                                        width: "100%",
                                        height: "48px",
                                        marginTop: "10px",
                                        borderRadius: "8px",
                                        backgroundColor: formik.touched.status && formik.errors.status ? "#ffcccc" : "inherit",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            border: "1px solid #ccc",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: '#8F85F3',
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: '#8F85F3',
                                        },
                                        "& .MuiOutlinedInput-input": {
                                            padding: "10px",
                                            fontSize: "16px",
                                        },
                                    }}
                                    value={formik.values.status}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.setTouched({ ...formik.touched, status: true })}
                                    error={formik.touched.status && Boolean(formik.errors.status)}
                                />
                                {/* {formik.touched.status && formik.errors.status && (
                                    <Typography color="error">{formik.errors.status}</Typography>
                                )} */}
                            </FormControl>

                            {/* Email */}
                            <Typography mt={2} >Email<span style={{ color: 'red' }} >*</span></Typography>
                            <FormControl sx={{ width: '100%' }} >
                                <OutlinedInput
                                    id="email"
                                    name="email"
                                    size="small"
                                    placeholder="Masukkan email pegawai"
                                    sx={{
                                        width: "100%",
                                        height: "48px",
                                        marginTop: "10px",
                                        borderRadius: "8px",
                                        backgroundColor: formik.touched.email && formik.errors.email ? "#ffcccc" : "inherit",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            border: "1px solid #ccc",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: '#8F85F3',
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: '#8F85F3',
                                        },
                                        "& .MuiOutlinedInput-input": {
                                            padding: "10px",
                                            fontSize: "16px",
                                        },
                                    }}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.setTouched({ ...formik.touched, email: true })}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                />
                                {/* {formik.touched.email && formik.errors.email && (
                                    <Typography color="error">{formik.errors.email}</Typography>
                                )} */}
                            </FormControl>

                            {/* No. Handphone */}
                            <Typography mt={2} >No. Handphone<span style={{ color: 'red' }} >*</span></Typography>
                            <PhoneInput
                                countryCodeEditable={false}
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
                            {/* {formik.touched.nomorHandphone && formik.errors.nomorHandphone && (
                                <Typography color="error">{formik.errors.nomorHandphone}</Typography>
                            )} */}

                            {/* Role Pegawai */}
                            <Typography mt={2} >Role Pegawai<span style={{ color: 'red' }} >*</span></Typography>
                            <DropdownList
                                onChange={value => formik.setFieldValue('rolePegawai', value)}
                                placeholder='Pilih role pegawai'
                                options={rolePegawai}
                                loading={false}
                            />
                            {/* {formik.touched.rolePegawai && formik.errors.rolePegawai && (
                                <Typography color="error">{formik.errors.rolePegawai}</Typography>
                            )} */}

                            {/* Jenis Spesialisasi */}
                            <Typography mt={2} >Jenis Spesialisasi<span style={{ color: 'red' }} >*</span></Typography>
                            <DropdownList
                                onChange={value => formik.setFieldValue('jenisSpesialis', value)}
                                placeholder='Pilih jenis spesialisasi'
                                options={rolePegawai}
                                loading={false}
                            />
                            {/* {formik.touched.jenisSpesialis && formik.errors.jenisSpesialis && (
                                <Typography color="error">{formik.errors.jenisSpesialis}</Typography>
                            )} */}

                            {/* Klinik */}
                            <Typography mt={2} >Klinik<span style={{ color: 'red' }} >*</span></Typography>
                            <DropdownList
                                onChange={value => formik.setFieldValue('namaKlinik', value)}
                                placeholder='Pilih klinik'
                                options={rolePegawai}
                                loading={false}
                            />
                            {/* {formik.touched.namaKlinik && formik.errors.namaKlinik && (
                                <Typography color="error">{formik.errors.namaKlinik}</Typography>
                            )} */}

                            {/* Tipe Antrian */}
                            <Typography mt={2} >Tipe Antrian<span style={{ color: 'red' }} >*</span></Typography>
                            <DropdownList
                                onChange={value => formik.setFieldValue('tipeAntrian', value)}
                                placeholder='Pilih tipe antrian'
                                options={rolePegawai}
                                loading={false}
                            />
                            {/* {formik.touched.tipeAntrian && formik.errors.tipeAntrian && (
                                <Typography color="error">{formik.errors.tipeAntrian}</Typography>
                            )} */}

                            {/* Biaya Penanganan */}
                            <Typography sx={{ fontSize: '16px', mt: 2 }}>
                                Biaya Tarif<span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <InputCurrencyIdr
                                onChange={value => formik.setFieldValue('biayaPenanganan', value)}
                                defaultValue={0}
                            />
                            {/* {formik.touched.biayaPenanganan && formik.errors.biayaPenanganan && (
                                <Typography color="error">{formik.errors.biayaPenanganan}</Typography>
                            )} */}

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
                                disabled={!formik.isValid || !formik.dirty} 
                            >
                                Selanjutnya
                            </Button>
                        </Box>
                    )}

                    {currentPage === 2 && (
                        <>
                            <CustomBigCalendar ref={kalenderRef} />

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSimpan}
                                sx={{ marginTop: '20px', width: '100%', bgcolor: '#8F85F3' }}
                            >
                                Simpan
                            </Button>
                        </>
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
