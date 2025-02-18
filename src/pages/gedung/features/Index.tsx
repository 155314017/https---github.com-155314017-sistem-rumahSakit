import React, { useState } from "react";
import { Box } from "@mui/material";
import TableGedung from "./TableGedung";
import { GedungProvider } from "../../../contexts/gedung/gedungContext";
import useIndex from "../hooks/useIndex";
import SideBar from "../../../components/SideBar/SideBar";

const Index = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [orderBy, setOrderBy] = useState("");
  const { handleSearchChange } = useIndex();

  return (
    <Box>
      <SideBar />
      <Box sx={{ marginLeft: "240px", padding: "20px" }}>
        <GedungProvider>
          <TableGedung 
            onSearchChange={handleSearchChange}
            setPageNumber={setPageNumber}
            setOrderBy={setOrderBy}
          />
        </GedungProvider>
      </Box>
    </Box>
  );
};

export default Index;
