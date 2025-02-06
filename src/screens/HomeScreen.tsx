import { useContext } from 'react'

import { MapView } from '@/components/MapView'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo';

import { MapContext } from '@/stores/MapContext';
import { PlacesContext } from '@/stores/PlacesContext';
import { SearchBar } from '@/components/SearchBar';

export const HomeScreen = () => {
  const { map } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);

  const onClick = () => {
    if(!map) throw new Error("El Mapa no está listo aún");
    if(!userLocation) throw new Error("La Geolocalización falló");

    map
      .flyTo({
        zoom: 16,
        center: userLocation,
      });
  }

  return (
    <>
      <SearchBar />
      <Logo />
      <MapView />
      <Button
        className='fixed bottom-10 right-10'
        onClick={onClick}
      >
        Centrar
      </Button>
    </>
  )
}
