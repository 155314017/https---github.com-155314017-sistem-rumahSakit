import type React from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Card, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface PasienCardProps {
    title: string;
    description: string;
    onClick?: () => void;
    avatarSrc: string;
    bgColor?: string;
    href?: string;
}

const PasienCard: React.FC<PasienCardProps> = ({
    title,
    description,
    onClick,
    avatarSrc,
    bgColor = "#F1F0FE",
    href = "#",
}) => {
    return (
        <Link
            to={href}
            style={{ textDecoration: "none" }}
            onClick={onClick}
        >
            <Card
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: "24px",
                    padding: "16px",
                    boxShadow: 2,
                    marginBottom: "16px",
                    bgcolor: bgColor,
                    transition: "background-color 0.3s ease, transform 0.3s ease",
                    "&:hover": {
                        bgcolor: "#D5D1FB",
                        transform: "scale(1.02)",
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                    },
                }}
            >
                <Avatar
                    alt="Kode Booking"
                    src={avatarSrc}
                    sx={{ width: "88px", height: "88px" }}
                />
                <Box sx={{ marginLeft: "16px", mt: '-20px' }}>
                    <Typography
                        sx={{
                            color: "#7367F0",
                            fontSize: "18px",
                            fontWeight: "600",
                        }}
                    >
                        {title}
                    </Typography>   
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography
                            sx={{
                                textDecoration: "none",
                                maxWidth: "80%",
                            }}
                        >
                            {description}
                        </Typography>
                        <ArrowForwardIosIcon sx={{ color: "#7367F0" }} />
                    </Box>
                </Box>
            </Card>
        </Link>
    );
};

export default PasienCard;
