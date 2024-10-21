import { Component } from 'react';
import axios from 'axios';

export default class userServices extends Component {
    constructor() {
        super();
        this.URL = 'http://localhost:5000';
    }

    addUser(user) {
        const requestUrl = this.URL + '/user';
        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        return axios.post(requestUrl, user, { headers });
    }

    userLogIn(user) {
        const requestUrl = this.URL + '/login';
        return axios.post(requestUrl, user);
    }

    getUserById(userid) {
        const requestUrl = this.URL + `/user/${userid}`;
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

        return axios.get(requestUrl, { headers });
    }

    updateUser(userid, user) {
        const requestUrl = this.URL + `/user/${userid}`;
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }

        return axios.put(requestUrl, user, { headers });
    }
}