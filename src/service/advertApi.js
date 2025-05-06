const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchAPI = async (endpoint, options = {}) => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const token = localStorage.getItem('accessToken');
    console.log('Token:', token); // Debugging: Check if token is retrieved

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.log('Response error text:', text); // Debugging: Log the error response

      if (response.status === 500 && text.includes('beacon_id')) {
        const advert = options.body ? JSON.parse(options.body) : {};
        return { ...advert };
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
  console.log('Creating advertisement with data:', data); // Debugging: Log the data being sent

  return fetchAPI('/advertisements/', {
    method: 'POST',
    body: data,
  });
};

export const updateAdvertisement = async data => {
  return fetchAPI(`/advertisements/${data.get('advertisement_id')}`, {
    method: 'PUT',
    body: data,
  });
};

export const deleteAdvertisement = async id => {
  return fetchAPI(`/advertisements/${id}/`, {
    method: 'DELETE',
  });
};
