// utils/auth.js
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // You'll need to install this package

export const getUserIdFromToken = () => {
    try {
        // 1. Get the token from cookies
        const token = Cookies.get('authToken'); // Adjust cookie name as needed

        console.log(-1, token)
        if (!token) {
            return null;
        }

        // 2. Decode the token to get user ID
        const decoded = jwtDecode(token);
        return decoded.id || decoded.sub; // Adjust based on your token structure
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};