import axios from 'axios';

const api = axios.create({
    baseURL: 'http://88.200.63.148:6869',
    timeout: 2000
})

export default api;