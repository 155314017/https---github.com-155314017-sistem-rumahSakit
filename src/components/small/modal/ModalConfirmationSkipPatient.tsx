import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

interface ModalConfirmationSkipPatientProps {
    open: boolean; // properti untuk mengatur dialog apakah terbuka atau tidak
    onClose: () => void; // fungsi untuk menutup modal
}

export default function ModalConfirmationSkipPatient({ open, onClose }: ModalConfirmationSkipPatientProps) {
    const navigate = useNavigate();

    const handleLewatiPasien = () => {
        navigate("/dashboardQueue", { state: { successSkip: true, message: "Pasien Berhasil Dilewati!" } });
    }

    const handleCloseModal = () => {
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleCloseModal}
            PaperProps={{
                sx: {
                    borderRadius: '24px',
                    border: '1px solid #C5C5D3',
                    padding: '26px',
                }
            }}
        >
            <DialogTitle>Apakah anda yakin ingin lewati antrian pasien ini?</DialogTitle>
            <DialogContent >
                <Typography>Jika Anda yakin, maka nomor antrian pasien akan di undur.</Typography>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }} >
                <Button onClick={handleCloseModal} sx={{ color: '#8F85F3', bgcolor: 'inherit', border: '1px solid #8F85F3', borderRadius: '8px', padding: '8px', width: '185px', height: '38px' }}>
                    Batal
                </Button>
                <Button onClick={handleLewatiPasien} sx={{ color: 'white', bgcolor: '#8F85F3', border: '1px solid #8F85F3', borderRadius: '8px', padding: '8px', width: '185px', height: '38px' }}>
                    Lewati Antrian
                </Button>
            </DialogActions>
        </Dialog>
    )
}
