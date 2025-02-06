import { Map, Marker } from "maplibre-gl";

import { MapState } from "@/providers/MapProvider";

type MapAction = { 
  type: 'setMap', 
  payload: Map 
} | {
  type: 'setMarkers',
  payload: Marker[],
};

export const mapReducer = (state: MapState, action: MapAction): MapState => {
  switch (action.type) {
    case 'setMap':
      return {
        ...state,
        isLoading: false,
        map: action.payload,
      };
    case 'setMarkers':
      return {
        ...state,
        isLoading: false,
        markers: action.payload,
      };
    default:
      return state;
  }
};
