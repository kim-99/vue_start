import axios from 'axios';
import qs from 'qs';

const require = axios.create({
    baseURL: '/api/v1',
    timeout: 60000, //超时报错
    withCredentials: true, //跨域时转发cookie信息
});
// Add a request interceptor
require.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
export default require;