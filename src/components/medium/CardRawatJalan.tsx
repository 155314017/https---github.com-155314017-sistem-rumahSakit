import { Card, Typography } from '@mui/material'
import { Box } from '@mui/system'
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


interface Props {
    title: string;
    text: string;
}

export default function CardRawatJalan({ title, text }: Props) {


    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "386px",
                height: "128px",
                borderRadius: "24px",
                backgroundColor: "#F1F0FE",
                padding: "24px",
                gap: "16px",
            }}
        >
            <Typography
                sx={{
                    color: "#7367F0",
                    fontSize: "18px",
                    fontWeight: "600",
                    lineHeight: "20px",
                    textDecoration: "none",
                }}
            >
                {title}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", textDecoration: "none" }}>
                <Typography sx={{ textDecoration: "none" }}>
                    {text}
                </Typography>
                <ArrowForwardIosIcon sx={{ color: "#7367F0" }} />
            </Box>
        </Card>
    )
}
