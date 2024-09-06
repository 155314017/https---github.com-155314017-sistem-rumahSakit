import { Box, Typography, Stack, Link } from "@mui/material";
import { ElementType } from "react";

interface CardAddProps {
  icon: ElementType;
  title: string;
  link: string;
}

export default function CardAdd({ icon: Icon, title, link }: CardAddProps) {
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
          <Typography sx={{ fontSize: "16px", textTransform: "capitalize" }}>
            {title}
          </Typography>
          <Link
            href={link}
            underline="none"
            sx={{
              fontSize: "16px",
              color: "#8F85F3",
              textTransform: "capitalize",
              mt: 1,
            }}
          >
            {link}
          </Link>
        </Stack>
      </Box>
    </Box>
  );
}
