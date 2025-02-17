/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { useState } from "react";
import { Button, CircularProgress, IconButton, Modal, Typography, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import PatientCheckIn from "../../../services/Patient Tenant/PatientCheckIn";
import dayjs from "dayjs";
import { GetDoctorServices } from "../../../services/Admin Tenant/ManageDoctor/GetDoctorService";
import { getClinic } from "../../../services/Admin Tenant/ManageClinic/GetClinic";
import ModalInformasiTiket from "./ModalInformasiTiket";

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 670,
    bgcolor: "#FFFFFF",
    border: "1px solid #A8A8BD",
    boxShadow: 2,
    p: 4,
    borderRadius: "16px",
};

// type queueData = {
//     id: string;
//     registrationDataId: string;
//     createdBy: string;
//     createdDateTime: number;
//     updatedBy: string | null;
//     updatedDateTime: number | null;
//     deletedBy: string | null;
//     deletedDateTime: number | null;
//     queueNumber: number;
//     clinicId: string;
//     status: string | null;
// }

type bookingCodeData = {
    nomorAntrian: string,
    namaDokter: string,
    namaKlinik: string,
    tanggalReserve: string,
    jadwalKonsul: string,
}

const bookingCodeSchema = Yup.object().shape({
    bookingCode: Yup.string()
        .required("Kode booking wajib diisi")
        .length(4, "Kode booking harus 6 karakter"),
});

