import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

interface ImageGridProps {
  largeImage: string;
  smallImages: string[];
  loading: boolean;
}

const ImageGrid: React.FC<ImageGridProps> = ({ largeImage, smallImages, loading }) => {
  // Hitung total gambar (large + small)
  const totalImages = smallImages.length + 1;

  return (
    <div>
      <Box display="flex" gap={3}>
        {totalImages === 1 ? (
          // Tampilan untuk 1 gambar (full width)
          <Box width="100%">
            <Box
              width="100%"
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
        ) : totalImages === 2 ? (
          // Tampilan untuk 2 gambar (2 kolom sejajar)
          <>
            <Box width="50%">
              <Box
                width="100%"
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
            <Box width="50%">
              <Box
                width="100%"
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
                    src={smallImages[0]}
                    alt="Second Image"
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
          </>
        ) : (
          // Tampilan default untuk 3 gambar atau lebih
          <>
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

            <Box
              display="grid"
              gridTemplateColumns="repeat(2, 267px)"
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
                  {loading ? (
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
          </>
        )}
      </Box>
    </div>
  );
};

export default ImageGrid;
