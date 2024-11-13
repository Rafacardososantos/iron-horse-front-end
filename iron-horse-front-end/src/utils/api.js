import axios from 'axios';

const api = axios.create({
    baseURL: 'https://iron-horse-api-production.up.railway.app/v1/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const get = async(url) => {
    try{
        const response = await api.get(url);
        return response.data;
    }catch(error){
        console.error('Erro ao chamar o GET: ', error);
        throw error;
    }
}

export const post = async(url, data) => {
    try{
        const response = await api.post(url, data);
        return response.data;
    }catch(error){
        console.error('Erro ao chamar o POST: ', error);
        throw error;
    }
}

export const put = async(url, data) => {
    try{
        const response = await api.put(url, data);
        return response.data;
    }catch(error){
        console.error('Erro ao chamar o PUT: ', error);
        throw error;
    }
}

export const del = async(url) =>{
    try{
        const response = await api.delete(url);
        return response.data;
    }catch(error){
        console.error('Erro ao chamar o DELETE: ', error);
        throw error;
    }
}

export default{
    get,
    post,
    put,
    del
}