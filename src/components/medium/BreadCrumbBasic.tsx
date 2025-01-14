import { Button, Box, Typography } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import bgImage from "../../assets/img/String.png";

interface MicroBreadcrumbProps {
    title: string;
    description: string;
    onBackClick: () => void;
}

export default function BreadCrumbBasic({
    title,
    description,
    onBackClick,
}: MicroBreadcrumbProps) {
    return (
        <Box
            sx={{
                height: "50px",
                bgcolor: "#fff",
                borderRadius: "24px",
                position: "relative",
                overflow: "hidden",
                padding: "16px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    gap: 2,
                }}
            >
                {/* Tombol Kembali */}
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

                <Box>
                    <Typography variant="h6" sx={{ fontSize: "18px", fontWeight: 600 }}>
                        {title}
                    </Typography>
                    <Typography sx={{ fontSize: "14px", color: "#747487", mt: 1 }}>
                        {description}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ position: "absolute", top: 0, right: 0 }}>
                <img src={bgImage} alt="bgImage" style={{ width: "150px", height: "auto" }} />
            </Box>
        </Box>
    );
}
