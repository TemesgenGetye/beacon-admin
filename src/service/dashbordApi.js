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

export const fetchBeaconCount = async () => {
  return fetchAPI('/dashboards/count/');
};
export const fetchLocationCount = async () => {
  return fetchAPI('/dashboards/location-count/');
};
export const fetchLogCount = async () => {
  return fetchAPI('/dashboards/log-count/');
};
export const fetchMessageCount = async () => {
  return fetchAPI('/dashboards/message-count/');
};
