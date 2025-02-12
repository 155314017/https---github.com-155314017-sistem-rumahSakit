import { Box, Stack, Typography } from "@mui/material";
import type { ElementType, ReactNode } from "react";
import bgImage from "../../../assets/img/String.png";

interface MediumCardProps {
  icon: ElementType;
  title: string;
  subtitle: ReactNode;
  width?: string;
  heigth?: string;
}


export default function MediumCard({
  icon: Icon,
  title,
  subtitle,
  width,
  heigth
}: MediumCardProps) {
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        height={heigth || "162px"}
        width={width || "296.755px"}
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
          <Typography sx={{ fontWeight: 400, lineHeight: '16px', fontSize: "16px", textTransform: "capitalize" }}>
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "700",
              textTransform: "capitalize",
            }}
          >
            {subtitle}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
