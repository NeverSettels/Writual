import axios from 'axios'
const baseURL = 'http://localhost:3000'

class ApiService {
  constructor() {
    this.service = axios.create({
      baseURL,
      withCredentials: true
    })
  }
  newPost(data, to) {
    return this.service.post(`/${to}`, data)
  }
}

export default ApiService
