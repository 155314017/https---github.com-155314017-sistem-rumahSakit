/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Box, Typography, CardMedia, MenuItem, Select, FormControl, InputLabel, Alert, TextField, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useState } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import RadioButtonsGroup from "../../../components/medium/RadoButtonsGroup";
import 'react-phone-input-2/lib/style.css';
import imagePendaftaran from "../../../assets/img/pendaftaran.jpeg";
import logo from "../../../img/St.carolus.png";

import { operationalDateOptions, doctors } from "../../../dummyData/dummyData";
import FileUploader from "../../../components/medium/FileUploader";
import InformasiTicket from "../../../components/small/InformasiTicket";
import PhoneInputComponent from "../../../components/inputComponent/PhoneInputComponent";
import DropDownListPenanggungJawab from "../../../components/inputComponent/DropDownListPenanggungJawab";

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

const PasienBaruRawatJalanUmum: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = 2;
    const [showAlert, setShowAlert] = useState<boolean>(false);
    // const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    // const [fileBase64, setFileBase64] = useState<string | null>(null);
    const [showFormPage, setSHowFormPage] = useState(true);
    const [selectedMethod, setSelectedMethod] = useState<string>('');



    // const handleSubmit = (values: FormValues) => {
    //     console.log("Data yang diisi:", values);
    //     console.log("File yang diunggah:", uploadedFile);
    //     console.log("Base64:", fileBase64);
    // };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMethod(event.target.value);
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

    // const handlePrev = () => {
    //     if (currentPage > 1) {
    //         setCurrentPage(currentPage - 1);
    //     }
    // };

    const getPageStyle = (page: number) => {
        if (page === currentPage) {
            return { color: '#8F85F3', cursor: 'pointer', fontWeight: 'bold' };
        } else if (page < currentPage) {
            return { color: '#8F85F3', cursor: 'pointer' };
        } else {
            return { color: 'black', cursor: 'pointer' };
        }
    };

    const getBorderStyle = (page: number) => {
        if (page === currentPage) {
            return {
                display: 'flex',
                border: '1px solid #8F85F3',
                minWidth: '38px',
                minHeight: '38px',
                borderRadius: '8px',
                justifyContent: 'center',
                alignItems: 'center'
            };
        } else if (page < currentPage) {
            return {
                display: 'flex',
                border: '1px solid #8F85F3',
                minWidth: '38px',
                minHeight: '38px',
                borderRadius: '8px',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#8F85F3',
                color: 'white'
            };
        } else {
            return {
                display: 'flex',
                border: '1px solid #8F85F3',
                minWidth: '38px',
                minHeight: '38px',
                borderRadius: '8px',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#8F85F3'
            };
        }
    }

    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
            }}
        >
            <Box>
                <CardMedia
                    component="img"
                    sx={{
                        width: "50%",
                        height: "100vh",
                        objectFit: "cover",
                        position: "fixed",
                        top: "0",
                        left: "0",
                    }}
                    image={imagePendaftaran}
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
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    p: 5,
                                    position: "absolute",
                                    right: "0",
                                    top: "0",
                                    width: "50%",
                                }}
                            >
                                <Box sx={{ ml: 10 }}>
                                    <Box>
                                        <CardMedia
                                            component="img"
                                            sx={{
                                                width: "112px",
                                                objectFit: "cover",
                                            }}
                                            image={logo}
                                            alt="Example Logo"
                                        />
                                    </Box>

                                    <Typography sx={{ fontSize: '32px', fontWeight: '600', lineHeight: '34px', marginTop: 2 }}>
                                        Formulir pendaftaran pasien Umum
                                    </Typography>

                                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, mb: 2 }}>
                                        <Box display={'flex'} flexDirection={'row'} width={'290px'}>
                                            <Box
                                                display={'flex'}
                                                flexDirection={'row'}
                                                alignItems="center"
                                                onClick={() => setCurrentPage(1)}
                                                sx={getPageStyle(1)}
                                            >
                                                <Box sx={getBorderStyle(1)}>
                                                    1
                                                </Box>
                                                <Typography sx={{ ml: 1 }}>Penanggung jawab pasien</Typography>
                                            </Box>
                                        </Box>


                                        <Box display={'flex'} flexDirection={'row'} width={'290px'}>
                                            <Box
                                                display={'flex'}
                                                flexDirection={'row'}
                                                alignItems="center"
                                                onClick={() => setCurrentPage(2)}
                                                sx={getPageStyle(2)}
                                            >
                                                <Box sx={getBorderStyle(2)}>
                                                    2
                                                </Box>
                                                <Typography sx={{ ml: 1 }}>Jenis kunjungan , Keluhan dan metode pembayaran</Typography>
                                            </Box>
                                        </Box>
                                    </Box>

                                    {showAlert && (
                                        <Alert severity="warning" sx={{ mb: 2 }}>
                                            Semua field wajib diisi sebelum lanjut ke halaman berikutnya!
                                        </Alert>
                                    )}

                                    <Box>
                                        {currentPage === 1 && (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "8px",
                                                }}
                                            >
                                                <Box>
                                                    <Box
                                                        bgcolor={"#EEEEF2"}
                                                        height={"272px"}
                                                        width={"100%"}
                                                        borderRadius={"16px"}
                                                        paddingLeft={"5px"}
                                                        display="flex"
                                                        flexDirection="column"
                                                        justifyContent="center"
                                                        marginBottom={"30px"}
                                                    >
                                                        <Box
                                                            display="flex"
                                                            flexDirection="column"
                                                            alignItems="flex-start"
                                                            gap={"15px"}
                                                        >
                                                            <Typography marginLeft={"15px"} fontSize={"20px"} fontWeight={600}>Data diri pasien</Typography>
                                                            <Box display={"flex"} flexDirection={"column"} gap={'5px'} padding={'5px'}>
                                                                <Typography marginLeft={"15px"} fontSize={"16px"} mb={"-10px"}>Unggah KTP pasien</Typography>
                                                                <FileUploader />
                                                                <Typography marginLeft={"15px"} mt={"-10px"} fontSize={"14px"} color="#A8A8BD" >Ukuran file maksimal 1mb</Typography>
                                                            </Box>

                                                            <Box>
                                                                <Typography marginLeft={"25px"}>No. Handphone pasien</Typography>
                                                                <PhoneInputComponent widthInput="500px" heightInput="44px" />
                                                            </Box>
                                                        </Box>
                                                    </Box>

                                                    <Box>
                                                        <Box
                                                            bgcolor={"#EEEEF2"}
                                                            height={"544px"}
                                                            width={"100%"}
                                                            borderRadius={"16px"}
                                                            paddingLeft={"5px"}
                                                            display="flex"
                                                            flexDirection="column"
                                                            marginBottom={"30px"}
                                                        >
                                                            <Box
                                                                display="flex"
                                                                flexDirection="column"
                                                                gap={"15px"}
                                                                padding={'20px'}
                                                            >
                                                                <Typography fontSize={'20px'} fontWeight={600} >Data diri penanggung jawab pasien</Typography>
                                                                <RadioButtonsGroup
                                                                    selectedValue={values.transportMethod}
                                                                    onChange={(value) => setFieldValue('transportMethod', value)}
                                                                    widthInput="570px"
                                                                    heightInput="56px"
                                                                />

                                                                <Box mt={"10%"} >
                                                                    <Typography ml={"20px"} >No. Handphone pasien</Typography>
                                                                    <PhoneInputComponent widthInput="500px" heightInput="44px" />
                                                                    <Typography mt={"2%"} ml={"20px"} >Nama lengkap penanggung jawab</Typography>
                                                                    <TextField sx={{ width: '500px', maxHeight: '44px', backgroundColor: '#FAFAFA', borderRadius: '8px', marginLeft: '20px' }} InputProps={{
                                                                        sx: {
                                                                            height: '44px',
                                                                            borderRadius: '8px',
                                                                            padding: 0,
                                                                        },
                                                                    }} />
                                                                    <Typography ml={"20px"} >No. Handphone penanggung jawab</Typography>
                                                                    <PhoneInputComponent widthInput="500px" heightInput="44px" />
                                                                    <Box ml={2} mt={1} >
                                                                        <Typography>Hubungan penanggung jawab dengan pasien</Typography>
                                                                        <DropDownListPenanggungJawab />
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>

                                                </Box>
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

                                                <Box>
                                                    <FormControl sx={{ mt: 2, mb: 2 }}>
                                                        <InputLabel id="doctor-label">Pilih Dokter</InputLabel>
                                                        <Select
                                                            labelId="doctor-label"
                                                            value={values.docter}
                                                            label="Pilih Dokter"
                                                            onChange={(e) => setFieldValue('docter', e.target.value)}
                                                            sx={{ width: '258px', height: "38px", borderRadius: '8px' }}
                                                        >
                                                            {doctors.map((doctor) => (
                                                                <MenuItem key={doctor.value} value={doctor.value}>
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
                                                    <RadioGroup
                                                        aria-label="transport-method"
                                                        name="transport-method"
                                                        value={selectedMethod}
                                                        onChange={handleRadioChange}
                                                        sx={{ display: 'flex', flexDirection: 'column', border: '1px solid black', marginTop: '20px', marginBottom: '10px', borderRadius: '16px', padding: '16px 24px 16px 24px' }}
                                                    >
                                                        <Box display={'flex'} flexDirection={'row'} >
                                                            <FormControlLabel value="asuransi" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Asuransi" />
                                                            <FormControlLabel value="uang tunai dan debit" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Uang tunai dan debit" />
                                                        </Box>
                                                        {selectedMethod == 'asuransi' && (
                                                            <Box>
                                                                <Typography mb={'10px'} >Unggah kartu asuransi</Typography>
                                                                <FileUploader />
                                                                <Typography fontSize={'14px'} color="#A8A8BD" >Ukuran file maksimal 1mb</Typography>
                                                            </Box>
                                                        )}
                                                    </RadioGroup>
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
                                                    marginLeft:'27px',
                                                    padding: '10px 24px',
                                                    width: '500px',
                                                    borderRadius: '8px',
                                                    '&:hover': {
                                                        backgroundColor: '#7C75E2',
                                                    }
                                                }}
                                            >
                                                Selanjutnya
                                            </Button>
                                        ) : (
                                            <Button
                                                type="submit"
                                                onClick={() => setSHowFormPage(false)}
                                                sx={{
                                                    backgroundColor: '#8F85F3',
                                                    color: 'white',
                                                    width:'500px',
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
                <Box marginLeft={"60%"} marginTop={"10%"} >
                    <InformasiTicket />
                </Box>
            )}
        </Box>
    );
};

export default PasienBaruRawatJalanUmum;
