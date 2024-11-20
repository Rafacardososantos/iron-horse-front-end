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

// Interceptor para lidar com erros de expiração do token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status === 401 && error.response.data.message === 'Token expired') {
        try {
          // Faz a chamada para refresh token
          const refreshToken = localStorage.getItem('refreshToken');
          const response = await axios.post(`${baseURL}auth/refresh`, { refreshToken });
  
          // Atualiza os tokens no localStorage
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
  
          // Refaz a requisição original com o novo token
          error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return api.request(error.config);
        } catch (refreshError) {
          console.error('Erro ao atualizar o token:', refreshError);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login'; // Redireciona para o login
        }
      }
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
