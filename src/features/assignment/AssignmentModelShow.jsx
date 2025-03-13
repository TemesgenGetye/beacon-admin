import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { advertError, advertLoading, singleData } from '../../Redux/slices/advertSlice';
import { getAdvert } from '../../Redux/thunks/advertThunk';
import { beaconError, beaconLoading, singleDataBeacon } from '../../Redux/slices/beaconSlice';
import { getBeacon } from '../../Redux/thunks/beaconThunk';
import { X } from 'lucide-react';

function AssignmentModelShow({ isOpen, onClose, assignment }) {
  const isLoadingAdvert = useSelector(advertLoading);
  const errorAdvert = useSelector(advertError);
  const isLoadingBeacon = useSelector(beaconLoading);
  const errorBeacon = useSelector(beaconError);

  const singleAdvertData = useSelector(singleData);
  const singleBeaconData = useSelector(singleDataBeacon);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen && assignment) {
      dispatch(getAdvert(assignment.advertisement_id));
      dispatch(getBeacon(assignment.beacon_id));
    }
  }, [dispatch, assignment, isOpen]);

  if (!isOpen) return null;

  const formatDate = dateString => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-midnight bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between text-forth px-6 py-4">
          <h2 className="text-xl font-semibold text-midnight">Assignment Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-130px)]">
          {isLoadingAdvert || isLoadingBeacon ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : errorAdvert || errorBeacon ? (
            <div className="text-red-500 text-center py-4 rounded-xl bg-red-50 p-4">
              Error loading data. Please try again.
            </div>
          ) : (
            <div className="space-y-6">
              {/* Advertisement Section */}
              <div>
                <h3 className="text-sm font-semibold text-midnight mb-4">
                  Advertisement Information
                </h3>
                <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-forth mb-1">Title</p>
                    <p className="px-4 py-2 border border-gray-300 rounded-xl bg-white">
                      {singleAdvertData?.title || 'N/A'}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-forth mb-1">Content</p>
                    <p className="px-4 py-2 border border-gray-300 rounded-xl bg-white min-h-[80px]">
                      {singleAdvertData?.content || 'N/A'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-forth mb-1">Start Date</p>
                      <p className="px-4 py-2 border border-gray-300 rounded-xl bg-white">
                        {formatDate(singleAdvertData?.start_date)}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-forth mb-1">End Date</p>
                      <p className="px-4 py-2 border border-gray-300 rounded-xl bg-white">
                        {formatDate(singleAdvertData?.end_date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div
                      className={`h-4 w-4 rounded ${singleAdvertData?.is_active ? 'bg-primary' : 'bg-gray-300'}`}
                    ></div>
                    <p className="ml-2 text-sm text-forth">
                      {singleAdvertData?.is_active ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Beacon Section */}
              <div>
                <h3 className="text-sm font-semibold text-midnight mb-4">Beacon Information</h3>
                <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-forth mb-1">Name</p>
                    <p className="px-4 py-2 border border-gray-300 rounded-xl bg-white">
                      {singleBeaconData?.name || 'N/A'}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-forth mb-1">Location</p>
                    <p className="px-4 py-2 border border-gray-300 rounded-xl bg-white">
                      {singleBeaconData?.location_name || 'N/A'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-forth mb-1">Major</p>
                      <p className="px-4 py-2 border border-gray-300 rounded-xl bg-white">
                        {singleBeaconData?.major !== undefined ? singleBeaconData.major : 'N/A'}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-forth mb-1">Minor</p>
                      <p className="px-4 py-2 border border-gray-300 rounded-xl bg-white">
                        {singleBeaconData?.minor !== undefined ? singleBeaconData.minor : 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div
                      className={`h-4 w-4 rounded ${singleBeaconData?.status === 'active' ? 'bg-primary' : 'bg-gray-300'}`}
                    ></div>
                    <p className="ml-2 text-sm text-forth">
                      {singleBeaconData?.status
                        ? singleBeaconData.status.charAt(0).toUpperCase() +
                          singleBeaconData.status.slice(1)
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Assignment ID */}
              <div>
                <p className="text-sm font-medium text-forth mb-1">Assignment ID</p>
                <p className="px-4 py-2 border border-gray-300 rounded-xl bg-white text-xs text-gray-600 truncate">
                  {assignment?.assignment_id || 'N/A'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-xl text-white bg-third hover:bg-opacity-80 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignmentModelShow;
