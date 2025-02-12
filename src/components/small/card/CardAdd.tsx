import { Box, Typography, Stack } from "@mui/material";
import type { ElementType } from "react";
import bgImage from "../../../assets/img/String.png";

interface CardAddProps {
  icon: ElementType;
  title: string;
  link: string;
  width?: string;
  heigth?: string;
}

export default function CardAdd({ icon: Icon, title, link, width, heigth }: CardAddProps) {
  return (
    <Box>
      <Box
        height={heigth || "162px"}
        width={width || "296.75px"}
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
          <a
            href={link}
            style={{
              fontSize: "16px",
              color: "#8F85F3",
              marginTop: "5px",
              textDecoration: "none",
            }}
          >
            Add new
          </a>
        </Stack>
      </Box>
    </Box>
  );
}
