import { Container, Box } from "@mui/system";
import { Link } from "@mui/material";

// components
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import ImageGrid from "../../../components/medium/ImageGrid";
import CardDetail from "../../../components/small/card/CardDetail";

// hooks
import useDetailAmbulance from "../hooks/useDetailAmbulance";
import CardOperasional from "../../../components/small/card/CardOperasional";
import ModalDeleteConfirmation from "../../../components/medium/modal/ModalDeleteConfirmation";
export default function DetailAmbulance() {
  const {
    ambulanceDataItem,
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
    deletedItems
  } = useDetailAmbulance()
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
          title={ambulanceDataItem?.number}
          columns={[
            { id: "biaya", label: "Biaya" },
          ]}
          data={[{ biaya: ambulanceDataItem?.cost }]}
          actions={() => (
            <>
              <ModalDeleteConfirmation
                open={open}
                onClose={() => setOpen(false)}
                apiUrl={`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/ambulance`}
                onDeleteSuccess={handleDeleteSuccess}
                itemId={deletedItems || ""}
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
      <Box mt={3}>
        <CardOperasional
          title="Jam Operasional"
          data={ambulanceDataItem?.operationalSchedule || {
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

  )
}
