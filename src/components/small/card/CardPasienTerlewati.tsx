import { Box, Stack, Typography } from "@mui/material";
import bgImage from "../../../assets/img/String.png";
import { useState } from "react";
import MiniTableRawatJalan from "../../../pages/antrian/features/MiniTableRawatJalan";

export default function CardPasienTerlewati() {
    const [showAll, setShowAll] = useState(false);

    const toggleShowAll = () => {
        setShowAll((prev) => !prev);
    };

    return (
        <Box>

            <Box
                height={"378px"}
                width={"100%"}
                sx={{
                    backgroundColor: "#fff",
                    borderRadius: "24px",
                }}
            >
                <Stack p={2} position="relative">
                    <Typography fontWeight={600} fontSize={'24px'} lineHeight={'26px'}>
                        Pasien antrian yang terlewat
                    </Typography>
                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="card-bg" />
                    </Box>

                    <Box>
                        <MiniTableRawatJalan showAll={showAll} />
                    </Box>

                    <Box display="flex" justifyContent={'center'} >
                        {/* <Button color="primary" sx={{
                            padding: '12px', mr: 1, bgcolor: '#ffff', border: '1px solid #8F85F3', color: '#8F85F3', maxWidth: '8px', borderRadius: '8px', height: '44px', '&:hover': {
                                backgroundColor: "#8F85F3", color: '#ffff',
                            },
                        }}>
                            Lihat Semua
                        </Button> */}
                        <Typography
                            onClick={toggleShowAll}
                            sx={{ cursor: "pointer", color: "#8F85F3", fontWeight: 400, fontSize: "16px", lineHeight: "18px" }}
                        >
                            {showAll ? "Tampilkan Lebih Sedikit" : "Lihat Semua"}
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}
