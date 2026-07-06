import { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

const GHANA_CENTER = [-1.0232, 7.9465];
const PARCELS_URL = `${import.meta.env.BASE_URL}parcels.geojson`;

const parcelRenderer = {
  type: 'unique-value',
  field: 'land_use',
  defaultLabel: 'Other land use',
  defaultSymbol: {
    type: 'simple-fill',
    color: [150, 150, 150, 0.22],
    outline: {
      color: [90, 90, 90, 0.95],
      width: 1.25
    }
  },
  uniqueValueInfos: [
    {
      value: 'Residential',
      label: 'Residential',
      symbol: {
        type: 'simple-fill',
        color: [76, 175, 80, 0.3],
        outline: {
          color: [46, 125, 50, 1],
          width: 1.5
        }
      }
    },
    {
      value: 'Agricultural',
      label: 'Agricultural',
      symbol: {
        type: 'simple-fill',
        color: [139, 195, 74, 0.3],
        outline: {
          color: [104, 159, 56, 1],
          width: 1.5
        }
      }
    },
    {
      value: 'Commercial',
      label: 'Commercial',
      symbol: {
        type: 'simple-fill',
        color: [33, 150, 243, 0.3],
        outline: {
          color: [25, 118, 210, 1],
          width: 1.5
        }
      }
    },
    {
      value: 'Mixed Use',
      label: 'Mixed Use',
      symbol: {
        type: 'simple-fill',
        color: [255, 152, 0, 0.3],
        outline: {
          color: [230, 81, 0, 1],
          width: 1.5
        }
      }
    },
    {
      value: 'Institutional',
      label: 'Institutional',
      symbol: {
        type: 'simple-fill',
        color: [156, 39, 176, 0.3],
        outline: {
          color: [106, 27, 154, 1],
          width: 1.5
        }
      }
    },
    {
      value: 'Industrial',
      label: 'Industrial',
      symbol: {
        type: 'simple-fill',
        color: [96, 125, 139, 0.3],
        outline: {
          color: [69, 90, 100, 1],
          width: 1.5
        }
      }
    }
  ]
};

function ArcGISMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let view;

    loadModules([
      'esri/config',
      'esri/Map',
      'esri/views/MapView',
      'esri/widgets/Search',
      'esri/widgets/Search/SearchSource',
      'esri/widgets/Expand',
      'esri/widgets/BasemapGallery',
      'esri/layers/GeoJSONLayer'
    ], {
      css: true
    })
      .then(([esriConfig, Map, MapView, Search, SearchSource, Expand, BasemapGallery, GeoJSONLayer]) => {
        if (cancelled || !mapRef.current) return;

        esriConfig.apiKey = import.meta.env.VITE_ARCGIS_API_KEY || '';

        const map = new Map({
          basemap: 'arcgis/navigation'
        });

        view = new MapView({
          container: mapRef.current,
          map,
          center: GHANA_CENTER,
          zoom: 13,
          ui: {
            components: ['attribution']
          }
        });

        const parcelLayer = new GeoJSONLayer({
          url: PARCELS_URL,
          title: 'Parcel Layer',
          renderer: parcelRenderer,
          popupTemplate: {
            title: '{parcel_id}',
            content: [
              {
                type: 'text',
                text: '<b>Owner Name:</b> {owner}<br/><b>Parcel Size:</b> {parcel_size}<br/><b>Land Use:</b> {land_use}<br/><b>Registration Date:</b> {registration_date}'
              }
            ]
          }
        });

        map.add(parcelLayer);

        const parcelSearchSource = new SearchSource({
          layer: parcelLayer,
          searchFields: ['parcel_id', 'owner'],
          displayField: 'parcel_id',
          exactMatch: false,
          outFields: ['*'],
          name: 'Parcels',
          placeholder: 'Search parcel ID or owner'
        });

        const search = new Search({
          view,
          sources: [parcelSearchSource]
        });

        const searchExpand = new Expand({
          view,
          content: search,
          expandIcon: 'search'
        });

        view.ui.add(searchExpand, 'top-right');

        const basemapGallery = new BasemapGallery({
          view
        });

        const basemapExpand = new Expand({
          view,
          content: basemapGallery,
          expandIconClass: 'esri-icon-basemap'
        });

        view.ui.add(basemapExpand, 'top-right');

        return () => {
          view.destroy();
        };
      })
      .catch((error) => {
        console.error('ArcGIS map failed to load:', error);
      });

    return () => {
      cancelled = true;
      if (view) {
        view.destroy();
      }
    };
  }, []);

  return <div ref={mapRef} className="map-view" />;
}

export default ArcGISMap;
