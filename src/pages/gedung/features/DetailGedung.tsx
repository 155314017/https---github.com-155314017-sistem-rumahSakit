import { Container, Box } from "@mui/system";
import { Link } from "@mui/material";

import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import ImageGrid from "../../../components/medium/ImageGrid";
import CardDetail from "../../../components/small/card/CardDetail";
import ModalDeleteConfirmation from "../../../components/medium/modal/ModalDeleteConfirmation";

//hooks
import useDetailGedung from "../hooks/useDetailGedung";

export default function DetailGedung() {
  const {
    name,
    address,
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
    id
  } = useDetailGedung();
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
          title={`Gedung ${name}`}
          columns={[
            { id: "nomor", label: "No. Gedung" },
            { id: "alamatGedung", label: "Alamat Gedung" },
          ]}
          data={[
            {
              nomor: name,
              alamatGedung: address,
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
                apiUrl={`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/building/${deletedItems}`}
                onDeleteSuccess={handleDeleteSuccess}
              />
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
                onClick={() => navigate(`/editGedung/${id || ""}`)}
              >
                Ubah
              </Link>
            </>
          )}
        />
      </Box>
    </Container>
  )
}
