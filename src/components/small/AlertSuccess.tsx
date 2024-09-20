import { Alert } from "@mui/material";

interface Props {
    label:string;
}

const AlertSuccess: React.FC<Props> = ({label }) => {
  return (
      <Alert
          severity="success"
          sx={{
              width: '295px',
              height: '36px',
              borderRadius: '8px',
              border: '2px solid',
              borderColor: '#77C397',
              padding: '8px 16px 8px 16px',
              color: '#77C397',
              fontSize: '16px ',
              lineHeight: '18px',
              position: 'fixed',
              top: '6%',
              left: '81%',
              animation: 'slideIn 0.5s ease-out',
              '@keyframes slideIn': {
                  '0%': {
                      transform: 'translateX(100%)',
                      opacity: 0,
                  },
                  '100%': {
                      transform: 'translateX(0)',
                      opacity: 1,
                  },
              },
          }}
      >
          {label}
      </Alert>
  )
}

export default AlertSuccess;