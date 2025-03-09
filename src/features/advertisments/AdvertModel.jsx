import { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AdvertModal = ({
  isOpen,
  onClose,
  advert,
  handleUpdateAdvert,
  show,
  handleAddAdvert,
  mode,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    start_date: new Date(),
    end_date: new Date(),
    is_active: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (advert === null) {
      setFormData({
        title: '',
        content: '',
        start_date: new Date(),
        end_date: new Date(),
        is_active: false,
      });
    }

    if (advert) {
      setFormData({
        ...advert,
        start_date: advert.start_date ? new Date(advert.start_date) : new Date(),
        end_date: advert.end_date ? new Date(advert.end_date) : new Date(),
      });
    }
  }, [advert]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Clear error when field is edited
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

    // Clear error when date is changed
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
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.start_date) newErrors.start_date = 'Start date is required';
    else if (formData.start_date < now) newErrors.start_date = 'Start date cannot be in the past';
    if (!formData.end_date) newErrors.end_date = 'End date is required';
    else if (formData.end_date <= formData.start_date)
      newErrors.end_date = 'End date must be after start date';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = e => {
    e.preventDefault();
    if (validateForm()) {
      onClose();
      if (mode === 'create' && typeof handleAddAdvert === 'function') {
        handleAddAdvert(formData);
      } else if (mode === 'edit' && typeof handleUpdateAdvert === 'function') {
        handleUpdateAdvert(formData);
      }
    }
  };

  if (!isOpen) return null;

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
            {advert?.advertisement_id ? 'Edit Advertisement' : 'Create Advertisement'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-130px)]">
          <form>
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-forth mb-1">
                  Titles
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Advertisement title"
                  disabled={show}
                />
                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-forth mb-1">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors ${
                    errors.content ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Advertisement content"
                  disabled={show}
                ></textarea>
                {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
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

              {/* Active Status */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                  className="h-4 w-4 text-azure focus:ring-azure border-gray-300 rounded"
                  disabled={show}
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-forth">
                  Active
                </label>
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
              {advert?.advertisement_id ? (
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

export default AdvertModal;
