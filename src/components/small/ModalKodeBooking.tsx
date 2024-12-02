import React, { useState } from "react";
import { Button, CircularProgress, IconButton, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import OTPInput from "react-otp-input";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ModalInformasiTiket from "./ModalInformasiTiket";
import CloseIcon from '@mui/icons-material/Close';

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

interface ModalKodeBookingProps {
    open: boolean;
    onClose: () => void;
}

const otpValidationSchema = Yup.object({
    otp: Yup.string()
        .matches(/^[0-9]+$/, "OTP harus berupa angka")
        .min(6, "OTP minimal 6 digit")
        .max(6, "OTP maksimal 6 digit")
        .required("OTP wajib diisi"),
});

const ModalKodeBooking: React.FC<ModalKodeBookingProps> = ({ open, onClose }) => {
    const [openModalInformasiTiket, setOpenModalInformasiTiket] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                BackdropProps={{
                    style: {
                        backgroundColor: "rgba(211, 211, 211, 0.2)",
                    },
                }}
            >
                <Box sx={style}>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: '#A8A8BD',
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
                        initialValues={{ otp: "" }}
                        validationSchema={otpValidationSchema}
                        onSubmit={async (values) => {
                            console.log("Kode booking:", values.otp);
                            setIsLoading(true);
                            await new Promise((resolve) => setTimeout(resolve, 3000));
                            onClose();
                            setOpenModalInformasiTiket(true);
                            setIsLoading(false);
                        }}
                    >
                        {({ errors, touched, setFieldValue, values, isValid, dirty }) => (
                            <Form>
                                <Field name="otp">
                                    {() => (
                                        <OTPInput
                                            value={values.otp}
                                            onChange={(otp) => setFieldValue("otp", otp)}
                                            numInputs={6}
                                            shouldAutoFocus
                                            renderSeparator={<span style={{ margin: "0 10px" }}> </span>}
                                            renderInput={(props) => (
                                                <input
                                                    {...props}
                                                    style={{
                                                        width: "68px",
                                                        height: "58px",
                                                        textAlign: "center",
                                                        border: "1px solid #8F85F3",
                                                        borderRadius: "8px",
                                                        fontSize: "20px",
                                                        margin: "0 4px",
                                                        outline: "none",
                                                        padding: "8px",
                                                        color: "black",
                                                        backgroundColor: "white",
                                                    }}
                                                />
                                            )}
                                        />
                                    )}
                                </Field>
                                {errors.otp && touched.otp && (
                                    <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
                                        {errors.otp}
                                    </Typography>
                                )}
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
            <ModalInformasiTiket open={openModalInformasiTiket} onClose={() => setOpenModalInformasiTiket(false)} />
        </>
    );
};

export default ModalKodeBooking;
