import { ChangeEvent, useRef, useEffect, useContext } from 'react';
import MaplibreGeocoder, { MaplibreGeocoderFeatureResults, } from '@maplibre/maplibre-gl-geocoder';
import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';
import maplibregl from "maplibre-gl";

import { MapContext } from '@/stores/MapContext';
import { PlacesContext } from '@/stores/PlacesContext';

import { geocoderApi } from '@/api/geocoder';

import { Input } from '@/components/ui/input';

export const SearchBar = () => {
  const { map } = useContext(MapContext);
  const { setPlaces, places } = useContext(PlacesContext);
  const debounceRef = useRef<NodeJS.Timeout>(null);
  const geocoderRef = useRef<MaplibreGeocoder | null>(null);

  useEffect(() => {
    if (!map) return;
    
    const onLoad = () => {
      geocoderRef.current = new MaplibreGeocoder(geocoderApi, {
        proximity: { longitude: map.getCenter().lat, latitude: map.getCenter().lng },
        placeholder: 'Buscar un lugar...',
        maplibregl,
      });

      map.addControl(geocoderRef.current);

      geocoderRef.current.on('results', (e: MaplibreGeocoderFeatureResults) => {
        const features = e.features ?? [];
        console.log("event", features);
        setPlaces(features);
      });
    };

    if (map.isStyleLoaded()) {
      onLoad();
    } else {
      map.on('load', onLoad);
    }

    return () => {
      map.off('load', onLoad);
      geocoderRef.current?.off('results', () => {
        setPlaces([]);
      });
    };
  }, [map]);

  const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const query = event.target.value;
      if (geocoderRef.current && map) {
        geocoderRef.current.query(query);
      }
    }, 600);
  };

  return (
    <div className="fixed top-10 left-10 z-10 bg-neutral-900 drop-shadow-lg rounded-lg p-2">
      <Input type="text" placeholder="Busca un lugar..." onChange={onQueryChanged} />
      {places?.length! > 0 && (
        <ul className="mt-2 z-10">
          {places?.map((feature) => (
            /* @ts-ignore next-line */
            <li key={feature.id} className="text-neutral-100 cursor-pointer hover:bg-neutral-800 p-1" onClick={() => map?.flyTo({ center: { lat: feature.geometry.coordinates[1], lng: feature.geometry.coordinates[0] }, zoom: 16 })}>
              {feature.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
