import axios from 'axios'
const API_URL = 'http://192.168.100.216:7000/correctEnem';
const api = axios.create({
    baseURL: API_URL
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }


)


api.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config;
        const rotasPublicas = ['/auth/login', '/auth/register'];
        const isRotaPublica = rotasPublicas.includes(originalRequest.url);
        if (error.response.status == 401 && !originalRequest._retry && !isRotaPublica) {
            originalRequest._retry = true

            try {
                const oldRefreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post(`${API_URL}/auth/refresh-token`, {
                    requestToken: oldRefreshToken
                });
                const { accessToken, refreshToken: newRefreshToken } = response.data;

                localStorage.setItem('token', accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);

                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Falha na rotação do token. Limpando credenciais...');
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');

                window.location.href = '/login';
                return Promise.reject(refreshError);
    
            }

        }
        return Promise.reject(error);
    }

)
export default api;