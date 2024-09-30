import { Box } from "@mui/system";

interface ImageGridProps {
  largeImage: string;
  smallImages: string[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ largeImage, smallImages }) => {
  return (
    <div>
      <Box display="flex" gap={3}>
        <Box width="100%">
          <Box
            width="558px"
            height="509px"
            sx={{ borderRadius: "32px", bgcolor: "#fff" }}
          >
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
              sx={{ borderRadius: "32px", bgcolor: "#fff" }}
            >
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
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default ImageGrid;
