// const API_URL = "http://localhost:3000";  // change to your backend URL

// export const loginUser = async (username: string, password: string) => {
//     try {
//         const response = await fetch(`${API_URL}/auth/login`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ username, password }),
//         });

//         if (!response.ok) {
//             throw new Error("Failed to authenticate.");
//         }

//         const data = await response.json();
//         return data;  // which would be { token: "JWT" }
//     } catch (error) {
//         console.error("Login error:", error);
//         throw error;
//     }
// };

import axios from 'axios';

const API_URL = "http://localhost:3000"; // Backend API URL

const api = axios.create({
    baseURL: API_URL,
});

// Add any global headers if needed, such as authorization tokens
// api.defaults.headers.common['Authorization'] = 'Bearer ' + token;

export default api;
