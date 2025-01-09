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
    
    name,
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
    ids,
    buildingName,
    
    facilityData
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
                    title={name}
                    columns={[
                        { id: "nomorRuangan", label: "No. Fasilitas" },
                        { id: "namaGedung", label: "Nama Gedung" },
                        { id: "deskripsi", label: "Deskripsi" },    
                        { id: "hargaFacilitas", label: "Biaya Penanganan" },
                        { id: "jamOperational", label: "Jam Operasional" },

                    ]}
                    data={[{ nomorRuangan: facilityData?.id,  namaGedung: buildingName, deskripsi: facilityData?.description, hargaFacilitas: facilityData?.cost, Harga: facilityData?.cost }]}
                    actions={() => (
                        <>
                            <ModalDeleteConfirmation
                                open={open}
                                onClose={() => setOpen(false)}
                                apiUrl={`https://hms.3dolphinsocial.com:8083/v1/manage/room/${deletedItems}`}
                                onDeleteSuccess={handleDeleteSuccess}
                            />
                            <Link
                                underline="hover"
                                onClick={(event) => confirmationDelete(event, ids)}
                                sx={{ color: "#8F85F3" }}
                                href="#">
                                Hapus
                            </Link>
                            <Link
                                underline="hover"
                                sx={{ color: "#8F85F3" }}
                                href="#"
                                onClick={() => navigate(`/editRuangan/${ids}`)}
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
