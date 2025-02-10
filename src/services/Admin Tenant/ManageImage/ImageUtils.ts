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

    // Filter gambar yang tidak kosong
    const validImages = images.filter(img => img.imageData && img.imageType && img.imageName);

    const imageRequest = {
        parentId: parentId,
        images: validImages.map(({ imageName = "", imageType = "", imageData = "" }) => ({
            imageName,
            imageType,
            imageData
        }))
    };
    return CreateImageService(imageRequest);
};

export const editImages = async (parentId: string, images: ImageData[]) => {
    if (!images.length) return;

    // Filter gambar yang tidak kosong
    const validImages = images.filter(img => img.imageData && img.imageType && img.imageName);

    const imageRequest = {
        parentId: parentId,
        images: validImages.map(({ imageName = "", imageType = "", imageData = "" }) => ({
            imageName,
            imageType,
            imageData
        }))
    };
    return EditImageService(imageRequest);
};

export const convertToBase64Image = (imageType: string, imageData: string): string => {
    return `data:${imageType};base64,${imageData}`;
};

export const processImageResponse = (imageResponse: any) => {
    if (!imageResponse?.data?.length) {
        return {
            largeImage: "",
            smallImages: []
        };
    }

    const largeImage = convertToBase64Image(
        imageResponse.data[0].imageType,
        imageResponse.data[0].imageData
    );

    const smallImages = imageResponse.data
        .slice(1)
        .map((img: any) => convertToBase64Image(img.imageType, img.imageData));

    return {
        largeImage,
        smallImages
    };
}; 