const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiConfig =  {
  register: `${API_BASE_URL}/api/register`,
  login: `${API_BASE_URL}/api/login`,
  
  // outros endpoints...
  opportunities: `${API_BASE_URL}/api/opportunities`,
  states: `${API_BASE_URL}/api/states`,
  engineering:`${API_BASE_URL}/api/engineering`,
  cities:`${API_BASE_URL}/api/cities`

};