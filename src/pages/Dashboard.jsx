import { useEffect, useMemo } from 'react';
import { Radio, MonitorSmartphone, FileText, MessageSquare } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import AdvertList from '../features/advertisments/AdvertList';
import { useDispatch, useSelector } from 'react-redux';
import { getAdverts } from '../Redux/thunks/advertThunk';
import { advertData, advertError, advertLoading } from '../Redux/slices/advertSlice';
import { getBeacons } from '../Redux/thunks/beaconThunk';
import { beaconData, beaconError, beaconLoading } from '../Redux/slices/beaconSlice';
import { getMessages } from '../Redux/thunks/messageThnuk';
import { messageData, messageError, messageLoading } from '../Redux/slices/messageSlice';
import { getLogs } from '../Redux/thunks/logsThunk';
import { logData, logError, logLoading } from '../Redux/slices/logSlice';

const Dashboard = () => {
  const dispatch = useDispatch();

  const adverts = useSelector(advertData);
  const isLoading = useSelector(advertLoading);
  const error = useSelector(advertError);

  const beacons = useSelector(beaconData);
  const isLoadingBeacons = useSelector(beaconLoading);
  const errorBeacons = useSelector(beaconError);

  const messages = useSelector(messageData);
  const isLoadingMessages = useSelector(messageLoading);
  const errorMessages = useSelector(messageError);

  const logs = useSelector(logData);
  const isLoadingLogs = useSelector(logLoading);
  const errorLogs = useSelector(logError);

  // Calculate metrics from your data - memoized to prevent unnecessary recalculations
  const metrics = useMemo(() => {
    const activeBeaconsCount = beacons.filter(beacon => beacon.status === 'Active').length;
    const activeAdvertsCount = adverts.filter(advert => advert.is_active).length;
    const totalLogs = logs.length;
    const totalMessages = messages.length;

    return {
      activeBeacons: activeBeaconsCount,
      activeAds: activeAdvertsCount,
      totalLogs,
      totalMessages,
    };
  }, [beacons, adverts, logs, messages]);

  useEffect(() => {
    // Add a small delay to prevent rapid successive calls
    const timer = setTimeout(() => {
      dispatch(getAdverts());
      dispatch(getBeacons());
      dispatch(getMessages());
      dispatch(getLogs());
    }, 100);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const logTrendsData = useMemo(() => {
    const logsByDay = {};
    logs.forEach(log => {
      const date = new Date(log.timestamp);
      const day = date.toISOString().split('T')[0];
      logsByDay[day] = (logsByDay[day] || 0) + 1;
    });

    return Object.entries(logsByDay).map(([name, count]) => ({
      name,
      logs: count,
    }));
  }, [logs]);

  const beaconBatteryData = useMemo(() => {
    return beacons.map(beacon => ({
      name: beacon.name,
      battery: beacon.battery_status,
    }));
  }, [beacons]);

  if (isLoading || isLoadingBeacons || isLoadingMessages || isLoadingLogs) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || errorBeacons || errorMessages || errorLogs) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 max-w-2xl">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading data</h3>
              <p className="text-sm text-red-700 mt-1">
                {error || errorBeacons || errorMessages || errorLogs}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const trendChartKeys = [{ id: 'logs', name: 'Log Count' }];
  const batteryChartKeys = [{ id: 'battery', name: 'Battery Status (%)' }];

  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-2xl font-bold text-forth">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-400">Overview of your advertisement beacon network</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Active Beacons" value={metrics.activeBeacons} icon={Radio} />
        <MetricCard
          title="Active Advertisements"
          value={metrics.activeAds}
          icon={MonitorSmartphone}
        />
        <MetricCard title="Total Logs" value={metrics.totalLogs} icon={FileText} />
        <MetricCard title="Total Messages" value={metrics.totalMessages} icon={MessageSquare} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <LineChart data={logTrendsData} title="Log Activity Over Time" dataKeys={trendChartKeys} />
        <BarChart
          data={beaconBatteryData}
          title="Beacon Battery Status"
          dataKeys={batteryChartKeys}
        />
      </div>

      {/* Advertisements List */}
      <div>
        <AdvertList />
      </div>
    </div>
  );
};

export default Dashboard;
