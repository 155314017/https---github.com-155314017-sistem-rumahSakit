import { Container, Box } from "@mui/system";

import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import ImageGrid from "../../../components/medium/ImageGrid";
import { Link } from "@mui/material";
import CardDetail from "../../../components/small/card/CardDetail";
import ModalDeleteConfirmation from "../../../components/medium/modal/ModalDeleteConfirmation";
import useDetailRuangan from "../hooks/useDetailRuangan";



export default function DetailRuangan() {
    const {
        roomName,
        roomType,
        deletedItems,
        open,
        roomId,
        largeImage,
        smallImage,
        loading,
        buildingName,
        breadcrumbItems,
        confirmationDelete,
        handleDeleteSuccess,
        navigate,
        setOpen
    } = useDetailRuangan();

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
                    title={roomName}
                    columns={[
                        { id: "nomorRuangan", label: "No. Ruangan" },
                        { id: "namaGedung", label: "Nama Gedung" },
                        { id: "jenisRuangan", label: "Jenis Ruangan" },

                    ]}
                    data={[{ nomorRuangan: roomId, namaGedung: buildingName, jenisRuangan: roomType }]}
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
                                onClick={(event) => confirmationDelete(event, roomId)}
                                sx={{ color: "#8F85F3" }}
                                href="#">
                                Hapus
                            </Link>
                            <Link
                                underline="hover"
                                sx={{ color: "#8F85F3" }}
                                href="#"
                                onClick={() => navigate(`/editRuangan/${roomId}`)}
                            >
                                Ubah
                            </Link>
                        </>
                    )}
                />
            </Box>
        </Container>
    );
}
