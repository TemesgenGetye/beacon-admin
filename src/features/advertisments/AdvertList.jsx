import { useEffect, useState } from 'react';
import DataTable from '../../components/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { advertData, advertError, advertLoading } from '../../Redux/slices/advertSlice';
import { deleteAdvert, getAdverts } from '../../Redux/thunks/advertThunk';
import { useAdvertModel } from '../../context/AdvertModelContext';

const columns = [
  {
    key: 'advertisement_id',
    header: 'Advertisement ID',
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

function AdvertList({ dropdown, search }) {
  const dispatch = useDispatch();
  const adverts = useSelector(advertData);
  const isLoading = useSelector(advertLoading);
  const error = useSelector(advertError);
  const { handleOpenModal, setShow, setModalMode } = useAdvertModel();

  useEffect(() => {
    if (!adverts.length) dispatch(getAdverts());
  }, [dispatch, adverts.length]);

  const filteredAdverts = adverts?.filter(advert => {
    const matchesDropdown =
      dropdown === 'active' ? advert.is_active : dropdown === 'inactive' ? !advert.is_active : true;
    const matchesSearch = search ? advert.title.toLowerCase().includes(search.toLowerCase()) : true;
    return matchesDropdown && matchesSearch;
  });

  const handleDeleteAdvert = id => {
    dispatch(deleteAdvert(id));
  };

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

  if (error && error !== 'Server error: 204') {
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <DataTable
        data={filteredAdverts || []}
        columns={columns}
        title="All Advertisements"
        pagination={{
          total: adverts?.length || 0,
          pageSize: 10,
          current: 1,
        }}
        idKey="advertisement_id"
        // for modal handling
        handleOpenModal={handleOpenModal}
        setShow={setShow}
        setModalMode={setModalMode}
        handleDelete={handleDeleteAdvert}
      />
    </div>
  );
}

export default AdvertList;
