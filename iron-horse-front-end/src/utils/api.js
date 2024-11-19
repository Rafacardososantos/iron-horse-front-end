import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/v1',
    headers: {
        'Content-Type': 'application/json', // Default para JSON
    }
});

// Interceptador para adicionar o cabeçalho de Authorization antes de cada requisição
api.interceptors.request.use(
  (config) => {
    const bearer = localStorage.getItem('accessToken'); // Pega o token do localStorage
    if (bearer) {
      config.headers['Authorization'] = `Bearer ${bearer}`; // Adiciona o token no cabeçalho
    }
    
    // Verifica se o corpo da requisição é um FormData
    if (config.data instanceof FormData) {
      // Remove o 'Content-Type' fixo para permitir que o FormData defina o tipo correto
      delete config.headers['Content-Type']; 
    }
   
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const get = async(url, data) => {
    try{
        const response = await api.get(url, data);
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

export const del = async(url) => {
    try{
        const response = await api.delete(url);
        return response.data;
    }catch(error){
        console.error('Erro ao chamar o DELETE: ', error);
        throw error;
    }
}

export default {
    get,
    post,
    put,
    del
}
