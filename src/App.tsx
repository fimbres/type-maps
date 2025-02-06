import { PlacesProvider } from "@/providers/PlacesProvider"
import { MapProvider } from "@/providers/MapProvider"
import { HomeScreen } from "@/screens/HomeScreen"

import "./index.css"

function App() {
  return (
    <PlacesProvider>
      <MapProvider>
        <HomeScreen />
      </MapProvider>
    </PlacesProvider>
  )
}

export default App
