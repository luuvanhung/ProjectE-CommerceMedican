import axios from 'axios'
import Cookies from 'js-cookie'
const getToken = Cookies.get("accessToken");
const api = axios.create({
    baseURL: 'http://localhost:8080/api'
})
const API_URL = 'http://localhost:8080/api'
export const URL_UPLOAD = API_URL + '/'

api.interceptors.request.use(
    (config: any) => {
        if (getToken) {
            config.headers['Authorization'] = `${getToken}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default api
