import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, CardMedia, FormControl, TextField, Radio, FormControlLabel, RadioGroup, CircularProgress } from "@mui/material";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import "react-phone-input-2/lib/style.css";
import logo from "../../../../img/St.carolus.png";
import imagePendaftaran from "../../../../assets/img/pendaftaran.jpeg";
import FileUploader from "../../../../components/medium/FileUploader";
import InformasiTicket from "../../../../components/small/InformasiTicket";
import DropdownListAPI from '../../../../components/small/DropdownListAPI';
import CustomCalender from '../../../../components/medium/CustomCalender';

// Hooks
import useRawatJalanUmum from '../hooks/useRawatJalanUmum';
import CreateAppointment from '../../../../services/Patient Tenant/CreateAppointment';
import Cookies from "js-cookie";
import InformasiTicketAPI from '../../../../components/small/InformasiTicketAPI';
import dayjs from 'dayjs';

const validationSchema = Yup.object({
    typeOfVisit: Yup.string().required("Jenis Kunjungan wajib diisi"),
    symptoms: Yup.string().required("Keluhan wajib diisi"),
    transportMethod: Yup.string().required("Cara datang/pengantar wajib diisi"),
});

interface FormValues {
    typeOfVisit: string;
    symptoms: string;
}


export default function RawatJalanUmum() {
    const {
        showFormPage,
        setShowFormPage,
        validationSchema,
        handleRadioChange,
        selectedMethod,
        clinicOptions,
        doctorOptions,
        setIdDoctor,
        idDoctor,
        handleScheduleChange,
        selectedScheduleId,
        idClinic,
        handleDropdownPoli,
        clinicName,
        docterName,
        handleDropdownDocter,
        selectedSchedule,
        setDataTickets,
        dataTickets,
        patientId,
        setButtonDis,
        buttonDis,
    } = useRawatJalanUmum();

    return (
        <>
            <style>
                {`
          :root {
            background-color: #ffff;
          }
        `}
            </style>

            <Box
                sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    bgcolor: 'red'
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
                        initialValues={{
                            typeOfVisit: "",
                            symptoms: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {
                            // const token = Cookies.get("accessToken");
                            setButtonDis(true);
                            const data = {
                                patientId: patientId,
                                typeOfVisit: values.typeOfVisit,
                                clinicId: idClinic,
                                doctorId: idDoctor,
                                scheduleId: selectedScheduleId,
                                symptoms: values.symptoms,
                                referenceDoc: 'tes'
                            }
                            try {
                                const response = await axios.post('https://hms.3dolphinsocial.com:8083/v1/patient/create-appointment', data, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        // 'accessToken': `${token}`
                                    },
                                });
                                console.log("sukses: ", response.data.data.queueDatum)
                                const createdDateTimeFormatted = dayjs.unix(response.data.data.queueDatum.createdDateTime).format('DD/MMM/YYYY, HH:mm');
                                const dataSent = {
                                    nomorAntrian: response.data.data.queueDatum.queueNumber,
                                    namaDokter: docterName,
                                    clinic: clinicName,
                                    tanggalReservasi: createdDateTimeFormatted,
                                    jadwalKonsul: selectedSchedule,
                                }

                                setDataTickets(dataSent)
                                setShowFormPage(false)
                                setButtonDis(false)
                            } catch (err) {
                                console.log(err)
                            }
                            console.log("Form submitted with values: ", data);
                        }
                        }
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            isValid,
                            dirty,
                            handleSubmit,
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        p: 5,
                                        position: "absolute",
                                        right: "0",
                                        top: "0",
                                        width: "45.85%",
                                        bgcolor: 'transparent'
                                    }}
                                >
                                    <Box sx={{ ml: 10, width: '90%' }}>
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

                                        <Typography
                                            sx={{
                                                fontSize: "32px",
                                                fontWeight: "600",
                                                lineHeight: "34px",
                                                marginTop: 2,
                                                mb: 5,
                                                maxWidth: "450px",
                                            }}
                                        >
                                            Formulir pendaftaran pasien Umum
                                        </Typography>

                                        <Box>
                                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                <FormControl>
                                                    <Typography>Jenis Kunjungan</Typography>
                                                    <TextField
                                                        id="typeOfVisit"
                                                        name="typeOfVisit"
                                                        variant="outlined"
                                                        value={values.typeOfVisit}
                                                        onChange={handleChange}
                                                        sx={{
                                                            width: "100%",
                                                            borderRadius: "8px",
                                                            mb: 2,
                                                            padding: "0",
                                                            "& .MuiOutlinedInput-root": {
                                                                height: "44px",
                                                                padding: "0 12px",
                                                                border: "1px solid #8F85F3",
                                                                "& input": {
                                                                    height: "44px",
                                                                    padding: "0",
                                                                },
                                                                "& fieldset": {
                                                                    borderColor: "#8F85F3",
                                                                },
                                                                "&:hover fieldset": {
                                                                    borderColor: "#7A73E3",
                                                                },
                                                                "&.Mui-focused fieldset": {
                                                                    borderColor: "#6B63D1",
                                                                },
                                                            },
                                                        }}
                                                    />
                                                    {touched.typeOfVisit && errors.typeOfVisit && (
                                                        <Typography
                                                            sx={{ color: "red", fontSize: "12px", ml: 1 }}
                                                        >
                                                            {errors.typeOfVisit}
                                                        </Typography>
                                                    )}
                                                </FormControl>

                                                <Typography>Poli yang dituju</Typography>
                                                <DropdownListAPI
                                                    options={clinicOptions.map(({ id, name }) => ({ value: id, label: name }))}
                                                    placeholder="Pilih Fasilitas Induk"
                                                    onChange={handleDropdownPoli}
                                                    loading={false}
                                                />

                                                <Box
                                                    display={"flex"}
                                                    flexDirection={"row"}
                                                    justifyContent={"center"}
                                                    alignItems={"center"}
                                                    sx={{ width: "100%" }}
                                                >
                                                    <FormControl sx={{ mt: 2, mb: 2, width: "100%" }} size="small">
                                                        <DropdownListAPI
                                                            placeholder='Pilih dokter'
                                                            options={doctorOptions.map(({ id, name }) => ({ value: id, label: name }))}
                                                            onChange={handleDropdownDocter}
                                                            loading={false}
                                                        />
                                                    </FormControl>

                                                    <Box sx={{ ml: 2, width: "100%" }}>
                                                        <CustomCalender doctorId={idDoctor} onChange={handleScheduleChange} />
                                                    </Box>
                                                </Box>

                                                <FormControl>
                                                    <Typography sx={{ textTransform: "capitalize" }}>Keluhan Pasien</Typography>
                                                    <TextField
                                                        id="symptoms"
                                                        name="symptoms"
                                                        value={values.symptoms}
                                                        onChange={handleChange}
                                                        multiline
                                                        rows={4}
                                                        variant="outlined"
                                                        sx={{ maxHeight: "107px", maxWidth: "100%" }}
                                                    />
                                                </FormControl>

                                                <Box mt={6}>
                                                    <Typography>Jenis Pembayaran</Typography>
                                                    <RadioGroup
                                                        aria-label="transport-method"
                                                        name="transport-method"
                                                        value={selectedMethod}
                                                        onChange={handleRadioChange}
                                                        sx={{ display: 'flex', flexDirection: 'column', border: '1px solid black', marginTop: '10px', borderRadius: '16px', padding: '16px 24px 16px 24px' }}
                                                    >
                                                        <Box display={'flex'} flexDirection={'row'}>
                                                            <FormControlLabel value="asuransi" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Asuransi" />
                                                            <FormControlLabel value="uang tunai dan debit" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Uang tunai dan debit" />
                                                        </Box>
                                                        {selectedMethod === 'asuransi' && (
                                                            <Box>
                                                                <Typography mb={'10px'}>Unggah kartu asuransi</Typography>
                                                                <FileUploader />
                                                                <Typography fontSize={'14px'} color="#A8A8BD">Ukuran file maksimal 1mb</Typography>
                                                            </Box>
                                                        )}
                                                    </RadioGroup>
                                                </Box>

                                                <Box mt={1}>
                                                    <Box mt={2}>
                                                        <Typography>Unggah surat rujukan</Typography>
                                                        <FileUploader />
                                                        <Typography fontSize={"14px"} color="#A8A8BD">
                                                            Ukuran maksimal 1mb
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>


                                        {buttonDis ? (
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                sx={{
                                                    width: '100%',
                                                    height: '48px',
                                                    marginTop: '20px',
                                                    backgroundColor: '#8F85F3',
                                                    '&.Mui-disabled': {
                                                        backgroundColor: '#8F85F3',
                                                    },
                                                }}
                                                disabled={true}
                                            >
                                                <CircularProgress size={20} sx={{ color: 'white' }} />
                                            </Button>
                                        ) : (
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                sx={{
                                                    width: '100%',
                                                    height: '48px',
                                                    marginTop: '20px',
                                                    backgroundColor: '#8F85F3',
                                                    ":hover": { backgroundColor: '#D5D1FB' },
                                                }}
                                            disabled={!isValid || !dirty}
                                            >
                                                Selesai
                                            </Button>
                                        )}
                                    </Box>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                )}

                {!showFormPage && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            p: 5,
                            position: "absolute",
                            right: "0",
                            top: "0",
                            width: "45.9%",
                            height: '91.7vh',
                            bgcolor: '#ffff'
                        }}
                    >
                        <Box marginLeft={"10%"} marginTop={"10%"}>
                            {/* <InformasiTicket /> */}
                            <InformasiTicketAPI
                                clinic={dataTickets?.clinic || "Unknown Clinic"}
                                jadwalKonsul={dataTickets?.jadwalKonsul || "Unknown Date"}
                                namaDokter={dataTickets?.namaDokter || "Unknow Doctor"}
                                nomorAntrian={dataTickets?.nomorAntrian}
                                tanggalReservasi={dataTickets?.tanggalReservasi || "Unknown Date"}
                            />
                        </Box>
                    </Box>
                )}
            </Box >
        </>
    );
}
