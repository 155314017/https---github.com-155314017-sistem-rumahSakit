import {
    Typography,
    TableRow,
    TableCell,
    Table,
    TableBody,
    TableHead,
    TableContainer,
    Link,
    Box,
} from "@mui/material";

import bgImage from "../../../assets/img/String.png";

interface DetailCardProps {
    title: string;
    data: {
        biaya: string;
        waktuPelayanan: string;
        aksi: {
            hapusLink: string;
            ubahLink: string;
        };
    };
}

const CardDetailKlinik: React.FC<DetailCardProps> = ({ title, data }) => {
    return (
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
                                <TableCell align="left">No. Klinik</TableCell>
                                <TableCell align="left">Deskripsis</TableCell>
                                <TableCell align="left">Aksi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell sx={{ fontWeight: "700" }}>
                                    {data.biaya}
                                </TableCell>
                                <TableCell sx={{ fontWeight: "700" }}>
                                    {data.waktuPelayanan}
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
};

export default CardDetailKlinik;
