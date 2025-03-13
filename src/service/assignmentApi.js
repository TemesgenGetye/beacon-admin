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

// Assignments
export const fetchAssignments = async () => {
  return fetchAPI('/advertisements/assignments/');
};

export const fetchAdvertWithBeacons = async () => {
  return fetchAPI(`/advertisements-with-beacons/`);
};

export const createAssignmentApi = async data => {
  console.log('data send to the backend', data);
  return fetchAPI('/advertisements/assignments/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateAssignmentApi = async data => {
  console.log('data send to the backend', data);
  return fetchAPI(`/advertisements/assignments/${data.beacon_id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteAssignmentApi = async id => {
  return fetchAPI(`/advertisements/assignments/${id}/`, {
    method: 'DELETE',
  });
};
