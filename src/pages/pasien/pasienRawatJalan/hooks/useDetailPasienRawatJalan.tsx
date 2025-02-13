import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function useDetailPasienRawatJalan() {
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openModal, setOpenModal] = useState(false);

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
        handleClose();
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
        handleLewatiPasien
    }

}
