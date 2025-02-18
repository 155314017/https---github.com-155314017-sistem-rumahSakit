import { BuildingDataItem } from "../../types/building.types";
import { GedungAction, GedungActionTypes } from "./GedungTypes";

export const fetchBuildingsRequest = (): GedungAction => ({
  type: GedungActionTypes.FETCH_BUILDINGS_REQUEST,
});

export const fetchBuildingsSuccess = (buildings: BuildingDataItem[]): GedungAction => ({
  type: GedungActionTypes.FETCH_BUILDINGS_SUCCESS,
  payload: buildings,
});

export const fetchBuildingsFailure = (error: string): GedungAction => ({
  type: GedungActionTypes.FETCH_BUILDINGS_FAILURE,
  payload: error,
});

export const setSelectedBuilding = (building: BuildingDataItem): GedungAction => ({
  type: GedungActionTypes.SET_SELECTED_BUILDING,
  payload: building,
});

export const addBuilding = (building: BuildingDataItem): GedungAction => ({
  type: GedungActionTypes.ADD_BUILDING,
  payload: building,
});

export const updateBuilding = (building: BuildingDataItem): GedungAction => ({
  type: GedungActionTypes.UPDATE_BUILDING,
  payload: building,
});

export const deleteBuilding = (buildingId: string): GedungAction => ({
  type: GedungActionTypes.DELETE_BUILDING,
  payload: buildingId,
}); 