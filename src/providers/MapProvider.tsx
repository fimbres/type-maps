import { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react'
import { Map, Marker, Popup } from "maplibre-gl";

import { MapContext } from '@/stores/MapContext';
import { mapReducer } from '@/stores/MapReducer';
import { PlacesContext } from '@/stores/PlacesContext';

export interface MapState {
  isLoading: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: MapState = {
  isLoading: false,
  markers: [],
  map: undefined,
};

export const MapProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { userLocation, places } = useContext(PlacesContext);

  const setMap = (map: Map) => {
    const myLocationPopUp = new Popup()
      .setHTML(`
      <div className="bg-neutral-300 p-3">
        <h3 className="text-red-500">Tu Ubicación</h3>
      </div>
      `);

    new Marker({
      color: "#f44336",
    })
    .setLngLat(userLocation || map.getCenter())
    .setPopup(myLocationPopUp)
    .addTo(map);
    
    dispatch({ type: 'setMap', payload: map });
  }

  useEffect(() => {
    state.markers.forEach(m => m.remove());

    const payload = places.map(place => {
      const myLocationPopUp = new Popup()
        .setHTML(`
        <div className="bg-neutral-300 p-3">
          <h3 className="text-red-500">${place.place_name}</h3>
        </div>
        `);

      return new Marker({
          color: "#f44336",
        })
        /* @ts-ignore */
        .setLngLat([place.geometry.coordinates?.[0], place.geometry.coordinates?.[1]])
        .setPopup(myLocationPopUp)
        .addTo(state.map!);
    });

    dispatch({ type: 'setMarkers', payload });
  }, [places]);

  return (
    <MapContext.Provider value={{ ...state, setMap }}>
      {children}
    </MapContext.Provider>
  )
}
