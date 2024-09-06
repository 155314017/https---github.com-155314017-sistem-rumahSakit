import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

// icon
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

const iconMapping: { [key: string]: JSX.Element } = {
  Dashboard: <DashboardIcon />,
  Ruangan: <MeetingRoomIcon />,
  Pegawai: <PeopleIcon />,
  Fasilitas: <MonitorHeartIcon />,
  Dokter: <MedicalServicesIcon />,
  Poliklinik: <LocalHospitalIcon />,
};
export default function SideBar() {
  return (
    <Box>
      <Box
        position={"fixed"}
        component="nav"
        width={"358px"}
        height={"100%"}
        sx={{
          top: 0,
          left: 0,
          borderRight: "1px solid #A8A8BD",
          backgroundColor: "#fff",
        }}
      >
        <Box p={5}>
          <Typography fontWeight={"700"} fontSize={"25px"} color="#8F85F3">
            Hospital System
          </Typography>
        </Box>
        <List sx={{ p: 3, mt: -3 }}>
          {[
            "Dashboard",
            "Ruangan",
            "Pegawai",
            "Fasilitas",
            "Dokter",
            "Poliklinik",
          ].map((text) => (
            <ListItem key={text}>
              <ListItemButton
                sx={{
                  borderRadius: "8px",
                  color: "#8F85F3",
                  ":hover": {
                    backgroundColor: "#8F85F3",
                    color: "#fff",
                    "& .MuiListItemIcon-root": { color: "#fff" },
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#8F85F3" }}>
                  {iconMapping[text]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
