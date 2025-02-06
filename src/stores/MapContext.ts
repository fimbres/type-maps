import { createContext } from "react";
import { Map, Marker } from "maplibre-gl";

interface MapContext {
  isLoading: boolean;
  map?: Map;
  markers: Marker[];
  setMap: (payload: Map) => void;
}

export const MapContext = createContext({} as MapContext);
