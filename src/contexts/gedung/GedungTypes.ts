import { BuildingDataItem } from "../../types/building.types";

export interface GedungState {
  buildings: BuildingDataItem[];
  loading: boolean;
  error: string | null;
  selectedBuilding: BuildingDataItem | null;
}

export enum GedungActionTypes {
  FETCH_BUILDINGS_REQUEST = "FETCH_BUILDINGS_REQUEST",
  FETCH_BUILDINGS_SUCCESS = "FETCH_BUILDINGS_SUCCESS",
  FETCH_BUILDINGS_FAILURE = "FETCH_BUILDINGS_FAILURE",
  SET_SELECTED_BUILDING = "SET_SELECTED_BUILDING",
  ADD_BUILDING = "ADD_BUILDING",
  UPDATE_BUILDING = "UPDATE_BUILDING",
  DELETE_BUILDING = "DELETE_BUILDING",
}

export type GedungAction =
  | { type: GedungActionTypes.FETCH_BUILDINGS_REQUEST }
  | { type: GedungActionTypes.FETCH_BUILDINGS_SUCCESS; payload: BuildingDataItem[] }
  | { type: GedungActionTypes.FETCH_BUILDINGS_FAILURE; payload: string }
  | { type: GedungActionTypes.SET_SELECTED_BUILDING; payload: BuildingDataItem }
  | { type: GedungActionTypes.ADD_BUILDING; payload: BuildingDataItem }
  | { type: GedungActionTypes.UPDATE_BUILDING; payload: BuildingDataItem }
  | { type: GedungActionTypes.DELETE_BUILDING; payload: string }; 