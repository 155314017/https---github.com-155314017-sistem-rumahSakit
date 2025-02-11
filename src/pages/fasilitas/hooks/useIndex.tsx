/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { FacilityServices, FacilityDataItem } from "../../../services/Admin Tenant/ManageFacility/FacilityServices";
import { SubFacilityServices, SubFacilityDataItem } from "../../../services/Admin Tenant/ManageSubFacility/SubFacility";
import { useLocation, useNavigate } from "react-router-dom";

export const PAGE_SIZE = 10;

export default function useIndex() {
    const [dataFacility, setDataFacility] = useState<FacilityDataItem[]>([]);
    const [dataSubFacility, setDataSubFacility] = useState<SubFacilityDataItem[]>([]);
    //fasilitas
    const [successAddBuilding, setSuccessAddBuilding] = useState(false);
    const [successDeleteBuilding, setSuccessDeleteBuilding] = useState(false);
    const [successEditBuilding, setSuccessEditBuilding] = useState(false);
    const [pageNumberFacility, setPageNumberFacility] = useState(0);
    const [orderByFacility, setOrderByFacility] = useState("createdDateTime=asc");
    const [totalElementsFacility, setTotalElementsFacility] = useState(0);
    //sub
    const [successAddSub, setSuccessAddSub] = useState(false);
    const [successDeleteSub, setSuccessDeleteSub] = useState(false);
    const [successEditSub, setSuccessEditSub] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();



    const fetchDataFacility = useCallback(async () => {
        setIsLoading(true)
        try {
            const resultFacility = await FacilityServices(pageNumberFacility, PAGE_SIZE, orderByFacility);
            setDataFacility(resultFacility.data.content);
            setTotalElementsFacility(resultFacility.data.totalElements);
            setIsLoading(false)
        } catch (error) {
            console.error('Failed to fetch data from API' + error);
        }
    }, [pageNumberFacility, orderByFacility]);
    useEffect(() => {
        fetchDataFacility();
    }, []);


    const fetchDataSubFacility = async () => {
        try {
            const resultSubFacility = await SubFacilityServices();
            setDataSubFacility(resultSubFacility);
        } catch (error) {
            console.error('Failed to fetch data from API' + error);
        }
    };
    useEffect(() => {
        fetchDataSubFacility();
    }, []);


    //Fasilitas
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

    const showTemporaryAlertSuccess = async () => {
        setSuccessAddBuilding(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessAddBuilding(false);
    };

    const showTemporarySuccessDelete = async () => {
        setSuccessDeleteBuilding(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessDeleteBuilding(false);
    };

    const showTemporarySuccessEdit = async () => {
        setSuccessEditBuilding(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessEditBuilding(false);
    };



    //Sub Fasilitas
    useEffect(() => {
        if (location.state && location.state.successAddSub) {
            showTemporaryAlertSuccessSub();
            navigate(location.pathname, { replace: true, state: undefined });
        }
    }, [location.state, navigate]);

    useEffect(() => {
        if (location.state && location.state.successEditSub) {
            showTemporarySuccessEditSub();
            navigate(location.pathname, { replace: true, state: undefined });
        }
    }, [location.state, navigate]);

    const showTemporaryAlertSuccessSub = async () => {
        setSuccessAddSub(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessAddSub(false);
    };

    const showTemporarySuccessDeleteSub = async () => {
        setSuccessDeleteSub(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessDeleteSub(false);
    };

    const showTemporarySuccessEditSub = async () => {
        setSuccessEditSub(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessEditSub(false);
    };
    return {
        dataFacility,
        dataSubFacility,
        fetchDataFacility,
        fetchDataSubFacility,
        successAddBuilding,
        successDeleteBuilding,
        successEditBuilding,
        successAddSub,
        successDeleteSub,
        successEditSub,
        isLoading,
        showTemporaryAlertSuccess,
        showTemporarySuccessDelete,
        showTemporarySuccessEdit,
        showTemporaryAlertSuccessSub,
        showTemporarySuccessDeleteSub,
        showTemporarySuccessEditSub,
        totalElementsFacility,
        setOrderByFacility,
        setPageNumberFacility,
    }
}
