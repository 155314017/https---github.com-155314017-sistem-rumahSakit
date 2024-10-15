import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { borderRadius } from '@mui/system';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #A8A8BD',
    boxShadow: 12,
    p: 4,
    borderRadius: '16px'
};

interface ModalDeleteConfirmationProps {
    open: boolean;
    onClose: () => void;
}

function ModalDeleteConfirmation({ open, onClose }: ModalDeleteConfirmationProps): JSX.Element {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropProps={{
                style: {
                    backgroundColor: 'rgba(211, 211, 211, 0.4)', // Warna abu-abu dengan transparansi
                },
            }}
        >
            <Box sx={style}>
                <Typography id="modal-modal-description" sx={{ mt: 2, fontSize:'18px', fontWeight:600 }}>
                    Apakah Anda yakin ingin menghapus data ini ?
                </Typography>
                <Typography>
                    Jika anda menghapus data ini, maka data yang anda hapus akan hilang selamanya.
                </Typography>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button onClick={onClose} color="primary" sx={{ mr: 1 }}>
                        Batal
                    </Button>
                    <Button onClick={() => { /* Logic untuk menghapus item */ }} color="secondary">
                        Hapus
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}


export default ModalDeleteConfirmation;
