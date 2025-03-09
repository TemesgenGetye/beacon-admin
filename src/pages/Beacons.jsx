import { useState, useEffect } from 'react';
import { Plus, MapPin, Search, Filter, ChevronDown } from 'lucide-react';
import BeaconsList from '../features/beaons/BeaconList';
import StatusCard from '../components/StatusCard';
import { useBeaconModel } from '../context/BeaconModelContext';
import BeaconModal from '../features/beaons/BeaconModel';

const Beacons = () => {
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { handleOpenModal, isModalOpen, handleCloseModal, modalMode, currentBeacon, show } =
    useBeaconModel();

  const handleAddBeacon = data => {
    console.log('updated data', data);
  };

  const handleUpdateBeacon = data => {
    console.log('updated data', data);
  };
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
                className="pl-10 pr-4 py-2 border rounded-xl border-gray-300  focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                onChange={e => setSearch(e.target.value)}
                value={search}
              />
            </div>

            {/* {filter} */}
            <button
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 flex items-center"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <Filter className="h-5 w-5" color="#4cd7f6" />
              <span className="ml-2">Filter</span>
              <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
            </button>
            {/* {open dropdown} */}
            {openDropdown && (
              <div className="relative" onClick={() => setOpenDropdown(!openDropdown)}>
                <div className="absolute top-3 w-32 right-0 z-10 mt-2 mr-2 bg-white rounded-xl shadow-sm">
                  <button
                    className=" w-full p-2 text-gray-400 hover:text-gray-600 rounded-sm hover:bg-gray-100 flex items-center text-sm"
                    onClick={() => setDropdown('active')}
                  >
                    Active
                  </button>
                  <button
                    className=" w-full p-2 text-gray-400 hover:text-gray-600 rounded-sm hover:bg-gray-100 flex items-center text-sm"
                    onClick={() => setDropdown('inactive')}
                  >
                    Inactive
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* {add advertisement} */}
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-primary hover:bg-primary/60"
            onClick={() => handleOpenModal()}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Beacon
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatusCard
          title="Beacon Network Status"
          status="Active"
          description={`${'active'} of ${4} beacons are currently active.`}
        />
        <StatusCard
          title="Beacon Health"
          // status={beaconStats.warnings > 0 ? 'Warning' : 'Good'}
          status="Warning"
          description={`${'warning'} beacons with warnings, ${'error'} with errors.`}
        />
        <StatusCard
          title="Beacon Locations"
          status="Info"
          description={`Beacons deployed across ${'mexico'} unique locations.`}
        />
      </div>
      {/* {List of Advertisements} */}
      <BeaconsList dropdown={dropdown} search={search} />

      {/* {add beacon modal} */}
      <BeaconModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleAddBeacon={modalMode === 'create' ? handleAddBeacon : undefined}
        handleUpdateBeacon={modalMode === 'edit' ? handleUpdateBeacon : undefined}
        beacon={currentBeacon}
        mode={modalMode}
        show={show}
      />
    </div>
  );
};

export default Beacons;
