'use client';

import { useEffect, useState } from 'react';
import { Plus, Search, Filter, ChevronDown } from 'lucide-react';
import DataTable from '../components/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { advertData, advertError, advertLoading } from '../Redux/slices/advertSlice';
import { getAdverts } from '../Redux/thunks/advertThunk';

const Advertisements = () => {
  const dispatch = useDispatch();
  const adverts = useSelector(advertData);
  const isLoading = useSelector(advertLoading);
  const error = useSelector(advertError);
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    dispatch(getAdverts());
  }, [dispatch]);

  const filteredAdverts = adverts?.results.filter(advert => {
    const matchesDropdown =
      dropdown === 'active' ? advert.is_active : dropdown === 'inactive' ? !advert.is_active : true;

    const matchesSearch = search ? advert.title.toLowerCase().includes(search.toLowerCase()) : true;

    return matchesDropdown && matchesSearch;
  });

  const columns = [
    {
      key: 'advertisement_id',
      header: 'ID',
      width: '20px',
    },
    {
      key: 'title',
      header: 'Title',
      width: '300px',
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
          <h1 className="text-2xl font-semibold text-forth">Advertisements</h1>
          <p className="mt-1 text-sm text-gray-400">Manage your advertisement campaigns</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search advertisements..."
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
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            New Advertisement
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <DataTable
          data={filteredAdverts}
          columns={columns}
          title="All Advertisements"
          pagination={{
            total: adverts.results.length || 0,
            pageSize: 10,
            current: 1,
          }}
        />
      </div>
    </div>
  );
};

export default Advertisements;
