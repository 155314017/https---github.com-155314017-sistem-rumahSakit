/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, Field } from "formik";
import { Box } from "@mui/system";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { useState } from "react";
import DropdownList from "../../../components/small/dropdownlist/DropdownList";
import TableRiwayatKunjungan from "../features/TableRiwayatKunjungan";
import CardRiwayatKunjungan from "./CardRiwayatKunjungan";
import CardDetailInformasiKunjungan from "./CardDetailInformasiKunjungan";
import EndAdornmentCustom from "../../../components/small/EndAdornmentCustom";
import CustomFrameTable from "../../../components/small/CustomFrameTable";
import TableBerkasPasien from "../features/TableBerkasPasien";

export default function CardRekamMedis() {
    const [currentPage, setCurrentPage] = useState(1);
    const [tipe, setTipe] = useState('kunjunganTerakhir');

    const handleChange = (value: string) => {
        if (value === 'Kunjungan Terakhir') {
            console.log(value);
            setTipe('kunjunganTerakhir');
        } else if (value === 'Riwayat Kunjungan') {
            console.log(value);
            setTipe('riwayatKunjungan');
        } else if (value === 'Berkas Lab') {
            console.log(value);
            setTipe('berkasLab');
        }
    };

    const tipeJadwal = [
        { value: 'kunjunganTerakhir', label: "Kunjungan Terakhir" },
        { value: 'riwayatKunjungan', label: "Riwayat Kunjungan" },
        { value: 'berkasLab', label: "Berkas Lab" },
    ];

    return (
        <Formik
            initialValues={{
                tinggiBadan: "",
                beratBadan: "",
                tekananDarah: "",
                suhuBadan: "",
                golonganDarah: "",
                detakJantung: "",
                frekuensiNafas: "",
                tingkatKesadaran: "",
                saturasi: "",
                alergi: "",
                catatanPerawat: "",
            }}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {({ handleSubmit, values }) => (
                <Form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            borderRadius: "24px",
                            bgcolor: "#FAFAFA",
                            overflow: "hidden",
                            width: '94%',
                            height: 'fit-content',
                            p: 4,
                            position: 'relative',
                            maxWidth: '100%'
                        }}
                    >
                        <CustomFrameTable tipe="infromasi" />
                        <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                            <Typography
                                sx={{
                                    textTransform: "capitalize",
                                    fontWeight: "700",
                                    fontSize: "20px",
                                }}
                            >
                                {/* Data Pemeriksaan */}
                                {currentPage === 1 ? "Data Pemeriksaan" : "Rekam Medis"}
                            </Typography>

                            {currentPage === 2 && (
                                <Box display={'flex'} flexDirection={'row'} gap={2} minWidth={'30%'} alignItems={'center'} >
                                    <Typography fontWeight={600} fontSize={'16px'} lineHeight={'18px'} >Tipe</Typography>
                                    <DropdownList
                                        defaultValue='Kunjungan Terakhir'
                                        onChange={handleChange}
                                        loading={false}
                                        options={tipeJadwal}
                                    // placeholder='Pilih tipe jadwal'
                                    />
                                </Box>
                            )}
                        </Box>
                        {currentPage === 1 && (
                            <>

                                <Box mt={2} display={'flex'} flexDirection={'row'} gap={2} justifyContent={'space-between'} >
                                    <Button sx={{ width: '100%', height: '38px', bgcolor: '#8F85F3', color: 'white', border: '1px solid #8F85F3' }} >Data Pemeriksaan</Button>
                                    <Button sx={{ width: '100%', height: '38px', bgcolor: 'inherit', color: '#8F85F3', border: '1px solid #8F85F3' }} onClick={() => setCurrentPage(2)} >Rekam Medis</Button>
                                </Box>

                                <Box
                                    p={2}
                                    bgcolor={"#FFFFFF"}
                                    mt={2}
                                    border={"1px solid #C5C5D3"}
                                    borderRadius={"24px"}
                                    minHeight={"fit-content"}
                                >
                                    <FormControl sx={{ width: '100%' }} >
                                        <Typography>Tinggi Badan</Typography>
                                        <Field
                                            as={TextField}
                                            name="tinggiBadan"
                                            placeholder="Masukkan Tinggi Badan"
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: <EndAdornmentCustom text="Cm" />
                                            }}
                                            sx={styleInputField}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ width: '100%' }} >
                                        <Typography>Berat Badan</Typography>
                                        <Field
                                            as={TextField}
                                            name="beratBadan"
                                            placeholder="Masukkan Berat Badan"
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: <EndAdornmentCustom text="Kg" />
                                            }}
                                            sx={styleInputField}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ width: '100%' }} >
                                        <Typography>Tekanan Darah</Typography>
                                        <Field
                                            as={TextField}
                                            name="tekananDarah"
                                            placeholder="Masukkan Tekanan Darah"
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: <EndAdornmentCustom text="mmHg" />
                                            }}
                                            sx={styleInputField}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ width: '100%' }} >
                                        <Typography>Suhu Badan</Typography>
                                        <Field
                                            as={TextField}
                                            name="suhuBadan"
                                            placeholder="Masukkan Suhu Badan"
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: <EndAdornmentCustom text="°C" />
                                            }}
                                            sx={styleInputField}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ width: '100%' }} >
                                        <Typography>Golongan Darah</Typography>
                                        <Field
                                            as={TextField}
                                            name="golonganDarah"
                                            placeholder="Masukkan Golongan Darah"
                                            variant="outlined"
                                            sx={styleInputField}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ width: '100%' }} >
                                        <Typography>Detak Jantung</Typography>
                                        <Field
                                            as={TextField}
                                            name="detakJantung"
                                            placeholder="Masukkan Detakan Jantung"
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: <EndAdornmentCustom text="Bpm" />
                                            }}
                                            sx={styleInputField}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ width: '100%' }} >
                                        <Typography>Frekuensi Nafas</Typography>
                                        <Field
                                            as={TextField}
                                            name="frekuensiNafas"
                                            placeholder="Masukkan Frekuensi Nafas"
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: <EndAdornmentCustom text="/menit" />
                                            }}
                                            sx={styleInputField}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ width: '100%' }} >
                                        <Typography>Tingkat Kesadaran</Typography>
                                        <Field
                                            as={TextField}
                                            name="tingkatKesadaran"
                                            placeholder="Masukkan Tingkat Kesadaran"
                                            variant="outlined"
                                            sx={styleInputField}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ width: '100%' }} >
                                        <Typography>Saturasi</Typography>
                                        <Field
                                            as={TextField}
                                            name="saturasi"
                                            placeholder="Masukkan Saturasi"
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: <EndAdornmentCustom text="%" />
                                            }}
                                            sx={styleInputField}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ width: '100%' }} >
                                        <Typography>Alergi</Typography>
                                        <Field
                                            as={TextField}
                                            name="alergi"
                                            placeholder="Masukkan Alergi"
                                            variant="outlined"
                                            sx={styleInputField}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ width: '100%' }} >
                                        <Typography>Catatan Perawat</Typography>
                                        <Field
                                            as={TextField}
                                            name="catatanPerawat"
                                            placeholder="Masukkan Catatan Perawat"
                                            variant="outlined"
                                            multiline
                                            // maxRows={1}
                                            inputProps={{
                                                maxLength: 500
                                            }}
                                            sx={{
                                                width: "100%",
                                                height: "111px",
                                                marginTop: "10px",
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "8px",
                                                    backgroundColor: "inherit",
                                                    "&:focus-within .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#8F85F3",
                                                    },
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    border: "1px solid #ccc",
                                                },
                                                "& .MuiOutlinedInput-input": {
                                                    padding: "10px",
                                                    fontSize: "16px",
                                                },
                                            }}
                                        />
                                    </FormControl>
                                    <Typography sx={{ color: '#A8A8BD', mt: values.catatanPerawat.length >= 350 ? 8 : 2, display: 'flex', flexDirection: 'row-reverse' }} >{values.catatanPerawat.length} / 500 Karakter</Typography>
                                </Box>
                            </>
                        )}


                        {currentPage === 2 && (
                            <>
                                <Box>


                                    {tipe === 'kunjunganTerakhir' && (
                                        <>
                                            <CardDetailInformasiKunjungan />
                                            <CardRiwayatKunjungan />

                                        </>
                                    )}

                                    {tipe === 'riwayatKunjungan' && (
                                        <Box width={'fit-content'} mt={2} >
                                            <TableRiwayatKunjungan />
                                        </Box>
                                    )}

                                    {tipe === 'berkasLab' && (
                                        <Box width={'fit-content'} minWidth={'97%'} mt={2} >
                                            <TableBerkasPasien />
                                        </Box>
                                    )}
                                </Box>
                            </>
                        )}
                    </Box>
                </Form >
            )
            }
        </Formik >
    );
}

const styleInputField = {
    width: "100%",
    height: "48px",
    marginTop: "10px",
    "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        backgroundColor: "inherit",
        "&:focus-within .MuiOutlinedInput-notchedOutline": {
            borderColor: "#8F85F3",
        },
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #ccc",
    },
    "& .MuiOutlinedInput-input": {
        padding: "10px",
        fontSize: "16px",
    },
}
