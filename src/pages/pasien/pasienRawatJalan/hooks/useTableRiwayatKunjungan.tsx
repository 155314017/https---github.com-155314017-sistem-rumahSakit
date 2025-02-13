import React, { useState } from "react";
import Data from "../../../../dummyData/dataRiwayatKunjungan";

export default function useTableRiwayatKunjungan() {
    const [page, setPage] = useState(1);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selected, setSelected] = useState<string | null>(null);

    const [countdowns, setCountdowns] = useState<{ [key: string]: { countdown: number, isCounting: boolean, timer: number | null } }>({});

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

    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev);
    };

    const countDownPanggil = (id: string) => {
        if (!countdowns[id]?.isCounting) {
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
        countdowns
    }
}
