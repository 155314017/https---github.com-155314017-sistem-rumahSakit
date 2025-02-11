import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Typography, IconButton, Box } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface ImageInfo {
  file: File;
  preview: string;
  name: string;
  size: string;
}

interface ImageUploaderProps {
  onImagesSelected?: (images: ImageInfo[]) => void; 
  maxFileSize?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImagesSelected,
  maxFileSize = 3 * 1024 * 1024, // Default 3MB
}) => {
  const [selectedImages, setSelectedImages] = useState<ImageInfo[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newImages = acceptedFiles.map((file) => {
        const imageUrl = URL.createObjectURL(file);
        const sizeInKB = (file.size / 1024).toFixed(2);
        return {
          file,
          preview: imageUrl,
          name: file.name,
          size: `${sizeInKB} KB`,
        };
      });

      setSelectedImages((prevImages) => {
        const allImages = [...prevImages, ...newImages];
        if (onImagesSelected) {
          onImagesSelected(allImages);
        }
        return allImages;
      });
    },
    [onImagesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxSize: maxFileSize,
    multiple: true,
  });

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      if (onImagesSelected) {
        onImagesSelected(updatedImages);
      }
      return updatedImages;
    });
  };

  return (
    <div>
      <Box mt={3}>
        <Typography sx={{mb: 1}}>
          Unggah gambar<span style={{ color: "red" }}>*</span>
        </Typography>

        <Box
          {...getRootProps()}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "162px",
            borderRadius: "15px",
            border: "2px dashed #aaa",
            backgroundColor: isDragActive ? "#f0f0f0" : "#fafafa",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography
              variant="h5"
              color="#A8A8BD"
              sx={{ fontSize: "16px", fontWeight: "600" }}
            >
              Lepaskan gambar untuk mengunggah
            </Typography>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={1}
            >
              <FileUploadOutlinedIcon
                sx={{ color: "#A8A8BD", fontSize: "30px" }}
              />
              <Typography
                variant="h5"
                sx={{ color: "#A8A8BD", fontSize: "16px" }}
              >
                <span style={{ fontWeight: "600" }}>
                  Klik untuk mengunggah foto atau seret dan lepas
                </span>
                <br />
                <span style={{ fontSize: "14px" }}>
                  SVG, PNG, atau JPG ( Maksimal File 3MB)
                </span>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {selectedImages.length > 0 && (
        <Box
          sx={{
            border: "2px solid #aaa",
            borderRadius: "16px",
            p: 2,
            mt: 2,
          }}
        >
          <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
            Pratinjau Gambar
          </Typography>
          {selectedImages.map((image, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                border: "2px solid #aaa",
                borderRadius: "16px",
                height: "64px",
                p: 1,
                mt: 1,
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  overflow: "hidden",
                  borderRadius: "12px",
                  width: "10%",
                  height: "100%",
                  border: "2px solid #aaa",
                }}
              >
                <img
                  src={image.preview}
                  alt={image.name}
                  style={{
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>

              <Typography variant="body2" color="textSecondary">
                {image.name} <br />
                {image.size}
              </Typography>
              <IconButton
                sx={{
                  position: "absolute",
                  mr: 1,
                  right: 0,
                  backgroundColor: "#fff",
                  color: "red",
                }}
                onClick={() => handleRemoveImage(index)}
              >
                <CloseRoundedIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </div>
  );
};

export default ImageUploader;
