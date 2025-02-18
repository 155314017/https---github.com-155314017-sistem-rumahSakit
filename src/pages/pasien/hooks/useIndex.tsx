import { useEffect, useRef, useState } from "react";


// icon
import { PatientServices } from '../../../services/ManagePatient/PatientServices';
import { useLocation, useNavigate } from "react-router-dom";
import { PatientDataItem } from "../../../types/patient.types";
import { useFetchData } from "../../../hooks/useFetchData";
import useDebounce from "../../../hooks/useDebounce";
import { useSuccessNotification } from "../../../hooks/useSuccessNotification";


export const PAGE_SIZE = 10;
export default function useIndex() {
  const [pageNumber, setPageNumber] = useState(0);
  const [orderBy, setOrderBy] = useState("createdDateTime=asc");
  const [searchItem, setSearchItem] = useState("");
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  const { data, totalElements, loading, error, refetch } = useFetchData<PatientDataItem[]>(
      PatientServices,
      [pageNumber, PAGE_SIZE, orderBy, searchItem],
      false
    );

    const hasFetched = useRef(false);
    useEffect(() => {
      if (!hasFetched.current) {
        refetch();
        hasFetched.current = true;
      }
    }, [refetch]);
  
    const debouncedSearchItem = useDebounce(searchItem, 300);
  
    useEffect(() => {
      if (debouncedSearchItem !== searchItem) {
        refetch();
      }
    }, [debouncedSearchItem, refetch, searchItem]);

     const handleSearchChange = (newSearchValue: string) => {
        setSearchItem(newSearchValue);
      };
    
      // membuat notif aler menggunakan useSuccessNotification 
      const { isSuccess, message, showAlert } = useSuccessNotification();

  useEffect(() => {
    const handleLocationState = async () => {
      if (location.state) {
        if (location.state.successAdd) {
          await showAlert("Patient added successfully! ");
        } else if (location.state.successEdit) {
          await showAlert("Patient edited successfully!");
        } else if (location.state.successDelete) {
          await showAlert("Patient deleted successfully!");
        }
        navigate(location.pathname, { replace: true, state: undefined });
      }
    };

    handleLocationState();
  }, [location.pathname, location.state, navigate, showAlert]);

  return {
    data,
    loading,
    refetch,
    pageNumber,
    setPageNumber,
    orderBy,
    setOrderBy,
    totalElements,
    PAGE_SIZE,
    handleSearchChange,
    error,
    isSuccess,
    message,
    fetchData: refetch,
    showAlert,
    setOpen,
    open

  }
}
