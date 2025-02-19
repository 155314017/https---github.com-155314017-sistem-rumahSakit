import { Container, Box } from "@mui/system";

import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import ImageGrid from "../../../components/medium/ImageGrid";

//hooks
import useDetailKonter from "../hooks/useDetailKonter";
import CardDetail from "../../../components/small/card/CardDetail";
import ModalDeleteConfirmation from "../../../components/medium/modal/ModalDeleteConfirmation";
import { Link } from "@mui/material";
import CardOperasional from "../../../components/small/card/CardOperation";

export default function DetailKonter() {
    const {
        breadcrumbItems,
        largeImage,
        smallImage,
        handleDeleteSuccess,
        confirmationDelete,
        loading,
        deletedItems,
        setOpen,
        navigate,
        open,
        counterData,
        id
    } = useDetailKonter();

    return (
        <Container sx={{ py: 2 }}>
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box mt={3}>
                <ImageGrid largeImage={largeImage} smallImages={smallImage} loading={loading} />
            </Box>

            <Box mt={3}>
                <CardDetail
                    title={`Gedung ${name}`}
                    columns={[
                        { id: "namaKonter", label: "Nama Konter" },
                        { id: "lokasiKonter", label: "Lokasi Konter" },
                    ]}
                    data={[
                        {
                            namaKonter: counterData?.name,
                            lokasiKonter: counterData?.location,
                            aksi: {
                                hapusLink: "#",
                                ubahLink: "",
                            },
                        },
                    ]}
                    actions={() => (
                        <>
                            <ModalDeleteConfirmation
                                open={open}
                                onClose={() => setOpen(false)}
                                apiUrl={`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/counter/${deletedItems}`}
                                onDeleteSuccess={handleDeleteSuccess} itemId={deletedItems} />
                            <Link
                                underline="hover"
                                sx={{ color: "#8F85F3" }}
                                href="#"
                                onClick={(event) => confirmationDelete(event, id || "")}
                            >
                                Hapus
                            </Link>
                            <Link
                                underline="hover"
                                sx={{ color: "#8F85F3" }}
                                href="#"
                                onClick={() => navigate(`/editKonter/${id || ""}`)}
                            >
                                Ubah
                            </Link>
                        </>
                    )}
                />
            </Box>

            <Box mt={3}>
                <CardOperasional
                    title="Jam Operasional"
                    data={counterData?.operationalSchedule || {
                        senin: "-",
                        selasa: "-",
                        rabu: "-",
                        kamis: "-",
                        jumat: "-",
                        sabtu: "-",
                        minggu: "-",
                    }}
                />
            </Box>
        </Container>
    );
}
