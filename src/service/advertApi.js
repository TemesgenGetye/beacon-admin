const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchAPI = async (endpoint, options = {}) => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.log('Server Response:', text);
      if (response.status === 500 && text.includes('beacon_id')) {
        // Assume success despite 500 (server bug)
        const advert = options.body ? JSON.parse(options.body) : {};
        return { ...advert }; // Return the sent data
      }
      throw new Error(`Server error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log('error', error);
    throw new Error('Server error');
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
  console.log('data send to the backend', data);
  return fetchAPI('/advertisements/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateAdvertisement = async (id, data) => {
  console.log('data send to the backend', data);
  console.log('data id', id);
  return fetchAPI(`/advertisements/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteAdvertisement = async id => {
  console.log('deleted id send to the backend', id);
  return fetchAPI(`/advertisements/${id}/`, {
    method: 'DELETE',
  });
};
