import { useEffect, useState } from 'react';
import DataTable from '../../components/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { CircleCheckBig, CircleSmall, MapPin, SignalIcon } from 'lucide-react';
import { beaconData, beaconError, beaconLoading } from '../../Redux/slices/beaconSlice';
import { deleteBeacon, getBeacons } from '../../Redux/thunks/beaconThunk';
import { useBeaconModel } from '../../context/BeaconModelContext';

// {
//   "beacon_id": "279ec222-244d-433e-ae1a-07d2d14cd229",
//   "name": "beacon 2",
//   "minor": null,
//   "major": null,
//   "location_name": "Mexico",
//   "signal_strength": null,
//   "battery_status": null,
//   "start_date": "2025-02-13T19:04:07.275211Z",
//   "status": "Inactive",
//   "latitude": null,
//   "longitude": null
// }

const columns = [
  { key: 'beacon_id', header: 'Beacon ID' },
  { key: 'name', header: 'Name' },
  {
    key: 'location_name',
    header: 'Location',
    render: row => (
      <div className="flex items-center justify-center">
        <MapPin className="h-4 w-4 text-gray-400 mr-1" />
        {row.location_name}
      </div>
    ),
  },
  {
    key: 'minor',
    header: 'Minor',
    render: row => {
      return (
        <div className="flex items-center justify-center">
          <CircleSmall className="h-4 w-4 text-gray-400 mr-1" />
          {row.minor}
        </div>
      );
    },
  },

  {
    key: 'major',
    header: 'Major',
    render: row => {
      return (
        <div className="flex items-center justify-center">
          <CircleCheckBig className="h-4 w-4 text-gray-400 mr-1" />
          {row.major}
        </div>
      );
    },
  },
  {
    key: 'signal_strength',
    header: 'Signal Strength',
    render: row => {
      return (
        <div className="flex items-center justify-center">
          <SignalIcon className="h-4 w-4 text-gray-400 mr-1" />
          {row.signal_strength}
        </div>
      );
    },
  },
  {
    key: 'status',
    header: 'Status',
    render: row => {
      const statusColors = {
        Active: 'bg-green-100 text-green-800',
        Inactive: 'bg-gray-100 text-gray-800',
        Warning: 'bg-yellow-100 text-yellow-800',
        Error: 'bg-red-100 text-red-800',
      };
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[row.status]}`}
        >
          {row.status}
        </span>
      );
    },
  },
  {
    key: 'battery_status',
    header: 'Battery',
    render: row => {
      const batteryPercentage = Number.parseInt(row.batteryLevel);
      let bgColor = 'bg-green-500';

      if (batteryPercentage < 30) {
        bgColor = 'bg-red-500';
      } else if (batteryPercentage < 60) {
        bgColor = 'bg-yellow-500';
      }

      return (
        <div className="flex items-center">
          <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
            <div
              className={`h-2.5 rounded-full ${bgColor}`}
              style={{ width: row.batteryLevel }}
            ></div>
          </div>
          <span>{row.batteryLevel}</span>
        </div>
      );
    },
  },
  //latitiude
  {
    key: 'latitude',
    header: 'Latitude',
    render: row => {
      return (
        <div className="flex items-center justify-center">
          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
          {row.latitude}
        </div>
      );
    },
  },
  //longitude
  {
    key: 'longitude',
    header: 'Longitude',
    render: row => {
      return (
        <div className="flex items-center justify-center">
          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
          {row.longitude}
        </div>
      );
    },
  },
];

function BeaconsList({ dropdown, search }) {
  const dispatch = useDispatch();
  const beacons = useSelector(beaconData);
  const isLoading = useSelector(beaconLoading);
  const error = useSelector(beaconError);
  const { handleOpenModal, setShow, setModalMode } = useBeaconModel();

  useEffect(() => {
    dispatch(getBeacons());
  }, [dispatch]);

  function handleDeleteBeacon(id) {
    dispatch(deleteBeacon(id));
  }

  const filteredBeacons = beacons?.filter(beacon => {
    const matchesDropdown =
      dropdown === 'active'
        ? beacon.status === 'Active'
        : dropdown === 'inactive'
          ? beacon.status !== 'Active'
          : true;
    const matchesSearch = search ? beacon?.name.toLowerCase().includes(search.toLowerCase()) : true;
    return matchesDropdown && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-sm text-gray-500">Loading beacons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 max-w-2xl">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading beacons</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <DataTable
        data={filteredBeacons}
        columns={columns}
        title="All beacon"
        pagination={{
          total: beacons?.length || 0,
          pageSize: 10,
          current: 1,
        }}
        // for modal handling
        idKey="beacon_id"
        handleOpenModal={handleOpenModal}
        setShow={setShow}
        setModalMode={setModalMode}
        handleDelete={handleDeleteBeacon}
      />
    </div>
  );
}

export default BeaconsList;
