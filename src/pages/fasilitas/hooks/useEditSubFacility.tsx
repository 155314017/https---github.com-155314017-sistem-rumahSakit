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
import { useFetchData } from '../../../hooks/useFetchData'
import { subFacilityDataItem } from '../../../types/subFacility.types'
import { useSuccessNotification } from '../../../hooks/useSuccessNotification'

type Facility = {
    id: string;
    name: string;
};

type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
}

export default function useEditSubFacility() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [imagesData, setImagesData] = useState<ImageData[]>([])
    const kalenderRef = useRef<{ getData: () => KalenderData }>(null);
    const { id } = useParams()
    const [scheduleDataPraktek, setScheduleDataPraktek] = useState<ScheduleDataItem[] | null>(null);
    const [scheduleDataPengecualian, setScheduleDataPengecualian] = useState<ExclusionDataItem[] | null>(null);
    const [facilityOptions, setFacilityOptions] = useState<Facility[]>([]);
    const [name, setName] = useState<string>('');
    const [facilityId, setFacilityId] = useState<string>('');
    const { isSuccess, message, showAlert } = useSuccessNotification();

    const navigate = useNavigate()

    interface FormValues {
        namaSubFasilitas: string,
        masterFacilityId: string,
    }

    const { data: scheduleResponse } = useFetchData(
        GetScheduleByTypeId,
        [id],
        true
    );

    const { data: scheduleExclusionResponse } = useFetchData(
        GetExclusionByTypeId,
        [id],
        true
    );

    const { data: facilityDataResponse } = useFetchData<subFacilityDataItem>(
        GetSubFacilityById,
        [id],
        true
    );

    const { data: facilitygData } = useFetchData<Facility[]>(
        FacilityServices,
        [],
        true
    );

    useEffect(() => {
        if (facilityDataResponse) {
            setName(facilityDataResponse.name);
            setFacilityId(facilityDataResponse.facilityDataId);
        }
        if (scheduleResponse) {
            setScheduleDataPraktek(Array.isArray(scheduleResponse) ? scheduleResponse : []);
        }
        if (scheduleExclusionResponse) {
            setScheduleDataPengecualian(Array.isArray(scheduleExclusionResponse) ? scheduleExclusionResponse : []);
        }
        if (facilitygData) {
            setFacilityOptions(facilitygData.map((item: Facility) => ({
                id: item.id,
                name: item.name,
            })));
        }
    }, [facilityDataResponse])

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

    const handleEditSubFacility = async () => {
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
            showAlert("SubFacility failed to update!", 3000);
        }
    };


    const breadcrumbItems = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Fasilitas', href: '/fasilitas' },
        { label: 'Edit SubFasilitas', href: `/editFasilitas/${id}` }
    ]

    const tabs = [
        { pageNumber: 1, label: 'Informasi SubFasilitas' },
        { pageNumber: 2, label: 'Jam Operasional' },
    ];


    return {
        formik,
        handleImageChange,
        imagesData,
        breadcrumbItems,
        id,
        currentPage,
        setCurrentPage,
        handleEditSubFacility,
        kalenderRef,
        scheduleDataPraktek,
        scheduleDataPengecualian,
        facilityOptions,
        tabs,
        message,
        isSuccess
    }
}



