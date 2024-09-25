import React, { useState } from 'react';
import { Button, Typography, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FileUploader: React.FC = () => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [base64String, setBase64String] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64String(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = () => {
        console.log('Mengunggah file:', fileName);
        console.log('Base64:', base64String);
    };

    const handleRemoveFile = () => {
        setFileName(null);
        setBase64String(null);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '20px' }}>
            <input
                accept="*"
                style={{ display: 'none' }}
                id="file-upload"
                type="file"
                onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
                <Button variant="contained" component="span" sx={{ backgroundColor: 'purple', color: 'white' }}>
                    Pilih File
                </Button>
            </label>
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                {fileName && (
                    <>
                        <Typography variant="body1" sx={{ marginRight: '10px' }}>
                            {fileName}
                        </Typography>
                        <IconButton onClick={handleRemoveFile} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </>
                )}
            </Box>
            <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                sx={{ marginLeft: '20px' }}
                disabled={!base64String}
            >
                Unggah
            </Button>
        </Box>
    );
};

export default FileUploader;
