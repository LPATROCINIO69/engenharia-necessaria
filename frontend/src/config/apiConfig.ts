const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default {
  register: `${API_BASE_URL}/api/register`,
  login: `${API_BASE_URL}/api/login`,
  // outros endpoints...
};