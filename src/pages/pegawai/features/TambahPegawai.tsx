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
    Checkbox
} from "@mui/material";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import bgImage from "../../../assets/img/String.png";
import DropdownList from "../../../components/small/DropdownList";
import DatePickerCustom from '../../../components/inputComponent/DatePickerCustom';
import PhoneInputComponent from '../../../components/inputComponent/PhoneInputComponent';

//hooks
import useTambahPegawai from "../hooks/useTambahPegawai";


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
        handleIndividualCheckboxChange
    } = useTambahPegawai();
    return (
        <Container sx={{ py: 2 }}>
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box mt={3}>
                <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}>
                    {/* membuat bentuk lengkung atas */}
                    <Box
                        position={"absolute"}
                        sx={{
                            top: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                            display: "flex",
                        }}
                    >
                        {/* lengkung kiri */}
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

                        {/* kotak tengah */}
                        <Box
                            sx={{
                                width: "600px",
                                height: "50px",
                                bgcolor: "#F1F0FE",
                                borderRadius: "0px 0px 22px 22px",
                            }}
                        />

                        {/* lengkung kanan */}
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
                        sx={{ display: "flex", flexDirection: "row", mt: 2, mb: 2, gap: 42 }}
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
                            <Typography sx={{ fontSize: "16px" }}>NIP (Nomor Induk Pegawai) </Typography>
                            <FormControl fullWidth sx={{ my: 1 }}>
                                <OutlinedInput
                                    id="nip"
                                    name="nip"
                                    size="small"
                                    placeholder="123456789"
                                    disabled
                                    sx={{ bgcolor: '#EEEEF2' }}
                                // value={formik.values.namaKlinik}
                                // onChange={formik.handleChange}
                                // onBlur={() => formik.setTouched({ ...formik.touched, namaKlinik: true })}
                                // error={formik.touched.namaKlinik && Boolean(formik.errors.namaKlinik)}
                                />
                                {/* {formik.touched.namaKlinik && formik.errors.namaKlinik && (
                                    <Typography color="error">{formik.errors.namaKlinik}</Typography>
                                )} */}
                            </FormControl>

                            <Typography sx={{ fontSize: "16px" }}>Nama Pegawai<span style={{ color: "red" }}>*</span></Typography>
                            <FormControl fullWidth sx={{ my: 1 }}>
                                <OutlinedInput
                                    id="namaKlinik"
                                    name="namaKlinik"
                                    size="small"
                                    placeholder="Masukkan Nama Pegawai"
                                    value={formik.values.namaKlinik}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.setTouched({ ...formik.touched, namaKlinik: true })}
                                    error={formik.touched.namaKlinik && Boolean(formik.errors.namaKlinik)}
                                />
                                {formik.touched.namaKlinik && formik.errors.namaKlinik && (
                                    <Typography color="error">{formik.errors.namaKlinik}</Typography>
                                )}
                            </FormControl>

                            <Typography sx={{ fontSize: "16px" }}>Tanggal Lahir<span style={{ color: "red" }}>*</span></Typography>
                            <DatePickerCustom />

                            <Typography sx={{ fontSize: "16px" }}>Alamat Tempat TInggal<span style={{ color: "red" }}>*</span></Typography>
                            <FormControl fullWidth sx={{ my: 1 }}>
                                <OutlinedInput
                                    id="deskripsiKlinik"
                                    name="deskripsiKlinik"
                                    size="small"
                                    placeholder="Masukkan alamat tempat tinggal pegawai"
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
                                // value={selectedValue}
                                // onChange={handleChange}
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

                            <Typography mt={2} >Status<span style={{ color: 'red' }} >*</span></Typography>
                            <FormControl sx={{ width: '100%' }} >
                                <OutlinedInput
                                    id="deskripsiKlinik"
                                    name="deskripsiKlinik"
                                    size="small"
                                    placeholder="Masukkan status pegawai"
                                    sx={{ borderRadius: '8px' }}
                                />
                            </FormControl>


                            <Typography mt={2} >Email<span style={{ color: 'red' }} >*</span></Typography>
                            <FormControl sx={{ width: '100%' }} >
                                <OutlinedInput
                                    id="deskripsiKlinik"
                                    name="deskripsiKlinik"
                                    size="small"
                                    placeholder="Masukkan email pegawai"
                                    sx={{ borderRadius: '8px' }}
                                />
                            </FormControl>

                            <Typography mt={2} >No. Handphone<span style={{ color: 'red' }} >*</span></Typography>
                            <PhoneInputComponent heightInput='44px' widthInput='100%' />
                            <Typography mt={2} >Role Pegawai<span style={{ color: 'red' }} >*</span></Typography>
                            <DropdownList placeholder='Pilih role pegawai' options={rolePegawai} loading={false} />

                            <Button
                                type="submit"
                                // onClick={showTemporaryAlertSuccess}
                                onClick={() => setCurrentPage(2)}
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
                        <Box mt={3} >
                            <Typography fontWeight={600} fontSize={"16px"} mb={4} >1. Hak Akses Pegawai</Typography>
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
                                                {/* Checkbox Pilih Semua */}
                                                <StyledTableRow>
                                                    <TableCell
                                                        sx={{ color: "#292B2C", fontSize: "14px" }}
                                                        align="left"
                                                    >
                                                        <FormControlLabel
                                                            sx={{ color: '#747487', fontWeight: 400, fontSize: '16px' }}
                                                            control={<Checkbox sx={{
                                                                color: '#A8A8BD',
                                                                borderRadius: '4px',
                                                                '&.Mui-checked': {
                                                                    color: '#7367F0',
                                                                },
                                                            }} checked={checkedItems.every(Boolean)} onChange={handleSelectAll} />}
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
                                                                control={<Checkbox
                                                                    sx={{
                                                                        color: '#A8A8BD',
                                                                        borderRadius: '4px',
                                                                        '&.Mui-checked': {
                                                                            color: '#7367F0',
                                                                        },
                                                                    }}
                                                                    checked={checkedItems[index + 1]}
                                                                    onChange={handleCheckboxChange(index + 1)}
                                                                />}
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
                                        type="submit"
                                        // onClick={showTemporaryAlertSuccess}
                                        // onClick={() => setCurrentPage(2)}
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
                                        // disabled={!formik.isValid || !formik.dirty}
                                    >
                                        Selanjutnya
                                    </Button>
                                </Box>
                            </Box>
                        </Box>

                    )}
                </Box>
            </Box>


        </Container>
    );
}
