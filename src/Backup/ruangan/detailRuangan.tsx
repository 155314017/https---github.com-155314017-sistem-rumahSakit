import { Container, Box } from "@mui/system";

import BreadCrumbs from "../../components/medium/BreadCrumbs";
import ImageGrid from "../../components/medium/ImageGrid";
import { Link } from "@mui/material";
import CardDetail from "../../components/medium/CardDetail";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ModalDeleteConfirmation from "../../components/small/ModalDeleteConfirmation";

type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
};

export default function DetailRuangan() {
    const [name, setName] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [deletedItems, setDeletedItems] = useState("");
    const [open, setOpen] = useState(false);
    const [ids, setIds] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const [largeImage, setLargeImage] = useState<string>("");
    const [smallImage, setSmallImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [buildingId, setBuildingId] = useState<string>("")
    const [buildingName, setBuildingName] = useState<string>("")


    const breadcrumbItems = [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Ruangan",
            href: "/ruangan",
        },
        {
            label: "Detail Ruangan",
            href: "/detailRuangan",
        },
    ];

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = Cookies.get("accessToken");
            const response = await axios.get(
                `https://hms.3dolphinsocial.com:8083/v1/manage/room/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        accessToken: `${token}`,
                    }
                }
            );
            setIds(response.data.data.id);
            setName(response.data.data.name);
            setType(response.data.data.type);
            const imagesData = response.data.data.images;
            setBuildingId(response.data.data.masterBuildingId);
            const mappedImages = imagesData.map((image: any) => ({
                imageName: image.imageName,
                imageType: image.imageType,
                imageData: `data:${image.imageType};base64,${image.imageData}`,
            }));

            const largeImage = mappedImages[0]?.imageData || null;
            const smallImages = mappedImages.slice(1).map((img: ImageData) => img.imageData);

            setLargeImage(largeImage);
            setSmallImages(smallImages);
            setLoading(false)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);


    useEffect(() => {
        const fetchDataBuildings = async () => {
            try {
                const token = Cookies.get("accessToken");
                const response = await axios.get(
                    `https://hms.3dolphinsocial.com:8083/v1/manage/building/${buildingId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            accessToken: `${token}`,
                        }
                    }
                );
                setBuildingName(response.data.data.name)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchDataBuildings();
    }, [buildingId]);


    const handleDeleteSuccess = () => {
        setOpen(false);
        navigate('/ruangan', { state: { successDelete: true, message: 'Ruangan berhasil dihapus!' } });
    };

    const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, buildingId: string) => {
        event.preventDefault();
        setDeletedItems(buildingId);
        setOpen(true);
    };

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
                    title={name}
                    columns={[
                        { id: "nomorRuangan", label: "No. Ruangan" },
                        { id: "namaGedung", label: "Nama Gedung" },
                        { id: "jenisRuangan", label: "Jenis Ruangan" },

                    ]}
                    data={[{ nomorRuangan: ids, namaGedung: buildingName, jenisRuangan: type }]}
                    actions={() => (
                        <>
                            <ModalDeleteConfirmation
                                open={open}
                                onClose={() => setOpen(false)}
                                apiUrl={`https://hms.3dolphinsocial.com:8083/v1/manage/room/${deletedItems}`}
                                onDeleteSuccess={handleDeleteSuccess}
                            />
                            <Link
                                underline="hover"
                                onClick={(event) => confirmationDelete(event, ids)}
                                sx={{ color: "#8F85F3" }}
                                href="#">
                                Hapus
                            </Link>
                            <Link
                                underline="hover"
                                sx={{ color: "#8F85F3" }}
                                href="#"
                                onClick={() => navigate(`/editRuangan/${ids}`)}
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
