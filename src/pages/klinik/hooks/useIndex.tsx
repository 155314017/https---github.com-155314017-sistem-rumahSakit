


import { useEffect, useState } from "react";
import { Clinic, ClinicDataItem } from "../../../services/Admin Tenant/ManageClinic/Clinic";
import { useLocation, useNavigate } from "react-router-dom";


export default function useIndex() {
    const [data, setData] = useState<ClinicDataItem[]>([]);
    const [successAddBuilding, setSuccessAddBuilding] = useState(false);
    const [successDeleteBuilding, setSuccessDeleteBuilding] = useState(false);
    const [successEditBuilding, setSuccessEditBuilding] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();


    const fetchData = async () => {
        setIsLoading(true)
        try {
            const result = await Clinic();
            setData(result);
            setIsLoading(false)
        } catch (error) {
            console.log('Failed to fetch data from API' + error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (location.state && location.state.successAdd) {
            showTemporaryAlertSuccess();
            navigate(location.pathname, { replace: true, state: undefined }); //clear state
        }
    }, [location.state, navigate]);

    useEffect(() => {
        if (location.state && location.state.successEdit) {
            showTemporarySuccessEdit();
            navigate(location.pathname, { replace: true, state: undefined }); //clear state
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
  return {
    data,
    successAddBuilding,
    successDeleteBuilding,
    successEditBuilding,
    isLoading,
    showTemporaryAlertSuccess,
    showTemporarySuccessDelete,
    showTemporarySuccessEdit,
    fetchData
  }
}