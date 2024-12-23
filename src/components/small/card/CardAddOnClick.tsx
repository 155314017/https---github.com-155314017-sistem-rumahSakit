import { Box, Typography, Stack } from "@mui/material";
import { ElementType } from "react";
import bgImage from "../../../assets/img/String.png";
import { Link } from "react-router-dom";

interface CardAddProps {
    icon: ElementType;
    title: string;
    link: string;
    onClick: () => void;  // Tambahkan onClick props
}

export default function CardAddOnClick({ icon: Icon, title, link, onClick }: CardAddProps) {
    return (
        <Box>
            <Box
                height={"162px"}
                width={"296.75px"}
                sx={{
                    backgroundColor: "#fff",
                    borderRadius: "24px",
                }}
            >
                <Stack p={3} px={4} position="relative">
                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="card-bg" />
                    </Box>
                    <Icon sx={{ color: "#8F85F3", fontSize: "50px", mb: 1 }} />
                    <Typography sx={{ fontSize: "16px", textTransform: "capitalize" }}>
                        {title}
                    </Typography>
                    <Link
                        to={link} // Gunakan `to` untuk navigasi, bukan `href`
                        onClick={(e) => {
                            e.preventDefault();  // Hentikan navigasi default
                            onClick();  // Panggil fungsi untuk memunculkan modal
                        }}
                        style={{
                            fontSize: "16px",
                            color: "#8F85F3",
                            marginTop: "5px",
                            textDecoration: "none",
                            cursor: "pointer",
                        }}
                    >
                        Add new
                    </Link>
                </Stack>
            </Box>
        </Box>
    );
}
