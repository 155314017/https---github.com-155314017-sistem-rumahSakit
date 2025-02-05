import { Box, Typography, Link, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

import bgImage from "../../../assets/img/String.png";

interface CardDetailKonterProps {
    title: string;
    data: {
        nama: string;
        lokasiKonter: string;
        aksi: {
            hapusLink: string;
            ubahLink: string;
        };
    };
}

export default function CardDetailKonter({ title, data }: CardDetailKonterProps) {
    return (
        // <Card sx={{ borderRadius: "24px" }}>
        //     <CardContent>
        //         <Box
        //             sx={{
        //                 display: "flex",
        //                 justifyContent: "space-between",
        //                 alignItems: "center",
        //                 mb: 3,
        //             }}
        //         >
        //             <Typography variant="h6" fontWeight="bold">
        //                 {title}
        //             </Typography>
        //             {/* <Box>
        //                 <Link
        //                     underline="hover"
        //                     sx={{ color: "#8F85F3", mr: 2 }}
        //                     href={data.aksi.hapusLink}
        //                 >
        //                     Hapus
        //                 </Link>
        //                 <Link
        //                     underline="hover"
        //                     sx={{ color: "#8F85F3" }}
        //                     href={data.aksi.ubahLink}
        //                 >
        //                     Ubah
        //                 </Link>
        //             </Box> */}
        //         </Box>

        //         <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        //             <Box>
        //                 <Typography color="text.secondary" fontSize={14}>
        //                     Nama Konter
        //                 </Typography>
        //                 <Typography>{data.nama}</Typography>
        //             </Box>

        //             <Box>
        //                 <Typography color="text.secondary" fontSize={14}>
        //                     Lokasi Konter
        //                 </Typography>
        //                 <Typography>{data.lokasiKonter}</Typography>
        //             </Box>
        //         </Box>
        //     </CardContent>
        // </Card>

        <div>
        <Box
            position={"relative"}
            p={3}
            height="188px"
            sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}
        >
            <Typography
                sx={{
                    textTransform: "capitalize",
                    fontWeight: "700",
                    fontSize: "20px",
                }}
            >
                {title}
            </Typography>

            <Box position="absolute" sx={{ top: 0, right: 0 }}>
                <img src={bgImage} alt="bg-image" />
            </Box>

            <Box
                position={"absolute"}
                sx={{
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                }}
            >
                {/* lengkung kiri */}
                <Box
                    sx={{
                        width: "50px",
                        height: "30px",
                        bgcolor: "#F1F0FE",
                    }}
                >
                    <Box
                        sx={{
                            width: "50px",
                            height: "30px",
                            bgcolor: "#fff",
                            borderRadius: "0px 15px 0px 0px ",
                        }}
                    />
                </Box>

                {/* kotak tengah */}
                <Box
                    sx={{
                        width: "600px",
                        height: "50px",
                        bgcolor: "#F1F0FE",
                        borderRadius: "0px 0px 22px 22px",
                    }}
                />

                {/* lengkung kanan */}
                <Box
                    sx={{
                        width: "50px",
                        height: "30px",
                        bgcolor: "#F1F0FE",
                    }}
                >
                    <Box
                        sx={{
                            width: "50px",
                            height: "30px",
                            bgcolor: "#fff",
                            borderRadius: "15px 0px 0px 0px ",
                        }}
                    />
                </Box>
            </Box>

            <TableContainer sx={{ mt: 3 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Nama Konter</TableCell>
                            <TableCell align="left">Lokasi Konter</TableCell>
                            <TableCell align="left">Aksi</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell sx={{ fontWeight: "700" }}>
                                {data.nama}
                            </TableCell>
                            <TableCell sx={{ fontWeight: "700" }}>
                                {data.lokasiKonter}
                            </TableCell>
                          
                            <TableCell sx={{ display: "flex", gap: 3 }}>
                                <Link
                                    underline="hover"
                                    sx={{ color: "#8F85F3" }}
                                    href={data.aksi.hapusLink}
                                >
                                    Hapus
                                </Link>
                                <Link
                                    underline="hover"
                                    sx={{ color: "#8F85F3" }}
                                    href={data.aksi.ubahLink}
                                >
                                    Ubah
                                </Link>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </div>
    );
} 