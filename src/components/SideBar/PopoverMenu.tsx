import { Popover, Button } from "@mui/material";
import { Link } from "react-router-dom";

interface PopoverMenuProps {
  anchorEl: HTMLButtonElement | null;
  open: boolean;
  onClose: () => void;
  items: { label: string; onClick?: () => void; href?: string }[];
  onItemSelect?: (value: string) => void;
}

const PopoverMenu: React.FC<PopoverMenuProps> = ({
  anchorEl,
  open,
  onClose,
  items,
  onItemSelect
}) => {
  const id = open ? "simple-popover" : undefined;
  


  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      PaperProps={{
        sx: {
          p: 1,
          width: "200px",
          bgcolor: "#fff",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)",
          borderRadius: "16px",
          ml: 1,
        },
      }}
    >
      {items.map((item, index) => (
        <Button
          key={index}
          fullWidth
          color="inherit"
          onClick={onItemSelect ? () => onItemSelect(item.label) : item.onClick}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            px: 2,
            textTransform: "capitalize",
            color: "#8F85F3",
          }}
          component={item.href ? Link : "button"}
          {...(item.href ? { to: item.href } : {})}

          
        >
          {item.label}
        </Button>
      ))}
    </Popover>
  );
};

export default PopoverMenu;
