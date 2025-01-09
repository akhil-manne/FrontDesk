// src/services/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your backend's URL.

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        return response.data; // Return the response data (JWT token, user data, etc.)
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};
