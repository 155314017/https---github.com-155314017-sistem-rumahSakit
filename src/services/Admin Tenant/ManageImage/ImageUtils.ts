import { CreateImageService } from "./AddImageServices";
import { EditImageService } from "./EditImageServices";

/**
 * Interface untuk data gambar
 * @property imageName - Nama file gambar
 * @property imageType - Tipe/format gambar (contoh: 'jpg', 'png')
 * @property imageData - Data gambar dalam format base64
 */
export interface ImageData {
    imageName: string;
    imageType: string;
    imageData: string;
}

/**
 * Mengunggah beberapa gambar sekaligus
 * @param parentId - ID parent (bisa berupa ID ambulance, dokter, ruangan, dll)
 * @param images - Array data gambar yang akan diunggah
 * @returns Promise yang mengembalikan hasil pengunggahan gambar
 */
export const uploadImages = async (parentId: string, images: ImageData[]) => {
    if (!images.length) return;

    const imageRequest = {
        parentId: parentId,
        images: images.map(({ imageName = "", imageType = "", imageData = "" }) => ({
            imageName,
            imageType,
            imageData
        }))
    };
    return CreateImageService(imageRequest);
};

export const editImages = async (parentId: string, images: ImageData[]) => {
    if (!images.length) return;

    const imageRequest = {
        parentId: parentId,
        images: images.map(({ imageName = "", imageType = "", imageData = "" }) => ({
            imageName,
            imageType,
            imageData
        }))
    };
    return EditImageService(imageRequest);
};