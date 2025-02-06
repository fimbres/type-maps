import { Map } from "maplibre-gl";

import { MapState } from "@/providers/MapProvider";

type MapAction = { type: 'setMap', payload: Map };

export const mapReducer = (state: MapState, action: MapAction): MapState => {
  switch (action.type) {
    case 'setMap':
      return {
        ...state,
        isLoading: false,
        map: action.payload,
      };
    default:
      return state;
  }
};
