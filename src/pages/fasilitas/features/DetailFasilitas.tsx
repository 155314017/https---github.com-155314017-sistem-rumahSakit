import { Container, Box } from "@mui/system";

import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import ImageGrid from "../../../components/medium/imageComponent/ImageGrid";
import { Link } from "@mui/material";
import CardDetail from "../../../components/small/card/CardDetail";
import ModalDeleteConfirmation from "../../../components/small/modal/ModalDeleteConfirmation";
import useDetailFasilitas from "../hooks/useDetailFasilitas";
import CardOperasionalKlinik from "../../../components/small/card/CardOperasional";



export default function DetailFasilitas() {
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
    buildingName,
    facilityData,   
    id
  } = useDetailFasilitas();

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
                    title={facilityData?.name}
                    columns={[
                        { id: "namaFasilitas", label: "Nama Fasilitas" },
                        { id: "namaGedung", label: "Nama Gedung" },
                        { id: "deskripsi", label: "Deskripsi" },    
                        { id: "hargaFacilitas", label: "Biaya Penanganan" },

                    ]}
                    data={[{ namaFasilitas: facilityData?.name,  namaGedung: buildingName, deskripsi: facilityData?.description, hargaFacilitas: facilityData?.cost, Harga: facilityData?.cost, jamOperational: facilityData?.operationalSchedule }]}
                    actions={() => (
                        <>
                            <ModalDeleteConfirmation
                                open={open}
                                onClose={() => setOpen(false)}
                                apiUrl={`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/room/${deletedItems}`}
                                onDeleteSuccess={handleDeleteSuccess}
                            />
                            <Link
                                underline="hover"
                                onClick={(event) => confirmationDelete(event, id || "")}
                                sx={{ color: "#8F85F3" }}
                                href="#">
                                Hapus
                            </Link>
                            <Link
                                underline="hover"
                                sx={{ color: "#8F85F3" }}
                                href="#"
                                onClick={() => navigate(`/editRuangan/${id || ""}`)}
                            >
                                Ubah
                            </Link>
                        </>
                    )}
                />
            </Box>
            <Box mt={3}>
                <CardOperasionalKlinik
                    title="Jam Operasional"
                    data={facilityData?.operationalSchedule || {
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
