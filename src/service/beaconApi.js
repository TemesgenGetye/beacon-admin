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

    if (!response.ok && response.status !== 204) {
      throw new Error(`Server error: ${response.status}`);
    }

    if (response.status === 204) {
      console.log('Delete successful, no content returned');
      return { success: true }; // Return a simple success object
    }
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

export const fetchBeacons = async () => {
  return fetchAPI('/beacons/');
};

export const fetchBeacon = async id => {
  return fetchAPI(`/beacons/${id}/`);
};

export const createBeacon = async data => {
  console.log('data send to the backend', data);
  return fetchAPI('/beacons/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateBeaconApi = async (id, data) => {
  return fetchAPI(`/beacons/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteBeaconApi = async id => {
  console.log('delete id', id);
  return fetchAPI(`/beacons/${id}/`, {
    method: 'DELETE',
  });
};

export const fetchActiveBeacons = async () => {
  return fetchAPI('/beacons/active/');
};

export const fetchBeaconStatus = async id => {
  return fetchAPI(`/beacons/status/${id}/`);
};

export const updateBeaconStatus = async (id, data) => {
  return fetchAPI(`/beacons/status/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};
