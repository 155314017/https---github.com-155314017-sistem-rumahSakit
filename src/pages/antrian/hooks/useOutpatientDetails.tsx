import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function useOutpatientDetails() {
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openModal, setOpenModal] = useState(false);
    const [alertPanggil, setAlertPanggil] = useState(false);



    const [countdown, setCountdown] = useState(30);
    const [isCounting, setIsCounting] = useState(false);

    useEffect(() => {
        let interval: number | undefined;
        if (isCounting && countdown > 0) {
            interval = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setIsCounting(false);
            setCountdown(30);
        }
        return () => clearInterval(interval);
    }, [isCounting, countdown]);

    const startCountdown = () => {
        showTemporarySuccessCall();
        if (!isCounting) {
            setIsCounting(true);
        }
    };

    const showTemporarySuccessCall = async () => {
        setAlertPanggil(true)
        await new Promise(resolve => setTimeout(resolve, 3000))
        setAlertPanggil(false)
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLewatiPasien = () => {
        setAnchorEl(null);
        navigate("/dashboardQueue", { state: { successSkip: true, message: "Pasien Berhasil Dilewati!" } });
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const breadcrumbItems = [
        {
            label: "Dashboard",
            href: "/dashboardQueue",
        },
        {
            label: "Rawat Jalan",
            href: "/dashboardQueue",
        },
        {
            label: "Detail Pasien",
            href: "/detailRawat",
        },
    ];
    const handleDeleteSuccess = () => {
        setOpen(false);
        navigate("/gedung", { state: { successDelete: true, message: "Gedung berhasil dihapus!" } });
    };

    return {
        breadcrumbItems,
        open,
        handleDeleteSuccess,
        id,
        handleCloseModal,
        handleOpenModal,
        handleClick,
        anchorEl,
        openModal,
        handleClose,
        handleLewatiPasien,
        startCountdown,
        isCounting,
        countdown,
        alertPanggil
    }

}
