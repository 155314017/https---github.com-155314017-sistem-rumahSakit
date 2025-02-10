export interface CreateRoomRequest {
    name?: string
    masterBuildingId?: string
    type?: string
    additionalInfo?: string
}



export interface EditRoomRequest {
    roomId?: string;
    name?: string;
    masterBuildingId?: string;
    type?: string;
    additionalInfo?: string;
}


export interface RoomDataItem {
    id: string
    name: string
    masterBuildingId: string
    type: string
    additionalInfo: string
    createdBy: string
    createdDateTime: number
    updatedBy: string | null
    updatedDateTime: number | null
    deletedBy: string | null
    deletedDateTime: number | null
}