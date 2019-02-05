import axios from 'axios'
import store from '../store/index'

const axiosInstance = axios.create({
  baseURL: 'https://localhost:5000/api'
})

axiosInstance.interceptors.response.use(response => response, error =>{
  if(error.response.status === 401){
    store.dispatch('logout');
  }
})

export default axiosInstance