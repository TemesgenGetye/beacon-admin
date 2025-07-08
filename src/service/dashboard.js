// /api/v1/dashboards/clicks-per-day/
// /api/v1/dashboards/count/
// /api/v1/dashboards/hot-ads/
// /api/v1/dashboards/impressions-per-day/
// /api/v1/dashboards/location-count/
// /api/v1/dashboards/log-count/
// /api/v1/dashboards/message-count/

const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchAPI = async (endpoint, options = {}) => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const token = localStorage.getItem('accessToken');
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok && response.status !== 204) {
      throw new Error(`Server error: ${response.status}`);
    }

    if (response.status === 204) {
      return { success: true }; // Return a simple success object
    }
    if (!response.ok) {
      const text = await response.text();

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

export const fetchClicksPerDay = async () => {
  return fetchAPI('/dashboards/clicks-per-day/');
};

export const fetchTotalBeaconCount = async () => {
  return fetchAPI('/dashboards/count/');
};

export const fetchHotAds = async () => {
  return fetchAPI('/dashboards/hot-ads/');
};

export const fetchImpressionsPerDay = async () => {
  return fetchAPI('/dashboards/impressions-per-day/');
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
