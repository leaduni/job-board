import axios from 'axios';

const API_URL = import.meta.env.VITE_CORE_API_URL;

export async function uploadCV(file) {
  const formData = new FormData();
  formData.append('file', file);

  const token = localStorage.getItem('authToken');

  const response = await axios.post(`${API_URL}/api/upload/cv`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': token ? `Bearer ${token}` : '',
    },
  });

  return response.data;
}
