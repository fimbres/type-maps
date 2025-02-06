import { FC, PropsWithChildren, useReducer } from 'react'
import { Map } from "maplibre-gl";

import { MapContext } from '@/stores/MapContext';
import { mapReducer } from '@/stores/MapReducer';

export interface MapState {
  isLoading: boolean;
  map?: Map;
}

const INITIAL_STATE: MapState = {
  isLoading: false,
  map: undefined,
};

export const MapProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

  const setMap = (payload: Map) => {
    dispatch({ type: 'setMap', payload });
  }

  return (
    <MapContext.Provider value={{ ...state, setMap }}>
      {children}
    </MapContext.Provider>
  )
}
