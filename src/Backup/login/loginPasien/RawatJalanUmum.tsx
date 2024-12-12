import {
    Button,
    Box,
    Typography,
    CardMedia,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    TextField,
    Radio,
    FormControlLabel,
    RadioGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "react-phone-input-2/lib/style.css";
import logo from "../../../img/St.carolus.png";
import imagePendaftaran from "../../../assets/img/pendaftaran.jpeg";
import { doctors } from "../../../dummyData/dummyData";
import FileUploader from "../../../components/medium/FileUploader";
import InformasiTicket from "../../../components/small/InformasiTicket";
import CustomCalender from "../../../components/medium/CustomCalender";
import CreateAppointment from "../../../services/Patient Tenant/CreateAppointment";
import axios from "axios";
import DropdownListAPI from "../../../components/small/DropdownListAPI";
const validationSchema = Yup.object({
    typeOfVisit: Yup.string().required("Nama wajib diisi"),
    phone: Yup.string().required("Nomor HP wajib diisi"),
    relation: Yup.string().required("Hubungan wajib diisi"),
    transportMethod: Yup.string().required("Cara datang/pengantar wajib diisi"),
});

interface FormValues {
    typeOfVisit: string;
    symptoms: string;
    clinicId: string;
    transportMethod: string;
    poli: string;
    docter: string;
    operationalDate: string;
}

type Clinic = {
    id: string;
    name: string;
};

const RawatJalanUmum: React.FC = () => {
    // const [showFormPage, setSHowFormPage] = useState(true);
    const showFormPage = true;
    const [selectedMethod, setSelectedMethod] = useState<string>("");
    const [clinicOptions, setClinicOptions] = useState<Clinic[]>([]);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMethod(event.target.value);
    };

    useEffect(() => {
        const fetchClinicData = async () => {
            try {
                const response = await axios.get('https://hms.3dolphinsocial.com:8083/v1/manage/clinic/?pageNumber=0&pageSize=10&orderBy=createdDateTime=asc', {
                    timeout: 10000
                });
                setClinicOptions(response.data.data.content.map((item: Clinic) => ({
                    id: item.id,
                    name: item.name,
                })));
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("Axios error:", error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            }
        };
        fetchClinicData();
    }, []);


    return (
        <>
            <style>
                {`
            :root {
            background-color: #ffff
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
                            clinicId: "",
                            transportMethod: "",
                            poli: "",
                            docter: "",
                            operationalDate: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async () => {
                            const data = {
                                patientId: "id",
                                typeOfVisit: "type",
                                clinicId: "id klini",
                                doctorId: "doctor id",
                                scheduleId: "id jadwal",
                                symptoms: "simptom",
                                referenceDoc: "docs",
                            }
                            try {
                                await CreateAppointment(data)
                                console.log('sukses')
                            } catch (err) {
                                console.log(err)
                            }
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            setFieldValue,
                        }) => (
                            <Form>
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
                                                        variant="outlined"
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
                                                </FormControl>
                                                <Typography>Poli yang dituju</Typography>
                                                {/* <PoliSelect
                                                    value={values.poli}
                                                    onChange={(e) =>
                                                        setFieldValue("poli", e.target.value)
                                                    }
                                                /> */}

                                                <DropdownListAPI
                                                    options={clinicOptions.map(({ id, name }) => ({ value: id, label: name }))}
                                                    placeholder="Pilih Fasilitas Induk"
                                                    // defaultValue={formik.values.masterFacilityId}
                                                    // onChange={(selectedOptionValue) => {
                                                    // formik.setFieldValue('masterFacilityId', selectedOptionValue);
                                                    // }}
                                                    onChange={(selectedOptionValue) => console.log('pilihan: ', selectedOptionValue)}
                                                    loading={false}
                                                />
                                                {touched.poli && errors.poli && (
                                                    <Typography sx={{ color: "red", fontSize: "12px" }}>
                                                        {errors.poli}
                                                    </Typography>
                                                )}

                                                <Box
                                                    display={"flex"}
                                                    flexDirection={"row"}
                                                    justifyContent={"center"}
                                                    alignItems={"center"}
                                                    sx={{ width: "100%" }}
                                                >
                                                    <FormControl sx={{ mt: 2, mb: 2, width: "100%" }} size="small">
                                                        <InputLabel id="doctor-label">
                                                            Pilih Dokter
                                                        </InputLabel>
                                                        <Select
                                                            labelId="doctor-label"
                                                            value={values.docter}
                                                            label="Pilih Dokter"
                                                            onChange={(e) =>
                                                                setFieldValue("docter", e.target.value)
                                                            }
                                                            sx={{ width: "100%", borderRadius: "8px" }}
                                                        >
                                                            {doctors.map((doctor) => (
                                                                <MenuItem
                                                                    key={doctor.value}
                                                                    value={doctor.value}
                                                                    sx={{ color: "#8F85F3" }}
                                                                >
                                                                    {doctor.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                    {touched.docter && errors.docter && (
                                                        <Typography
                                                            sx={{ color: "red", fontSize: "12px", ml: 1 }}
                                                        >
                                                            {errors.docter}
                                                        </Typography>
                                                    )}

                                                    <Box sx={{ ml: 2, width: "100%" }}>
                                                        {/* <CalenderPopover title="Pilih tanggal" /> */}
                                                        <CustomCalender doctorId="1" onChange={() => console.log('r')} />
                                                    </Box>
                                                </Box>

                                                <FormControl>
                                                    <Typography sx={{ textTransform: "capitalize" }}>keluhan pasien</Typography>
                                                    <TextField
                                                        id="outlined-multiline-static"
                                                        multiline
                                                        rows={4}
                                                        variant="outlined"
                                                        sx={{ maxHeight: "107px", maxWidth: "100%" }}
                                                    />
                                                </FormControl>

                                                <Box mt={6} >
                                                    <Typography>Jenis Pembayaran</Typography>
                                                    <RadioGroup
                                                        aria-label="transport-method"
                                                        name="transport-method"
                                                        value={selectedMethod}
                                                        onChange={handleRadioChange}
                                                        sx={{ display: 'flex', flexDirection: 'column', border: '1px solid black', marginTop: '10px', borderRadius: '16px', padding: '16px 24px 16px 24px' }}
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

                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                mt: 4,
                                            }}
                                        >
                                            <Button
                                                type="submit"
                                                sx={{
                                                    backgroundColor: "#8F85F3",
                                                    color: "white",
                                                    textTransform: "none",
                                                    width: "100%",
                                                    padding: "10px 24px",
                                                    borderRadius: "8px",
                                                    "&:hover": {
                                                        backgroundColor: "#7C75E2",
                                                    },
                                                }}
                                            >
                                                Selesai
                                            </Button>
                                        </Box>
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
                        <Box marginLeft={"10%"} marginTop={"20%"}>
                            <InformasiTicket />
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default RawatJalanUmum;
