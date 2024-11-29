import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API base URL
});

export const fetchArtworks = async () => {
  try {
    const response = await api.get('/artworks');
    return response.data;
  } catch (error) {
    console.error('Error fetching artworks:', error);
    throw error;
  }
};