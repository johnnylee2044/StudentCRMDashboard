import axois from 'axios'

const request = axois.create({
  baseURL: '/api',
  timeout: 5000
})

request.interceptors.request.use(config => { 
})

request.interceptors.response.use(response => { 
})  


export {request}