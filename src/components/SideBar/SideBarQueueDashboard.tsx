import { useState } from "react";
import { Box, Stack, IconButton, Tooltip } from "@mui/material";
import PopoverMenu from "./PopoverMenu";

// icon
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalHotelOutlinedIcon from '@mui/icons-material/LocalHotelOutlined';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import AccessibleOutlinedIcon from '@mui/icons-material/AccessibleOutlined';

// image
import Logo from "../../assets/img/Logo - St carolus.png";

export default function SideBarQueueDashboard() {
    const [userManagementAnchorEl, setUserManagementAnchorEl] =
        useState<HTMLButtonElement | null>(null);
    const [healthManagerAnchorEl, setHealthManagerAnchorEl] =
        useState<HTMLButtonElement | null>(null);
    const [patientManagerAnchorEl, setpatientManagerAnchorEl] =
        useState<HTMLButtonElement | null>(null);

    const handleUserManagementClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setUserManagementAnchorEl(event.currentTarget);
    };

    const handleHealthManagerClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setHealthManagerAnchorEl(event.currentTarget);
    };

    const handlePatientManagerClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setpatientManagerAnchorEl(event.currentTarget);
    };

    const handleUserManagementClose = () => {
        setUserManagementAnchorEl(null);
    };

    const handleHealthManagerClose = () => {
        setHealthManagerAnchorEl(null);
    };

    const handlePatientManagerClose = () => {
        setpatientManagerAnchorEl(null);
    };

    const userManagementOpen = Boolean(userManagementAnchorEl);
    const healthManagerOpen = Boolean(healthManagerAnchorEl);
    const patientManagerOpen = Boolean(patientManagerAnchorEl);

    const userManagementItems = [
        { label: "Antrian", href: "#" },
        { label: "Tensi", href: "#" },
        { label: "Siap diperiksa dokter", href: "#" },
        {
            label: "Sedang diperiksa dokter", ref: "#",
        },
        { label: "Perlu tindakan lanjut", href: "#" },
        { label: "Selesai", href: "#" },
    ];

    const healthManagerItems = [
        { label: "Gedung", href: "/gedung" },
        { label: "Ruangan", href: "/ruangan" },
        { label: "Ambulance", href: "/ambulance" },
        { label: "Fasilitas", href: "/fasilitas" },
        { label: "Klinik", href: "/klinik" },
        { label: "Konter", href: "/konter" },
        { label: "Pasien", href: "/pasien" },
    ];

    const patientManagerItems = [
        { label: "Rawat Jalan", href: "/gedung" },
        { label: "Rawat Berenang", href: "/ruangan" },
    ];

    return (
        <Box>
            <Box
                position={"fixed"}
                component="nav"
                sx={{
                    top: 0,
                    left: 0,
                    p: 3,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <Box>
                    <img src={Logo} alt="logo" style={{ width: "100px" }} />
                </Box>

                <Stack mt={3} spacing={3}>
                    {/* dashboard */}
                    <Tooltip title="Dashboard" placement="right" arrow>
                        <IconButton
                            size="large"
                            href="/dashboardQueue"
                            sx={{
                                color: "#8F85F3",
                                bgcolor: "#fff",
                                width: "50px",
                                height: "50px",
                            }}
                        >
                            <DashboardIcon />
                        </IconButton>
                    </Tooltip>

                    {/* user-management */}
                    <Tooltip title="Rawat Jalan" placement="right" arrow>
                        <IconButton
                            size="large"
                            onClick={handleUserManagementClick}
                            sx={{
                                color: "#8F85F3",
                                bgcolor: "#fff",
                                width: "50px",
                                height: "50px",
                            }}
                        >
                            <AccessibleOutlinedIcon />
                        </IconButton>
                    </Tooltip>

                    <PopoverMenu
                        anchorEl={userManagementAnchorEl}
                        open={userManagementOpen}
                        onClose={handleUserManagementClose}
                        items={userManagementItems}
                    />

                    {/* health-manager */}
                    <Tooltip title="Rawat Inap" placement="right" arrow>
                        <IconButton
                            size="large"
                            onClick={handleHealthManagerClick}
                            sx={{
                                color: "#8F85F3",
                                bgcolor: "#fff",
                                width: "50px",
                                height: "50px",
                            }}
                        >
                            <LocalHotelOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <PopoverMenu
                        anchorEl={healthManagerAnchorEl}
                        open={healthManagerOpen}
                        onClose={handleHealthManagerClose}
                        items={healthManagerItems}
                    />

                    {/* patient */}
                    <Tooltip title="Rekam Medis" placement="right" arrow>
                        <IconButton
                            size="large"
                            onClick={handlePatientManagerClick}
                            sx={{
                                color: "#8F85F3",
                                bgcolor: "#fff",
                                width: "50px",
                                height: "50px",
                            }}
                        >
                            <StickyNote2Icon />
                        </IconButton>
                    </Tooltip>
                    <PopoverMenu
                        anchorEl={patientManagerAnchorEl}
                        open={patientManagerOpen}
                        onClose={handlePatientManagerClose}
                        items={patientManagerItems}
                    />
                </Stack>
            </Box>
        </Box>
    );
}
