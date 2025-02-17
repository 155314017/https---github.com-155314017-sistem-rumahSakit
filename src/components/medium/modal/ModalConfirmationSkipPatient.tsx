import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

//icon
import dummy from "../../../assets/img/Dummy2.png";

interface ModalConfirmationSkipPatientProps {
    open: boolean;
    onClose: () => void; 
}

export default function ModalConfirmationSkipPatient({ open, onClose }: ModalConfirmationSkipPatientProps) {
    const navigate = useNavigate();

    const handleLewatiPasien = () => {
        navigate("/dashboardQueue", { state: { successSkip: true, message: "Pasien Berhasil Dilewati!" } });
        onClose();
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
                    width: '427px',
                    height: 'auto',
                    position: 'absolute',
                    top: 'center',
                    boxShadow: 3,
                    opacity: 1,
                    borderRadius: '24px',
                    border: '1px solid #C5C5D3',
                    padding: '14px',
                }
            }}
        >
            <DialogContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src={dummy} alt="Dummy" style={{ width: '34px', height: '24px', }} />

        
        
            </DialogContent >
            <DialogTitle sx={{fontWeight: '600', fontSize: '18px', lineHeight: '20px', fontFamily: 'Roboto'}}>Apakah anda yakin ingin lewati antrian pasien ini?</DialogTitle>
            <DialogContent >
                <Typography sx={{fontWeight: '400', fontSize: '16px', lineHeight: '18px', fontFamily: 'Roboto'}}>Jika Anda yakin, maka nomor antrian pasien akan di undur.</Typography>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2  }} >
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
