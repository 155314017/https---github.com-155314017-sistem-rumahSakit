/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, DragEvent, ChangeEvent, useRef } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { Grid } from "@mui/system";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

interface ImageData {
    image: string | null;      // Menyimpan URL gambar untuk ditampilkan
    imageBase64: string;       // Menyimpan gambar dalam base64
    loading: boolean;          // Status loading
    error: string;             // Pesan error
}

const ImageUploaderGroup: React.FC = () => {
    const [images, setImages] = useState<ImageData[]>(
        Array(5).fill({ image: null, imageBase64: "", loading: false, error: "" })
    );

    const inputRefs = useRef<HTMLInputElement[]>([]); // Menyimpan referensi untuk input file

    const validateFile = (file: File): boolean => {
        const validTypes = ["image/jpeg", "image/png", "image/svg+xml", "image/gif"]; // jenis file yang di acc
        if (!validTypes.includes(file.type)) {
            return false;
        }
        return true;
    };

    const validateDimensions = (file: File, callback: (isValid: boolean) => void) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            if (img.width > 8000 || img.height > 4000) {
                callback(false);
            } else {
                callback(true);
            }
        };
    };

    const handleFileUpload = (file: File, index: number) => {
        if (validateFile(file)) {
            validateDimensions(file, (isValid) => {
                if (isValid) {
                    const reader = new FileReader();
                    setImages((prevImages) =>
                        prevImages.map((img, i) => i === index ? { ...img, loading: true, error: "" } : img)
                    );

                    reader.onload = () => {
                        setTimeout(() => {
                            setImages((prevImages) =>
                                prevImages.map((img, i) =>
                                    i === index
                                        ? { ...img, image: reader.result as string, imageBase64: (reader.result as string).split(",")[1], loading: false }
                                        : img
                                )
                            );
                        }, 2000); // delay 2 detik
                    };

                    reader.readAsDataURL(file); // Membaca file sebagai base64
                } else {
                    setImages((prevImages) =>
                        prevImages.map((img, i) => i === index ? { ...img, error: "Dimensi gambar maksimal adalah 800x400 piksel." } : img)
                    );
                }
            });
        } else {
            setImages((prevImages) =>
                prevImages.map((img, i) => i === index ? { ...img, error: "File harus berupa JPG, PNG, SVG, atau GIF." } : img)
            );
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (file) handleFileUpload(file, index);
    };

    // Kirim semua gambar ke server atau database
    const handleSaveToDatabase = () => {
        images.forEach((img, index) => {
            if (img.imageBase64) {
                console.log(`Image ${index + 1} in Base64:`, img.imageBase64);
            }
        });
    };

    const handleBoxClick = (index: number) => {
        if (inputRefs.current[index]) {
            inputRefs.current[index].click(); // Trigger input click to open file manager
        }
    };

    // Handle drag and drop
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) handleFileUpload(file, index);
    };

    return (
        <>
            <Typography sx={{ fontSize: "16px", fontWeight: 600, mt:1 }}>Unggah Foto<span style={{ color: "red" }}>*</span></Typography>
            <Typography fontSize={'14px'} mb={1} color='#A8A8BD' >Format foto harus .SVG, .PNG, atau .JPG dan ukuran foto maksimal 4MB.</Typography>
            <Grid container justifyContent="center" alignItems="center" direction="column" spacing={4} maxHeight={'350px'} maxWidth={'100%'} >
                {images.map((imgData, index) => (
                    <Grid key={index}>
                        {imgData.error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {imgData.error}
                            </Alert>
                        )}

                        <Box
                            onClick={() => handleBoxClick(index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                            sx={{
                                border: imgData.loading ? "2px dashed blue" : "2px dashed gray",
                                borderRadius: "12px",
                                // padding: "20px",
                                textAlign: "center",
                                width: "190px",
                                height: "160px",
                                backgroundColor: "#fafafa",
                                // backgroundColor:'blue',
                                transition: "background-color 0.3s ease",
                                cursor: "pointer",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <input
                                type="file"
                                accept="image/jpeg, image/png, image/svg+xml, image/gif"
                                ref={(el) => (inputRefs.current[index] = el!)}
                                style={{ display: "none" }}
                                onChange={(e) => handleFileChange(e, index)}
                            />
                            {imgData.loading ? (
                                <CircularProgress />
                            ) : imgData.image ? (
                                <img
                                    src={imgData.image}
                                    alt={`Uploaded ${index + 1}`}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                        borderRadius: "8px",
                                    }}
                                />
                            ) : (
                                <Box>
                                    <AddPhotoAlternateOutlinedIcon />
                                    <Typography sx={{ color: "gray", fontSize: "18px" }}>
                                        Foto {index + 1}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                ))}

                {/* <Button
                variant="contained"
                sx={{ mt: 3, bgcolor: "#1976d2", '&:hover': { bgcolor: "#155fa0" } }}
                onClick={handleSaveToDatabase}
            >
                Save All to Database
            </Button> */}
            </Grid>
        </>
    );
};

export default ImageUploaderGroup;
