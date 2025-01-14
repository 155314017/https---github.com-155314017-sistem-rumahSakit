/* eslint-disable @typescript-eslint/no-explicit-any */
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
  title: string | undefined;
  columns: Array<{ id: string; label: string }>;
  data: Array<Record<string, any>>;
  actions?: (row: Record<string, any>) => JSX.Element;
}

const CardDetail: React.FC<DetailCardProps> = ({
  title,
  columns,
  data,
  actions,
}) => {
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
                {columns.map((column) => (
                  <TableCell key={column.id} align="left">
                    {column.label}
                  </TableCell>
                ))}
                {actions && <TableCell align="left">Aksi</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {columns.map((columns) => (
                    <TableCell key={columns.id} sx={{ fontWeight: "700" }}>
                      {row[columns.id] || "-"}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell sx={{ display: "flex", gap: 3 }}>
                      {actions(row)}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default CardDetail;