const ModalKodeBooking: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [infoTicket, setInfoTicket] = useState(false);
    const [dataKodeBooking, setDataKodeBooking] = useState<bookingCodeData>()
    const onSubmitKodeBooking = async (values: any) => {
        setIsLoading(true);
        console.log('Form submitted:', values);
        const bookingCode = { bookingCode: values };
        try {
            const response = await PatientCheckIn(bookingCode);
            if (response.responseCode === "200") {
                console.log('response book: ', response.data.scheduleIntervalDataId);
                const scheduleIntervalDataId = response.data.scheduleIntervalDataId;
                const dataSchedule = await axios.get(
                    `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/schedule-interval/${scheduleIntervalDataId}`
                );
                console.log('data jadwal: ', dataSchedule.data.data.endTime)
                console.log('tes: ', dataSchedule.data.data.startTime[0], dataSchedule.data.data.startTime[1], " akhir:", dataSchedule.data.data.endTime[0], dataSchedule.data.data.endTime[1])
                const jam = `${dayjs().hour(dataSchedule.data.data.startTime[0]).minute(dataSchedule.data.data.startTime[1]).format('HH:mm')} - 
${dayjs().hour(dataSchedule.data.data.endTime[0]).minute(dataSchedule.data.data.endTime[1]).format('HH:mm')}`;
                const namaDokter = await GetDoctorServices(response.data.doctorDataId);
                const namaKlinik = await getClinic(response.data.masterClinicId);

                const dateReserve: string = dayjs(response.data.createdDateTime * 1000).isValid()
                    ? dayjs(response.data.createdDateTime * 1000).format('YYYY-MM-DD HH:mm')
                    : '';
                const schedules = {
                    year: response.data.scheduleDate[0],
                    month: response.data.scheduleDate[1],
                    day: response.data.scheduleDate[2],
                };



                const queueData = {
                    registrationId: response.data.id,
                    needAdmin: response.data.needAdmin,
                    clinicId: response.data.masterClinicId

                }
                const queue = await axios.post(
                    `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/queue/generated`,
                    queueData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log(response.data.needAdmin);
                if (response.data.needAdmin === true) {


                    console.log(queue);

                } else {
                    const dataBooking = {
                        nomorAntrian: queue.data.data.queueNumber,
                        namaDokter: namaDokter.name,
                        namaKlinik: namaKlinik.name,
                        tanggalReserve: dateReserve,
                        jadwalKonsul: `  ${schedules.day}/${dayjs(schedules.month).format("MMM")}/${schedules.year}, ${jam}`,
                        needAdmin: response.data.needAdmin
                    }
                    setDataKodeBooking(dataBooking)
                    setInfoTicket(true);
                }


                setIsLoading(false);
            }

        } catch (err: any) {
            setIsLoading(false);

            console.log(err)
        }



    }

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                BackdropProps={{
                    style: { backgroundColor: "rgba(211, 211, 211, 0.2)" },
                }}
            >
                <Box sx={style}>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            color: "#A8A8BD",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography id="modal-modal-title" sx={{ mt: 2, fontSize: "18px", fontWeight: 600 }}>
                        Masukkan kode booking
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mb: 3 }}>
                        Berfungsi untuk pasien yang sudah melakukan pendaftaran online untuk check-in nomor antrian.
                    </Typography>

                    <Formik
                        initialValues={{ bookingCode: "" }}
                        validationSchema={bookingCodeSchema}
                        enableReinitialize
                        onSubmit={async (values) => {
                            console.log("Kode booking:", values.bookingCode);
                            onSubmitKodeBooking(values.bookingCode)
                            setIsLoading(true);
                            try {
                                const response = await axios.post(
                                    `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/patient/check-in`,
                                    { bookingCode: values.bookingCode },
                                    {
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    }
                                );
                                console.log(response);
                            } catch (error) {
                                console.error(error);
                            } finally {
                                setIsLoading(false);
                                onClose();
                            }
                        }}
                    >
                        {({ errors, touched, setFieldValue, values, isValid, dirty }) => (
                            <Form>
                                <Field name="bookingCode">
                                    {() => (
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            placeholder="Masukkan kode booking"
                                            value={values.bookingCode}
                                            onChange={(e) => setFieldValue("bookingCode", e.target.value)}
                                            error={Boolean(errors.bookingCode && touched.bookingCode)}
                                            helperText={errors.bookingCode && touched.bookingCode ? errors.bookingCode : ""}
                                            sx={{
                                                borderRadius: "8px",
                                                fontSize: "16px",
                                                marginBottom: "16px",
                                            }}
                                            inputProps={{
                                                style: {
                                                    padding: "10px",
                                                    textAlign: "center",
                                                },
                                            }}
                                        />
                                    )}
                                </Field>

                                <Box sx={{ mt: 3, textAlign: "right" }}>
                                    <Button
                                        type="submit"
                                        style={{
                                            padding: "10px 20px",
                                            backgroundColor: isValid && dirty ? "#8F85F3" : "#A8A8A8",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "8px",
                                            cursor: isValid && dirty ? "pointer" : "not-allowed",
                                            fontWeight: 600,
                                            width: "100%",
                                        }}
                                    >
                                        {isLoading ? (
                                            <CircularProgress size={25} sx={{ color: "white" }} />
                                        ) : (
                                            "Submit"
                                        )}
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>

            </Modal>
            {infoTicket && (
                // <ModalInformasiTiket 
                //     open={infoTicket}
                //     clinic={dataKodeBooking.namaKlinik}
                //     jadwalKonsul={dataKodeBooking.jadwalKonsul}
                //     namaDokter={dataKodeBooking.namaDokter}
                //     tanggalReservasi={dataKodeBooking.tanggalReserve}
                //     nomorAntrian={queueData.queueNumber || 0}
                //     onClose={() => setInfoTicket(false)}
                // />
                <ModalInformasiTiket
                    open={infoTicket}
                    clinic={'dataKodeBooking.namaKlinik'}
                    jadwalKonsul={'dataKodeBooking.jadwalKonsul'}
                    namaDokter={'dataKodeBooking.namaDokter'}
                    tanggalReservasi={'dataKodeBooking.tanggalReserve'}
                    nomorAntrian={0}
                    onClose={() => {
                        setInfoTicket(false);
                        console.log(dataKodeBooking)
                    }}
                />
            )}

        </>

    );
};

export default ModalKodeBooking;
