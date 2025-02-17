/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import 'dayjs/locale/id'
import { useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { GetScheduleByTypeId } from '../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices'
import { createSchedules, KalenderData, validateInput } from '../../../services/Admin Tenant/ManageSchedule/ScheduleUtils'
import { createExclusions } from '../../../services/Admin Tenant/ManageSchedule/ScheduleUtils'
import { ScheduleDataItem } from '../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices'
import { ExclusionDataItem, GetExclusionByTypeId } from '../../../services/Admin Tenant/ManageSchedule/GetExclusionByTypeIdServices'
import { FacilityServices } from '../../../services/Admin Tenant/ManageFacility/FacilityServices'
import { GetSubFacilityById } from '../../../services/Admin Tenant/ManageSubFacility/GetSubFacilityByIdServices'
import { editSubfacility } from '../../../services/Admin Tenant/ManageSubFacility/EditSubfacilityService'


type Facility = {
    id: string;
    name: string;
};

type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
}

export default function useEditSubFasilitas() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [imagesData, setImagesData] = useState<ImageData[]>([])
    const [errorAlert, setErrorAlert] = useState(false)
    const kalenderRef = useRef<{ getData: () => KalenderData }>(null);
    const { id } = useParams()
    const [scheduleDataPraktek, setScheduleDataPraktek] = useState<ScheduleDataItem[] | null>(null);
    const [scheduleDataPengecualian, setScheduleDataPengecualian] = useState<ExclusionDataItem[] | null>(null);
    const [facilityOptions, setFacilityOptions] = useState<Facility[]>([]);
    const [name, setName] = useState<string>('');
    const [facilityId, setFacilityId] = useState<string>('');


    const navigate = useNavigate()

    interface FormValues {
        namaSubFasilitas: string,
        masterFacilityId: string,
    }


    useEffect(() => {
        const fetchDataSchedule = async () => {
            try {
                const scheduleResponse = await GetScheduleByTypeId(id || "");
                const exclusionResponse = await GetExclusionByTypeId(id || "");
                if (scheduleResponse) {
                    setScheduleDataPraktek(scheduleResponse);
                }

                if (exclusionResponse) {
                    setScheduleDataPengecualian(exclusionResponse);
                }

            } catch (error) {
                console.error('Error:', error);
            }

        };
        fetchDataSchedule();
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

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await GetSubFacilityById(id);
                setName(response.name || " ");
                setFacilityId(response.facilityDataId);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [id]);

    const showTemporaryAlertError = async () => {
        setErrorAlert(true)
        await new Promise(resolve => setTimeout(resolve, 3000))
        setErrorAlert(false)
    }


    const formik = useFormik<FormValues>({
        initialValues: {
            masterFacilityId: facilityId,
            namaSubFasilitas: name,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            operationalCost: Yup.number()
                .required('Biaya penangan wajib diisi')
                .positive('Nilai harus positif')
        }),
        onSubmit: async () => {
        }
    })


    const handleImageChange = (images: ImageData[]) => {
        setImagesData(images)
    }

    const getPageStyle = (page: number) => {
        if (page === currentPage) {
            return { color: "#8F85F3", cursor: "pointer", fontWeight: "bold" };
        } else if (page < currentPage) {
            return { color: "#8F85F3", cursor: "pointer" };
        } else {
            return { color: "black", cursor: "pointer" };
        }
    };

    const getBorderStyle = (page: number) => {
        if (page === currentPage) {
            return {
                display: "flex",
                border: "1px solid #8F85F3",
                width: "38px",
                height: "38px",
                borderRadius: "8px",
                justifyContent: "center",
                alignItems: "center",
            };
        } else if (page < currentPage) {
            return {
                display: "flex",
                border: "1px solid #8F85F3",
                width: "38px",
                height: "38px",
                borderRadius: "8px",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#8F85F3",
                color: "white",
            };
        } else {
            return {
                display: "flex",
                border: "1px solid #8F85F3",
                width: "38px",
                height: "38px",
                borderRadius: "8px",
                justifyContent: "center",
                alignItems: "center",
                color: "#8F85F3",
            };
        }
    };

    const handleEditSubFasilitas = async () => {
        try {
            const kalenderData = kalenderRef.current?.getData() || { praktek: [], exclusion: [] };
            validateInput(kalenderData);
            const data = {
                subfacilityId: id,
                name: formik.values.namaSubFasilitas,
                facilityDataId: formik.values.masterFacilityId,
                additionalInfo: "hai",
            };

            // Edit subfasilitas
            const { data: { id: subfacilityId } } = await editSubfacility(data);
            if (!subfacilityId) throw new Error('SubFasilitas ID tidak ditemukan');

            // Pisahkan data praktek yang baru (yang memiliki id dengan format 'session-')
            const newPraktekData = kalenderData.praktek.filter(item => item.id.startsWith('session-'));

            // Pisahkan data exclusion yang baru (yang memiliki id dengan format 'exclusion-')
            const newExclusionData = kalenderData.exclusion.filter(item => item.id.startsWith('exclusion-'));

            // Proses data baru secara parallel jika ada
            const promises = [];

            if (newPraktekData.length > 0) {
                promises.push(createSchedules(subfacilityId, newPraktekData));
            }

            if (newExclusionData.length > 0) {
                promises.push(createExclusions(subfacilityId, newExclusionData));
            }

            if (promises.length > 0) {
                await Promise.all(promises);
            }

            formik.resetForm();
            setImagesData([]);

            navigate('/fasilitas', {
                state: {
                    successAdd: true,
                    message: 'Fasilitas berhasil diperbarui!'
                }
            });
        } catch (error) {
            console.error('[DEBUG] Error saat menyimpan SubFasilitas:', error);
            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data;
                console.error('[DEBUG] Detail error dari server:', responseData || error.message);
            }
            showTemporaryAlertError();
        }
    };


    const breadcrumbItems = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Fasilitas', href: '/fasilitas' },
        { label: 'Edit SubFasilitas', href: `/editFasilitas/${id}` }
    ]

    return {
        formik,
        handleImageChange,
        imagesData,
        errorAlert,
        breadcrumbItems,
        id,
        currentPage,
        setCurrentPage,
        getPageStyle,
        getBorderStyle,
        handleEditSubFasilitas,
        kalenderRef,
        scheduleDataPraktek,
        scheduleDataPengecualian,
        facilityOptions
    }
}



