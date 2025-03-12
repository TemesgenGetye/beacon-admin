import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useSelector } from 'react-redux';
import { beaconData, beaconError, beaconLoading } from '../Redux/slices/beaconSlice';
import { Search, ZoomIn, ZoomOut, RefreshCw, Info } from 'lucide-react';

// Default center (Addis Ababa)
const defaultCenter = [9.0192, 38.7525];

// Custom marker icons based on status
const createCustomIcon = status => {
  return L.divIcon({
    className: 'custom-marker-icon',
    html: `<div class="w-8 h-8 rounded-full flex items-center justify-center ${
      status === 'Active' ? 'bg-green-500' : 'bg-red-500'
    } border-2 border-white shadow-lg">
      <div class="w-2 h-2 bg-white rounded-full"></div>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Reset view control component
function ResetViewControl() {
  const map = useMap();

  return (
    <div className="leaflet-top leaflet-right" style={{ marginTop: '10px' }}>
      <div className="leaflet-control leaflet-bar shadow-none">
        <button
          className="bg-white text-gray-700 px-3 py-1.5 rounded-md shadow-sm text-sm flex items-center gap-1 hover:bg-gray-100 transition-colors"
          onClick={() => map.setView(defaultCenter, 12)}
        >
          <RefreshCw size={14} />
          <span className="hidden sm:inline">Reset View</span>
        </button>
      </div>
    </div>
  );
}

function FitBoundsToMarkers({ beacons }) {
  const map = useMap();

  useEffect(() => {
    if (beacons && beacons.length > 0) {
      const bounds = L.latLngBounds(beacons.map(beacon => [beacon.latitude, beacon.longitude]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, beacons]);

  return null;
}

function MapLegend() {
  return (
    <div className="leaflet-bottom leaflet-left" style={{}}>
      <div className="bg-white p-3 rounded-md shadow-lg">
        <h4 className="font-semibold mb-2 text-sm">Beacon Status</h4>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-xs">Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span className="text-xs">Inactive</span>
        </div>
      </div>
    </div>
  );
}

// Format date to a readable format
const formatDate = dateString => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function BeaconMap() {
  const [activeBeacon, setActiveBeacon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBeacons, setFilteredBeacons] = useState([]);
  const mapRef = useRef(null);

  // Get data from Redux
  const beacons = useSelector(beaconData);
  const loading = useSelector(beaconLoading);
  const error = useSelector(beaconError);

  // Filter beacons based on search term
  useEffect(() => {
    if (beacons) {
      setFilteredBeacons(
        beacons.filter(
          beacon =>
            beacon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            beacon.location_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [beacons, searchTerm]);

  if (loading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading beacon data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center p-6 max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-xl">
      <div className="mb-4 space-y-4">
        <div className="flex sm:flex-row gap-2 sm:items-center justify-between rounded-xl">
          <div className="flex flex-col items-start gap-2">
            <p className="text-lg font-semibold">Beacon Map</p>
            <p className="text-sm text-gray-500">
              View the location of all your beacons on the map
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search beacons..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* {activeBeacon && (
            <button
              className="px-3 py-1.5 bg-primary text-white border  rounded-xl text-sm flex items-center gap-1 ml-auto hover:bg-primary/80 transition-colors"
              onClick={() => {
                if (mapRef.current) {
                  mapRef.current.setView([activeBeacon.latitude, activeBeacon.longitude], 15);
                }
              }}
            >
              <Info size={14} />
              <span>Go to {activeBeacon.name}</span>
            </button>
          )} */}
        </div>
      </div>

      <div className="rounded-lg overflow-hidden shadow-lg h-[600px] bg-gray-100">
        <MapContainer
          center={defaultCenter}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          whenCreated={map => {
            mapRef.current = map;
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredBeacons.map(beacon => (
            <Marker
              key={beacon.beacon_id}
              position={[beacon.latitude, beacon.longitude]}
              icon={createCustomIcon(beacon.status)}
              eventHandlers={{
                click: () => {
                  setActiveBeacon(beacon);
                },
              }}
            >
              <Popup className="beacon-popup">
                <div className="p-2 max-w-xs">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{beacon.name}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        beacon.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {beacon.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">Location:</span> {beacon.location_name}
                    </p>
                    <p>
                      <span className="font-semibold">Battery:</span> {beacon.battery_status}%
                    </p>
                    <p>
                      <span className="font-semibold">Signal:</span> {beacon.signal_strength} dBm
                    </p>
                    <p>
                      <span className="font-semibold">ID:</span> {beacon.beacon_id.substring(0, 8)}
                      ...
                    </p>
                    <p>
                      <span className="font-semibold">Started:</span>{' '}
                      {formatDate(beacon.start_date)}
                    </p>
                    <p className="text-xs text-gray-500">
                      <span className="font-semibold">Coordinates:</span>{' '}
                      {beacon.latitude.toFixed(6)}, {beacon.longitude.toFixed(6)}
                    </p>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        if (mapRef.current) {
                          mapRef.current.setView([beacon.latitude, beacon.longitude], 16);
                        }
                      }}
                    >
                      Zoom to Beacon
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          <ZoomControl position="bottomright" />
          <ResetViewControl />
          <FitBoundsToMarkers beacons={filteredBeacons} />
          <MapLegend />
        </MapContainer>
      </div>

      {filteredBeacons.length === 0 && !loading && (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-700 text-sm">
          No beacons found matching your search criteria.
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        Showing {filteredBeacons.length} of {beacons.length} beacons
      </div>
    </div>
  );
}
