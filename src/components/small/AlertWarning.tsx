import { Alert } from "@mui/material";

interface Props {
    teks: string;
}


export default function AlertWarning({ teks }: Props) {
  return (
      <Alert
          severity="error"
          sx={{
              width: '312px',
              height: '62px',
              borderRadius: '8px',
              border: '2px solid',
              borderColor: '#E26D6D',
              color: '#E26D6D',
              fontSize: '16px',
              lineHeight: '18px',
              position: 'absolute',
              top: '10%',
              left: '50%',
              transform: 'translate(-50%, -100%)',
              animation: 'slideIn 0.5s ease-out',
              '@keyframes slideIn': {
                  '0%': {
                      transform: 'translate(-50%, -150%)',
                      opacity: 0,
                  },
                  '100%': {
                      transform: 'translate(-50%, -100%)',
                      opacity: 1,
                  },
              },
          }}
      >
          {teks}
      </Alert>
  )
}


