
export default function useDetailAmbulance() {
    const breadcrumbItems = [
        {
          label: "Dashboard",
          href: "/dashboard",
        },
        {
          label: "Ambulance",
          href: "/ambulance",
        },
        {
          label: "Detail Ambulance",
          href: "/detailAmbulance",
        },
      ];
    
      const largeImage = "path_to_your_large_image.jpg";
      const smallImages = [
        "path_to_image1.jpg",
        "path_to_image2.jpg",
        "path_to_image3.jpg",
        "path_to_image4.jpg",
      ];
  return {
    breadcrumbItems,
    largeImage,
    smallImages
  }
}
