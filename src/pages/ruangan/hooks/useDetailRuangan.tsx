import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { GetRoomByIdServices } from "../../../services/Admin Tenant/ManageRoom/GetRoomByIdServices";
import { GetImageByParentId } from "../../../services/Admin Tenant/ManageImage/GetImageByParentIdService";
import { processImageResponse } from "../../../services/Admin Tenant/ManageImage/ImageUtils";

// type ImageData = {
//     imageName: string;
//     imageType: string;
//     imageData: string;
// };

export default function useDetailRuangan() {
    const [name, setName] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [deletedItems, setDeletedItems] = useState("");
    const [open, setOpen] = useState(false);
    const [ids, setIds] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const [largeImage, setLargeImage] = useState<string>("");
    const [smallImage, setSmallImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [buildingId, setBuildingId] = useState<string>("")
    const [buildingName, setBuildingName] = useState<string>("")


    const breadcrumbItems = [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Ruangan",
            href: "/ruangan",
        },
        {
            label: "Detail Ruangan",
            href: "/detailRuangan",
        },
    ];

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = Cookies.get("accessToken");
            const response = await GetRoomByIdServices(id, token);
            setIds(response.id);
            setName(response.name);
            setType(response.type);
            setBuildingId(response.masterBuildingId);

            if (response.id) {
                const imageResponse = await GetImageByParentId(response.id);
                const { largeImage, smallImages } = processImageResponse(imageResponse);
                setLargeImage(largeImage);
                setSmallImages(smallImages);
            }

            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);


    useEffect(() => {
        const fetchDataBuildings = async () => {
            try {
                const token = Cookies.get("accessToken");
                const response = await axios.get(
                    `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/building/${buildingId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            accessToken: `${token}`,
                        }
                    }
                );
                setBuildingName(response.data.data.name)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchDataBuildings();
    }, [buildingId]);


    const handleDeleteSuccess = () => {
        setOpen(false);
        navigate('/ruangan', { state: { successDelete: true, message: 'Ruangan berhasil dihapus!' } });
    };

    const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, buildingId: string) => {
        event.preventDefault();
        setDeletedItems(buildingId);
        setOpen(true);
    };

    return {
        name,
        type,
        deletedItems,
        open,
        ids,
        largeImage,
        smallImage,
        loading,
        buildingId,
        buildingName,
        breadcrumbItems,
        confirmationDelete,
        handleDeleteSuccess,
        navigate,
        setOpen
    }
        
}
