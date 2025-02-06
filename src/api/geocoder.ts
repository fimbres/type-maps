import { MaplibreGeocoderApi } from "@maplibre/maplibre-gl-geocoder";

export const geocoderApi = {
  forwardGeocode: async (config: { query: string, proximity: number[] }) => {
    const features = [];
    try {
      const offset = 0.002;
      const [lng, lat] = config.proximity;
      const viewbox = [
        lng - offset,  // west
        lat + offset,  // north
        lng + offset,  // east
        lat - offset,  // south
      ].join(',');
      const request = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        config.query
      )}&format=geojson&polygon_geojson=1&addressdetails=1&viewbox=${viewbox}`;
      const response = await fetch(request);
      const geojson = await response.json();

      for (const feature of geojson.features) {
        if (!feature.bbox) continue;
        const center = [
          feature.bbox[0] + (feature.bbox[2] - feature.bbox[0]) / 2,
          feature.bbox[1] + (feature.bbox[3] - feature.bbox[1]) / 2,
        ];
        const point = {
          type: 'Feature',
          id: '1',
          geometry: {
            type: 'Point',
            coordinates: center,
          },
          place_name: feature.properties.display_name,
          properties: feature.properties,
          text: feature.properties.display_name,
          place_type: ['place'],
          center,
        };
        features.push(point);
      }
    } catch (e) {
      console.error(`Failed to forwardGeocode with error: ${e}`);
    }
    return { type: "FeatureCollection", features };
  },
  reverseGeocode: async () => ({ type: "FeatureCollection", features: [] }),
} as MaplibreGeocoderApi;
