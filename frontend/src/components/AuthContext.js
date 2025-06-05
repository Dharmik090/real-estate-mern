import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isLoggedIn: false,
        user: null,
        loading: true
    });

    const validateSession = async () => {
        try {
            const response   = await axios.get('http://localhost:5000/validate', {
                withCredentials: true
            });
            setAuthState({
                isLoggedIn: response.data.valid,
                user: response.data.user,
                loading: false
            });
        } catch (error) {
            setAuthState({
                isLoggedIn: false,
                user: null,
                loading: false
            });
        }
    };

    const login = async (credentials) => {
        try {
            await axios.post('http://localhost:5000/login', credentials, {
                withCredentials: true
            });
            await validateSession();
            return true;
        } catch (error) {
            return false;
        }
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:5000/logout', {}, {
                withCredentials: true
            });
            setAuthState({
                isLoggedIn: false,
                user: null,
                loading: false
            });

            return true;
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    useEffect(() => {
        validateSession();
    }, []);

    return (
        <AuthContext.Provider value={{
            ...authState,
            login,
            logout,
            validateSession
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);