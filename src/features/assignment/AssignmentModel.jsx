import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { advertData, advertError, advertLoading } from '../../Redux/slices/advertSlice';
import { beaconData, beaconError, beaconLoading } from '../../Redux/slices/beaconSlice';
import { getBeacons } from '../../Redux/thunks/beaconThunk';
import { getAdverts } from '../../Redux/thunks/advertThunk';

export default function CreateAssignmentModal({
  isOpen,
  onClose,
  onCreateAssignment,
  onUpdateAssignment,
  assignment = null,
  mode = 'create',
  show = false,
}) {
  const dispatch = useDispatch();

  // Form data state
  const [formData, setFormData] = useState({
    beacon_id: '',
    advertisement_id: '',
    start_date: new Date(),
    end_date: new Date(),
  });

  const [errors, setErrors] = useState({});

  const adverts = useSelector(advertData);
  const isLoadingAdverts = useSelector(advertLoading);
  const errorAdverts = useSelector(advertError);
  const beacons = useSelector(beaconData);
  const isLoadingBeacons = useSelector(beaconLoading);
  const errorBeacons = useSelector(beaconError);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(getAdverts());
    dispatch(getBeacons());
  }, [dispatch]);

  useEffect(() => {
    if (assignment === null) {
      setFormData({
        beacon_id: '',
        advertisement_id: '',
        start_date: new Date(),
        end_date: new Date(),
      });
    } else if (assignment) {
      setFormData({
        ...assignment,
        start_date: assignment.start_date ? new Date(assignment.start_date) : new Date(),
        end_date: assignment.end_date ? new Date(assignment.end_date) : new Date(),
      });
    }
  }, [assignment]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date,
    });

    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const now = new Date();

    if (!formData.beacon_id) newErrors.beacon_id = 'Beacon is required';
    if (!formData.advertisement_id) newErrors.advertisement_id = 'Advertisement is required';
    if (!formData.start_date) newErrors.start_date = 'Start date is required';
    else if (formData.start_date < now) newErrors.start_date = 'Start date cannot be in the past';
    if (!formData.end_date) newErrors.end_date = 'End date is required';
    else if (formData.end_date <= formData.start_date)
      newErrors.end_date = 'End date must be after start date';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      const assignmentData = {
        beacon: formData.beacon_id,
        advertisement: formData.advertisement_id,
        // start_date: formData.start_date,
        // end_date: formData.end_date,
      };

      if (typeof onCreateAssignment === 'function' && mode === 'edit') {
        onUpdateAssignment(assignmentData);
      }
      if (typeof onCreateAssignment === 'function' && mode === 'create') {
        onCreateAssignment(assignmentData);
      }

      onClose();
    }
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  // Loading state
  if (isLoadingAdverts || isLoadingBeacons) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-midnight bg-opacity-50 backdrop-blur-sm"></div>
        <div className="relative bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (errorAdverts || errorBeacons) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-midnight bg-opacity-50 backdrop-blur-sm"></div>
        <div className="relative bg-white rounded-xl shadow-lg p-6 max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-midnight">Error</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-sm text-red-700">{errorAdverts || errorBeacons}</p>
          </div>
          <div className="flex justify-end mt-4">
            <button
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
          <h2 className="text-xl font-semibold text-midnight">
            {mode === 'edit' ? 'Edit Assignment' : 'Create Assignment'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-130px)]">
          <form>
            <div className="space-y-6">
              {/* Beacon Selection */}
              <div>
                <label htmlFor="beacon_id" className="block text-sm font-medium text-forth mb-1">
                  Beacon
                </label>
                <select
                  id="beacon_id"
                  name="beacon_id"
                  value={formData.beacon_id}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors ${
                    errors.beacon_id ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={show}
                >
                  <option value="">Select a beacon</option>
                  {beacons?.map(beacon => (
                    <option key={beacon.beacon_id} value={beacon.beacon_id}>
                      {beacon.name} - {beacon.location_name}
                    </option>
                  ))}
                </select>
                {errors.beacon_id && (
                  <p className="mt-1 text-sm text-red-500">{errors.beacon_id}</p>
                )}
              </div>

              {/* Advertisement Selection */}
              <div>
                <label
                  htmlFor="advertisement_id"
                  className="block text-sm font-medium text-forth mb-1"
                >
                  Advertisement
                </label>
                <select
                  id="advertisement_id"
                  name="advertisement_id"
                  value={formData.advertisement_id}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors ${
                    errors.advertisement_id ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={show}
                >
                  <option value="">Select an advertisement</option>
                  {adverts?.map(ad => (
                    <option key={ad.advertisement_id} value={ad.advertisement_id}>
                      {ad.title}
                    </option>
                  ))}
                </select>
                {errors.advertisement_id && (
                  <p className="mt-1 text-sm text-red-500">{errors.advertisement_id}</p>
                )}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Start Date */}
                <div>
                  <label htmlFor="start_date" className="block text-sm font-medium text-forth mb-1">
                    Start Date
                  </label>
                  <div
                    className={`relative ${errors.start_date ? 'border-red-500 rounded-xl' : ''}`}
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <DatePicker
                      selected={formData.start_date}
                      onChange={date => handleDateChange(date, 'start_date')}
                      className={`w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors ${
                        errors.start_date ? 'border-red-500' : 'border-gray-300'
                      }`}
                      dateFormat="yyyy-MM-dd"
                      disabled={show}
                    />
                  </div>
                  {errors.start_date && (
                    <p className="mt-1 text-sm text-red-500">{errors.start_date}</p>
                  )}
                </div>

                {/* End Date */}
                <div>
                  <label htmlFor="end_date" className="block text-sm font-medium text-forth mb-1">
                    End Date
                  </label>
                  <div className={`relative ${errors.end_date ? 'border-red-500 rounded-xl' : ''}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <DatePicker
                      selected={formData.end_date}
                      onChange={date => handleDateChange(date, 'end_date')}
                      className={`w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors ${
                        errors.end_date ? 'border-red-500' : 'border-gray-300'
                      }`}
                      dateFormat="yyyy-MM-dd"
                      minDate={formData.start_date}
                      disabled={show}
                    />
                  </div>
                  {errors.end_date && (
                    <p className="mt-1 text-sm text-red-500">{errors.end_date}</p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-xl text-white bg-third hover:bg-opacity-80 mr-3 transition-colors"
          >
            Cancel
          </button>

          {!show && (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-opacity-80 transition-colors"
            >
              {mode === 'edit' ? 'Update' : 'Create'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
