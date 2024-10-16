/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Box, Typography, Button, Grid, CircularProgress, Alert } from "@mui/material";

const ImageUploader: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);        // Menyimpan URL gambar untuk ditampilkan
    const [imageBase64, setImageBase64] = useState<string>("");     // Menyimpan gambar dalam base64
    const [loading, setLoading] = useState<boolean>(false);         // Status loading
    const [dragging, setDragging] = useState<boolean>(false);       // Status dragging
    const [error, setError] = useState<string>("");                 // Pesan error

    // Validasi file tipe image
    const validateFile = (file: File): boolean => {
        const validTypes = ["image/jpeg", "image/png", "image/svg+xml", "image/gif"];
        if (!validTypes.includes(file.type)) {
            setError("File harus berupa JPG, PNG, SVG, atau GIF.");
            return false;
        }
        return true;
    };

    // Validasi dimensi file
    const validateDimensions = (file: File, callback: (isValid: boolean) => void) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            if (img.width > 800 || img.height > 400) {
                setError("Dimensi gambar maksimal adalah 800x400 piksel.");
                callback(false);
            } else {
                callback(true);
            }
        };
    };

    // Drag-and-drop handlers
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0]; // mengambil file yang di drop
        handleFileUpload(file); // lanjut ke validasi
    };

    // File input handler
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    // Upload file dan validasi
    const handleFileUpload = (file: File) => {
        if (validateFile(file)) {
            setError(""); // Reset error jika tidak ada masalah dengan file

            validateDimensions(file, (isValid) => {
                if (isValid) {
                    setLoading(true);
                    const reader = new FileReader();

                    reader.onload = () => {
                        setTimeout(() => {
                            setImage(reader.result as string); // menampilkan gambar
                            // setImageBase64(reader.result!.split(",")[1]); // menyimpan base64
                            setLoading(false);
                        }, 2000); // delay 2 detik
                    };

                    reader.readAsDataURL(file); // membaca file sebagai base64
                }
            });
        }
    };

    // Simpan ke database (dummy action)
    const handleSaveToDatabase = () => {
        console.log("Image in Base64:", imageBase64);
        // Kirim ke server atau database
    };

    return (
        <Grid container justifyContent="center" alignItems="center" direction="column" sx={{ mt: 5 }}>
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <Box
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{
                    border: dragging ? "2px dashed blue" : "2px dashed gray",
                    borderRadius: "12px",
                    padding: "20px",
                    textAlign: "center",
                    width: "350px",
                    height: "250px",
                    backgroundColor: dragging ? "#f0f8ff" : "#fafafa",
                    transition: "background-color 0.3s ease",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    '&:hover': {
                        backgroundColor: "#f0f8ff",
                    },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <input
                    type="file"
                    accept="image/jpeg, image/png, image/svg+xml, image/gif"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                {loading ? (
                    <CircularProgress />
                ) : image ? (
                    <img
                        src={image}
                        alt="Uploaded"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            borderRadius: "8px",
                        }}
                    />
                ) : (
                    <Typography sx={{ color: "gray", fontSize: "18px" }}>
                        Drag 'n' drop image here, or click to select
                    </Typography>
                )}
            </Box>

            {image && (
                <>
                    <Button
                        variant="contained"
                        sx={{ mt: 3, bgcolor: "#1976d2", '&:hover': { bgcolor: "#155fa0" } }}
                        onClick={handleSaveToDatabase}
                    >
                        Save to Database
                    </Button>
                </>
            )}
        </Grid>
    );
};

export default ImageUploader;
