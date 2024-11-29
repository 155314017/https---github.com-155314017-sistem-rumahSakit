import { useState } from "react";
import { Box, Stack, IconButton, Tooltip } from "@mui/material";
import PopoverMenu from "./PopoverMenu";

// icon
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

// image
import Logo from "../../assets/img/Logo - St carolus.png";

export default function SideBar() {
  const [userManagementAnchorEl, setUserManagementAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [healthManagerAnchorEl, setHealthManagerAnchorEl] =
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

  const handleUserManagementClose = () => {
    setUserManagementAnchorEl(null);
  };

  const handleHealthManagerClose = () => {
    setHealthManagerAnchorEl(null);
  };

  const userManagementOpen = Boolean(userManagementAnchorEl);
  const healthManagerOpen = Boolean(healthManagerAnchorEl);

  const userManagementItems = [
    { label: "Pegawai", href: "/pegawai" },
    { label: "Dokter", href: "/dokter" },
    { label: "Menu", href: "/menu" },
    {
      label: "Menu Privilege",
      href: "/menuPrivilege",
    },
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
              href="/dashboard"
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
          <Tooltip title="User Management" placement="right" arrow>
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
              <PeopleIcon />
            </IconButton>
          </Tooltip>

          <PopoverMenu
            anchorEl={userManagementAnchorEl}
            open={userManagementOpen}
            onClose={handleUserManagementClose}
            items={userManagementItems}
          />

          {/* health-manager */}
          <Tooltip title="Health Manager" placement="right" arrow>
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
              <MedicalServicesIcon />
            </IconButton>
          </Tooltip>
          <PopoverMenu
            anchorEl={healthManagerAnchorEl}
            open={healthManagerOpen}
            onClose={handleHealthManagerClose}
            items={healthManagerItems}
          />
        </Stack>
      </Box>
    </Box>
  );
}
