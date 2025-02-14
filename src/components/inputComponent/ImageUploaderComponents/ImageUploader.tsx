import React, { useState } from "react";
import { Box, Typography, Button, Grid, CircularProgress, Alert } from "@mui/material";

const ImageUploader: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);      
    const [imageBase64] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false); 
    const [dragging, setDragging] = useState<boolean>(false); 
    const [error, setError] = useState<string>("");

    const validateFile = (file: File): boolean => {
        const validTypes = ["image/jpeg", "image/png", "image/svg+xml", "image/gif"];
        if (!validTypes.includes(file.type)) {
            setError("File harus berupa JPG, PNG, SVG, atau GIF.");
            return false;
        }
        return true;
    };

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
        const file = e.dataTransfer.files[0];
        handleFileUpload(file); 
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleFileUpload = (file: File) => {
        if (validateFile(file)) {
            setError(""); 

            validateDimensions(file, (isValid) => {
                if (isValid) {
                    setLoading(true);
                    const reader = new FileReader();

                    reader.onload = () => {
                        setTimeout(() => {
                            setImage(reader.result as string);
                            setLoading(false);
                        }, 2000);
                    };

                    reader.readAsDataURL(file);
                }
            });
        }
    };

    const handleSaveToDatabase = () => {
        console.log("Image in Base64:", imageBase64);
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
