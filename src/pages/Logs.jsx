import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import DataTable from '../components/DataTable';
import LineChart from '../components/LineChart';
import { useDispatch, useSelector } from 'react-redux';
import { getLogs } from '../Redux/thunks/logsThunk';
import { logData, logError, logLoading } from '../Redux/slices/logSlice';
import { singleDataBeacon } from '../Redux/slices/beaconSlice';
import { getBeacon } from '../Redux/thunks/beaconThunk';
import DataTableLogsMessage from '../components/DataTableLogsMessage';

const timeframeData = [
  {
    name: 'Jan 1',
    logs: 4000,
    success: 2400,
    failed: 2400,
  },
];

// {
//   "beacon_id": "e7f0ebe1-7a8f-4846-9ccf-581371452fa9",
//   "log_id": 1,
//   "timestamp": "2025-02-17T06:27:03.324835Z",
//   "advertisement_title": "YBS Commissioning",
//   "advertisement_content": "We are offering an Expert services in commissioning works, ensuring efficiency and reliability in various operations."
// }
const columns = [
  { key: 'log_id', header: 'ID' },
  { key: 'advertisement_title', header: 'Advertisement' },
  { key: 'beacon_id', header: 'Beacon' },
  {
    key: 'advertisement_content',
    header: 'Content',
    width: '200px',
    render: row => (
      <div className="text-sm text-gray-500 line-clamp-1 text-ellipsis">
        {row.advertisement_content}
      </div>
    ),
  },
  {
    key: 'timestamp',
    header: 'Timestamp',
    render: row => (
      <div className="flex items-center">
        <Calendar className="h-4 w-4 text-gray-400 mr-1" />
        {row.timestamp}
      </div>
    ),
  },
];

const timeframeChartKeys = [
  { id: 'logs', name: 'Total Logs' },
  { id: 'success', name: 'Success' },
  { id: 'failed', name: 'Failed' },
];

const Logs = () => {
  const dispatch = useDispatch();
  const logs = useSelector(logData);
  const loading = useSelector(logLoading);
  const error = useSelector(logError);

  useEffect(() => {
    dispatch(getLogs());
  }, [dispatch]);

  function handleDeletes(id) {
    console.log(id);
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 max-w-2xl">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading advertisements</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Advertisement Logs</h1>
        <p className="mt-1 text-sm text-gray-500">Track and analyze advertisement delivery logs</p>
      </div>

      {/* Log Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-500">Total Logs</p>
          {/* <p className="text-2xl font-semibold mt-1">{logStats.total}</p> */}
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-500">Success Rate</p>
          <p className="text-2xl font-semibold mt-1">
            {/* {((logStats.success / logStats.total) * 100).toFixed(1)}% */}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-500">Failed</p>
          {/* <p className="text-2xl font-semibold mt-1">{logStats.failed}</p> */}
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-500">Impressions</p>
          {/* <p className="text-2xl font-semibold mt-1">{logStats.impressions}</p> */}
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-500">Clicks</p>
          {/* <p className="text-2xl font-semibold mt-1">{logStats.clicks}</p> */}
        </div>
      </div>

      {/* Log Timeframe Chart */}
      <LineChart
        data={timeframeData}
        title="Log Activity (Last 24 Hours)"
        dataKeys={timeframeChartKeys}
      />

      <DataTableLogsMessage
        data={logs}
        columns={columns}
        title="Recent Logs"
        handleDelete={handleDeletes}
        idKey="log_id"
      />
    </div>
  );
};

export default Logs;
