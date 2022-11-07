import axios from 'axios'
import Cookies from 'js-cookie'
const getToken = Cookies.get("accessToken");
const api = axios.create({
     baseURL: 'http://localhost:8080/api'

})

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
