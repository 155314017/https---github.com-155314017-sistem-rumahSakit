import {
    Typography,
    TableRow,
    TableCell,
    Table,
    TableBody,
    TableHead,
    TableContainer,
    Box,
} from "@mui/material";

import bgImage from "../../../assets/img/String.png";

interface DetailCardProps {
    title: string;
    data: {
        senin: string;
        selasa: string;
        rabu: string;
        kamis: string;
        jumat: string;
        sabtu: string;
        minggu: string;
    };
}

const CardOperasional: React.FC<DetailCardProps> = ({ title, data }) => {
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
                                <TableCell align="left">Senin</TableCell>
                                <TableCell align="left">Selasa</TableCell>
                                <TableCell align="left">Rabu</TableCell>
                                <TableCell align="left">Kamis</TableCell>
                                <TableCell align="left">Jumat</TableCell>
                                <TableCell align="left">Sabtu</TableCell>
                                <TableCell align="left">Minggu</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell sx={{ fontWeight: "700" }}>
                                    <div dangerouslySetInnerHTML={{ __html: data.senin }} />
                                </TableCell>
                                <TableCell sx={{ fontWeight: "700" }}>
                                    <div dangerouslySetInnerHTML={{ __html: data.selasa }} />
                                </TableCell>
                                <TableCell sx={{ fontWeight: "700" }}>
                                    <div dangerouslySetInnerHTML={{ __html: data.rabu }} />
                                </TableCell>
                                <TableCell sx={{ fontWeight: "700" }}>
                                    <div dangerouslySetInnerHTML={{ __html: data.kamis }} />
                                </TableCell>
                                <TableCell sx={{ fontWeight: "700" }}>
                                    <div dangerouslySetInnerHTML={{ __html: data.jumat }} />
                                </TableCell>
                                <TableCell sx={{ fontWeight: "700" }}>
                                    <div dangerouslySetInnerHTML={{ __html: data.sabtu }} />
                                </TableCell>
                                <TableCell sx={{ fontWeight: "700" }}>
                                    <div dangerouslySetInnerHTML={{ __html: data.minggu }} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
};

export default CardOperasional;
