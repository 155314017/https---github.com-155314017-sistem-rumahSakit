import { Box } from "@mui/system";
import img from "../../../img/registerPasienImage.png";
import logo from "../../../img/St.carolus.png";
import { CardMedia, Typography } from "@mui/material";
import { useState } from "react";

const PasienLamaRawatJalanUmum: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = 2;

    // Fungsi untuk mengubah halaman
    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    // Fungsi untuk pindah ke halaman berikutnya
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Fungsi untuk pindah ke halaman sebelumnya
    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Gaya untuk halaman berdasarkan status (aktif, dilewati, atau belum dilewati)
    const getPageStyle = (page: number) => {
        if (page === currentPage) {
            return { color: 'red', cursor: 'pointer', fontWeight: 'bold' }; // Halaman aktif berwarna merah
        } else if (page < currentPage) {
            return { color: 'green', cursor: 'pointer' }; // Halaman sebelumnya berwarna hijau
        } else {
            return { color: 'black', cursor: 'pointer' }; // Halaman yang belum dilewati berwarna hitam
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }} >
            {/* Bagian gambar */}
            <Box>
                <CardMedia
                    component="img"
                    height="864"
                    sx={{ width: "793px", objectFit: "cover" }}
                    image={img}
                    alt="Example Image"
                />
            </Box>

            {/* Bagian form */}
            <Box sx={{ paddingLeft: '20px' }}>
                {/* Logo */}
                <Box>
                    <CardMedia
                        component="img"
                        height="52"
                        sx={{ width: "112px", objectFit: "cover" }}
                        image={logo}
                        alt="Example Logo"
                    />
                </Box>

                {/* Judul Formulir */}
                <Box mt={2}>
                    <Typography sx={{ fontSize: '32px', fontWeight: '600', lineHeight: '34px' }} >
                        Formulir pendaftaran pasien Umum
                    </Typography>
                </Box>

                {/* Navigasi halaman */}
                <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, mb: 2 }}>
                    <Typography
                        onClick={() => handlePageClick(1)}
                        sx={getPageStyle(1)}
                        mx={2}
                    >
                        Penanggung jawab pasien
                    </Typography>
                    <Typography
                        onClick={() => handlePageClick(2)}
                        sx={getPageStyle(2)}
                        mx={2}
                    >
                        Jenis Kunjungan
                    </Typography>
                </Box>

                {/* Konten berdasarkan halaman */}
                <Box>
                    {currentPage === 1 && (
                        <Box>
                            <Typography variant="h5" mb={2}>
                                Penanggung jawab pasien
                            </Typography>
                            {/* Isi konten halaman 1 di sini */}
                            <Typography>Formulir detail penanggung jawab...</Typography>
                        </Box>
                    )}
                    {currentPage === 2 && (
                        <Box>
                            <Typography variant="h5" mb={2}>
                                Jenis Kunjungan
                            </Typography>
                            {/* Isi konten halaman 2 di sini */}
                            <Typography>Formulir untuk memilih jenis kunjungan...</Typography>
                        </Box>
                    )}
                </Box>

                {/* Tombol untuk navigasi halaman sebelumnya dan berikutnya */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Typography
                        sx={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                        onClick={handlePrev}
                    >
                        Sebelumnya
                    </Typography>
                    <Typography
                        sx={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                        onClick={handleNext}
                    >
                        Berikutnya
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default PasienLamaRawatJalanUmum;
