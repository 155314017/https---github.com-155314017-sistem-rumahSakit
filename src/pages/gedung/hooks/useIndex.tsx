import { useEffect, useState } from "react";
import { Building, BuildingDataItem } from "../../../services/Admin Tenant/ManageBuilding/Building";
import { useLocation, useNavigate } from 'react-router-dom';


export default function useIndex() {
    const [data, setData] = useState<BuildingDataItem[]>([]);
  const [successAddBuilding, setSuccessAddBuilding] = useState(false);
  const [successDeleteBuilding, setSuccessDeleteBuilding] = useState(false);
  const [successEditBuilding, setSuccessEditBuilding] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await Building();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.log('Failed to fetch data from API', error);
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

  useEffect(() => {
    if (location.state && location.state.successDelete) {
      showTemporarySuccessDelete();
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
    loading,
    fetchData,
    showTemporaryAlertSuccess,
    showTemporarySuccessDelete,
    showTemporarySuccessEdit
  }
}
