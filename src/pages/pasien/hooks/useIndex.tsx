import { useEffect, useState } from "react";


// icon
import { PatientDataItem, PatientServices } from '../../../services/ManagePatient/PatientServices';
export default function useIndex() {
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<PatientDataItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await PatientServices();
                setData(result);
            } catch (error) {
                console.log('Failed to fetch data from API' + error);
            }
        };

        fetchData();
    }, []);
  return {
    data,
    open,
    setOpen,
    
  }
}
