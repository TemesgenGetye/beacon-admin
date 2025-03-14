import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import DataTable from '../components/DataTable';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart'; // Added LineChart import
import { useDispatch, useSelector } from 'react-redux';
import { messageData, messageError, messageLoading } from '../Redux/slices/messageSlice';
import { deleteMessage, getMessages } from '../Redux/thunks/messageThnuk';
import DataTableLogsMessage from '../components/DataTableLogsMessage';

const Messages = () => {
  const dispatch = useDispatch();
  const messages = useSelector(messageData);
  const loading = useSelector(messageLoading);
  const error = useSelector(messageError);

  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  const totalMessages = messages?.length || 0;
  const statusUpdates =
    messages?.filter(m => m.content.toLowerCase().includes('status')).length || 0;
  const adDeliveries = messages?.filter(m => m.content.toLowerCase().includes('link')).length || 0;
  const warnings = 0;
  const errors = 0;

  const generateMessageTypeData = () => {
    if (!messages || messages.length === 0) {
      return [{ name: 'No Data', count: 0 }];
    }
    const messagesByBeacon = messages.reduce((acc, msg) => {
      const beaconName = msg.beacon_name || 'Unknown Beacon';
      acc[beaconName] = acc[beaconName] || { name: beaconName, count: 0 };
      acc[beaconName].count += 1;
      return acc;
    }, {});
    return Object.values(messagesByBeacon);
  };

  const generateMessagesOverTimeData = () => {
    if (!messages || messages.length === 0) {
      return [{ name: 'No Data', messages: 0 }];
    }

    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);

    const messagesByDay = messages.reduce((acc, msg) => {
      const sentDate = new Date(msg.sent_at);
      if (sentDate >= sevenDaysAgo) {
        const dayKey = sentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        acc[dayKey] = acc[dayKey] || { name: dayKey, messages: 0 };
        acc[dayKey].messages += 1;
      }
      return acc;
    }, {});

    return Object.values(messagesByDay).length > 0
      ? Object.values(messagesByDay)
      : [{ name: 'No Data', messages: 0 }];
  };

  const messageTypeChartData = generateMessageTypeData();
  const messagesOverTimeData = generateMessagesOverTimeData();
  const messageTypeChartKeys = [{ id: 'count', name: 'Count' }];
  const messagesOverTimeChartKeys = [{ id: 'messages', name: 'Messages Sent' }];

  function handleDeletes(id) {
    dispatch(deleteMessage(id));
  }

  const columns = [
    { key: 'message_id', header: 'ID' },
    { key: 'beacon_id', header: 'Beacon Id' },
    { key: 'beacon_name', header: 'Beacon Name' },
    { key: 'content', header: 'Content' },
    {
      key: 'sent_at',
      header: 'Sent At',
      render: row => (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 text-gray-400 mr-1" />
          {new Date(row.sent_at).toLocaleString()}
        </div>
      ),
    },
    {
      key: 'read_at',
      header: 'Read At',
      render: row => (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 text-gray-400 mr-1" />
          {row.read_at === '2025-02-13T00:00:00Z'
            ? 'Not Read'
            : new Date(row.read_at).toLocaleString()}
        </div>
      ),
    },
  ];

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
              <h3 className="text-sm font-medium text-red-800">Error loading messages</h3>
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
        <h1 className="text-2xl font-bold text-gray-900">Beacon Messages</h1>
        <p className="mt-1 text-sm text-gray-500">View and analyze messages sent by beacons</p>
      </div>

      {/* Message Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-400">Total Messages</p>
          <p className="text-2xl font-semibold mt-1">{totalMessages}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-400">Status Updates</p>
          <p className="text-2xl font-semibold mt-1">{statusUpdates}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-400">Ad Deliveries</p>
          <p className="text-2xl font-semibold mt-1">{adDeliveries}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-400">Warnings</p>
          <p className="text-2xl font-semibold mt-1">{warnings}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-400">Errors</p>
          <p className="text-2xl font-semibold mt-1">{errors}</p>
        </div>
      </div>

      {/* Message Charts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <BarChart
          data={messageTypeChartData}
          title="Messages by Beacon"
          dataKeys={messageTypeChartKeys}
        />
        <LineChart
          data={messagesOverTimeData}
          title="Messages Sent (Last 7 Days)"
          dataKeys={messagesOverTimeChartKeys}
        />
      </div>

      <DataTableLogsMessage
        data={messages}
        columns={columns}
        title="Recent Messages"
        handleDelete={handleDeletes}
        idKey="message_id"
      />
    </div>
  );
};

export default Messages;
