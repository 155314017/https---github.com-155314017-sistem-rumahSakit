import { useState } from "react";
import { deleteService } from "../services/DeleteService";// Sesuaikan dengan path service Anda

interface HandleDeleteProps {
  apiUrl: string;
  itemId: string;
  onDeleteSuccess: () => void;
  onClose: () => void;
  fetchData: () => void
}

export default function useHandleDelete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleDelete = async ({ apiUrl, itemId, onDeleteSuccess, onClose, fetchData }: HandleDeleteProps) => {
    setLoading(true);
    setError(null);

    try {
      await deleteService(apiUrl, itemId); // Panggil API untuk hapus data
      onDeleteSuccess(); // Beri tahu bahwa delete sukses
      onClose(); // Tutup modal atau dialog setelah sukses
      fetchData();
      
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("Gagal menghapus data");
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading, error };
}
