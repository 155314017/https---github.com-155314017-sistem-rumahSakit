import { Box, Button, Typography, CardMedia, FormControl, TextField, CircularProgress } from "@mui/material";
import { Formik, Form } from 'formik';
import "react-phone-input-2/lib/style.css";
import imagePendaftaran from "../../../../assets/img/pendaftaran.jpeg";
import DropdownListAPI from '../../../../components/small/dropdownlist/DropdownListAPI';
import CustomCalender from '../../../../components/medium/CustomCalender';
// Hooks
import useRawatJalanUmum from '../hooks/useRawatJalanUmum';
import InformasiTicketAPI from '../../../../components/small/InformasiTicketAPI';
import dayjs from 'dayjs';
import PhoneInput from "react-phone-input-2";

interface FormValues {
    typeOfVisit: string;
    symptoms: string;
    phoneCP: string;
    emailCP: string;
}


export default function RawatJalanUmum() {
    const {
        showFormPage,
        validationSchema,
        clinicOptions,
        doctorOptions,
        idDoctor,
        handleScheduleChange,
        selectedScheduleId,
        idClinic,
        handleDropdownPoli,
        handleDropdownDocter,
        selectedSchedule,
        dataTickets,
        buttonDis,
        calendarKey,
        patientData,
        createTicket
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
                <Box position={'absolute'} >
                    <Box sx={{ position: "relative" }}>
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

                    {/* overlay */}
                    <Box
                        sx={{
                            position: "fixed",
                            bgcolor: "rgba(0, 0, 0, 0.5)",
                            width: "50%",
                            height: "100vh",
                            top: "0",
                            left: "0",
                        }}
                    ></Box>
                </Box>


                <Box>
                    {showFormPage && (
                        <Formik<FormValues>
                            initialValues={{
                                typeOfVisit: "",
                                symptoms: "",
                                phoneCP: '62',
                                emailCP: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={async (values) => {
                                // object proccess for create appointment
                                const data = {
                                    idPatient: patientData?.patientId || null,
                                    typeOfVisit: values.typeOfVisit,
                                    clinicId: idClinic,
                                    doctorId: idDoctor,
                                    scheduleIntervalId: selectedScheduleId,
                                    scheduleDate: dayjs(selectedSchedule?.split(',')[0]).format('L'),
                                    symptoms: values.symptoms,
                                    phoneNumber: values.phoneCP,
                                    email: values.emailCP,
                                    needAdmin: patientData?.needAdmin
                                }
                                // function for create appointment
                                createTicket(data);
                            }
                            }
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleBlur,
                                handleChange,
                                isValid,
                                dirty,
                                handleSubmit,
                                setFieldValue,
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
                                        }}
                                    >
                                        <Box sx={{ ml: 2, width: '100%' }}>

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

                                            <Box display={'flex'} flexDirection={'column'} gap={2} >
                                                <Box sx={{ display: "flex", flexDirection: "column", border: '1px solid gray', borderRadius: '16px', padding: 2 }}>
                                                    <Typography>Kontak info</Typography>
                                                    <FormControl>
                                                        <Typography>No. Handphone</Typography>
                                                        <PhoneInput
                                                            country={"id"}
                                                            countryCodeEditable={false}
                                                            value={values.phoneCP}
                                                            onChange={(phone) => setFieldValue("phoneCP", phone)}
                                                            inputStyle={{
                                                                height: "48px",
                                                                borderRadius: "8px",
                                                                padding: "10px 40px 10px 60px",
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
                                                        />
                                                    </FormControl>
                                                    <FormControl>
                                                        <Typography>Email</Typography>
                                                        <TextField
                                                            name="emailCP"
                                                            id="emailCP"
                                                            onChange={handleChange}
                                                            value={values.emailCP}
                                                            placeholder="Masukkan email"
                                                            sx={{
                                                                width: "100%",
                                                                borderRadius: "8px",
                                                                mb: 2,
                                                                padding: "0",
                                                                "& .MuiOutlinedInput-root": {
                                                                    height: "44px",
                                                                    padding: "0 12px",
                                                                    border: "1px solid #A8A8BD",
                                                                    "& input": {
                                                                        height: "44px",
                                                                        padding: "0",
                                                                    },

                                                                    "&.Mui-focused fieldset": {
                                                                        borderColor: "#6B63D1",
                                                                    },
                                                                },
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Box>
                                                <Box sx={{ display: "flex", flexDirection: "column", border: '1px solid gray', borderRadius: '16px', padding: 2 }}>
                                                    <FormControl>
                                                        <Typography>Keluhan Pasien</Typography>
                                                        <Typography>Jenis Kunjungan</Typography>
                                                        <TextField
                                                            id="typeOfVisit"
                                                            name="typeOfVisit"
                                                            variant="outlined"
                                                            value={values.typeOfVisit}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            sx={{
                                                                width: "100%",
                                                                borderRadius: "8px",
                                                                mb: 2,
                                                                padding: "0",
                                                                "& .MuiOutlinedInput-root": {
                                                                    height: "44px",
                                                                    padding: "0 12px",
                                                                    border: "1px solid #A8A8BD",
                                                                    backgroundColor: touched.typeOfVisit && errors.typeOfVisit ? "#ffcccc" : 'inherit',
                                                                    "& input": {
                                                                        height: "44px",
                                                                        padding: "0",
                                                                    },

                                                                    "&.Mui-focused fieldset": {
                                                                        borderColor: "#6B63D1",
                                                                    },
                                                                },
                                                            }}
                                                        />
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
                                                            <Typography>Dokter yang bertugas</Typography>
                                                            <DropdownListAPI
                                                                placeholder='Pilih dokter'
                                                                options={doctorOptions.map(({ id, name }) => ({ value: id, label: name }))}
                                                                onChange={handleDropdownDocter}
                                                                loading={false}
                                                            />
                                                        </FormControl>

                                                        <Box sx={{ ml: 2, width: "100%" }}>
                                                            <Typography>Tanggal dan jam operasional</Typography>
                                                            <CustomCalender key={calendarKey} doctorId={idDoctor} onChange={handleScheduleChange} />
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
                                                            sx={{
                                                                width: "100%",
                                                                borderRadius: "8px",
                                                                mb: 2,
                                                                padding: "0",
                                                                "& .MuiOutlinedInput-root": {
                                                                    padding: "0 12px",
                                                                    border: "1px solid #A8A8BD",
                                                                    backgroundColor: touched.symptoms && errors.symptoms ? "#ffcccc" : 'inherit',
                                                                    "& input": {
                                                                        padding: "0",
                                                                    },
                                                                    "&.Mui-focused fieldset": {
                                                                        border: "1px solid #6B63D1",
                                                                    },
                                                                },
                                                            }}
                                                        />

                                                    </FormControl>

                                                    {/* <Box>
                                                            <Typography>Jenis Pembayaran</Typography>
                                                            <RadioGroup
                                                                aria-label="transport-method"
                                                                name="transport-method"
                                                                value={selectedMethod}
                                                                onChange={handleRadioChange}
                                                                sx={{ display: 'flex', flexDirection: 'column', border: '1px solid black', borderRadius: '16px', padding: '16px 24px 16px 24px' }}
                                                            >
                                                                <Box display={'flex'} flexDirection={'row'}>
                                                                    <FormControlLabel value="asuransi" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Asuransi" />
                                                                    <FormControlLabel value="uang tunai dan debit" control={<Radio sx={{ '&.Mui-checked': { color: '#7367F0' } }} />} label="Uang tunai dan debit" />
                                                                </Box>
                                                                {selectedMethod === 'asuransi' && (
                                                                    <Box>
                                                                        <Typography mb={'10px'}>Unggah kartu asuransi</Typography>
                                                                        <FileUploader onBase64Change={(base64string) => console.log(base64string)} />
                                                                        <Typography fontSize={'14px'} color="#A8A8BD">Ukuran file maksimal 1mb</Typography>
                                                                    </Box>
                                                                )}
                                                            </RadioGroup>
                                                        </Box>

                                                        <Box mt={1}>
                                                            <Box mt={2}>
                                                                <Typography>Unggah surat rujukan</Typography>
                                                                <FileUploader
                                                                    onBase64Change={(base64String) => setFieldValue('docs', base64String)}
                                                                />
                                                                <Typography fontSize={"14px"} color="#A8A8BD">
                                                                    Ukuran maksimal 1mb
                                                                </Typography>
                                                            </Box>

                                                        </Box> */}
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
                                    bgcolor="#F1F0FE"
                                    clinic={dataTickets?.clinic || "Unknown Clinic"}
                                    jadwalKonsul={dataTickets?.jadwalKonsul || "Unknown Date"}
                                    namaDokter={dataTickets?.namaDokter || "Unknow Doctor"}
                                    nomorAntrian={dataTickets?.nomorAntrian}
                                    tanggalReservasi={dataTickets?.tanggalReservasi || "Unknown Date"}
                                    bookingCode={dataTickets?.bookingCode || "Unknown"}
                                />
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box >
        </>
    );
}
