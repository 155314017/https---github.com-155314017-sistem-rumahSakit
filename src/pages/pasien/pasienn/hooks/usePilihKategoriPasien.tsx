/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import * as Yup from "yup";
// import GenerateQueuePatientServices from "../../../../services/Patient Tenant/GenerateQueuePatientServices";
import { GetDoctorServices } from "../../../../services/Admin Tenant/ManageDoctor/GetDoctorService";
import { getClinic } from "../../../../services/Admin Tenant/ManageClinic/GetClinic";
import dayjs from "dayjs";
import 'dayjs/locale/id';
import PatientCheckIn from "../../../../services/Patient Tenant/PatientCheckIn";
import axios from "axios";

type queueData = {
    id: string;
    registrationDataId: string;
    createdBy: string;
    createdDateTime: number;
    updatedBy: string | null;
    updatedDateTime: number | null;
    deletedBy: string | null;
    deletedDateTime: number | null;
    queueNumber: number;
    clinicId: string;
    status: string | null;
}

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
    const [mainPages, setMainPages] = useState(true);
    const [inputCodePages, setInputCodePages] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [infoTicket, setInfoTicket] = useState(false);
    const [tiketAntrianKonter, setTiketAntrianKonter] = useState(false);
    const [noDataBooking, setNoDataBooking] = useState(false)
    const [dataKodeBooking, setDataKodeBooking] = useState<bookingCodeData>()
    const [queueData, setQueueData] = useState<queueData>();
    const [tanggalReservasi, setTanggalReservasi] = useState<string>();


   

   

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
                setTanggalReservasi(dateReserve)
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

                    setQueueData(queue.data.data)
                    setTiketAntrianKonter(true);
                } else {
                    const dataBooking = {
                        nomorAntrian: queue.data.data.queueNumber,
                        namaDokter: namaDokter.name,
                        namaKlinik: namaKlinik.name,
                        tanggalReserve: dateReserve,
                        jadwalKonsul: `  ${schedules.day}/${dayjs(schedules.month).format("MMM")}/${schedules.year}, ${jam}`,
                        needAdmin: response.data.needAdmin
                    }
                    setQueueData(queue.data.data)
                    setDataKodeBooking(dataBooking)
                    setInfoTicket(true);
                }


                setIsLoading(false);
                setInputCodePages(false);
            }

        } catch (err: any) {
            setIsLoading(false);
            showTemporaryAlert();

            console.log(err)
        }



    }

    const showTemporaryAlert = async () => {
        setNoDataBooking(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setNoDataBooking(false);
    };

    return {
        mainPages,
        setMainPages,
        inputCodePages,
        setInputCodePages,
        isLoading,
        setIsLoading,
        infoTicket,
        setInfoTicket,
        tiketAntrianKonter,
        setTiketAntrianKonter,
        noDataBooking,
        setNoDataBooking,
        dataKodeBooking,
        bookingCodeSchema,
        style,
        onSubmitKodeBooking,
        queueData,
        tanggalReservasi
    }
}
