/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FacilityServices, } from "../../../services/Admin Tenant/ManageFacility/FacilityServices";
import { SubFacilityServices } from "../../../services/Admin Tenant/ManageSubFacility/SubFacility";
import { useLocation, useNavigate } from "react-router-dom";
import { FacilityDataItem } from "../../../types/Facility.types";
import { subFacilityDataItem } from "../../../types/subFacility.types";
import { useFetchData } from "../../../hooks/useFetchData";
import { useSuccessNotification } from "../../../hooks/useSuccessNotification";

export const PAGE_SIZE = 10;

export default function useIndex() {
    //fasilitas
    const [pageNumberFacility, setPageNumberFacility] = useState(0);
    const [orderByFacility, setOrderByFacility] = useState("createdDateTime=asc");
    //sub
    const location = useLocation();
    const navigate = useNavigate();

    const { data: dataFacility, totalElements: totalElementsFacility, loading: isLoading, refetch: refetchFacility } = useFetchData<FacilityDataItem[]>(
        FacilityServices,
        [pageNumberFacility, PAGE_SIZE, orderByFacility],
        true,
        false
    );

    const { data: dataSubFacility, totalElements: totalElementsSubfacility, loading: isLoadingSub, refetch: refetchSub } = useFetchData<subFacilityDataItem[]>(
        SubFacilityServices,
        [],
        true,
        false
    );

    const { isSuccess, message, showAlert } = useSuccessNotification();

    //Fasilitas
    useEffect(() => {
        const handleLocationState = async () => {
            if (location.state) {
                if (location.state.successAdd) {
                    await showAlert("Building added successfully! ");
                } else if (location.state.successEdit) {
                    await showAlert("Building edited successfully!");
                } else if (location.state.successDelete) {
                    await showAlert("Building deleted successfully! 3");
                }
                navigate(location.pathname, { replace: true, state: undefined });
            }
        };

        handleLocationState();
    }, [location.pathname, location.state, navigate, showAlert]);
    //Sub Fasilitas

    useEffect(() => {
        const handleLocationState = async () => {
            if (location.state) {
                if (location.state.successAddSub) {
                    await showAlert("Sub Facility added successfully! ");
                } else if (location.state.successEditSub) {
                    await showAlert("Sub Facility edited successfully!");
                } else if (location.state.successDeleteSub) {
                    await showAlert("Sub Facility deleted successfully! 3");
                }
                navigate(location.pathname, { replace: true, state: undefined });
            }
        };

        handleLocationState();
    }, [location.pathname, location.state, navigate, showAlert]);


    return {
        dataFacility,
        dataSubFacility,
        refetchFacility,
        refetchSub,
        isLoading: isLoadingSub || isLoading,
        totalElementsFacility,
        setOrderByFacility,
        setPageNumberFacility,
        totalElementsSubfacility,
        isSuccess,
        message,
        showAlert
    }
}
