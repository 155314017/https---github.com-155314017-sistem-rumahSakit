/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { SetStateAction, useState } from 'react'
import CardCatatanDetailTindakanPasien from './CardCatatanDetailTindakanPasien'
import DropdownList from '../dropdownlist/DropdownList'
import SearchBar from '../SearchBar'

export default function CardRiwayatKunjungan() {
    const components = Array(5).fill(null);
    const [page, setPage] = useState(1);
    const pageSize = 2;
    const totalElements = components.length;
    const totalPages = Math.ceil(components.length / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const filter = [
        { value: 'filter', label: "Filter" },
        { value: 'filter1', label: "Filter1" },
        { value: 'filter2', label: "Filter2" },
    ];

    const urutkan = [
        { value: 'urutkan', label: "Urutkan" },
        { value: 'urutkan1', label: "Urutkan1" },
        { value: 'urutkan2', label: "Urutkan2" },
    ];

    const handleChangeFilter = (value: string) => {
        console.log(value);
    };

    const handleChangeUrutkan = (value: string) => {
        console.log(value);
    };
    const handleChangePage = (event: any, value: SetStateAction<number>) => {
        setPage(value);
        console.log(event);
    };




    return (
        <>
            <Box
                display={'flex'}
                flexDirection={'column'}
                p={2}
                minWidth={'970px'}
                mt={2}
                border={"1px solid #C5C5D3"}
                borderRadius={"24px"}
                minHeight={"fit-content"}
            >
                <Typography sx={{ fontWeight: 600, fontSize: '18px', lineHeight: '20px', color: '#0A0A0D', mb: 2 }} >Informasi Kunjungan</Typography>
                <Stack>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }} >
                        <SearchBar />
                        <DropdownList
                            defaultValue='Filter'
                            onChange={handleChangeFilter}
                            loading={false}
                            options={filter}
                        // placeholder='Pilih tipe jadwal'
                        />
                        <SearchBar />
                        <DropdownList
                            defaultValue='Urutkan'
                            onChange={handleChangeUrutkan}
                            loading={false}
                            options={urutkan}
                        // placeholder='Pilih tipe jadwal'
                        />
                    </Box>
                    {components.slice(startIndex, endIndex).map((_, index) => (
                        <CardCatatanDetailTindakanPasien key={startIndex + index} />
                    ))}
                </Stack>
            </Box>
            {/* Paginasi */}
            <Stack spacing={2} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography sx={{ color: "#A8A8BD" }}>
                    Showing {components.length > 0 ? (page - 1) * pageSize + 1 : 0} to {Math.min((page) * pageSize, totalElements)} of {totalElements} entries
                </Typography>
                <Pagination
                    count={totalPages}
                    variant="outlined"
                    shape="rounded"
                    page={page}
                    onChange={handleChangePage}
                    sx={{
                        "& .MuiPaginationItem-root": {
                            color: "#8F85F3",
                            border: 'none',
                        },
                        "& .Mui-selected": {
                            backgroundColor: "#8F85F3",
                            bgcolor: '#D5D1FB',
                        },
                        "& .MuiPaginationItem-ellipsis": {
                            border: 'none',
                        },
                        "& .MuiPaginationItem-text": {
                            border: 'none',
                        },
                    }}
                />
            </Stack>
        </>
    )
}
