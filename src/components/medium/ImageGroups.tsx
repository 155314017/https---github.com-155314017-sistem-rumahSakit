import { CardMedia, Container, Box, Grid } from "@mui/material";
import ambulance1 from "../../img/Amblance1.png";
import ambulance2 from "../../img/Ambulance2.png";
import ambulance3 from "../../img/Ambulance3.png";
import ambulance4 from "../../img/Ambulance4.png";
import ambulance5 from "../../img/Ambulance5.png";

export default function ImageGroup() {
    return (
        <Container sx={{ width: "100%", maxWidth: "1200px" }}>
            <Box display={"flex"} flexDirection={"row"} gap={2}>
                <CardMedia
                    component="img"
                    height="509"
                    sx={{ width: "558px", objectFit: "cover", marginBottom: 2 }}
                    image={ambulance1}
                    alt="Main Ambulance Image"
                />
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Box display="flex" justifyContent="center">
                                <CardMedia
                                    component="img"
                                    height="242.5"
                                    sx={{ width: "267px", objectFit: "cover" }}
                                    image={ambulance2}
                                    alt="Ambulance Image 2"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box display="flex" justifyContent="center">
                                <CardMedia
                                    component="img"
                                    height="242.5"
                                    sx={{ width: "267px", objectFit: "cover" }}
                                    image={ambulance3}
                                    alt="Ambulance Image 3"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box display="flex" justifyContent="center">
                                <CardMedia
                                    component="img"
                                    height="242.5"
                                    sx={{ width: "267px", objectFit: "cover" }}
                                    image={ambulance4}
                                    alt="Ambulance Image 4"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box display="flex" justifyContent="center">
                                <CardMedia
                                    component="img"
                                    height="242.5"
                                    sx={{ width: "267px", objectFit: "cover" }}
                                    image={ambulance5}
                                    alt="Ambulance Image 5"
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
