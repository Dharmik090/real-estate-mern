import { createContext, useContext, useEffect, useState } from 'react';
import userService from '../services/userService';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isLoggedIn: false,
        user: null,
        loading: true
    });

    const validateSession = async () => {
        try {
            const response = await new userService().userValidate();

            setAuthState({
                isLoggedIn: response.valid,
                user: response.user,
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
        const response = await new userService().userLogIn(credentials);
        if (response.success === false) {
            return { success: false, message: response.message };
        }

        await validateSession();
        return { success: true };
    };

    const logout = async () => {
        try {
            await new userService().userLogout();
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