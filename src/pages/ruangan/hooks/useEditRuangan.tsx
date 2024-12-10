import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { editRoom } from '../../../services/Admin Tenant/ManageRoom/EditRoomService';

interface FormValues {
    namaKlinik: string;
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

const jenisRuangan = [
    { value: 1, label: "VIP" },
    { value: 2, label: "Kelas 1" },
    { value: 3, label: "Kelas 2" },
    { value: 4, label: "Kelas 3" },
    { value: 5, label: "BPJS" },
];

export default function useEditRuangan() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [apiUrl, setApiUrl] = useState('');
    const { id } = useParams();
    const [gedungOptions, setGedungOptions] = useState<Building[]>([]);
    const [roomName, setRoomName] = useState<string>('');
    const [buildingName, setBuildingName] = useState('');
    const [roomType, setRoomType] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchGedungData = async () => {
            try {
                const response = await axios.get('https://hms.3dolphinsocial.com:8083/v1/manage/building/?pageNumber=0&pageSize=10&orderBy=createdDateTime=asc', {
                    timeout: 10000
                });
                setGedungOptions(response.data.data.content.map((item: Building) => ({
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
            setLoading(true);
            try {
                const token = Cookies.get("accessToken");
                const response = await axios.get(`https://hms.3dolphinsocial.com:8083/v1/manage/room/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    }
                });
                setApiUrl(`https://hms.3dolphinsocial.com:8083/v1/manage/room/${id}`);
                setRoomName(response.data.data.name);
                setRoomType(response.data.data.type);

                const buildingResponse = await axios.get(`https://hms.3dolphinsocial.com:8083/v1/manage/building/${response.data.data.masterBuildingId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    }
                });

                setBuildingName(buildingResponse.data.data.id);  // Store the building ID instead of name
            } catch (error) {
                console.error('Error fetching room data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const formik = useFormik<FormValues>({
        initialValues: {
            namaKlinik: roomName,
            masterBuildingId: buildingName,
            jenisRuangan: roomType,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            namaKlinik: Yup.string().required('Nama Ruangan is required'),
            masterBuildingId: Yup.string().required('Gedung is required'),
            jenisRuangan: Yup.string().required('Jenis Ruangan is required'),
        }),
        onSubmit: async (values) => {
            const data = {
                roomId: id,
                name: values.namaKlinik,
                masterBuildingId: values.masterBuildingId,
                type: values.jenisRuangan,
                additionalInfo: "add info,",
                images: imagesData,
            };

            const token = Cookies.get("accessToken");
            try {
                await editRoom(data, token);
                setSuccessAlert(true);
                navigate('/ruangan', { state: { successEdit: true, message: 'Ruangan berhasil di edit!' } })
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
        loading,
        apiUrl,
        gedungOptions,
        jenisRuangan
    }
}
