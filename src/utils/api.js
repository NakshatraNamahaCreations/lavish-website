import axios from 'axios';

// export const API_BASE_URL = 'http://localhost:5000/api';
export const API_BASE_URL = 'https://api.lavisheventzz.com/api';


export const getAuthToken = () => {
  return sessionStorage.getItem('accessToken');
};


export const getAuthAxios = () => {
  const token = getAuthToken();
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    withCredentials: true
  });
};


export const getUploadAxios = () => {
  const token = getAuthToken();
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    withCredentials: true
  });
};

export const getAxios = () => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
};

export default {
  getAuthToken,
  getAuthAxios,
  getUploadAxios,
  getAxios
}; 