import { useContext, useLayoutEffect, useRef } from "react"
import { Map } from 'maplibre-gl';

import { PlacesContext } from "@/stores/PlacesContext";
import { Loader } from "@/components/Loader";
import { mapStyle } from "@/lib/mapStyle";
import { MapContext } from "@/stores/MapContext";

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);
  const mapDiv = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    if(!isLoading) {
      const map = new Map({
        container: mapDiv.current!,
        style: mapStyle,
        center: userLocation,
        zoom: 16,
      });

      setMap(map);
    }
  }, [isLoading]);

  if(isLoading) {
    return <Loader />
  }

  return (
    <div 
      className="fixed top-0 bottom-0 right-0 left-0"
      ref={mapDiv}
    />
  )
}
