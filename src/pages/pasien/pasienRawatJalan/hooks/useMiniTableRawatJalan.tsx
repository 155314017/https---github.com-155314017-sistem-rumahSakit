import React, { useState, useEffect } from "react";
import axios from "axios";
import { PatientDataItem } from "../../../../types/patient.types";
export default function useMiniTableRawatJalan() {
    const [page, setPage] = useState(1);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [datas, setDatas] = useState<PatientDataItem[]>([]);
    const [dataIdClinic, setDataIdClinic] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [dataIdUser, setDataIdUser] = useState<string[]>([]);
    const [userDataPhone, setUserDataPhone] = useState<string[]>([]);

    

   
    const [clinics, setClinics] = useState<string[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responses = await Promise.all(
                    dataIdUser.map((id) => axios.get(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/user/${id}`))
                );

                const userDataPhone = responses.map((response) => {
                    const name = response.data.data.phone;
                    return name ? name : "Data User Tidak Tercatat";
                });
                setUserDataPhone(userDataPhone);
            } catch (err) {
                console.error('Error:', err);
            }
        };

        if (dataIdUser.length > 0) {
            fetchUsers();
        }
    }, [dataIdUser]);

    useEffect(() => {
        const fetchClinics = async () => {
            try {
                const responses = await Promise.all(
                    dataIdClinic.map((id) => axios.get(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/clinic/${id}`))
                );

                const CLinicData = responses.map((response) => {
                    const name = response.data.data.name;
                    return name ? name : "Data Gedung Tidak Tercatat";
                });
                setClinics(CLinicData);

            } catch (err) {
                console.error('Error:', err);
            }
        };

        if (dataIdClinic.length > 0) {
            fetchClinics();
        }
    }, [dataIdClinic]);


    const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const rowsPerPage = 3;

    const displayedData = datas.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const sortir = [
        { value: 1, label: "Pria" },
        { value: 2, label: "Wanita" },
    ];

    const urutkan = [
        { value: 1, label: "Nama Pasien A-Z" },
        { value: 2, label: "Nama Pasien Z-A" },
        { value: 3, label: "Nomor Pasien 1-9" },
        { value: 4, label: "Nomor Pasien 9-1" },
    ];

    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev);
    };

    const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        // setOpen(true);
    };
    return {
        page,
        setPage,
        isCollapsed,
        setIsCollapsed,
        datas,
        setDatas,
        handleChangePage,
        rowsPerPage,
        displayedData,
        sortir,
        urutkan,
        toggleCollapse,
        confirmationDelete,
        clinics,
        loading,
        userDataPhone
    }
}