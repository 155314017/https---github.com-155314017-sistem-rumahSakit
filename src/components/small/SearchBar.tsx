import { Box, InputBase, Icon } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      sx={{
        border: "1px solid #A8A8BD",
        bgcolor: "#fafafa",
        borderRadius: "8px",
        padding: "2px 4px",
        height: "38px",
      }}
    >
      <Icon sx={{ p: "10px" }}>
        <SearchIcon sx={{ color: "#A8A8BD", fontSize: "20px" }} />
      </Icon>
      <InputBase
        placeholder="Cari"
        sx={{ flex: 1 }}
        inputProps={{ "aria-label": "search" }}
      />
    </Box>
  );
}
