import { Box, Stack, Typography } from "@mui/material";
import { ElementType } from "react";

interface MediumCardProps {
  icon: ElementType;
  title: string;
  subtitle: string;
}

export default function MediumCard({ icon: Icon, title, subtitle }: MediumCardProps) {
  return (
    <Box>
      <Box
        height={"162px"}
        width={"238.5px"}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "24px",
          border: "1px solid #A8A8BD",
        }}
      >
        <Stack p={3} px={4}>
          <Icon sx={{ color: "#8F85F3", fontSize: "50px", mb: 1 }} />
          <Typography sx={{ fontSize: "16px", textTransform: "capitalize" }}>{title}</Typography>
          <Typography sx={{ fontSize: "18px", fontWeight: "700", textTransform: "capitalize" }}>
            {subtitle}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
