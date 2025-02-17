import { Button } from '@mui/material';

interface CustomButtonUnfilledProps {
    type?: "button" | "submit";
    disabled?: boolean;
    variant?: "contained" | "outlined" | "text";
    color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
    size?: "small" | "medium" | "large";
    text?: string;
    onClick?: () => void;
    fullWidth?: boolean;
}

export default function CustomButtonUnfilled({
    type = "submit",
    disabled = false,
    variant = "contained",
    color = "primary",
    size = "medium",
    text = "Lanjutkan",
    onClick,
    fullWidth = true,
}: CustomButtonUnfilledProps) {
    return (
        <Button
            type={type}
            variant={variant}
            color={color}
            size={size}
            disabled={disabled}
            onClick={onClick}
            fullWidth={fullWidth}
            sx={{
                mt: 2,
                border: '1px solid #8F85F3',
                backgroundColor: disabled ? "#A8A8BD" : "inherit",
                color: "#8F85F3",
                "&:hover":
                {
                    backgroundColor: "#8F85F3",
                    color: "white"
                },
                "&.Mui-disabled": {
                    backgroundColor: "#A8A8BD",
                    color: "white",
                },
                ...(variant === "outlined" && {
                    border: `1px solid ${disabled ? "#A8A8BD" : "#8F85F3"}`,
                }),
            }}
        >
            {text}
        </Button>
    );
}
