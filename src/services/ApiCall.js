import axios from 'axios';

export const ApiCall = async (body, method, path) => {
    try {
        if (body == '') {
            body = undefined;
        }
        console.log(body, method, path);
        const response = await axios[method.toLowerCase()]('http://localhost:3020/api/v1/' + path, body, {
            headers: {
                'api-key': 'jjFw+evMyUR8xWdNPDYbiE/PatTD65VveA44Rg18FC0=',
                'Accept-Language': 'en',
                'Content-Type': 'application/json'
            }
        });

        console.log('Api Response By Client  ======>', response.data);
        return response.data;
    } catch (error) {
        if (error.response !== undefined && error.response !== "" && error.response.data.code) {
            console.log('Api Response By Client  ======> ', error.response.data);
            return error.response.data;
        } else {
            console.warn('Axios Error:', error);
            throw error;
        }
    }
};