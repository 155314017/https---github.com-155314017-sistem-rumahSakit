import { Container, Box } from "@mui/system";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import CardInfoPasienRawatJalan from "../../../components/small/card/CardOutpatientInformation";
import CardRekamMedis from "../components/CardRekamMedis";
import CardAppointmentCard from "../components/CardAppointmentCard";
import profilePict from "../../../assets/img/meme.jpg";
import imgString from "../../../assets/img/String.png";
import { Button, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useDetailPasienRawatJalan from "../hooks/useDetailPasienRawatJalan";
import AlertSuccess from "../../../components/small/alert/AlertSuccess";
import ModalConfirmationSkipPatient from "../../../components/medium/modal/ModalConfirmationSkipPatient";


export default function DetailPasienRawatJalan() {
    const {
        breadcrumbItems,
        handleClose,
        handleDeleteSuccess,
        handleCloseModal,
        handleOpenModal,
        handleClick,
        anchorEl,
        openModal,
        startCountdown,
        isCounting,
        countdown,
        alertPanggil
    } = useDetailPasienRawatJalan();

    return (
        <>
            {alertPanggil && (
                <AlertSuccess label="Pasien sedang dipanggil" />
            )}
            <Container sx={{ py: 2, minWidth: '100%', minHeight: 'fit-content', position: 'relative', pb: 15 }}>
                <BreadCrumbs
                    breadcrumbItems={breadcrumbItems}
                    onBackClick={() => window.history.back()}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Box
                        mt={3}
                        display={'flex'}
                        flexDirection={'column'}
                        gap={3}
                        sx={{ flexShrink: 0, width: '25%' }}
                    >
                        <CardInfoPasienRawatJalan
                            namaLengkap="Haji Rashford"
                            jenisKelamin="Lanang"
                            nomorMR="12123"
                            tanggalLahir="1999-09-09"
                            avatarUrl={profilePict}
                            onUbahData={() => { }}
                            onHapusData={() => handleDeleteSuccess()}
                        />
                        <CardAppointmentCard />
                    </Box>

                    <Box
                        mt={3}
                        sx={{ flexShrink: 0, width: '72.5%' }}
                    >
                        <CardRekamMedis />
                    </Box>
                </Box>
            </Container>

            <Box
                sx={{
                    width: '100%',
                    height: '100px',
                    bgcolor: 'white',
                    zIndex: 999,
                    position: 'fixed',
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    boxShadow: '0px -8px 8px rgba(0, 0, 4, 0.05)',
                }}
            >
                <Button sx={{
                    width: '44px',
                    height: '44px',
                    bgcolor: 'inherit',
                    color: '#8F85F3',
                    border: '1px solid #8F85F3',
                    // position: 'relative',
                    // zIndex: 2,
                }}
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </Button>
                <Button sx={{
                    width: '642px',
                    height: '44px',
                    bgcolor: 'inherit',
                    color: '#8F85F3',
                    border: '1px solid #8F85F3',
                    position: 'relative',
                    zIndex: 2,
                }}>
                    Proses Pasien
                </Button>
                <Button sx={{
                    width: '642px',
                    height: '44px',
                    bgcolor: isCounting ? "#ccc" : "#8F85F3", color: "white",
                    border: '1px solid #8F85F3',
                    position: 'relative',
                    zIndex: 2,
                }}
                onClick={startCountdown}
                disabled={isCounting}
                >
                    {isCounting ? countdown : "Panggil Pasien"}
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    PaperProps={{
                        sx: {
                            marginTop: '10px',
                            bgcolor: '#FFFFFF',
                            border: '1px solid #A8A8BD',
                            borderRadius: '16px',
                            width: '393px',
                            height: '128px',
                            display: 'flex',
                            alignItems: 'center',
                        },
                    }}
                >
                    <MenuItem sx={{ color: '#8F85F3', fontWeight: 400, fontSize: '16px', lineHeight: '18px', minWidth: '180%', ml: 2, borderRadius: '12px' }} onClick={handleOpenModal}>Lewati Antrian</MenuItem>
                    <MenuItem sx={{ color: '#8F85F3', fontWeight: 400, fontSize: '16px', lineHeight: '18px', mt: 1, minWidth: '180%', ml: 2, borderRadius: '12px' }} onClick={handleOpenModal}>Pasien Tidak Datang</MenuItem>
                </Menu>
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    // left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                }}>
                    <img src={imgString} alt="bgImage" style={{ height: '100%' }} />
                </Box>
                <ModalConfirmationSkipPatient open={openModal} onClose={handleCloseModal} />
            </Box>
        </>
    );
}
