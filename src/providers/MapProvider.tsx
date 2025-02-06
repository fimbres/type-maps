import { FC, PropsWithChildren, useContext, useReducer } from 'react'
import { Map, Marker, Popup } from "maplibre-gl";

import { MapContext } from '@/stores/MapContext';
import { mapReducer } from '@/stores/MapReducer';
import { PlacesContext } from '@/stores/PlacesContext';

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
  const { userLocation } = useContext(PlacesContext);

  const setMap = (map: Map) => {
    const myLocationPopUp = new Popup()
      .setHTML(`
      <h3 className="text-red-500">Tu Ubicación</h3>
      `);

    new Marker({
      color: "#f44336",
    })
    .setLngLat(userLocation || map.getCenter())
    .setPopup(myLocationPopUp)
    .addTo(map);
    
    dispatch({ type: 'setMap', payload: map });
  }

  return (
    <MapContext.Provider value={{ ...state, setMap }}>
      {children}
    </MapContext.Provider>
  )
}
