import React, { useState } from "react";
import { Button, CircularProgress, IconButton, Modal, Typography, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

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

const bookingCodeSchema = Yup.object().shape({
    bookingCode: Yup.string()
        .required("Kode booking wajib diisi")
        .length(6, "Kode booking harus 6 karakter"),
});

const ModalKodeBooking: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);

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
                        setIsLoading(true);
                        try {
                            const response = await axios.post(
                                "https://hms.3dolphinsocial.com:8083/v1/patient/check-in",
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

export default ModalKodeBooking;
