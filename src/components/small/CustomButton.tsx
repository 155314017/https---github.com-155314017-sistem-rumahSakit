import { Button } from "@mui/material";

interface ButtonProps {
    onClick: () => void;
    label: string;
}

const CustomButton: React.FC<ButtonProps> = ({ onClick, label }) => {
  return (
      <Button
          onClick={onClick}
          fullWidth
          sx={{
              width: '410px',
              height: '48px',
              marginTop: '20px',
              backgroundColor: 'transparent',
              color: '#8F85F3',
              border: '1px solid',
              borderColor: '#8F85F3',
              ":hover": { backgroundColor: '#8F85F3', color: 'white' }
          }}
      >
          {label}
      </Button>
  )
}

export default CustomButton;
