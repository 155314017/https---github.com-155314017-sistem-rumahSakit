import { GedungState, GedungAction, GedungActionTypes } from "./GedungTypes";

export const initialState: GedungState = {
  buildings: [],
  loading: false,
  error: null,
  selectedBuilding: null,
};

export const gedungReducer = (
  state: GedungState = initialState,
  action: GedungAction
): GedungState => {
  switch (action.type) {
    case GedungActionTypes.FETCH_BUILDINGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GedungActionTypes.FETCH_BUILDINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        buildings: action.payload,
        error: null,
      };
    case GedungActionTypes.FETCH_BUILDINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GedungActionTypes.SET_SELECTED_BUILDING:
      return {
        ...state,
        selectedBuilding: action.payload,
      };
    case GedungActionTypes.ADD_BUILDING:
      return {
        ...state,
        buildings: [...state.buildings, action.payload],
      };
    case GedungActionTypes.UPDATE_BUILDING:
      return {
        ...state,
        buildings: state.buildings.map((building) =>
          building.id === action.payload.id ? action.payload : building
        ),
      };
    case GedungActionTypes.DELETE_BUILDING:
      return {
        ...state,
        buildings: state.buildings.filter(
          (building) => building.id !== action.payload
        ),
      };
    default:
      return state;
  }
}; 