import axios from 'axios';
// import { logOutRedirectCall } from '../config/common';
// import Constatnt from '../config/constant';

const AxiosClientApi = axios.create({
    baseURL: 'http://localhost:3020/api/',
    headers: {
        'api-key': 'jjFw+evMyUR8xWdNPDYbiE/PatTD65VveA44Rg18FC0=',
        'Accept-Language': 'en',
        'Content-Type': 'application/json',
        // "Content-Type": "multipart/form-data",
    }
});

// // request AxiosClient
// AxiosClientApi.interceptors.request.use(function (request) {
//     request.headers['token'] = localStorage.getItem("token");
//     console.log(' ********** Client User Token **********  ', request.headers['token']);
//     return request;
// });

// Response AxiosClient
AxiosClientApi.interceptors.response.use(
    function (response) {
        // console.log('Api Response By Client  ======> ', response);
        return response.data;
    },
    function (error) {
        if (error.response !== undefined && error.response !== "" && error.response.data.code) {
            // console.log('Api Response By Client  ======> ', error.response.data);
            return error.response.data;
        } else {
            return Promise.reject(error);
        }
    }
);

export default AxiosClientApi;
