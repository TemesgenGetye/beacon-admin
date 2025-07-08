import { useState } from 'react';
import { Plus, Search, Filter, ChevronDown } from 'lucide-react';
import AdvertList from '../features/advertisments/AdvertList';
import { useAdvertModel } from '../context/AdvertModelContext';
import AdvertModal from '../features/advertisments/AdvertModel';
import { useDispatch, useSelector } from 'react-redux';
import { createAdvert, updateAdvert } from '../Redux/thunks/advertThunk';
import { advertData, advertError, advertLoading } from '../Redux/slices/advertSlice';

const Advertisements = () => {
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const { isModalOpen, handleOpenModal, handleCloseModal, modalMode, currentAdvert, show } =
    useAdvertModel();

  const dispatch = useDispatch();

  const handleAddAdvert = async formData => {
    try {
      await dispatch(createAdvert(formData)).unwrap();
      handleCloseModal();
    } catch (error) {
      // You might want to show an error message to the user here
    }
  };

  const handleUpdateAdvert = async data => {
    try {
      await dispatch(updateAdvert(data)).unwrap();
      handleCloseModal();
    } catch (error) {
      // You might want to show an error message to the user here
    }
  };

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
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-primary hover:bg-primary/60"
            onClick={() => handleOpenModal()}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Advertisement
          </button>
        </div>
      </div>
      {/* {List of Advertisements} */}
      <AdvertList dropdown={dropdown} search={search} />
      {/* {add advertisement modal} */}

      <AdvertModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleAddAdvert={modalMode === 'create' ? handleAddAdvert : undefined}
        handleUpdateAdvert={modalMode === 'edit' ? handleUpdateAdvert : undefined}
        advert={currentAdvert}
        mode={modalMode}
        show={show}
      />
    </div>
  );
};

export default Advertisements;
