import axios from 'axios';
import { Component } from 'react';
import { getUserIdFromToken } from './auth'; // We'll create this utility

export default class PropertyService extends Component {
    constructor() {
        super();
        this.api = axios.create({
            baseURL: 'http://localhost:5000',
            withCredentials: true, // Ensures cookies are sent with requests
        });
    }

    getAllProperties(page, limit) {
        return this.api.get(`/properties?page=${page}&limit=${limit}`);
    }

    getPropertyById(id) {
        return this.api.get(`/properties/${id}`);
    }

    async addProperty(property) {
        try {
            const response = await this.api.post('/properties', property, {
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

    async getPropertyByUserId() {
        try {
            const response = await this.api.get(`/users/properties`);
            return response.data;
        } catch (error) {
            this.handleAuthError(error);
            throw error;
        }
    }

    getBestProperties() {
        return this.api.get('/properties/best');
    }

    getRecentProperties() {
        return this.api.get('/properties/recent');
    }

    async deletePropertyById(propertyId) {
        try {
            const response = await this.api.delete(`/properties/${propertyId}`);
            return response.data;
        } catch (error) {
            this.handleAuthError(error);
            throw error;
        }
    }

    async updateProperty(propertyId, property) {
        try {
            const response = await this.api.put(`/properties/${propertyId}`, property, {
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
