import { useState, useEffect } from 'react';
import { Plus, MapPin } from 'lucide-react';
import DataTable from '../components/DataTable';
import StatusCard from '../components/StatusCard';

const Beacons = () => {
  const [loading, setLoading] = useState(true);
  const [beacons, setBeacons] = useState([]);
  const [beaconStats, setBeaconStats] = useState({});

  useEffect(() => {
    const loadBeacons = async () => {
      try {
        // In a real app, this would fetch from the API
        // const data = await fetchBeacons()
        // setBeacons(data)

        // Mock data for demonstration
        setBeacons([
          {
            id: 1,
            name: 'Store Front',
            location: 'New York',
            status: 'Active',
            lastSeen: '2023-07-01 14:23:45',
            batteryLevel: '87%',
            adCount: 3,
          },
          {
            id: 2,
            name: 'Mall Entrance',
            location: 'Los Angeles',
            status: 'Active',
            lastSeen: '2023-07-01 13:45:22',
            batteryLevel: '92%',
            adCount: 5,
          },
          {
            id: 3,
            name: 'Food Court',
            location: 'Chicago',
            status: 'Inactive',
            lastSeen: '2023-06-28 12:12:34',
            batteryLevel: '23%',
            adCount: 0,
          },
          {
            id: 4,
            name: 'Electronics Dept',
            location: 'Houston',
            status: 'Active',
            lastSeen: '2023-07-01 11:56:12',
            batteryLevel: '78%',
            adCount: 2,
          },
          {
            id: 5,
            name: 'Exit Gate',
            location: 'Phoenix',
            status: 'Warning',
            lastSeen: '2023-07-01 10:34:56',
            batteryLevel: '35%',
            adCount: 4,
          },
          {
            id: 6,
            name: 'Parking Lot',
            location: 'Philadelphia',
            status: 'Active',
            lastSeen: '2023-07-01 09:23:11',
            batteryLevel: '82%',
            adCount: 1,
          },
          {
            id: 7,
            name: 'Checkout Area',
            location: 'San Antonio',
            status: 'Active',
            lastSeen: '2023-07-01 08:45:33',
            batteryLevel: '91%',
            adCount: 3,
          },
          {
            id: 8,
            name: 'Clothing Section',
            location: 'San Diego',
            status: 'Error',
            lastSeen: '2023-06-25 15:12:45',
            batteryLevel: '0%',
            adCount: 0,
          },
          {
            id: 9,
            name: 'Restaurant',
            location: 'Dallas',
            status: 'Active',
            lastSeen: '2023-07-01 14:05:22',
            batteryLevel: '76%',
            adCount: 2,
          },
          {
            id: 10,
            name: 'Movie Theater',
            location: 'San Jose',
            status: 'Active',
            lastSeen: '2023-07-01 13:34:11',
            batteryLevel: '88%',
            adCount: 4,
          },
        ]);

        setBeaconStats({
          total: 10,
          active: 7,
          inactive: 1,
          warning: 1,
          error: 1,
          locations: 10,
        });

        setLoading(false);
      } catch (error) {
        console.error('Error loading beacons:', error);
        setLoading(false);
      }
    };

    loadBeacons();
  }, []);

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    {
      key: 'location',
      header: 'Location',
      render: row => (
        <div className="flex items-center justify-center">
          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
          {row.location}
        </div>
      ),
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
    { key: 'lastSeen', header: 'Last Seen' },
    {
      key: 'batteryLevel',
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
    { key: 'adCount', header: 'Ads' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Beacons</h1>
          <p className="mt-1 text-sm text-gray-500">Monitor and manage your beacon network</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          <Plus className="h-4 w-4 mr-2" />
          Register Beacon
        </button>
      </div>

      {/* Beacon Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatusCard
          title="Beacon Network Status"
          status="Active"
          description={`${beaconStats.active} of ${beaconStats.total} beacons are currently active.`}
        />
        <StatusCard
          title="Beacon Health"
          status={beaconStats.error > 0 ? 'Warning' : 'Good'}
          description={`${beaconStats.warning} beacons with warnings, ${beaconStats.error} with errors.`}
        />
        <StatusCard
          title="Beacon Locations"
          status="Info"
          description={`Beacons deployed across ${beaconStats.locations} unique locations.`}
        />
      </div>

      <DataTable data={beacons} columns={columns} title="All Beacons" />
    </div>
  );
};

export default Beacons;
