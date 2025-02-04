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
    widthContent?: string;
    href?: string;
}

const PasienCard: React.FC<PasienCardProps> = ({
    title,
    description,
    onClick,
    avatarSrc,
    bgColor = "#F1F0FE",
    widthContent = '90%',
    href = '#',
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
                        transform: "scale(1.01)",
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                    },
                }}
            >
                <Avatar
                    alt="Kode Booking"
                    src={avatarSrc}
                    sx={{ width: "88px", height: "88px" }}
                />
                <Box sx={{ marginLeft: "16px", mt: '-15px', minWidth: widthContent == '85%' ? '85%' : '90%', maxWidth: { widthContent }, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Typography
                        sx={{
                            color: "#0A0A0D",
                            fontWeight: 600,
                            fontSize: '18px',
                            lineHeight: '20px',
                            fontFamily:'roboto',
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
                            width: '98%'
                        }}
                    >
                        <Typography
                            sx={{
                                textDecoration: "none",
                                maxWidth: "100%",
                                color: '#747487',
                                fontWeight: 400,
                                fontSize: '16px',
                                lineHeight: '18px',
                                fontFamily:'roboto',
                            }}
                        >
                            {description}
                        </Typography>
                        <ArrowForwardIosIcon sx={{ color: "#8F85F3" }} />
                    </Box>
                </Box>
            </Card>
        </Link >
    );
};

export default PasienCard;
