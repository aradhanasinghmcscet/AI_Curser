const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api',
  ENDPOINTS: {
    REGISTER: '/register',
    // Add other endpoints here
  }
};

export default API_CONFIG; 