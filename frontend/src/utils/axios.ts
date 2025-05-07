// src/utils/axios.ts
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // URL base do back-end
})

export default axiosInstance
