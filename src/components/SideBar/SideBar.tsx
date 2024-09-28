import { Box, Stack, IconButton, Tooltip } from "@mui/material";

// icon
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import HotelIcon from "@mui/icons-material/Hotel";

// image
import Logo from "../../assets/img/Logo - St carolus.png";

export default function SideBar() {
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

          {/* health-manager */}
          <Tooltip title="Health Manager" placement="right" arrow>
            <IconButton
              size="large"
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

          {/* facility */}
          <Tooltip title="Facility" placement="right" arrow>
            <IconButton
              size="large"
              sx={{
                color: "#8F85F3",
                bgcolor: "#fff",
                width: "50px",
                height: "50px",
              }}
            >
              <HotelIcon />
            </IconButton>
          </Tooltip>

          {/* clinic */}
          <Tooltip title="Clinic" placement="right" arrow>
            <IconButton
              size="large"
              sx={{
                color: "#8F85F3",
                bgcolor: "#fff",
                width: "50px",
                height: "50px",
              }}
            >
              <LocalHospitalIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </Box>
  );
}
