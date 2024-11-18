import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

interface ImageGridProps {
  largeImage: string;
  smallImages: string[];
  loading: boolean; // For large image
}

const ImageGrid: React.FC<ImageGridProps> = ({ largeImage, smallImages, loading }) => {
  const [smallImagesLoading, setSmallImagesLoading] = useState<boolean[]>(
    Array(smallImages.length).fill(true) // Initial state: all small images are loading
  );

  // Simulate image loading (or replace this with actual image loading logic)
  useEffect(() => {
    const timers = smallImages.map((_, index) =>
      setTimeout(() => {
        setSmallImagesLoading((prev) => {
          const updated = [...prev];
          updated[index] = false; // Mark the specific image as loaded
          return updated;
        });
      }, 1000 * (index + 1)) // Simulated delay per image
    );

    return () => timers.forEach(clearTimeout); // Clear timers on cleanup
  }, [smallImages]);

  return (
    <div>
      <Box display="flex" gap={3}>
        {/* Large Image */}
        <Box width="100%">
          <Box
            width="558px"
            height="509px"
            sx={{ borderRadius: "32px", bgcolor: "#fff", position: "relative" }}
          >
            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ width: "100%", height: "100%" }}
              >
                <CircularProgress size={80} />
              </Box>
            ) : (
              <img
                src={largeImage}
                alt="Large Image"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "32px",
                  objectFit: "cover",
                }}
              />
            )}
          </Box>
        </Box>

        {/* Small Images */}
        <Box
          display="flex"
          flexWrap="wrap"
          gap={3}
          sx={{ width: "max-content" }}
        >
          {smallImages.map((image, index) => (
            <Box
              key={index}
              width="267px"
              height="242.5px"
              sx={{ borderRadius: "32px", bgcolor: "#fff", position: "relative" }}
            >
              {smallImagesLoading[index] ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ width: "100%", height: "100%" }}
                >
                  <CircularProgress size={50} />
                </Box>
              ) : (
                <img
                  src={image}
                  alt={`Small Image ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "32px",
                    objectFit: "cover",
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default ImageGrid;
