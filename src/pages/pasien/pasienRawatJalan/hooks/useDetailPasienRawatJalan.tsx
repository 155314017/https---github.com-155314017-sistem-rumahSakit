import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function useDetailPasienRawatJalan() {
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();


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
    }

}
