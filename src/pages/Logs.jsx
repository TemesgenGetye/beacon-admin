import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import LineChart from '../components/LineChart';
import { useDispatch, useSelector } from 'react-redux';
import { getLogs } from '../Redux/thunks/logsThunk';
import { logData, logError, logLoading } from '../Redux/slices/logSlice';

import DataTableLogsMessage from '../components/DataTableLogsMessage';

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
        {new Date(row.timestamp).toLocaleString()}
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

  const totalLogs = logs?.length || 0;
  const successLogs = logs?.length || 0;
  const failedLogs = 0;
  const successRate = totalLogs > 0 ? ((successLogs / totalLogs) * 100).toFixed(1) : 0;
  const impressions = 0;
  const clicks = 0;

  const generateTimeframeData = () => {
    if (!logs || logs.length === 0) {
      return [{ name: 'No Data', logs: 0, success: 0, failed: 0 }];
    }

    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);

    const logsByDay = logs.reduce((acc, log) => {
      const logDate = new Date(log.timestamp);
      if (logDate >= sevenDaysAgo) {
        const dayKey = logDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        acc[dayKey] = acc[dayKey] || { name: dayKey, logs: 0, success: 0, failed: 0 };
        acc[dayKey].logs += 1;
        acc[dayKey].success += 1;
      }
      return acc;
    }, {});

    return Object.values(logsByDay).length > 0
      ? Object.values(logsByDay)
      : [{ name: 'No Data', logs: 0, success: 0, failed: 0 }];
  };

  const timeframeData = generateTimeframeData();

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
          <p className="text-sm font-medium text-forth">Total Logs</p>
          <p className="text-2xl font-semibold mt-1">{totalLogs}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-forth">Success Rate</p>
          <p className="text-2xl font-semibold mt-1">{successRate}%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-forth">Failed</p>
          <p className="text-2xl font-semibold mt-1">{failedLogs}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-forth">Impressions</p>
          <p className="text-2xl font-semibold mt-1">{impressions}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-forth">Clicks</p>
          <p className="text-2xl font-semibold mt-1">{clicks}</p>
        </div>
      </div>

      {/* Log Timeframe Chart */}
      <LineChart
        data={timeframeData}
        title="Log Activity (Last 7 Days)"
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
