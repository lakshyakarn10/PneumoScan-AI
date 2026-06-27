import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

/**
 * Sends a Chest X-ray image to the backend to predict whether pneumonia is present.
 * @param {File} file - The chest X-ray image file.
 * @returns {Promise<Object>} The API prediction response.
 */
export const predictPneumonia = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post('/predict', formData);
  return response.data;
};
