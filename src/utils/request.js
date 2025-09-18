import axios from 'axios'
import BASEURL from '@/constants'
import Cookies from 'js-cookie'
const request = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000
})

request.interceptors.request.use(config => { 
  console.log("it is printed in request interceptor",config.url)
    if(config.url!=='api/auth/login'){
      const token=Cookies.get('token')
      if(token){
        console.log("it is printed",token)
        config.headers.Authorization=`Bearer ${token}`
      }
      else{
        window.location.href='/login'
        return Promise.reject(new Error('Please login again'))
      }
    }
  
  return config
})

request.interceptors.response.use(response => { 
  return response
})  


export default request