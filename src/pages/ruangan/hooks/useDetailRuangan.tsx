/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetRoomByIdServices } from "../../../services/Admin Tenant/ManageRoom/GetRoomByIdServices";
import { GetImageByParentId } from "../../../services/Admin Tenant/ManageImage/GetImageByParentIdService";
import { GetBuildingById } from "../../../services/Admin Tenant/ManageBuilding/GetBuildingByIdServices";
import { processImageResponse } from "../../../services/Admin Tenant/ManageImage/ImageUtils";



export default function useDetailRuangan() {
    const [roomName, setRoomName] = useState<string>("");
    const [roomType, setRoomType] = useState<string>("");
    const [deletedItems, setDeletedItems] = useState("");
    const [open, setOpen] = useState(false);
    const [roomId, setRoomId] = useState("");
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
            const response = await GetRoomByIdServices(id);
            setRoomId(response.id);
            setRoomName(response.name);
            setRoomType(response.type);
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
                const response = await GetBuildingById(buildingId);
                setBuildingName(response.name)
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
        roomName,
        roomType,
        deletedItems,
        open,
        roomId,
        largeImage,
        smallImage,
        loading,
        buildingName,
        breadcrumbItems,
        confirmationDelete,
        handleDeleteSuccess,
        navigate,
        setOpen
    }

}
