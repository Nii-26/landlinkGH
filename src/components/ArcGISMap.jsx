import { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

const GHANA_CENTER = [-1.0232, 7.9465];

function ArcGISMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    loadModules(['esri/config', 'esri/Map', 'esri/views/MapView', 'esri/widgets/Search'], {
      css: true
    })
      .then(([esriConfig, Map, MapView, Search]) => {
        if (cancelled || !mapRef.current) return;

        esriConfig.apiKey = import.meta.env.VITE_ARCGIS_API_KEY || '';

        const map = new Map({
          basemap: 'arcgis/navigation'
        });

        const view = new MapView({
          container: mapRef.current,
          map,
          center: GHANA_CENTER,
          zoom: 6,
          ui: {
            components: ['attribution']
          }
        });

        const search = new Search({ view });
        view.ui.add(search, 'top-right');

        return () => {
          view.destroy();
        };
      })
      .catch((error) => {
        console.error('ArcGIS map failed to load:', error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <div ref={mapRef} className="map-view" />;
}

export default ArcGISMap;
