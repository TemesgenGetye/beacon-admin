const API_BASE_URL = 'https://api.example.com/api/v1';

// Helper function for making API requests
const fetchAPI = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  // Get auth token from localStorage
  const token = localStorage.getItem('authToken');

  // Add authorization header if token exists
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
      throw new Error('Session expired. Please login again.');
    }
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
};

// Logs
export const fetchLogs = async () => {
  return fetchAPI('/logs/');
};

export const fetchLog = async id => {
  return fetchAPI(`/logs/${id}/`);
};

export const createLog = async data => {
  return fetchAPI('/logs/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateLog = async (id, data) => {
  return fetchAPI(`/logs/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteLog = async id => {
  return fetchAPI(`/logs/${id}/`, {
    method: 'DELETE',
  });
};

export const fetchLogCount = async () => {
  return fetchAPI('/logs/count/');
};

// Messages
export const fetchMessages = async () => {
  return fetchAPI('/messages/');
};

export const fetchMessage = async id => {
  return fetchAPI(`/messages/${id}/`);
};

export const createMessage = async data => {
  return fetchAPI('/messages/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateMessage = async (id, data) => {
  return fetchAPI(`/messages/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteMessage = async id => {
  return fetchAPI(`/messages/${id}/`, {
    method: 'DELETE',
  });
};
