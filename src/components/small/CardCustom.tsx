import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material"; 
import my from '../../img/String.png';

interface CardCustomProps {
  icon: SvgIconComponent;
  title: string;
  subtitle: string;
}

export default function CardCustom({ icon: Icon, title, subtitle }: CardCustomProps) {
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        height: '162px',
        width: '296px',
        borderRadius: '24px',
        position: 'relative',
      }}
    >
      <CardContent
        sx={{
          backgroundColor: 'transparent',
          zIndex: '2',
          width: '250px',
          position: 'relative',
          marginTop: '20px',
        }}
      >
        <Icon
          sx={{
            fontSize: '32px',
            color: '#8F85F3',
            marginBottom: '10px',
            backgroundColor: '#F1F0FE',
            padding: '8px',
            borderRadius: '12px',
          }}
        />
        <Typography sx={{ fontSize: '16px' }}>{title}</Typography>
        <Typography sx={{ color: '#8F85F3', fontSize: '16px' }}>{subtitle}</Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="162px"
        sx={{ width: '200px', objectFit: 'cover', position: 'absolute', right: 0, zIndex: '1' }}
        image={my}
        alt="Example Image"
      />
    </Card>
  );
}
