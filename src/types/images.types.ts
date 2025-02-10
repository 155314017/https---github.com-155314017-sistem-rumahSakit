export interface ImageItem {
    imageName: string;
    imageType: string;
    imageData: string;
}

export interface ImageDataItems {
    parentId: string;
    images: ImageItem[];
}