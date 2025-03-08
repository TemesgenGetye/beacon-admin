const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log('BASE_URL', BASE_URL);

const fetchAPI = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  return response.json();
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
    body: JSON.stringify(data),
  });
};
