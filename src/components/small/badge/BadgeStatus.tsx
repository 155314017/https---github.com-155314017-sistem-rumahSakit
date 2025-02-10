import { Box } from '@mui/system'

type BadgeStatusProps = {
  status: string
  color: string
}

export default function BadgeStatus({ status, color }: BadgeStatusProps) {
  return (
    <>
      <Box>
        {status && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 500,
              color: '#fff'
            }}
          >
            <Box
              sx={{
                backgroundColor: color,
                borderRadius: '50px',
                p: '4px 10px'
              }}
            >
              {status}
            </Box>
          </Box>
        )}
      </Box>
    </>
  )
}
