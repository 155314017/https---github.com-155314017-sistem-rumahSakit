

import { useState } from "react";
import { GetDoctorServices } from "../../../services/Admin Tenant/ManageDoctor/GetDoctorService";
import { getClinic } from "../../../services/Admin Tenant/ManageClinic/GetClinic";
import dayjs from "dayjs";
import 'dayjs/locale/id';
import PatientCheckIn from "../../../services/Patient Tenant/PatientCheckIn";

const formatDate = (timestamp: number) => dayjs.unix(timestamp).locale('id').format('DD MMMM YYYY');
const formatTime = (timestamp: number) => dayjs.unix(timestamp).format('HH:mm');

type bookingCodeData = {
    nomorAntrian: number; 
    namaDokter: string;   
    namaKlinik: string;   
    tanggalReserve: string; 
    jadwalKonsul: string;  
};


export default function useLihatTiket() {
    const [openModalKodeBooking, setOpenModalKodeBooking] = useState(false);
    const [openModalPilihPembayaran, setOpenModalPilihPembayaran] = useState(false);
    const [mainPages, setMainPages] = useState(true);
    const [inputCodePages, setInputCodePages] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [infoTicket, setInfoTicket] = useState(false);
    const [nomorAntrian] = useState<string | number>(0);
    const [dataKodeBooking, setDataKodeBooking] = useState<bookingCodeData>()
    



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
            console.error(err.status)
            setIsLoading(false);
        }

    }
  return {
    openModalKodeBooking,
    setOpenModalKodeBooking,
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
    onSubmitKodeBooking,
    dataKodeBooking
  }
    
  
}
