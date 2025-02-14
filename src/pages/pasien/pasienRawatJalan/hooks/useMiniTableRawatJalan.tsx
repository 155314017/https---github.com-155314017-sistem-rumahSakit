import React, { useState, useEffect } from "react";
import axios from "axios";
import Data from "../../../../dummyData/dataPasien";
export default function useMiniTableRawatJalan() {
    const [page, setPage] = useState(1);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [dataIdClinic, setDataIdClinic] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [dataIdUser, setDataIdUser] = useState<string[]>([]);
    const [alertPanggil, setAlertPanggil] = useState(false);
    const [userDataPhone, setUserDataPhone] = useState<string[]>([]);
    const [showAll, setShowAll] = useState(false);
    const datas = Data;
    const [clinics, setClinics] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [countdown, setCountdown] = useState<number>(30)
    const [countdowns, setCountdowns] = useState<{ [key: string]: { countdown: number, isCounting: boolean, timer: number | null } }>({});
    const [openModal, setOpenModal] = useState(false);


    const countDownPanggil = (id: string) => {
        if (!countdowns[id]?.isCounting) {
            showTemporarySuccessCall();
            setShowModal(true);
            setCountdown(30);

            setCountdowns(prev => {
                const newCountdowns = { ...prev };
                newCountdowns[id] = { countdown: 30, isCounting: true, timer: null };
                return newCountdowns;
            });

            const interval = setInterval(() => {
                setCountdowns(prev => {
                    const newCountdowns = { ...prev };
                    const currentCountdown = newCountdowns[id];
                    if (currentCountdown.countdown > 0) {
                        newCountdowns[id] = { ...currentCountdown, countdown: currentCountdown.countdown - 1 };
                    } else {
                        clearInterval(currentCountdown.timer!);
                        newCountdowns[id] = { ...currentCountdown, isCounting: false, countdown: 30 };
                    }
                    return newCountdowns;
                });
            }, 1000);

            setCountdowns(prev => {
                const newCountdowns = { ...prev };
                newCountdowns[id] = { ...newCountdowns[id], timer: interval };
                return newCountdowns;
            });
        }
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const showTemporarySuccessCall = async () => {
        setAlertPanggil(true)
        await new Promise(resolve => setTimeout(resolve, 3000))
        setAlertPanggil(false)
    }

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
    const displayedData = showAll ? datas : datas.slice(0, rowsPerPage);




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


    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    return {
        page,
        setPage,
        isCollapsed,
        setIsCollapsed,
        datas,
        handleChangePage,
        rowsPerPage,
        displayedData,
        sortir,
        urutkan,
        toggleCollapse,
        confirmationDelete,
        clinics,
        loading,
        userDataPhone,
        anchorEl,
        handleMenuClick,
        handleMenuClose,
        setShowAll,
        alertPanggil,
        countdown,
        showModal,
        countDownPanggil,
        countdowns,
        handleOpenModal,
        handleCloseModal,
        openModal
    }
}