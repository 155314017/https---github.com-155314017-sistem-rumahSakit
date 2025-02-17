import type React from "react";
import { useState } from "react";
import { Button, Typography, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface FileUploaderProps {
  onBase64Change?: (base64: string | null) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onBase64Change }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); // State untuk pesan error

  const handleRemoveFile = () => {
    setFileName(null);
    setError(null);
    onBase64Change?.(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validasi ukuran file
      if (file.size > 1 * 1024 * 1024) {  // Maksimum 1MB
        setError("Ukuran file terlalu besar. Maksimum 1MB.");
        return;
      }

      setError(null);
      setFileName(file.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onBase64Change?.(base64String); 
      };

      reader.onerror = () => {
        alert("Gagal membaca file. Silakan coba lagi.");
        handleRemoveFile();
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "5px",
        borderRadius: "8px",
        padding: "8px",
        transition: "border-color 0.3s ease",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <input
          accept="*"
          style={{ display: "none" }}
          id="file-upload"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload">
          <Button
            variant="contained"
            component="span"
            sx={{
              backgroundColor: "#8F85F3",
              color: "white",
              width: "150px",
              height: "44px",
              borderRadius: "6px 0px 0px 6px",
              textTransform: "none",
            }}
          >
            Unggah Berkas
          </Button>
        </label>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: error ? "#FFC1C1" : "#FAFAFA",
            borderRadius: "0px 6px 6px 0px",
            width: "100%",
            height: "44px",
            color: "black",
          }}
        >
          {fileName ? (
            <>
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                width={"100%"}
                alignItems={"center"}
              >
                <Typography
                  variant="body1"
                  sx={{ marginRight: "10px", marginLeft: "15px" }}
                >
                  {fileName}
                </Typography>
                <IconButton onClick={handleRemoveFile} sx={{ color: "black" }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </>
          ) : (
            <Typography variant="body1" sx={{ marginLeft: "15px" }}>
              Tidak ada file yang diunggah
            </Typography>
          )}
        </Box>

      </Box>

      {error && (
        <Typography
          variant="body2"
          color="error"
          sx={{ marginTop: "5px", fontSize: "14px" }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default FileUploader;
