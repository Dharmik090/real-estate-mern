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

    addProperty(property, userid, authToken){
        const requestUrl = this.URL + `/property/${userid}`;
        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

        return axios.post(requestUrl, data, { headers });
    }

    getPropertyByUserId(userid){
        const requestUrl = this.URL + `/property/${userid}`;
        return axios.get(requestUrl);
    }

}