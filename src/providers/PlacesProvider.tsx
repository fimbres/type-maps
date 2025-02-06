import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { CarmenGeojsonFeature } from '@maplibre/maplibre-gl-geocoder';

import { PlacesContext } from "@/stores/PlacesContext";
import { placesReducer } from "@/stores/PlacesReducer";

import { getUserLocation } from "@/lib/getUserLocation";

export interface PlacesState {
  isLoading: boolean;
  places: CarmenGeojsonFeature[];
  userLocation?: [number, number];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  places: [],
  userLocation: undefined,
};

export const PlacesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  const setPlaces = (payload: CarmenGeojsonFeature[]) => {
    dispatch({ type: 'setPlaces', payload });
  }

  useEffect(() => {
    getUserLocation()
      .then(payload => dispatch( { type: 'setUserLocation', payload }));
  }, []);

  return (
    <PlacesContext.Provider value={{ ...state, setPlaces }}>
      {children}
    </PlacesContext.Provider>
  )
}
