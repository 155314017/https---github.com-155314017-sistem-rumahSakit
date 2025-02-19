import { Container, Box } from "@mui/system";

import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import ImageGrid from "../../../components/medium/ImageGrid";
//hooks
import useDetailKlinik from "../hooks/useDetailKlinik";
import CardOperasional from "../../../components/small/card/CardOperational";
import CardDetail from "../../../components/small/card/CardDetail";
import ModalDeleteConfirmation from "../../../components/medium/modal/ModalDeleteConfirmation";
import { Link } from "@mui/material";

export default function DetailKlinik() {
    const {
        deletedItems,
        open,
        breadcrumbItems,
        largeImage,
        smallImages,
        loading,
        confirmationDelete,
        handleDeleteSuccess,
        navigate,
        setOpen,
        id,
        clinicData,
    } = useDetailKlinik();

    return (
        <Container sx={{ py: 2 }}>
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box mt={3}>
                <ImageGrid largeImage={largeImage} smallImages={smallImages} loading={loading} />
            </Box>

            <Box mt={3}>
                
                <CardDetail
                    title={`Klinik ${clinicData?.name}`}
                    columns={[
                        { id: "namaKlinik", label: "Nama Klinik" },
                        { id: "kodeKlinik", label: "Kode Klinik" },
                        { id: "deskripsiKlinik", label: "Deskripsi" }
                    ]}
                    data={[
                        {
                            namaKlinik: clinicData?.name,
                            kodeKlinik: clinicData?.code,
                            deskripsiKlinik: clinicData?.description,
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
                                apiUrl={`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/clinic`}
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
                                onClick={() => navigate(`/editKlinik/${id || ""}`)}
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
                    data={clinicData?.operationalSchedule || {
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
