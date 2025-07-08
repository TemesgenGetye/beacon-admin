const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchAPI = async (endpoint, options = {}) => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const token = localStorage.getItem('accessToken');

    // Prepare headers
    const headers = {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : '',
    };

    // Only set Content-Type to application/json if it's not already set and body is not FormData
    // For FormData, let the browser set the correct Content-Type with boundary
    if (!headers['Content-Type'] && !(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    // Remove Content-Type for FormData to let browser set it automatically
    if (options.body instanceof FormData) {
      delete headers['Content-Type'];
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const text = await response.text();

      // Only handle the specific beacon_id case for 500 errors
      if (response.status === 500 && text.includes('beacon_id')) {
        // Handle FormData differently for error cases
        if (options.body instanceof FormData) {
          const advert = {};
          for (let [key, value] of options.body.entries()) {
            advert[key] = value;
          }
          return { ...advert };
        } else {
          const advert = options.body ? JSON.parse(options.body) : {};
          return { ...advert };
        }
      }
      throw new Error(`Server error: ${response.status} - ${text}`);
    }

    if (response.status === 204) return null;
    return await response.json();
  } catch (error) {
    console.log('Fetch error:', error);
    throw error;
  }
};

// Advertisements
export const fetchAdvertisements = async () => {
  return fetchAPI('/advertisements/');
};

export const fetchAdvertisement = async id => {
  return fetchAPI(`/advertisements/${id}/`);
};

export const createAdvertisement = async data => {
  return fetchAPI('/advertisements/', {
    method: 'POST',
    body: data,
  });
};

export const updateAdvertisement = async data => {
  return fetchAPI(`/advertisements/${data.get('advertisement_id')}/`, {
    method: 'PUT',
    body: data,
  });
};

export const deleteAdvertisement = async id => {
  return fetchAPI(`/advertisements/${id}/`, {
    method: 'DELETE',
  });
};
