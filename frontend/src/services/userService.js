import { Component } from 'react';
import axios from 'axios';

export default class userServices extends Component {
    constructor() {
        super();
        this.URL = 'http://localhost:5000';
    }

    addUser(user) {
        console.log(user);
        const requestUrl = this.URL + '/user';
        return axios.post(requestUrl, user, {
            headers: {
                'Content-Type': 'multipart/form-data' // Optional, axios sets this automatically
            }
        });
    }

    userLogIn(user) {
        const requestUrl = this.URL + '/login';
        return axios.post(requestUrl, user);
    }

    getUserById(userid) {
        const requestUrl = this.URL + `/user/${userid}`;
        return axios.get(requestUrl);
    }
}