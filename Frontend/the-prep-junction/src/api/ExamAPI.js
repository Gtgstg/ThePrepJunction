import axios from 'axios';

const API_BASE_URL = 'http://13.126.195.239:3600'; // Replace with your actual backend API URL

const examApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
    // Add any additional headers here
  }
});

export const searchExamsApi = (query) => {
  return examApi.get(`/exams/search?q=${query}`);
};

// Add more API functions as needed

export default examApi;