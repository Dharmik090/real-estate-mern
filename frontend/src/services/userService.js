import axios from 'axios';
import { Component } from 'react';

export default class UserService extends Component {
    constructor() {
        super();
        this.api = axios.create({
            // baseURL: 'http://localhost:5000',
            baseURL: 'https://real-estate-mern-backend-7iui.onrender.com',
            withCredentials: true,
        });
    }

    async addUser(user) {
        const response = await this.api.post('/users', user, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    }

    async userLogIn(user) {
        const response = await this.api.post('/login', user);
        return response.data;
    }

    async userValidate() {
        // console.log('[userValidate] -1')
        const response = await this.api.get('/validate');
        return response.data;

    }

    async userLogout() {
        const response = await this.api.post('/logout');
        return response.data;
    }

    async getProfile() {
        const response = await this.api.get('/users');
        return response.data;
    }

    async updateProfile(user) {
        const response = await this.api.put('/users', user, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        return response.data;
    }
}