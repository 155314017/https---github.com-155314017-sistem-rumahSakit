import { Alert } from "@mui/material";

export default function AlertWarning() {
  return (
      <Alert
          severity="error"
          sx={{
              border: '2px solid #E26D6D',
              borderRadius: '8px',
              padding: '0',
              fontSize: '16px',
              margin: '0',
              height: '62px',
              width: '416px',
              position: 'fixed',
              marginLeft: '69%',
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
          Email atau kata sandi yang Anda masukkan salah, silahkan coba lagi.
      </Alert>
  )
}
