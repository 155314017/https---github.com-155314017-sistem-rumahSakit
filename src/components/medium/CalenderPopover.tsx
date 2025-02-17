import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import CustomCalender from "../../pages/registrationPatient/online/components/CustomCalender";
import { Box } from "@mui/system";

interface Props {
  title: string;
}

export default function CalenderPopover({ title }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        color="inherit"
        sx={{
          height: "40px",
          boxShadow: "none",
          textTransform: "capitalize",
          bgcolor: "#8F85F3",
          color: "#fff",
          fontSize: "16px",
          ":hover": { bgcolor: "#7C75E2", boxShadow: "none" },
        }}
      >
        {title}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <CustomCalender typeId="1" onChange={() => console.log('t')} />
      </Popover>
    </Box>
  );
}
