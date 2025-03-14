import { useState, useEffect } from 'react';
import { Plus, MapPin, Search, Filter, ChevronDown } from 'lucide-react';
import BeaconsList from '../features/beaons/BeaconList';
import StatusCard from '../components/StatusCard';
import { useBeaconModel } from '../context/BeaconModelContext';
import BeaconModal from '../features/beaons/BeaconModel';
import { useDispatch, useSelector } from 'react-redux';
import { createBeacons, getBeacons, updateBeacon } from '../Redux/thunks/beaconThunk';
import Map from '../components/Map';
import { beaconData, beaconError, beaconLoading } from '../Redux/slices/beaconSlice';

const Beacons = () => {
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { handleOpenModal, isModalOpen, handleCloseModal, modalMode, currentBeacon, show } =
    useBeaconModel();
  const dispatch = useDispatch();
  const beacons = useSelector(beaconData); // Array of beacon objects
  const isLoading = useSelector(beaconLoading);
  const error = useSelector(beaconError);

  useEffect(() => {
    dispatch(getBeacons());
  }, [dispatch]);

  const handleAddBeacon = async data => {
    const createData = { ...data, tempId: Date.now() };
    dispatch(createBeacons(createData)).unwrap();
  };

  const handleUpdateBeacon = data => {
    const beaconData = {
      beacon_id: data.beacon_id,
      name: data.name,
      location_name: data.location_name,
      minor: data.minor,
      status: data.status,
      major: data.major,
      signal_strength: data.signal_strength,
      battery_status: data.battery_status,
      latitude: data.latitude,
      longitude: data.longitude,
    };
    dispatch(updateBeacon(beaconData));
  };

  const totalBeacons = beacons?.length || 0;
  const activeBeacons = beacons?.filter(b => b.status === 'Active').length || 0;
  const uniqueLocations = beacons?.length
    ? [...new Set(beacons.map(b => b.location_name))].length
    : 0;
  const beaconsWithWarnings = beacons?.filter(b => b.battery_status < 20).length || 0;

  return (
    <div className="space-y-6 p-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-forth">Beacons</h1>
          <p className="mt-1 text-sm text-gray-400">Manage your beacon network</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search beacons..."
                className="pl-10 pr-4 py-2 border rounded-xl border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                onChange={e => setSearch(e.target.value)}
                value={search}
              />
            </div>
            <button
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 flex items-center"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <Filter className="h-5 w-5" color="#4cd7f6" />
              <span className="ml-2">Filter</span>
              <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
            </button>
            {openDropdown && (
              <div className="relative" onClick={() => setOpenDropdown(!openDropdown)}>
                <div className="absolute top-3 w-32 right-0 z-10 mt-2 mr-2 bg-white rounded-xl shadow-sm">
                  <button
                    className="w-full p-2 text-gray-400 hover:text-gray-600 rounded-sm hover:bg-gray-100 flex items-center text-sm"
                    onClick={() => setDropdown('active')}
                  >
                    Active
                  </button>
                  <button
                    className="w-full p-2 text-gray-400 hover:text-gray-600 rounded-sm hover:bg-gray-100 flex items-center text-sm"
                    onClick={() => setDropdown('inactive')}
                  >
                    Inactive
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-primary hover:bg-primary/60"
            onClick={() => handleOpenModal()}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Beacon
          </button>
        </div>
      </div>

      {/* Updated Status Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {totalBeacons > 0 ? (
          <StatusCard
            title="Beacon Network Status"
            status={activeBeacons === totalBeacons ? 'Active' : 'Mixed'}
            description={`${activeBeacons} of ${totalBeacons} beacons are currently active.`}
          />
        ) : (
          <StatusCard
            title="Beacon Network Status"
            status="No Data"
            description="No beacons available yet."
          />
        )}

        {totalBeacons > 0 ? (
          <StatusCard
            title="Beacon Health"
            status={beaconsWithWarnings > 0 ? 'Warning' : 'Good'}
            description={`${beaconsWithWarnings} beacons with low battery, 0 with errors.`}
          />
        ) : (
          <StatusCard
            title="Beacon Health"
            status="No Data"
            description="No health data available."
          />
        )}

        {totalBeacons > 0 ? (
          <StatusCard
            title="Beacon Locations"
            status="Info"
            description={`Beacons deployed across ${uniqueLocations} unique locations.`}
          />
        ) : (
          <StatusCard
            title="Beacon Locations"
            status="No Data"
            description="No location data available."
          />
        )}
      </div>

      <BeaconsList dropdown={dropdown} search={search} />

      <BeaconModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleAddBeacon={modalMode === 'create' ? handleAddBeacon : undefined}
        handleUpdateBeacon={modalMode === 'edit' ? handleUpdateBeacon : undefined}
        beacon={currentBeacon}
        mode={modalMode}
        show={show}
      />
      <div className="z-20">
        <Map />
      </div>
    </div>
  );
};

export default Beacons;
