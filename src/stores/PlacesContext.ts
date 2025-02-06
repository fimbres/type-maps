import { createContext } from "react";
import { CarmenGeojsonFeature } from '@maplibre/maplibre-gl-geocoder';

export interface PlacesContext {
  isLoading: boolean;
  userLocation?: [number, number];
  places: CarmenGeojsonFeature[];
  setPlaces: (payload: CarmenGeojsonFeature[]) => void;
}

export const PlacesContext = createContext({} as PlacesContext);
