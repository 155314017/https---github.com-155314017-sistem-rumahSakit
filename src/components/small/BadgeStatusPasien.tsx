import { Typography } from '@mui/material'
import { Box } from '@mui/system'

type BadgeStatusProps = {
    name: string
    status: string
    color: string
}

export default function BadgeStatusPasien({ name, status, color }: BadgeStatusProps) {
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
                            fontWeight: 400,
                            color: '#7367F0'
                        }}
                    >
                        <Typography sx={{ mr: 1, color: '#0A0A0D' }} >{name}</Typography>
                        <Box
                            sx={{
                                backgroundColor: color,
                                borderRadius: '50px',
                                p: '4px 10px',
                                border: '1px solid #7367F0'
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
