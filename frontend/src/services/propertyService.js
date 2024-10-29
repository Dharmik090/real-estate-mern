import { Component } from 'react';
import axios from 'axios';

export default class propertyService extends Component {
    constructor(){
        super();
        this.URL = 'http://localhost:5000';
    }

    getAllProperties(){
        const requestUrl = this.URL + '/properties';
        return axios.get(requestUrl);
    }

    getPropertyById(id){
        const requestUrl = this.URL + '/property/' + id;
        return axios.get(requestUrl);
    }

    addProperty(userid,property){
        const requestUrl = this.URL + '/property/' + userid;
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        }

        return axios.post(requestUrl, property, { headers });
    }

    getPropertyByUserId(userid){
        const requestUrl = this.URL + '/user/property/' + userid;
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

        return axios.get(requestUrl, { headers });
    }

    getBestProperties(){
        const requestUrl = this.URL + '/best/property';
        return axios.get(requestUrl);
    }


    getRecentProperties(){
        const requestUrl = this.URL + '/recent/property';
        return axios.get(requestUrl);
    }


    deletePropertyById(propertyId) {
        const requestUrl = this.URL + '/property/' + propertyId;
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }

        return axios.delete(requestUrl, { headers });
    }


    updateProperty(propertyId, property) {
        const requestUrl = this.URL + '/property/' + propertyId;
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        };

        return axios.put(requestUrl, property, { headers })
    }

}