import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';

const PasienLamaRawatJalanUmum: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = 5;

    // Fungsi untuk pindah ke halaman sebelumnya atau halaman saat ini
    const handlePageClick = (page: number) => {
        if (page <= currentPage) {
            setCurrentPage(page);
        } else {
            alert("Selesaikan form di halaman ini dahulu baru Anda bisa lanjut ke halaman selanjutnya.");
        }
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

    // Gaya untuk halaman berdasarkan status (sekarang atau sudah dilewati)
    const getPageStyle = (page: number) => {
        if (page === currentPage) {
            return { color: 'red', cursor: 'pointer' }; // Halaman aktif berwarna merah
        } else if (page < currentPage) {
            return { color: 'green', cursor: 'pointer' }; // Halaman sebelumnya berwarna hijau
        } else {
            return { color: 'black', cursor: 'not-allowed' }; // Halaman selanjutnya tidak bisa diklik
        }
    };

    return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
            {/* Render halaman */}
            <Box mb={2}>
                {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;
                    return (
                        <Typography
                            key={page}
                            variant="h6"
                            onClick={() => handlePageClick(page)}
                            style={getPageStyle(page)}
                            display="inline"
                            mx={2}
                        >
                            Page {page}
                        </Typography>
                    );
                })}
            </Box>

            {/* Tombol untuk pindah halaman */}
            <Button
                variant="contained"
                onClick={handlePrev}
                disabled={currentPage === 1}
                sx={{ mr: 2 }}
            >
                Prev
            </Button>
            <Button
                variant="contained"
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                Next
            </Button>

            {/* Render konten berdasarkan halaman */}
            <Box mt={4}>
                {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;
                    return (
                        currentPage === page && (
                            <Box key={page}>
                                <Typography variant="h4">
                                    This is content for Page {page}
                                </Typography>
                            </Box>
                        )
                    );
                })}
            </Box>
        </Box>
    );
};

export default PasienLamaRawatJalanUmum;
