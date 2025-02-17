/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

// icon

import { RoomServices } from "../../../services/Admin Tenant/ManageRoom/RoomServices";
import { useLocation, useNavigate } from "react-router-dom";
import { RoomDataItem } from "../../../types/room.types";
import { useFetchData } from "../../../hooks/useFetchData";
import { useSuccessNotification } from "../../../hooks/useSuccessNotification";

export const PAGE_SIZE = 10;

export default function useIndex() {
    const location = useLocation();
    const navigate = useNavigate();
    const [pageNumber, setPageNumber] = useState(0);
    const [orderBy, setOrderBy] = useState("createdDateTime=asc");
    const [dataIdBuilding, setDataIdBuilding] = useState<string[]>([]);

    const {
        data: dataRoom,
        totalElements: totalElements,
        loading: isLoading,
        refetch: refetchRooms
    } = useFetchData<RoomDataItem[]>(
        RoomServices,
        [pageNumber, PAGE_SIZE, orderBy],
        true,
        false
    );

    const hasFetched = useRef(false);
    useEffect(() => {
        if (!hasFetched.current) {
            refetchRooms();
            hasFetched.current = true;
        }
    }, [refetchRooms]);

    useEffect(() => {
        if (dataRoom) {
            setDataIdBuilding(dataRoom.map((data: { masterBuildingId: string; }) => data.masterBuildingId));
        }
    }, [dataRoom]);

    const { isSuccess, message, showAlert } = useSuccessNotification();

    useEffect(() => {
        const handleLocationState = async () => {
            if (location.state) {
                if (location.state.successAdd) {
                    await showAlert("Room added successfully! ");
                } else if (location.state.successEdit) {
                    await showAlert("Room edited successfully!");
                } else if (location.state.successDelete) {
                    await showAlert("Room deleted successfully! 3");
                }
                navigate(location.pathname, { replace: true, state: undefined });
            }
        };

        handleLocationState();
    }, [location.pathname, location.state, navigate, showAlert]);



    return {
        dataRoom,
        isLoading,
        showAlert,
        message,
        isSuccess,
        fetchData: refetchRooms,
        totalElements,
        dataIdBuilding,
        setPageNumber,
        setOrderBy
    }
}
