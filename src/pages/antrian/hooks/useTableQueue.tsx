import React, { useState } from "react";
import Data from "../../../data/dummyData/dataPasien"
import { useNavigate } from "react-router-dom";

export default function useTableQueue() {
    const [page, setPage] = useState(1);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selected, setSelected] = useState<string | null>("Antrian");
    const [showModal, setShowModal] = useState(false);
    const [countdown, setCountdown] = useState<number>(30)
    const [countdowns, setCountdowns] = useState<{ [key: string]: { countdown: number, isCounting: boolean, timer: number | null } }>({});
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const datas = Data;

    const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const rowsPerPage = 10;

    const displayedData = datas.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const sortir = [
        { value: 1, label: "BPJS" },
        { value: 2, label: "Asuransi" },
        { value: 3, label: "Kredit.Debit,Tunai" },
    ];

    const urutkan = [
        { value: 1, label: "Terbaru" },
        { value: 2, label: "Terlama" },
        { value: 3, label: "Jenis Kunjungan A-Z" },
        { value: 4, label: "Jenis Kunjungan Z-A" },
    ];
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev);
    };

    const countDownPanggil = (id: string) => {
        if (!countdowns[id]?.isCounting) {
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

    const getButtonStyle = (buttonName: string, width: string) => {
        return {
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '18px',
            padding: '8px',
            mr: 1,
            bgcolor: '#ffff',
            border: '1px solid #8F85F3',
            color: '#8F85F3',
            width: width,
            borderRadius: '8px',
            height: '44px',
            '&:hover': {
                backgroundColor: "#8F85F3",
                color: '#ffff',
            },
            ...(selected === buttonName && {
                backgroundColor: "#8F85F3",
                color: "#fff",
            }),
        };
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
        };
    
    const handleMenuClose = () => {
        
            setAnchorEl(null);
        };

    const handleClose = () => {
        setShowModal(false);
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
        countDownPanggil,
        getButtonStyle,
        handleButtonClick: setSelected,
        isCounting: false,
        countdowns,
        showModal,
        handleClose,
        countdown,
        selected,
        anchorEl,
        handleMenuClick,
        handleMenuClose,
        openModal,
        handleOpenModal,
        handleCloseModal,
        navigate
    }
}
