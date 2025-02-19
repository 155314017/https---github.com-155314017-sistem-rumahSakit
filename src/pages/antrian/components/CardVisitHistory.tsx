/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { SetStateAction, useState } from 'react'
import CardCatatanDetailTindakanPasien from './CardPatientActionDetailRecord'
import DropdownList from '../../../components/small/dropdownlist/DropdownList'
import SearchBar from '../../../components/small/SearchBar'
import Data from "../../../data/dummyData/dataInformasiRiwayat";

interface DataItem {
    tanggal: any;
    perawat: string;
    jamLaporan: string;
    catatanKeluhan: string;
}

interface GroupedData {
    [key: string]: DataItem[];
}

export default function CardVisitHistory() {
    const [page, setPage] = useState(1);
    const data = Data;
    const pageSize = 2;

    const groupedData: GroupedData = data.reduce((acc: GroupedData, currentItem: DataItem) => {
        const date = currentItem.tanggal;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(currentItem);
        return acc;
    }, {});

    const uniqueDates = Object.keys(groupedData);

    const totalPages = Math.ceil(uniqueDates.length / pageSize);
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

    const handleChangePage = (_event: any, value: SetStateAction<number>) => {
        setPage(value);
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
                bgcolor={'#ffff'}
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
                        />
                        <SearchBar />
                        <DropdownList
                            defaultValue='Urutkan'
                            onChange={handleChangeUrutkan}
                            loading={false}
                            options={urutkan}
                        />
                    </Box>
                    {uniqueDates.slice(startIndex, endIndex).map(date => (
                        <Box key={date}>
                            <Box
                                sx={{
                                    bgcolor: '#EEEEF2',
                                    width: '97%',
                                    height: 'fit-content',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    mt: 2
                                }}
                            >
                            
                                <Typography>{date}</Typography>
                            </Box>
                            {groupedData[date].map((item: DataItem, index: number) => (
                                <CardCatatanDetailTindakanPasien
                                    key={item.tanggal + index}
                                    namaPerawat={item.perawat}
                                    jamLaporan={item.jamLaporan}
                                    catatan={item.catatanKeluhan}
                                />
                            ))}
                        </Box>
                    ))}
                </Stack>
            </Box>

            <Stack spacing={2} mt={2} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography sx={{ color: "#A8A8BD" }}>
                    Showing {uniqueDates.length > 0 ? (page - 1) * pageSize + 1 : 0} to {Math.min(page * pageSize, uniqueDates.length)} of {uniqueDates.length} entries
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
    );
}
