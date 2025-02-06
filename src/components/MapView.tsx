import { useContext, useLayoutEffect, useRef } from "react"
import { Map } from 'maplibre-gl';

import { PlacesContext } from "@/stores/PlacesContext";
import { MapContext } from "@/stores/MapContext";

import { Loader } from "@/components/Loader";

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);
  const mapDiv = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    if(!isLoading) {
      const map = new Map({
        container: mapDiv.current!,
        style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
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
