import { useState, useEffect, use } from 'react';
import { Calendar } from 'lucide-react';
import DataTable from '../components/DataTable';
import BarChart from '../components/BarChart';
import { useDispatch, useSelector } from 'react-redux';
import { messageData, messageError, messageLoading } from '../Redux/slices/messageSlice';
import { deleteMessage, getMessages } from '../Redux/thunks/messageThnuk';
import DataTableLogsMessage from '../components/DataTableLogsMessage';

const Messages = () => {
  const dispatch = useDispatch();

  const message = useSelector(messageData);
  const loading = useSelector(messageLoading);
  const error = useSelector(messageError);

  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  console.log('message', message);

  function handleDeletes(id) {
    dispatch(deleteMessage(id));
  }

  //   {
  //     "message_id": "7b59f797-fe59-4c88-9e35-c484383dce95",
  //     "content": "sent link",
  //     "sent_at": "2025-02-13T19:15:56.366683Z",
  //     "read_at": "2025-02-13T00:00:00Z",
  //     "beacon_id": "e7f0ebe1-7a8f-4846-9ccf-581371452fa9",
  //     "beacon_name": "Beacon 1"
  // }

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
          {row.sent_at}
        </div>
      ),
    },
    {
      key: 'read_at',
      header: 'Read At',
      render: row => (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 text-gray-400 mr-1" />
          {row.read_at}
        </div>
      ),
    },
  ];

  const messageTypeChartKeys = [{ id: 'count', name: 'Count' }];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
          <p className="text-sm font-medium text-gray-500">Total Messages</p>
          {/* <p className="text-2xl font-semibold mt-1">{messageStats.total}</p> */}
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-500">Status Updates</p>
          {/* <p className="text-2xl font-semibold mt-1">{messageStats.statusUpdates}</p> */}
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-500">Ad Deliveries</p>
          {/* <p className="text-2xl font-semibold mt-1">{messageStats.adDelivery}</p> */}
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-500">Warnings</p>
          {/* <p className="text-2xl font-semibold mt-1">{messageStats.warnings}</p> */}
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-500">Errors</p>
          {/* <p className="text-2xl font-semibold mt-1">{messageStats.errors}</p> */}
        </div>
      </div>

      {/* Message Type Chart */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <BarChart data={message} title="Message Types" dataKeys={messageTypeChartKeys} />
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Message Priority</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">High Priority</span>
                <span className="text-sm font-medium text-gray-700">20%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Medium Priority</span>
                <span className="text-sm font-medium text-gray-700">40%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Low Priority</span>
                <span className="text-sm font-medium text-gray-700">40%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DataTableLogsMessage
        data={message}
        columns={columns}
        title="Recent Messages"
        handleDelete={handleDeletes}
        idKey="message_id"
      />
    </div>
  );
};

export default Messages;
