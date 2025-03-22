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

export const fetchToken = async data => {
  return fetchAPI('/token/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const fetchRefresh = async data => {
  return fetchAPI('/token/refresh/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
