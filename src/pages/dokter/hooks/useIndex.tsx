import { useEffect, useState } from "react";
import { DoctorServices, DoctorDataItem } from "../../../services/Admin Tenant/ManageDoctor/DoctorServices";


export default function useIndex() {
    const [data, setData] = useState<DoctorDataItem[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await DoctorServices();
                setData(result);
            } catch (error) {
                console.log('Failed to fetch data from API' + error);
            }
        };

        fetchData();
    }, []);


  return{
    data

  }
}
