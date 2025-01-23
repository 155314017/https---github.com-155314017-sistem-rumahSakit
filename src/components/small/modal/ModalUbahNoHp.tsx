/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { useEffect, useState } from "react";
import { Button, CircularProgress, IconButton, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import PhoneInput from "react-phone-input-2";

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

const changePhoneSchema = Yup.object().shape({
    newPhone: Yup.string()
        .required("Nomor Hp wajib diisi")
        .min(10, "Nomor HP minimal 10 digit")
        .max(13, "Nomor HP maksimal 13 digit")
});



const ModalUbahNoHp: React.FC<{ open: boolean; onClose: () => void; patienDataSent?: any; registrationId?: string; hitFunction?: () => void }> = ({ open, onClose, patienDataSent, registrationId, hitFunction }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [patientData, setPatientData] = useState<any>({});

    useEffect(() => {
        if (patienDataSent) {
            setPatientData(patienDataSent);
            console.log('data before changed: ', patienDataSent);
        }
    }, [patienDataSent]);
    return (

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
                    Ubah No handphone
                </Typography>
                <Typography id="modal-modal-description" sx={{ mb: 3 }}>
                    Silahkan masukkan No handphone yang dapat di hubungi, setelah Anda melakukan perubahan No handphone harap hubungi Admin untuk memperbarui data Anda.
                </Typography>

                <Formik
                    initialValues={{ newPhone: "" }}
                    validationSchema={changePhoneSchema}
                    enableReinitialize
                    onSubmit={async (values) => {
                        setIsLoading(true);
                        const dataPhoneChanged = {
                            registrationId: registrationId,
                            patientId: patienDataSent.patientId === undefined ? null : patienDataSent.patientId,
                            typeOfVisit: patienDataSent.typeOfVisit,
                            clinicId: patienDataSent.clinicId,
                            doctorId: patienDataSent.doctorId,
                            scheduleDate: patienDataSent.scheduleDate,
                            scheduleIntervalId: patienDataSent.scheduleIntervalId,
                            symptoms: patienDataSent.symptoms,
                            referenceDoc: patienDataSent.referenceDoc,
                            phoneNumber: values.newPhone,
                            email: patienDataSent.email,
                        };
                        try {
                            const response = await axios.put(
                                `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/registration/`,
                                dataPhoneChanged,
                                {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                }
                            );
                            console.log(response);
                            hitFunction?.();
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
                            <Field name="newPhone">
                                {() => (
                                    <PhoneInput
                                        country={"id"}
                                        countryCodeEditable={false}
                                        value={values.newPhone}
                                        onChange={(phone) => setFieldValue("newPhone", phone)}
                                        inputStyle={{
                                            height: "48px",
                                            borderRadius: "8px",
                                            border: touched.newPhone && errors.newPhone ? "1px solid #f44336" : "1px solid #ccc",
                                            padding: "10px 40px 10px 60px",
                                            backgroundColor: touched.newPhone && errors.newPhone ? "#ffcccc" : 'inherit',
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
                                )}
                            </Field>
                            <Button
                                onClick={() => {
                                    console.log('data: ', patientData)
                                }}
                            />

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
                                    disabled={!isValid || !dirty || isLoading}
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
    );
};

export default ModalUbahNoHp;
