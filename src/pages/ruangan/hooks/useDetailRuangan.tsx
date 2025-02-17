/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetRoomByIdServices } from "../../../services/Admin Tenant/ManageRoom/GetRoomByIdServices";
import { GetImageByParentId } from "../../../services/Admin Tenant/ManageImage/GetImageByParentIdService";
import { GetBuildingById } from "../../../services/Admin Tenant/ManageBuilding/GetBuildingByIdServices";
import { processImageResponse } from "../../../services/Admin Tenant/ManageImage/ImageUtils";
import { RoomDataItem } from "../../../types/room.types";
import { useFetchData } from "../../../hooks/useFetchData";
import { BuildingDataItem } from "../../../types/building.types";

export default function useDetailRuangan() {
    const [roomName, setRoomName] = useState<string>("");
    const [roomType, setRoomType] = useState<string>("");
    const [deletedItems, setDeletedItems] = useState("");
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [largeImage, setLargeImage] = useState<string>("");
    const [smallImage, setSmallImages] = useState<string[]>([]);
    const [buildingId, setBuildingId] = useState<string>("");
    const [buildingName, setBuildingName] = useState<string>("");

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

    const { data: roomData, loading: roomLoading } = useFetchData<RoomDataItem>(
        GetRoomByIdServices,
        [id],
        true,
        false
    );

    const { data: buildingData, loading: buildingLoading, refetch: refetchBuilding } = useFetchData<BuildingDataItem>(
        GetBuildingById,
        [buildingId],
        false,
        false
    );

    const { data: imageData, loading: imageLoading, refetch: refetchImage } = useFetchData(
        GetImageByParentId,
        [roomData?.id],
        false,
        true
    );

    useEffect(() => {
        if (roomData) {
            setRoomName(roomData.name);
            setRoomType(roomData.type);
            setBuildingId(roomData.masterBuildingId);
            if (roomData.id) {
                refetchImage();
            }
        }
    }, [roomData]);

    useEffect(() => {
        if (buildingId) {
            refetchBuilding();
        }
    }, [buildingId, refetchBuilding]);

    useEffect(() => {
        if (buildingData) {
            setBuildingName(buildingData.name);
        }
    }, [buildingData]);

    useEffect(() => {
        if (imageData) {
            const { largeImage, smallImages } = processImageResponse(imageData);
            setLargeImage(largeImage);
            setSmallImages(smallImages || []);
        }
    }, [imageData]);

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
        largeImage,
        smallImage,
        loading: roomLoading || imageLoading || buildingLoading,
        buildingName,
        breadcrumbItems,
        confirmationDelete,
        handleDeleteSuccess,
        navigate,
        setOpen,
        id,
        setBuildingName,
    };
}
