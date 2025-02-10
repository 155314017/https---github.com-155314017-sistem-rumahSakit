


import { useEffect, useState } from "react";
import { Clinic, ClinicDataItem } from "../../../services/Admin Tenant/ManageClinic/Clinic";
import { useLocation, useNavigate } from "react-router-dom";


export default function useIndex() {
    const [data, setData] = useState<ClinicDataItem[]>([]);
    const [successAddClinic, setSuccessAddClinic] = useState(false);
    const [successDeleteClinic, setSuccessDeleteClinic] = useState(false);
    const [successEditClinic, setSuccessEditClinic] = useState(false);
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
            console.error('Failed to fetch data from API' + error);
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
        setSuccessAddClinic(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessAddClinic(false);
    };

    const showTemporarySuccessDelete = async () => {
        setSuccessDeleteClinic(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessDeleteClinic(false);
    };

    const showTemporarySuccessEdit = async () => {
        setSuccessEditClinic(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessEditClinic(false);
    };
  return {
    data, 
    isLoading, 
    fetchData, 
    successAddClinic, 
    successDeleteClinic, 
    successEditClinic, 
    showTemporarySuccessDelete
  }
}
