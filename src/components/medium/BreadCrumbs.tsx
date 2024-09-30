import { Breadcrumbs, Button, Link } from "@mui/material";
import { Box } from "@mui/system";
import bgImage from "../../assets/img/String.png";

// icon
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

interface MicroBreadcrumbProps {
  breadcrumbItems: BreadcrumbItem[];
  onBackClick: () => void;
}

export default function BreadCrumbs({
  breadcrumbItems,
  onBackClick,
}: MicroBreadcrumbProps) {
  return (
    <Box
      sx={{
        height: "70px",
        bgcolor: "#fff",
        borderRadius: "12px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          px: 2,
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          color="inherit"
          sx={{
            minWidth: "38px",
            minHeight: "38px",
            borderRadius: "8px",
            p: 0,
            color: "#8F85F3",
          }}
          onClick={onBackClick}
        >
          <ArrowBackIosRoundedIcon sx={{ fontSize: "14px" }} />
        </Button>

        {/* breadcrumb */}
        <Breadcrumbs separator="›">
          {breadcrumbItems.map((item, index) => (
            <Link
              key={index}
              underline="hover"
              color={item.isCurrent ? "#8F85F3" : "inherit"}
              href={item.href}
              aria-current={item.isCurrent ? "page" : undefined}
              sx={{ fontSize: "16px" }}
            >
              {item.label}
            </Link>
          ))}
        </Breadcrumbs>
      </Box>

      <Box sx={{ position: "absolute", top: 0, right: 0 }}>
        <img src={bgImage} alt="bgImage" />
      </Box>
    </Box>
  );
}
