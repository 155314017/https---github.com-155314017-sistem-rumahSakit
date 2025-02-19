import { Card, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import bgImage from "../../../assets/img/String.png";

interface Props {
    title: string;
    text: string;
    onClick: () => void;
}

export default function CardOutpatient({ title, text, onClick }: Props) {
    return (
        <Card
            onClick={onClick}
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "95%",
                height: "128px",
                borderRadius: "24px",
                backgroundColor: "#F1F0FE",
                padding: "24px",
                gap: "16px",
                boxShadow: "none",
                position: "relative",
                overflow: "hidden",
                textDecoration: 'none',
                cursor: 'pointer'
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "-30px",
                    right: "50px",
                    zIndex: 0,
                }}
            >
                <img
                    src={bgImage}
                    alt="card-bg"
                    style={{
                        width: "130%",
                        height: "100%",
                        objectFit: "cover",

                    }}
                />
            </Box>

            <Typography
                sx={{
                    color: "#7367F0",
                    fontSize: "18px",
                    fontWeight: "600",
                    lineHeight: "20px",
                    textDecoration: "none",
                    zIndex: 1,
                }}
            >
                {title}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1, color: "#A8A8BD", fontWeight: 400, fontSize: '16px', lineHeight: '18px' }}>
                <Typography>{text}</Typography>
                <ArrowForwardIosIcon sx={{ color: "#7367F0" }} />
            </Box>
        </Card>
    );
}
