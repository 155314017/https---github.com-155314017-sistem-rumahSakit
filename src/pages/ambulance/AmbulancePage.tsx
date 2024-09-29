import { Box, Container } from "@mui/system";
import ImageGroup from "../../components/medium/ImageGroups";
import '../../style/backgroundCustom.css';

export default function AmbulancePage() {
  return (
    <Box className="custom">
      <Box bgcolor={"#D5D1FB"} height={"100vw"}>
        <Box position={'relative'} top={'100px'} >
          <ImageGroup />
        </Box>

        <Container disableGutters sx={{ position: 'relative' }}>
          <Box position="relative">
            <Box
              width={"750px"}
              height={"50px"}
              bgcolor={"#D5D1FB"}
              position={"relative"}
              top={"200px"}
              left={"17%"}
              zIndex={1}
              sx={{ borderRadius: "50px 50px 30px 30px / 0px 0px 40px 40px" }}
            />

            <Box
              width={"150px"}
              height={"150px"}
              bgcolor={"#D5D1FB"}
              position={"relative"}
              top={"117px"}
              left={"900px"}
              zIndex={1}
              sx={{
                clipPath: "polygon(58% 3%, 64% 22%, 48% 22%, 40% 24%, 34% 31%, 32% 37%, 20% 24%)"
              }}
            />
            {/* 
            <Box
              width={"150px"}
              height={"150px"}
              bgcolor={"red"}
              position={"relative"}
              top={"117px"}
              left={"900px"}
              zIndex={1}
              sx={{
                clipPath: "polygon(56% 20%, 90% 43%, 73% 75%, 72% 50%, 64% 40%, 50% 35%, 14% 35%)"
              }}
            /> */}

            <Box
              width={"1140px"}
              height={"188px"}
              bgcolor={"white"}
              position={"absolute"}
              zIndex={0}
            >
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
