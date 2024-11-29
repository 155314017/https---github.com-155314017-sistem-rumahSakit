import { Container, Box } from "@mui/system";
import { Link } from "@mui/material";

import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import ImageGrid from "../../../components/medium/ImageGrid";
import CardDetail from "../../../components/medium/CardDetail";
import ModalDeleteConfirmation from "../../../components/small/ModalDeleteConfirmation";

//hooks
import useDetailGedung from "../hooks/useDetailGedung";

export default function DetailGedung() {
    const{
    name,
    address,
    deletedItems,
    open,
    ids,
    breadcrumbItems,
    largeImage,
    smallImage,
    loading,
    confirmationDelete,
    handleDeleteSuccess,
    navigate,
    setOpen
    }=useDetailGedung();
  return (
    <Container sx={{ py: 2 }}>
      <BreadCrumbs
        breadcrumbItems={breadcrumbItems}
        onBackClick={() => window.history.back()}
      />
      <Box mt={3}>
        <ImageGrid largeImage={largeImage} smallImages={smallImage} loading={loading}  />
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
              nomor: "K 204",
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
                apiUrl={`https://hms.3dolphinsocial.com:8083/v1/manage/building/${deletedItems}`}
                onDeleteSuccess={handleDeleteSuccess}
              />
              <Link
                underline="hover"
                sx={{ color: "#8F85F3" }}
                href="#"
                onClick={(event) => confirmationDelete(event, ids)}
              >
                Hapus
              </Link>
              <Link
                underline="hover"
                sx={{ color: "#8F85F3" }}
                href="#"
                onClick={() => navigate(`/editGedung/${ids}`)}
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
