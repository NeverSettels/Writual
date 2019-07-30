import axios from 'axios'
const baseURL = 'https://writual.herokuapp.com'

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
