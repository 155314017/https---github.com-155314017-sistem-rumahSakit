import { Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'

export default function CardDetailInformasiKunjungan() {
    return (
        <Box>
            <Box
                display={'flex'}
                flexDirection={'column'}
                p={2}
                minWidth={'970px'}
                mt={2}
                bgcolor={'#FFFFFF'}
                border={"1px solid #C5C5D3"}
                borderRadius={"24px"}
                minHeight={"fit-content"}
            >
                <Typography sx={{ fontWeight: 600, fontSize: '18px', lineHeight: '20px', color: '#0A0A0D', mb: 2 }} >Informasi Kunjungan</Typography>
                <Stack sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <Box width={'100%'} >
                        <Typography sx={titleData} >Jenis Kunjungan</Typography>
                        <Typography sx={detailData} >Rawat Inap</Typography>
                    </Box>
                    <Box width={'100%'}  >
                        <Typography sx={titleData} >Keluhan</Typography>
                        <Typography sx={detailData} >Dada Berdebar</Typography>
                    </Box>
                    <Box width={'100%'} >
                        <Typography sx={titleData} >Tanggal masuk</Typography>
                        <Typography sx={detailData} >2025/01/02</Typography>
                    </Box>
                    <Box width={'100%'} >
                        <Typography sx={titleData} >Jenis Kunjungan</Typography>
                        <Typography sx={detailData} >Rawat Inap</Typography>
                    </Box>
                </Stack>

                <Stack sx={{ display: 'flex', flexDirection: 'row', width: '100%', mt: 2 }}>
                    <Box width={'100%'} >
                        <Typography sx={titleData} >Nama Pasien</Typography>
                        <Typography sx={detailData} >Syahidan</Typography>
                    </Box>
                    <Box width={'100%'} >
                        <Typography sx={titleData} >Nama Dokter</Typography>
                        <Typography sx={detailData} >Dr. Grayson Schonberg</Typography>
                    </Box>
                    <Box width={'100%'}  >
                        <Typography sx={titleData} >Jenis Poli</Typography>
                        <Typography sx={detailData} >Penyakit Dalam</Typography>
                    </Box>
                    <Box width={'100%'}>
                        <Typography sx={titleData} >Diagnosa</Typography>
                        <Typography sx={detailData} >Paru - paru bolong</Typography>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}

const titleData = {
    color: '#747487',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '18px'
};

const detailData = {
    color: '#0A0A0D',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '18px',
}