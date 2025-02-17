import { useCallback } from 'react';

export default function useConfirmationDelete(
  setOpen: React.Dispatch<React.SetStateAction<boolean>>, 
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>
) {
  const confirmationDelete = useCallback(
    async (event: React.MouseEvent<HTMLAnchorElement>, itemId: string) => {
      event.preventDefault();
      setSelectedItem(itemId); // 🔥 Update selected item di parent
      console.log('itemId: masuk confirmation', itemId);
      // try {
      //   await deleteService(apiUrl, itemId);
      //   setOpen(true);
      // } catch (error) {
      //   console.error("Error deleting item:", error);
      // }
      setOpen(true);
    },
    
    [ setOpen, setSelectedItem]
  );

  return { confirmationDelete };
}
