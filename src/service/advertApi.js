const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchAPI = async (endpoint, options = {}) => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
      },
    });

    if (!response.ok) {
      const text = await response.text();

      if (response.status === 500 && text.includes('beacon_id')) {
        const advert = options.body ? JSON.parse(options.body) : {};
        return { ...advert };
      }
      throw new Error(`Server error: ${response.status} - ${text}`);
    }

    if (response.status === 204) return null;
    return await response.json();
  } catch (error) {
    console.log('error', error);
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
