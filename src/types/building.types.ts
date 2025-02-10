export interface BuildingDataItem {
    id: string;
    name: string;
    address: string;
    additionalInfo: string;
    createdBy: string;
    createdDateTime: number;
    updatedBy: string | null;
    updatedDateTime: number | null;
    deletedBy: string | null;
    deletedDateTime: number | null;
}

export interface CreateBuildingRequest {
    name?: string,
    address?: string,
    additionalInfo?: string,
}


export interface EditBuildingRequest {
    buildingId?: string,
    name?: string,
    address?: string,
    additionalInfo?: string,
}