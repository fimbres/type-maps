import { PlacesState } from "@/providers/PlacesProvider";
import { CarmenGeojsonFeature } from '@maplibre/maplibre-gl-geocoder';

type PlacesAction = {
  type: 'setUserLocation',
  payload: [number, number],
} | {
  type: 'setPlaces', 
  payload: CarmenGeojsonFeature[]
};

export const placesReducer = (state: PlacesState, action: PlacesAction): PlacesState => {
  switch (action.type) {
    case "setUserLocation":
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload,
      };
    case "setPlaces":
      return {
        ...state,
        isLoading: false,
        places: action.payload,
      };
    default: 
      return state;
  }
};
