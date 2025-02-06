import { createContext } from "react";
import { Map } from "maplibre-gl";

interface MapContext {
  isLoading: boolean;
  map?: Map;
  setMap: (payload: Map) => void;
}

export const MapContext = createContext({} as MapContext);
