import { Button } from "@mui/material";

// Definisikan interface untuk props
interface ButtonCustomProps {
  text: string;
}

export default function ButtonCustom({ text }: ButtonCustomProps) {
  return (
    <Button
    sx={{
        border:'8px',
        width:'238.5px',
        height:'38px',
        padding:'8px',
        color:'black',
         "&:hover": {
          backgroundColor: "#8F85F3", 
          color: "white",             
        }
    }}
    >
      {text}
    </Button>
  );
}
