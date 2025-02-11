/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";

// icon

import { RoomServices } from "../../../services/Admin Tenant/ManageRoom/RoomServices";
import { useLocation, useNavigate } from "react-router-dom";
import { RoomDataItem } from "../../../types/room.types";

export const PAGE_SIZE = 10;

export default function useIndex() {
    const [roomData, setRoomData] = useState<RoomDataItem[]>([]);
    const location = useLocation();
    const navigate = useNavigate();
    const [successAddRoom, setSuccessAddRoom] = useState(false);
    const [successDeleteRoom, setSuccessDeleteRoom] = useState(false);
    const [successEditRoom, setSuccessEditRoom] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [orderBy, setOrderBy] = useState("createdDateTime=asc");
    const [totalElements, setTotalElements] = useState(0);
    const [dataIdBuilding, setDataIdBuilding] = useState<string[]>([]);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true)
            const result = await RoomServices(pageNumber, PAGE_SIZE, orderBy);
            setTotalElements(result.data.totalElements);
            setRoomData(result.data.content);
            const buildingIds = result.data.content.map((data: { masterBuildingId: string; }) => data.masterBuildingId);
            setDataIdBuilding(buildingIds);
        } catch (error) {
            console.error('Failed to fetch data from API' + error);
        } finally {
            setIsLoading(false);
        }
    }, [pageNumber, orderBy]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const handleLocationState = async () => {
            if (location.state) {
                if (location.state.successAdd) {
                    await showTemporaryAlertSuccess();
                } else if (location.state.successEdit) {
                    await showTemporarySuccessEdit();
                } else if (location.state.successDelete) {
                    await showTemporarySuccessDelete();
                }
                navigate(location.pathname, { replace: true, state: undefined });
                fetchData();
            }
        };

        handleLocationState();
    }, [location.state]);
    
    const showTemporaryAlertSuccess = async () => {
        setSuccessAddRoom(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessAddRoom(false);
    };

    const showTemporarySuccessDelete = async () => {
        setSuccessDeleteRoom(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessDeleteRoom(false);
    };

    const showTemporarySuccessEdit = async () => {
        setSuccessEditRoom(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessEditRoom(false);
    };


    return {
        roomData,
        successAddRoom,
        successDeleteRoom,
        successEditRoom,
        isLoading,
        showTemporarySuccessDelete,
        fetchData,
        totalElements,
        dataIdBuilding,
        setPageNumber,
        setOrderBy
    }
}
