/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup";
import { editImages } from '../../../services/Admin Tenant/ManageImage/ImageUtils';
import { editRoom } from '../../../services/Admin Tenant/ManageRoom/EditRoomService';
import { useFetchData } from '../../../hooks/useFetchData';
// import { GetBuildingById } from '../../../services/Admin Tenant/ManageBuilding/GetBuildingByIdServices';
import { GetRoomByIdServices } from '../../../services/Admin Tenant/ManageRoom/GetRoomByIdServices';
import { Building } from "../../../services/Admin Tenant/ManageBuilding/Building";

interface FormValues {
    namaRuangan: string;
    masterBuildingId: string;
    jenisRuangan: string;
}

type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
};

type Building = {
    id: string;
    name: string;
};

export default function useEditRuangan() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const { id } = useParams();
    const [gedungOptions, setGedungOptions] = useState<Building[]>([]);
    const [roomName, setRoomName] = useState<string>('');
    const [buildingName, setBuildingName] = useState('');
    const [roomType, setRoomType] = useState('');
    const navigate = useNavigate();

    const { data: building, refetch: fetchBuilding } = useFetchData<Building[]>(
        Building, [], false
    );

    const { data: roomData, loading: roomLoading } = useFetchData<any>(
        GetRoomByIdServices, [id], true
    );


    useEffect(() => {
        if (roomData) {
            fetchBuilding()
            setRoomName(roomData.name);
            setRoomType(roomData.type);
            setBuildingName(roomData.masterBuildingId);
        }
    }, [roomData, fetchBuilding]);

    useEffect(() => {
        if (building) {
            setGedungOptions(building.map((item: Building) => ({
                id: item.id,
                name: item.name,
            })));
        }
    }, [building]);


    const formik = useFormik<FormValues>({
        initialValues: {
            namaRuangan: roomName,
            masterBuildingId: buildingName,
            jenisRuangan: roomType,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            namaRuangan: Yup.string().required('Nama Ruangan wajib diisi'),
            masterBuildingId: Yup.string().required('Gedung wajib diisi'),
            jenisRuangan: Yup.string().required('Jenis Ruangan wajib diisi'),
        }),
        onSubmit: async (values) => {
            const data = {
                roomId: id,
                name: values.namaRuangan,
                masterBuildingId: values.masterBuildingId,
                type: values.jenisRuangan,
                additionalInfo: "add info,",
            };

            try {
                await editRoom(data);
                await editImages(id || "", imagesData);

                setSuccessAlert(true);
                navigate('/ruangan', { state: { successEdit: true, message: 'Ruangan berhasil di edit!' } });
            } catch (error) {
                console.error('Error editing room:', error);
                setErrorAlert(true);
            }
        },
    });

    const handleImageChange = (images: ImageData[]) => {
        setImagesData(images);
    };

    return {
        formik,
        handleImageChange,
        successAlert,
        errorAlert,
        loading: roomLoading,
        gedungOptions,
        id
    }
}
