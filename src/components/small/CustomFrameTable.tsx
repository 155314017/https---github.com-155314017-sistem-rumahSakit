import { Box } from '@mui/system'

interface CustomFrameTableProps {
    tipe?: string
}

const CustomFrameTable: React.FC<CustomFrameTableProps> = ({ tipe }) => {
    return (
        <>
            {/* membuat bentuk lengkung atas */}
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
                            bgcolor: tipe === 'infromasi' ? "#FAFAFA" : "#fff",
                            borderRadius: "0px 15px 0px 0px ",
                        }}
                    />
                </Box>

                {/* kotak tengah */}
                <Box
                    sx={{
                        width: tipe === 'infromasi' ? "350px" : "600px",
                        height: "50px",
                        bgcolor: "#F1F0FE",
                        borderRadius: "0px 0px 22px 22px",
                        '@media (min-width: 750px) and (max-width: 1194px)': { //responsif layar
                            width: '200px'
                        },
                        '@media (min-width: 625px) and (max-width: 750px)': { //responsif layar
                            width: '100px'
                        },
                        '@media (max-width: 625px)': { //responsif layar
                            width: '40px'
                        }
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
                            bgcolor: tipe === 'infromasi' ? "#FAFAFA" : "#fff",
                            borderRadius: "15px 0px 0px 0px ",
                        }}
                    />
                </Box>
            </Box>
            {/* ---------- */}
        </>
    )
}

export default CustomFrameTable