import type React from "react";
import { useState } from "react";
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

const bookingCodeSchema = Yup.object().shape({
    bookingCode: Yup.string()
        .required("Kode booking wajib diisi")
        .length(6, "Kode booking harus 6 karakter"),
});

const ModalUbahNoHp: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
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
                    Ubah No handphone
                </Typography>
                <Typography id="modal-modal-description" sx={{ mb: 3 }}>
                    Silahkan masukkan No handphone yang dapat di hubungi, setelah Anda melakukan perubahan No handphone harap hubungi Admin untuk memperbarui data Anda.
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
                                    // <TextField
                                    //     variant="outlined"
                                    //     fullWidth
                                    //     placeholder="Masukkan kode booking"
                                    //     value={values.bookingCode}
                                    //     onChange={(e) => setFieldValue("bookingCode", e.target.value)}
                                    //     error={Boolean(errors.bookingCode && touched.bookingCode)}
                                    //     helperText={errors.bookingCode && touched.bookingCode ? errors.bookingCode : ""}
                                    //     sx={{
                                    //         borderRadius: "8px",
                                    //         fontSize: "16px",
                                    //         marginBottom: "16px",
                                    //     }}
                                    //     inputProps={{
                                    //         style: {
                                    //             padding: "10px",
                                    //             textAlign: "center",
                                    //         },
                                    //     }}
                                    // />

                                    <PhoneInput
                                        // disabled={switchValue}
                                        country={"id"}
                                        countryCodeEditable={false }
                                        value={values.bookingCode}
                                        onChange={(phone) => setFieldValue("phone", phone)}
                                        inputStyle={{
                                            height: "48px",
                                            borderRadius: "8px",
                                            border: touched.bookingCode && errors.bookingCode ? "1px solid #f44336" : "1px solid #ccc",
                                            padding: "10px 40px 10px 60px",
                                            backgroundColor: touched.bookingCode && errors.bookingCode ? "#ffcccc" : 'inherit',
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
                                    // onBlur={handleBlur("bookingCode")}

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

export default ModalUbahNoHp;
