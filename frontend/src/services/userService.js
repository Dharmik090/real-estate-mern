import axios from 'axios';
import { Component } from 'react';
import { getUserIdFromToken } from './auth'; // We'll create this utility

export default class UserService extends Component {
    constructor() {
        super();
        this.api = axios.create({
            // baseURL: 'http://localhost:5000',
            baseURL: 'https://real-estate-mern-backend-7iui.onrender.com',
            withCredentials: true, // Ensures cookies are sent with requests
        });;
    }

    addUser(user) {
        return this.api.post('/users', user, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    userLogIn(user) {
        return this.api.post('/login', user);
    }
    
    userValidate() {
        const response = this.api.get('/validate')
        return response;
    }

    userLogout() {
        return this.api.post('/logout', {
            withCredentials: true
        }).data;
    }



    async getProfile() {
        // const userId = await getUserIdFromToken();

        // if (!userId) {
        //     throw new Error('User not authenticated');
        // }

        try {
            // const response = await this.api.get(`/users/${userId}`);
            const response = await this.api.get(`/users`);
            return response.data;
        } catch (error) {
            this.handleAuthError(error);
            throw error;
        }
    }

    async updateProfile(user) {
        try {
            const response = await this.api.put('/users', user, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            this.handleAuthError(error);
            throw error;
        }
    }

    handleAuthError(error) {
        if (error.response?.status === 401) {
            // Token expired or invalid
            window.location.href = '/login';
        }
    }
}
