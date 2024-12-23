import { FC } from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';

interface CardAntrianCounterProps {
    nomorAntrian: string | number;
    onClose: () => void;
}

const CardAntrianCounter: FC<CardAntrianCounterProps> = ({ nomorAntrian, onClose }) => {
    const navigate = useNavigate();

    const handleDownload = async () => {
        const element = document.getElementById('card-antrian-counter');
        if (element) {
            const canvas = await html2canvas(element);
            const link = document.createElement('a');
            link.download = 'nomor-antrian.jpg';
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Box
            id="card-antrian-counter"
            bgcolor={'white'}
            maxWidth={506}
            maxHeight={'fit-content'}
            borderRadius={'32px'}
            padding={'32px'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
            alignItems={'start'}
            gap={2}
            position={'relative'}
            boxShadow={'0px 4px 10px rgba(0, 0, 0, 0.1)'}
        >
            {/* Tombol Close */}
            <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: '#A8A8BD',
                }}
            >
                <CloseIcon />
            </IconButton>

            {/* Bagian Header */}
            <Box textAlign={'start'} mb={2}>
                <Typography fontWeight={600} fontSize={'20px'}>
                    Rumah Sakit St. Carolus
                </Typography>
                <Typography
                    fontWeight={400}
                    fontSize={'16px'}
                    color="#A8A8BD"
                    lineHeight={1.5}
                >
                    Jl. Salemba Raya No.41, RT.3/RW.5, Paseban, Kec. Senen, Kota Jakarta
                    Pusat, Daerah Khusus Ibukota Jakarta 10440
                </Typography>
            </Box>

            {/* Bagian Nomor Antrian */}
            <Box textAlign={'start'} mb={2}>
                <Typography fontWeight={400} fontSize={'16px'} color="#747487">
                    Nomor antrian konter
                </Typography>
                <Typography fontWeight={600} fontSize={'48px'} color="#0A0A0D">
                    {nomorAntrian}
                </Typography>
            </Box>

            {/* Bagian Footer */}
            <Typography
                fontWeight={400}
                fontSize={'16px'}
                color="#747487"
                textAlign={'start'}
                lineHeight={1.5}
            >
                Silahkan menuju konter dengan menyiapkan kartu tanda penduduk (KTP) untuk
                melengkapi data diri Anda, terimakasih.
            </Typography>

            {/* Tombol Aksi */}
            <Box display="flex" gap={2} mt={2} flexDirection={'column'} width={'100%'} >
                <Button
                    onClick={handleDownload}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#8F85F3",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: 600,
                        width: "100%",
                    }}
                >
                    Download Tiket
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleGoBack}>
                    Kembali ke halaman utama
                </Button>
            </Box>
        </Box>
    );
};

export default CardAntrianCounter;
