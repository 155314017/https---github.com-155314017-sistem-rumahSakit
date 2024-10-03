import React, { useState } from "react";
import { Button, Typography, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const handleRemoveFile = () => {
    setFileName(null);
    setBase64String(null);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
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
          backgroundColor: "#FAFAFA",
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
              width={"388px"}
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
  );
};

export default FileUploader;

{
  /* <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                sx={{ marginLeft: '20px' }}
                disabled={!base64String}
            >
                Unggah
            </Button> */
}
