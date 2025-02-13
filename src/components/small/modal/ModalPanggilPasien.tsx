import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
 
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import dummy from "../../../assets/img/Dummy2.png";


interface ModalPanggilPasienProps {
  onClose: () => void;
  countdown: number;
}
const ModalPanggilPasien: React.FC<ModalPanggilPasienProps> = ({onClose, countdown}) => {
  const [actionType, setActionType] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isPasienTidakDatang, setIsPasienTidakDatang] = useState(false);
  const [isLewatiPasien, setIsLewatiPasien] = useState(false)

  const handleOpenConfirm = (type: string) => {
    setActionType(type);
  };

 
  const handleBatal = () => {
    setIsProcessing(false);

    if (isPasienTidakDatang) {
      setIsPasienTidakDatang(false);
    }
    if (isLewatiPasien) {
      setIsLewatiPasien(false);
    }
  };

  const handleConfirm = (type: string) => {
    if(type === 'proses pasien') {
      setIsProcessing(true);
    }
    console.log(`Confirmed action: ${actionType}`);
  };

  const handlePasienTidakDatang = () => {
    setIsPasienTidakDatang(true);
    handleMenuClose()
  }

  const handelLewatiPasien = () => {
    setIsLewatiPasien(true);
    handleMenuClose()
  }
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <Card
        sx={{
          width: isProcessing || isPasienTidakDatang || isLewatiPasien ? '427px' : '560px',
          height: 'auto',
          position: 'absolute',
          top: '314px',
          left: '440px',
          borderRadius: '24px 24px 24px 24px',
          border: '1px solid transparent',
          boxShadow: 3,
          opacity: 1, // Set opacity to 1 for visibility
        }}
      >
        <CardContent>
        <Box>
        <img src={dummy} alt="Dummy" style={{ width: '34px', height: '24px', borderRadius: '24px 24px 0 0' }} />

        
        <IconButton
                        onClick={onClose} // Call onClose when the close button is clicked (onClose) 
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: '#A8A8BD',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
            </Box>
            
            {isLewatiPasien ? (
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" sx={{fontWeight: '600', fontSize: '18px', lineHeight: '20px', fontFamily: 'Roboto'}}>Apakah anda yakin ingin lewati antrian pasien ini?</Typography>
                <Typography variant="body2" sx={{fontWeight: '400', fontSize: '16px', lineHeight: '18px', fontFamily: 'Roboto'}}>
                Jika Anda yakin, maka nomor antrian pasien akan di undur.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
                  <Button variant="outlined" sx={{ color: '#8F85F3', border: '1px solid #8F85F3', width: '185.5px', height: '44px', borderRadius: '8px' }} onClick={() => handleBatal()}>
                  Batal
                  </Button>
                  <Button variant="contained" sx={{ width: '185.5px', height: '44px', borderRadius: '8px', backgroundColor: '#8F85F3'}}  onClick={() => handleConfirm('proses pasien')}>
                  Lewati Antrian
                  </Button>
                  </Box>
    
              </Box>
            ) : 
            isPasienTidakDatang ? (
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" sx={{fontWeight: '600', fontSize: '18px', lineHeight: '20px', fontFamily: 'Roboto'}}>Apakah anda yakin ingin memproses tindakan pasien ini?</Typography>
            <Typography variant="body2" sx={{fontWeight: '400', fontSize: '16px', lineHeight: '18px', fontFamily: 'Roboto'}}>
            Jika Anda yakin, maka data yang anda sudah diproses tidak dapat di kembalikan kembali
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
              <Button variant="outlined" sx={{ color: '#8F85F3', border: '1px solid #8F85F3', width: '185.5px', height: '44px', borderRadius: '8px' }} onClick={() => handleBatal()}>
              Keluar
              </Button>
              <Button variant="contained" sx={{ width: '185.5px', height: '44px', borderRadius: '8px', backgroundColor: '#8F85F3'}} onClick={() => handleConfirm('proses pasien')}>
              Proses tindakan
              </Button>
              </Box>

          </Box>
          ) : isProcessing ? (
            // Konten baru setelah proses pasien
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6" sx={{fontWeight: '600', fontSize: '18px', lineHeight: '20px', fontFamily: 'Roboto'}}>Apakah anda yakin ingin membatalkan tindakan pasien ini?</Typography>
              <Typography variant="body2" sx={{fontWeight: '400', fontSize: '16px', lineHeight: '18px', fontFamily: 'Roboto'}}>
              Jika Anda yakin, maka data yang anda sudah diproses tidak dapat di kembalikan kembali
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
                <Button variant="outlined" sx={{ color: '#8F85F3', border: '1px solid #8F85F3', width: '185.5px', height: '44px', borderRadius: '8px' }} onClick={() => handleConfirm('proses pasien')}>
                Batal
                </Button>
                <Button variant="contained" sx={{ width: '185.5px', height: '44px', borderRadius: '8px', backgroundColor: '#8F85F3'}} onClick={() => handleBatal()}>
                Batalkan Antrian
                </Button>
                </Box>

            </Box>
          ) : (
            // Konten sebelum proses pasien
        <Box>
        <Box sx={{mt: 2}}>
                    
          <Typography variant="h5" component="div"  gutterBottom>
            Rumah sakit St. Carolus
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Jl. Salemba Raya No.41, RT.3/RW.5, Paseban, Kec. Senen, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10440
          </Typography>
          </Box>
            <Box sx={{ flexDirection: 'column', mt: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'row', gap: 29 }}>
              <Typography variant="subtitle1">Nomor antrian</Typography>
              <Typography variant="subtitle1">Nama pasien</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'row', gap: "50%" }}>
              <Typography sx={{ fontWeight: '600', fontSize: '24px', lineHeight: '26px', fontFamily: 'Roboto' }}>
                PG-10
              </Typography>
              <Typography sx={{ fontWeight: '600', fontSize: '24px', lineHeight: '26px', fontFamily: 'Roboto' }}>
                Syahidan
              </Typography>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'row', gap: 27 }}>
              <Typography variant="subtitle1">Jenis Kunjungan</Typography>
              <Typography variant="subtitle1">Keluhan</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'row', gap: "41%" }}>
              <Typography sx={{ fontWeight: '600', fontSize: '24px', lineHeight: '26px', fontFamily: 'Roboto' }}>
                Konsultasi
              </Typography>
              <Typography sx={{ fontWeight: '600', fontSize: '24px', lineHeight: '26px', fontFamily: 'Roboto' }}>
                Sesak napas
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 5, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" sx={{ color: '#8F85F3', border: '1px solid #8F85F3', width: '44px', height: '44px', borderRadius: '8px' }} onClick={handleMenuClick}>
              <MoreVert />
            </Button>
            <Button variant="outlined" sx={{ color: '#8F85F3', border: '1px solid #8F85F3', width: '219px', height: '44px', borderRadius: '8px' }} onClick={() => handleConfirm('proses pasien')}>
              Proses pasien
            </Button>
            <Button variant="contained" disabled sx={{ width: '233px', height: '44px', borderRadius: '8px', }} onClick={() => handleOpenConfirm('panggil pasien')}>
              Panggil pasien dalam {countdown}
            </Button>
          </Box>
          </Box>
          )}

          
        </CardContent>
      </Card>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}

        sx={{
          '& .MuiPaper-root': {
            borderRadius: '16px',
            border: '1px solid #A8A8BD',
          },
          position: 'relative',
          width: '300px',
          height: '300px',
          
        }}
      >
        <MenuItem onClick={handelLewatiPasien}>Lewati antrian</MenuItem>
        <MenuItem onClick={handlePasienTidakDatang}>Pasien tidak datang</MenuItem>
      </Menu>
    </div>
  );
};

export default ModalPanggilPasien;
