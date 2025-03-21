import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
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
    image: null,
    imagePreview: null,
    is_active: false,
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (advert === null) {
      setFormData({
        title: '',
        content: '',
        image: null,
        imagePreview: null,
        is_active: false,
      });
    }

    if (advert) {
      setFormData({
        ...advert,
        image: null, // New image will be null unless changed
        imagePreview: advert.image_url || null, // Assuming your advert object has an image_url
      });
    }
  }, [advert]);

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

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        image: file,
        imagePreview: previewUrl,
      });
      if (errors.image) {
        setErrors({
          ...errors,
          image: null,
        });
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.image && !formData.imagePreview && mode === 'create')
      newErrors.image = 'Image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = e => {
    e.preventDefault();
    if (validateForm()) {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('content', formData.content);
      submitData.append('is_active', formData.is_active.toString());
      if (formData.image) {
        submitData.append('media_file', formData.image);
      }
      onClose();
      if (mode === 'create' && typeof handleAddAdvert === 'function') {
        handleAddAdvert(submitData);
      } else if (mode === 'edit' && typeof handleUpdateAdvert === 'function') {
        submitData.append('advertisement_id', advert.advertisement_id);
        handleUpdateAdvert(submitData);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-midnight bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between text-forth px-6 py-4">
          <h2 className="text-xl font-semibold text-midnight">
            {advert?.advertisement_id ? 'Edit Advertisement' : 'Create Advertisement'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-130px)]">
          <form>
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-forth mb-1">
                  Title
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

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-forth mb-1">
                  Image
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Upload Box */}
                  <div className="relative">
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                      disabled={show}
                      ref={fileInputRef}
                    />

                    <div
                      onClick={() => !show && triggerFileInput()}
                      className={`border-2 border-dashed rounded-xl h-[180px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors ${
                        errors.image ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-500"
                          >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-gray-700">Click to upload</p>
                        <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                      </div>
                    </div>
                  </div>

                  {/* Preview Box */}
                  <div className="border rounded-xl p-2 flex items-center justify-center bg-gray-50 h-[180px]">
                    {formData.imagePreview ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={formData.imagePreview || '/placeholder.svg'}
                          alt="Preview"
                          className="max-w-full h-auto rounded-lg max-h-[160px] object-contain"
                        />
                        {!show && (
                          <button
                            type="button"
                            className="absolute top-2 right-2 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                            onClick={e => {
                              e.preventDefault();
                              setFormData({ ...formData, image: null, imagePreview: null });
                            }}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mb-2"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        <p className="text-sm">No image preview</p>
                      </div>
                    )}
                  </div>
                </div>

                {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
              </div>

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
