import axios from 'axios';
import { Component } from 'react';

export default class PropertyService extends Component {
    constructor() {
        super();
        this.api = axios.create({
            baseURL: 'http://localhost:5000',
            // baseURL: 'https://real-estate-mern-backend-7iui.onrender.com',
            withCredentials: true,
        });
    }

    async getAllProperties(page, limit) {
        const response = await this.api.get(`/properties?page=${page}&limit=${limit}`);
        return response.data;
    }

    async getPropertyById(id) {
        const response = await this.api.get(`/properties/${id}`);
        return response.data;
    }

    async addProperty(property) {
        const response = await this.api.post('/properties', property, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    }

    async getPropertyByUserId() {
        const response = await this.api.get('/users/properties');
        return response.data;
    }

    async getBestProperties() {
        const response = await this.api.get('/properties/best');
        return response.data;
    }

    async getRecentProperties() {
        const response = await this.api.get('/properties/recent');
        return response.data;
    }

    async getPropertiesBySearch(query) {
        const response = await this.api.get(`/properties/search?${query.toString()}`);
        return response.data;
    }

    async deletePropertyById(propertyId) {
        const response = await this.api.delete(`/properties/${propertyId}`);
        return response.data;
    }

    async updateProperty(propertyId, property) {
        const response = await this.api.put(`/properties/${propertyId}`, property, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
}