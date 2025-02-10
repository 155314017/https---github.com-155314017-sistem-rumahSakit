/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

// icon

import { RoomServices, RoomDataItem } from "../../../services/Admin Tenant/ManageRoom/RoomServices";
import { useLocation, useNavigate } from "react-router-dom";

export default function useIndex() {
    const [data, setData] = useState<RoomDataItem[]>([]);
    const location = useLocation();
    const navigate = useNavigate();
    const [successAddRoom, setSuccessAddRoom] = useState(false);
    const [successDeleteRoom, setSuccessDeleteRoom] = useState(false);
    const [successEditRoom, setSuccessEditRoom] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const result = await RoomServices();
            setData(result);
            setIsLoading(false)
        } catch (error) {
            console.error('Failed to fetch data from API' + error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (location.state && location.state.successAdd) {
            showTemporaryAlertSuccess();
            navigate(location.pathname, { replace: true, state: undefined });
        }
    }, [location.state, navigate]);

    useEffect(() => {
        if (location.state && location.state.successEdit) {
            showTemporarySuccessEdit();
            navigate(location.pathname, { replace: true, state: undefined });
        }
    }, [location.state, navigate]);

    useEffect(() => {
        if (location.state && location.state.successDelete) {
            showTemporarySuccessEdit();
            navigate(location.pathname, { replace: true, state: undefined });
        }
    }, [location.state, navigate]);

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
        data,
        successAddRoom,
        successDeleteRoom,
        successEditRoom,
        isLoading,
        showTemporarySuccessDelete,
        fetchData
    }
}
