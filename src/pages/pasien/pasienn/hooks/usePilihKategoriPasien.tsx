import { useState } from "react";
import * as Yup from "yup";
import GenerateQueuePatientServices from "../../../../services/Patient Tenant/GenerateQueuePatientServices";
import { GetDoctorServices } from "../../../../services/Admin Tenant/ManageDoctor/GetDoctorService";
import { getClinic } from "../../../../services/Admin Tenant/ManageClinic/GetClinic";
import dayjs from "dayjs";
import 'dayjs/locale/id';
import PatientCheckIn from "../../../../services/Patient Tenant/PatientCheckIn";

const formatDate = (timestamp: number) => dayjs.unix(timestamp).locale('id').format('DD MMMM YYYY');
const formatTime = (timestamp: number) => dayjs.unix(timestamp).format('HH:mm');

type bookingCodeData = {
    nomorAntrian: string,
    namaDokter: string,
    namaKlinik: string,
    tanggalReserve: string,
    jadwalKonsul: string,
}

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

const bookingCodeSchema = Yup.object({
    bookingCode: Yup.string()
        // .min(6, "Booking kode minimal 6 digit")
        // .max(6, "Booking kode maksimal 6 digit")
        .required("Booking kode wajib diisi"),
});

export default function usePilihKategoriPasien() {
    const [openModalKodeBooking, setOpenModalKodeBooking] = useState(false);
    const [openModalPilihPembayaran, setOpenModalPilihPembayaran] = useState(false);
    const [mainPages, setMainPages] = useState(true);
    const [inputCodePages, setInputCodePages] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [infoTicket, setInfoTicket] = useState(false);
    const [nomorAntrian, setNomorAntrian] = useState<string | number>(0);
    const [tiketAntrianKonter, setTiketAntrianKonter] = useState(false);
    const [noDataBooking, setNoDataBooking] = useState(false)
    const [dataKodeBooking, setDataKodeBooking] = useState<bookingCodeData>()


    const handleBack = () => {
        setOpenModalPilihPembayaran(false);
        setMainPages(true);
    }

    const pasienBaru = async () => {
        const counterId = "f2ac5cf2-b023-4756-ac33-b7b493d065dd" //nanti diganti
        setTiketAntrianKonter(true);
        setMainPages(false);
        try {
            const response = await GenerateQueuePatientServices(counterId)
            setNomorAntrian(response);

        } catch {
            console.error('error')
        }

    }

    const onSubmitKodeBooking = async (values: any) => {
        setIsLoading(true);
        const bookingCode = { bookingCode: values.bookingCode };
        try {
            const response = await PatientCheckIn(bookingCode)
            const dateTime = formatDate(response.registrationDatum.scheduleDatum.startDateTime);
            const startTime = formatTime(response.registrationDatum.scheduleDatum.startDateTime);
            const endTime = formatTime(response.registrationDatum.scheduleDatum.endDateTime);
            const consultationSchedule = dateTime + ' ' + startTime + ' - ' + endTime
            const namaDokter = await GetDoctorServices(response.registrationDatum.doctorDataId)
            const namaKlinik = await getClinic(response.registrationDatum.masterClinicId)
            const dateReserve = dayjs(response.createdDateTime * 1000).format('YYYY-MM-DD HH:mm');
            const dataBooking = {
                nomorAntrian: response.queueNumber,
                namaDokter: namaDokter.name,
                namaKlinik: namaKlinik.name,
                tanggalReserve: dateReserve,
                jadwalKonsul: consultationSchedule,
            }
            setDataKodeBooking(dataBooking)
            setOpenModalKodeBooking(false);
            setInfoTicket(true);
            setIsLoading(false);
            setInputCodePages(false);
        } catch (err: any) {
            setIsLoading(false);
            showTemporaryAlert();
        }

    }

    const showTemporaryAlert = async () => {
        setNoDataBooking(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setNoDataBooking(false);
    };

    return {
        setOpenModalKodeBooking,
        openModalKodeBooking,
        openModalPilihPembayaran,
        setOpenModalPilihPembayaran,
        mainPages,
        setMainPages,
        inputCodePages,
        setInputCodePages,
        isLoading,
        setIsLoading,
        infoTicket,
        setInfoTicket,
        nomorAntrian,
        tiketAntrianKonter,
        setTiketAntrianKonter,
        noDataBooking,
        setNoDataBooking,
        dataKodeBooking,
        handleBack,
        pasienBaru,
        bookingCodeSchema,
        style,
        onSubmitKodeBooking
    }
}
