'use client';

import { useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import DataTable from '../components/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { advertData, advertError, advertLoading } from '../Redux/slices/advertSlice';
import { getAdverts } from '../Redux/thunks/advertThunk';

const Advertisements = () => {
  const dispatch = useDispatch();
  const adverts = useSelector(advertData);
  const isLoading = useSelector(advertLoading);
  const error = useSelector(advertError);

  useEffect(() => {
    dispatch(getAdverts());
  }, [dispatch]);

  const columns = [
    {
      key: 'advertisement_id',
      header: 'ID',
      width: '100px',
    },
    {
      key: 'title',
      header: 'Title',
      width: '200px',
    },
    {
      key: 'is_active',
      header: 'Status',
      width: '120px',
      render: row => {
        return (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
              row.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {row.is_active ? 'Active' : 'Inactive'}
          </span>
        );
      },
    },
    {
      key: 'start_date',
      header: 'Start Date',
      width: '150px',
      render: row => new Date(row.start_date).toLocaleDateString(),
    },
    {
      key: 'end_date',
      header: 'End Date',
      width: '150px',
      render: row => new Date(row.end_date).toLocaleDateString(),
    },
    {
      key: 'content',
      header: 'Content',
      render: row => (
        <div className="max-w-md truncate" title={row.content}>
          {row.content}
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-sm text-gray-500">Loading advertisements...</p>
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
              <h3 className="text-sm font-medium text-red-800">Error loading advertisements</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Advertisements</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your advertisement campaigns</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search advertisements..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Filter className="h-5 w-5" />
            </button>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            New Advertisement
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <DataTable
          data={adverts?.results || []}
          columns={columns}
          title="All Advertisements"
          pagination={{
            total: adverts?.count || 0,
            pageSize: 10,
            current: 1,
          }}
        />
      </div>
    </div>
  );
};

export default Advertisements;
