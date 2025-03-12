import { useState, useEffect } from 'react';
import { X, MapPin } from 'lucide-react';

const BeaconModal = ({
  isOpen,
  onClose,
  beacon,
  handleUpdateBeacon,
  show,
  handleAddBeacon,
  mode,
}) => {
  const [formData, setFormData] = useState({
    beacon_id: '',
    name: '',
    location_name: '',
    minor: null,
    major: null,
    signal_strength: null,
    battery_status: null,
    latitude: null,
    longitude: null,
    status: 'Inactive',
  });
  const [errors, setErrors] = useState({});
  const [mapVisible, setMapVisible] = useState(false);

  useEffect(() => {
    if (beacon === null) {
      setFormData({
        name: '',
        location_name: '',
        minor: 0,
        major: 0,
        signal_strength: 0,
        battery_status: 100,
        latitude: 9.0192,
        longitude: 38.7525,
        status: 'Inactive',
      });
    }

    if (beacon) {
      setFormData({
        ...beacon,
      });
    }
  }, [beacon]);

  const handleChange = e => {
    const { name, value, type } = e.target;
    let processedValue = value;

    // Handle numeric fields
    if (['minor', 'major', 'signal_strength', 'latitude', 'longitude'].includes(name)) {
      processedValue = value === '' ? null : Number(value);
    }

    setFormData({
      ...formData,
      [name]: processedValue,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.location_name.trim()) newErrors.location_name = 'Location name is required';

    // Validate coordinates if either is provided
    if (
      (formData.latitude !== null && formData.longitude === null) ||
      (formData.latitude === null && formData.longitude !== null)
    ) {
      newErrors.coordinates = 'Both latitude and longitude must be provided together';
    }

    // Validate latitude range if provided
    if (formData.latitude !== null && (formData.latitude < -90 || formData.latitude > 90)) {
      newErrors.latitude = 'Latitude must be between -90 and 90';
    }

    // Validate longitude range if provided
    if (formData.longitude !== null && (formData.longitude < -180 || formData.longitude > 180)) {
      newErrors.longitude = 'Longitude must be between -180 and 180';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = e => {
    e.preventDefault();
    if (validateForm()) {
      onClose();
      if (mode === 'create' && typeof handleAddBeacon === 'function') {
        handleAddBeacon(formData);
      } else if (mode === 'edit' && typeof handleUpdateBeacon === 'function') {
        handleUpdateBeacon(formData);
      }
    }
  };

  const toggleMapView = () => {
    setMapVisible(!mapVisible);
  };

  const handleMapClick = (lat, lng) => {
    setFormData({
      ...formData,
      latitude: lat,
      longitude: lng,
    });

    // Clear coordinate errors
    if (errors.coordinates || errors.latitude || errors.longitude) {
      const { coordinates, latitude, longitude, ...restErrors } = errors;
      setErrors(restErrors);
    }
  };

  // Simple map preview component
  const MapPreview = () => {
    if (!formData.latitude || !formData.longitude) {
      return (
        <div className="bg-gray-100 rounded-xl p-4 text-center">
          <p className="text-gray-500">No coordinates set</p>
        </div>
      );
    }

    return (
      <div className="bg-gray-100 rounded-xl p-4 h-40 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-8 w-8 text-primary mx-auto" />
            <p className="mt-2 text-sm font-medium">
              {formData.latitude.toFixed(6)}, {formData.longitude.toFixed(6)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-midnight bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between text-forth px-6 py-4">
          <h2 className="text-xl font-semibold text-midnight">
            {beacon?.beacon_id ? 'Edit Beacon' : 'Create Beacon'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-130px)]">
          <form>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-forth mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Beacon name"
                  disabled={show}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              {/* Location Name */}
              <div>
                <label
                  htmlFor="location_name"
                  className="block text-sm font-medium text-forth mb-1"
                >
                  Location Name
                </label>
                <input
                  type="text"
                  id="location_name"
                  name="location_name"
                  value={formData.location_name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors ${
                    errors.location_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Location name"
                  disabled={show}
                />
                {errors.location_name && (
                  <p className="mt-1 text-sm text-red-500">{errors.location_name}</p>
                )}
              </div>

              {/* Minor and Major */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="minor" className="block text-sm font-medium text-forth mb-1">
                    Minor
                  </label>
                  <input
                    type="number"
                    id="minor"
                    name="minor"
                    value={formData.minor === null ? '' : formData.minor}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors pointer-events-none"
                    placeholder="Minor value"
                    disabled={show}
                  />
                </div>
                <div>
                  <label htmlFor="major" className="block text-sm font-medium text-forth mb-1">
                    Major
                  </label>
                  <input
                    type="number"
                    id="major"
                    name="major"
                    value={formData.major === null ? '' : formData.major}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2  pointer-events-none focus:ring-primary focus:border-transparent outline-none transition-colors"
                    placeholder="Major value"
                    disabled={show}
                  />
                </div>
              </div>

              {/* Signal Strength and Battery Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="signal_strength"
                    className="block text-sm font-medium text-forth mb-1"
                  >
                    Signal Strength
                  </label>
                  <input
                    type="number"
                    id="signal_strength"
                    name="signal_strength"
                    value={formData.signal_strength === null ? '' : formData.signal_strength}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl  pointer-events-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                    placeholder="Signal strength"
                    disabled={show}
                  />
                </div>
                <div>
                  <label
                    htmlFor="battery_status"
                    className="block text-sm font-medium text-forth mb-1"
                  >
                    Battery Status
                  </label>
                  <input
                    type="text"
                    id="battery_status"
                    name="battery_status"
                    value={formData.battery_status === null ? '' : formData.battery_status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl  pointer-events-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                    placeholder="Battery status"
                    disabled={show}
                  />
                </div>
              </div>

              {/* Coordinates Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-forth">Coordinates</label>
                  <button
                    type="button"
                    onClick={toggleMapView}
                    className="text-sm text-primary hover:text-primary-dark "
                    disabled={show}
                  >
                    {mapVisible ? 'Hide Map' : 'Show Map'}
                  </button>
                </div>

                {/* Map Preview (simplified) */}
                {mapVisible && <MapPreview />}

                {/* Latitude and Longitude Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                  <div>
                    <label
                      htmlFor="latitude"
                      className="block text-sm font-medium text-forth mb-1  pointer-events-none"
                    >
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="0.000001"
                      id="latitude"
                      name="latitude"
                      value={formData.latitude === null ? '' : formData.latitude}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent  pointer-events-none outline-none transition-colors ${
                        errors.latitude || errors.coordinates ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="-90 to 90"
                      disabled={show}
                    />
                    {errors.latitude && (
                      <p className="mt-1 text-sm text-red-500">{errors.latitude}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="longitude"
                      className="block text-sm font-medium text-forth mb-1"
                    >
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="0.000001"
                      id="longitude"
                      name="longitude"
                      value={formData.longitude === null ? '' : formData.longitude}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary  pointer-events-none focus:border-transparent outline-none transition-colors ${
                        errors.longitude || errors.coordinates
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                      placeholder="-180 to 180"
                      disabled={show}
                    />
                    {errors.longitude && (
                      <p className="mt-1 text-sm text-red-500">{errors.longitude}</p>
                    )}
                  </div>
                </div>
                {errors.coordinates && (
                  <p className="mt-1 text-sm text-red-500">{errors.coordinates}</p>
                )}
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-forth mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                  disabled={show}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
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
            <>
              {beacon?.beacon_id ? (
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-opacity-80 transition-colors"
                >
                  Update
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-opacity-80 transition-colors"
                >
                  Create
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeaconModal;
