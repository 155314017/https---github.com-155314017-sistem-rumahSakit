import { Button, Box, Typography, CardMedia, MenuItem, Select, FormControl, InputLabel, Alert, TextField } from "@mui/material";
import { useState } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import RadioButtonsGroup from "../../../components/medium/RadoButtonsGroup";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import img from "../../../img/registerPasienImage.png";
import logo from "../../../img/St.carolus.png";

import { operationalDateOptions, doctors } from "../../../dummyData/dummyData";
import RadioButton from "../../../components/small/RadioButton";
import FileUploader from "../../../components/medium/FileUploader";
import InformasiTicket from "../../../components/small/InformasiTicket";

const validationSchema = Yup.object({
    fullname: Yup.string().required('Nama wajib diisi'),
    phone: Yup.string().required('Nomor HP wajib diisi'),
    relation: Yup.string().required('Hubungan wajib diisi'),
    transportMethod: Yup.string().required('Cara datang/pengantar wajib diisi')
});

interface FormValues {
    fullname: string;
    phone: string;
    relation: string;
    transportMethod: string;
    poli: string;
    docter: string;
    operationalDate: string;
}

const PasienBaruRawatJalanBPJS: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = 2;
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [fileBase64, setFileBase64] = useState<string | null>(null);
    const [showFormPage, setSHowFormPage] = useState(true);


    const handleFileChange = (file: File | null, base64: string | null) => {
        setUploadedFile(file);
        setFileBase64(base64);
    };

    const handleSubmit = (values: FormValues) => {
        console.log("Data yang diisi:", values);
        console.log("File yang diunggah:", uploadedFile);
        console.log("Base64:", fileBase64);
    };


    const handleNext = (validateForm: any, setErrors: any, values: FormValues) => {
        validateForm().then((formErrors: any) => {
            if (Object.keys(formErrors).length === 0) {
                console.log("Data yang diisi:", values);
                if (currentPage < totalPages) {
                    setCurrentPage(currentPage + 1);
                    setShowAlert(false);
                }
            } else {
                setShowAlert(true);
                setErrors(formErrors);
                setTimeout(() => setShowAlert(false), 3000);
            }
        });
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const getPageStyle = (page: number) => {
        if (page === currentPage) {
            return { color: '#8F85F3', cursor: 'pointer', fontWeight: 'bold' };
        } else if (page < currentPage) {
            return { color: '#8F85F3', cursor: 'pointer' };
        } else {
            return { color: 'black', cursor: 'pointer' };
        }
    };

    return (
        <Box
            sx={{
                marginLeft: '5%',
                marginTop: '3%',
                display: 'flex',
                flexDirection: 'row'
            }}
        >
            <Box>
                <CardMedia
                    component="img"
                    height="864"
                    sx={{ width: "793px", objectFit: "cover" }}
                    image={img}
                    alt="Example Image"
                />
            </Box>

            {showFormPage && (

                <Formik<FormValues>
                    initialValues={{ fullname: '', phone: '', relation: '', transportMethod: '', poli: '', docter: '', operationalDate: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log("Form submitted with values:", values);
                    }}
                >
                    {({ values, errors, touched, setFieldValue, validateForm, setErrors }) => (
                        <Form>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>


                                <Box sx={{ marginLeft: '55px' }}>
                                    <CardMedia
                                        component="img"
                                        height="52"
                                        sx={{ width: "112px", objectFit: "cover" }}
                                        image={logo}
                                        alt="Example Logo"
                                    />

                                    <Typography sx={{ fontSize: '32px', fontWeight: '600', lineHeight: '34px', marginTop: 2 }}>
                                        Formulir pendaftaran pasien BPPJS
                                    </Typography>

                                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, mb: 2 }}>
                                        <Typography
                                            onClick={() => setCurrentPage(1)}
                                            sx={getPageStyle(1)}
                                            mx={2}
                                        >
                                            Penanggung jawab pasien
                                        </Typography>
                                        <Typography
                                            onClick={() => setCurrentPage(2)}
                                            sx={getPageStyle(2)}
                                            mx={2}
                                        >
                                            Jenis Kunjungan
                                        </Typography>
                                    </Box>

                                    {showAlert && (
                                        <Alert severity="warning" sx={{ mb: 2 }}>
                                            Semua field wajib diisi sebelum lanjut ke halaman berikutnya!
                                        </Alert>
                                    )}

                                    <Box>
                                        {currentPage === 1 && (
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <RadioButtonsGroup
                                                    selectedValue={values.transportMethod}
                                                    onChange={(value) => setFieldValue('transportMethod', value)}
                                                    widthInput="562px"
                                                    heightInput="82px"
                                                />

                                                <FormControl sx={{ marginTop: '50px', display: 'flex', flexDirection: 'column' }}>
                                                    <Typography>Nama lengkap penanggung jawab</Typography>
                                                    <TextField
                                                        placeholder="Masukkan nama lengkap penanggung jawab"
                                                        fullWidth
                                                        value={values.fullname}
                                                        onChange={(e) => setFieldValue('fullname', e.target.value)}
                                                        error={touched.fullname && Boolean(errors.fullname)}
                                                        helperText={touched.fullname && errors.fullname}
                                                        sx={{
                                                            mt: 2, mb: 2, border: '1px solid #8F85F3', borderRadius: '8px', width: '544px',
                                                            '& .MuiOutlinedInput-root': {
                                                                '& fieldset': {
                                                                    borderColor: '#8F85F3',
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: '#8F85F3',
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: '#8F85F',
                                                                },
                                                            },
                                                        }}
                                                    />
                                                </FormControl>

                                                <PhoneInput
                                                    country={'id'}
                                                    value={values.phone}
                                                    onChange={(phone) => setFieldValue('phone', phone)}
                                                    inputStyle={{
                                                        height: '48px',
                                                        borderRadius: '8px',
                                                        border: `1px solid ${touched.phone && errors.phone ? 'red' : '#ccc'}`,
                                                        padding: '10px 40px 10px 60px',
                                                        fontSize: '16px',
                                                        width: '544px',
                                                        marginTop: '10px',
                                                    }}
                                                    buttonStyle={{
                                                        borderRadius: '8px 0 0 8px',
                                                        border: '1px solid #ccc',
                                                    }}
                                                    containerStyle={{
                                                        marginBottom: '10px',
                                                        width: '100%',
                                                    }}
                                                />
                                                {touched.phone && errors.phone && (
                                                    <Typography sx={{ color: 'red', fontSize: '12px' }}>
                                                        {errors.phone}
                                                    </Typography>
                                                )}

                                                <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
                                                    <InputLabel id="relation-label">Hubungan</InputLabel>
                                                    <Select
                                                        labelId="relation-label"
                                                        value={values.relation}
                                                        label="Hubungan"
                                                        onChange={(e) => setFieldValue('relation', e.target.value)}
                                                        sx={{ width: '544px' }}
                                                    >
                                                        <MenuItem value="anak">Anak</MenuItem>
                                                        <MenuItem value="orang tua">Orang Tua</MenuItem>
                                                        <MenuItem value="kerabat">Kerabat</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                {touched.relation && errors.relation && (
                                                    <Typography sx={{ color: 'red', fontSize: '12px' }}>
                                                        {errors.relation}
                                                    </Typography>
                                                )}
                                            </Box>
                                        )}

                                        {currentPage === 2 && (
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                                                <FormControl>
                                                    <Typography>
                                                        Jenis Kunjungan
                                                    </Typography>
                                                    <TextField></TextField>
                                                </FormControl>
                                                <FormControl sx={{ mt: 2, mb: 2 }}>
                                                    <InputLabel id="poli-label">Pilih Poli</InputLabel>
                                                    <Select
                                                        labelId="poli-label"
                                                        value={values.poli}
                                                        label="Pilih Poli"
                                                        onChange={(e) => setFieldValue('poli', e.target.value)}
                                                        sx={{ width: '544px' }}
                                                    >
                                                        <MenuItem value="poli1">Poli Umum</MenuItem>
                                                        <MenuItem value="poli2">Poli Gigi</MenuItem>
                                                        <MenuItem value="poli3">Poli Anak</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                {touched.poli && errors.poli && (
                                                    <Typography sx={{ color: 'red', fontSize: '12px' }}>
                                                        {errors.poli}
                                                    </Typography>
                                                )}

                                                <Box display={"flex"} flexDirection={"row"} gap={"15px"} >
                                                    <FormControl sx={{ mt: 2, mb: 2 }}>
                                                        <InputLabel id="doctor-label" >Pilih Dokter</InputLabel>
                                                        <Select
                                                            labelId="doctor-label"
                                                            value={values.docter}
                                                            label="Pilih Dokter"
                                                            onChange={(e) => setFieldValue('docter', e.target.value)}
                                                            sx={{ width: '258px', height: "38px", borderRadius: '8px' }}
                                                        >
                                                            {doctors.map((doctor) => (
                                                                <MenuItem
                                                                    key={doctor.value}
                                                                    value={doctor.value}
                                                                    sx={{
                                                                        color: '#8F85F3',
                                                                        borderRadius: '8px',
                                                                        '&.Mui-selected:hover': {
                                                                            backgroundColor: '#D5D1FB', 
                                                                        },
                                                                        '&:hover':{
                                                                            backgroundColor:'#D5D1FB'
                                                                        }
                                                                    }}
                                                                >
                                                                    {doctor.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>

                                                    </FormControl>
                                                    {touched.docter && errors.docter && (
                                                        <Typography sx={{ color: 'red', fontSize: '12px' }}>
                                                            {errors.docter}
                                                        </Typography>
                                                    )}

                                                    <Typography mt={"20px"} >-</Typography>

                                                    <FormControl sx={{ mt: 2, mb: 2 }}>
                                                        <InputLabel id="operationalDate-label">Pilih Jadwal Operasional</InputLabel>
                                                        <Select
                                                            labelId="operationalDate-label"
                                                            value={values.operationalDate}
                                                            label="Pilih Jadwal Operasional"
                                                            onChange={(e) => setFieldValue('operationalDate', e.target.value)}
                                                            sx={{ width: '258px', height: "38px", borderRadius: '8px' }}
                                                        >
                                                            {operationalDateOptions.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                    {touched.operationalDate && errors.operationalDate && (
                                                        <Typography sx={{ color: 'red', fontSize: '12px' }}>
                                                            {errors.operationalDate}
                                                        </Typography>
                                                    )}
                                                </Box>

                                                <FormControl>
                                                    <Typography>keluhan pasien</Typography>
                                                    <TextField></TextField>
                                                </FormControl>

                                                <Box>
                                                    <RadioButton value="asuransi" label="Asuransi" />
                                                    <RadioButton value="uang tunai dan debit" label="Uang tunai dan debit" />
                                                </Box>

                                                <FileUploader />
                                            </Box>
                                        )}
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>

                                        {currentPage < totalPages ? (
                                            <Button
                                                onClick={() => handleNext(validateForm, setErrors, values)}
                                                sx={{
                                                    backgroundColor: '#8F85F3',
                                                    color: 'white',
                                                    textTransform: 'none',
                                                    padding: '10px 24px',
                                                    borderRadius: '8px',
                                                    '&:hover': {
                                                        backgroundColor: '#7C75E2',
                                                    }
                                                }}
                                            >
                                                Lanjut
                                            </Button>
                                        ) : (
                                            <Button
                                                type="submit"
                                                onClick={() => setSHowFormPage(false)}
                                                sx={{
                                                    backgroundColor: '#8F85F3',
                                                    color: 'white',
                                                    textTransform: 'none',
                                                    padding: '10px 24px',
                                                    borderRadius: '8px',
                                                    '&:hover': {
                                                        backgroundColor: '#7C75E2',
                                                    }
                                                }}
                                            >
                                                Daftar
                                            </Button>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        </Form>
                    )}
                </Formik>
            )}

            {!showFormPage && (
                <Box marginLeft={"2%"} marginTop={"10%"} >
                    <InformasiTicket />
                </Box>
            )}
        </Box>
    );
};

export default PasienBaruRawatJalanBPJS;
