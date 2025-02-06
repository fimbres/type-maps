import { FC, PropsWithChildren, useEffect, useReducer } from "react";

import { PlacesContext } from "@/stores/PlacesContext";
import { placesReducer } from "@/stores/PlacesReducer";

import { getUserLocation } from "@/lib/getUserLocation";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
};

export const PlacesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation()
      .then(payload => dispatch( { type: 'setUserLocation', payload }));
  }, []);

  return (
    <PlacesContext.Provider value={{ ...state }}>
      {children}
    </PlacesContext.Provider>
  )
}
