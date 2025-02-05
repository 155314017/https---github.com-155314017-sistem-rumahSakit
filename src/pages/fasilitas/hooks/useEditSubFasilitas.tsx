import { useEffect, useState } from 'react';

import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from 'dayjs';
import axios from 'axios';
import Cookies from "js-cookie";
import { useParams, useNavigate } from 'react-router-dom';
import { editSubfacility } from '../../../services/ManageFacility/EditSubfacilityService';
import { FacilityServices } from '../../../services/ManageFacility/FacilityServices';
import { GetSubFacilityById } from '../../../services/ManageFacility/GetSubFacilityByIdServices';

type Facility = {
    id: string;
    name: string;
};

export default function useEditSubFasilitas() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [operationalTime, setOperationalTime] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
    const [errorAlert, setErrorAlert] = useState(false);
    const { id } = useParams();
    const [facilityOptions, setFacilityOptions] = useState<Facility[]>([]);
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [facilityId, setFacilityId] = useState<string>('');
    const [selectedDays, setSelectedDays] = useState<string>("1");

    const dayMapping: { [key: string]: number } = {
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 0,
    };

    useEffect(() => {
        if (startTime && endTime) {
            const dayOfWeek = startTime.format("dddd");
            const dayMapping: { [key: string]: string } = {
                "Monday": "1",
                "Tuesday": "2",
                "Wednesday": "3",
                "Thursday": "4",
                "Friday": "5",
                "Saturday": "6",
                "Sunday": "7"
            };

            const dayValue = dayMapping[dayOfWeek] || "7";
            setSelectedDays(dayValue);
            setSelectedDay(dayValue);
        }
    }, [startTime, endTime]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await GetSubFacilityById(id);
                setName(response.name || " ");
                setFacilityId(response.facilityDataId);
                if (response.schedules && response.schedules.length > 0) {
                    const schedule = response.schedules[0];
                    setStartTime(dayjs.unix(schedule.startDateTime));
                    setEndTime(dayjs.unix(schedule.endDateTime));
                }

            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchGedungData = async () => {
            try {
                const response = await FacilityServices();
                setFacilityOptions(response.map((item: Facility) => ({
                    id: item.id,
                    name: item.name,
                })));
            } catch (error) {
                console.error("Error fetching buildings:", error);
            }
        };
        fetchGedungData();
    }, []);

    const handleTambahHari = () => {
        const dateTime = selectedDay + " " + startTime?.format("HH:mm") + " - " + endTime?.format("HH:mm");
        setOperationalTime(dateTime);
    };

    const showTemporaryAlertSuccess = async () => {
        setSuccessAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessAlert(false);
    };

    const showTemporaryAlertError = async () => {
        setErrorAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setErrorAlert(false);
    };

    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "fasilitas", href: "/fasilitas" },
        { label: "Edit SubFasilitas", href: "/editSubFasilitas:id" },
    ];

    const formik = useFormik({
        initialValues: {
            masterFacilityId: facilityId,
            namaSubFasilitas: name,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            masterFacilityId: Yup.string().required('Facility is required'),
            namaSubFasilitas: Yup.string().required('SubFacility Name is required'),
        }),
        onSubmit: async (values) => {

            const selectedDayOfWeek = dayMapping[selectedDay || "5"];
            const adjustedStartTime = startTime?.day(selectedDayOfWeek);
            const adjustedEndTime = endTime?.day(selectedDayOfWeek);
            const schedules = [
                {
                    startDateTime: adjustedStartTime?.unix(),
                    endDateTime: adjustedEndTime?.unix(),
                }
            ];

            const data = {
                subfacilityId: id,
                name: values.namaSubFasilitas,
                facilityDataId: values.masterFacilityId,
                additionalInfo: "hai",
                schedules: schedules,
            };
            const token = Cookies.get("accessToken");
            try {
                await editSubfacility(data, token);
                formik.resetForm();
                navigate('/fasilitas', { state: { successEditSub: true, message: 'Fasilitas berhasil di edit!' } })
            } catch (error) {
                console.error('Error submitting form:', error);
                if (axios.isAxiosError(error)) {
                    showTemporaryAlertError();
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        },
    });

    return {
        breadcrumbItems,
        formData: formik,
        successAlert,
        errorAlert,
        operationalTime,
        selectedDay,
        startTime,
        endTime,
        handleTambahHari,
        selectedDays,
        showTemporaryAlertSuccess,
        setSelectedDay,
        facilityOptions,
        setEndTime,
        setStartTime

    }
}
