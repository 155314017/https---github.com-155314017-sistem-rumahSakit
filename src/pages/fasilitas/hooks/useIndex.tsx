import { useEffect, useState } from "react";
import { FacilityServices, FacilityDataItem } from "../../../services/ManageFacility/FacilityServices";
import { SubFacilityServices, SubFacilityDataItem } from "../../../services/ManageSubFacility/SubFacility";
import { useLocation, useNavigate } from "react-router-dom";



export default function useIndex() {
    const [data, setData] = useState<FacilityDataItem[]>([]);
    const [data1, setData1] = useState<SubFacilityDataItem[]>([]);
    //fasilitas
    const [successAddBuilding, setSuccessAddBuilding] = useState(false);
    const [successDeleteBuilding, setSuccessDeleteBuilding] = useState(false);
    const [successEditBuilding, setSuccessEditBuilding] = useState(false);
    //sub
    const [successAddSub, setSuccessAddSub] = useState(false);
    const [successDeleteSub, setSuccessDeleteSub] = useState(false);
    const [successEditSub, setSuccessEditSub] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();



    const fetchDataFacility = async () => {
        setIsLoading(true)
        try {
            const result = await FacilityServices();
            setData(result);
            setIsLoading(false)
        } catch (error) {
            console.error('Failed to fetch data from API' + error);
        }
    };
    useEffect(() => {
        fetchDataFacility();
    }, []);


    const fetchDataSubFacility = async () => {
        try {
            const result1 = await SubFacilityServices();
            setData1(result1);
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

    

    //Sub Fasilitas

    useEffect(() => {
        if (location.state && location.state.successAddSub) {
            showTemporaryAlertSuccessSub();
            navigate(location.pathname, { replace: true, state: undefined }); //clear state
        }
    }, [location.state, navigate]);

    useEffect(() => {
        if (location.state && location.state.successEditSub) {
            showTemporarySuccessEditSub();
            navigate(location.pathname, { replace: true, state: undefined }); //clear state
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
    data,
    data1,
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
    showTemporarySuccessEditSub
  }
}
