// Lib imports
import axios from 'axios'

// Sets the default url used by all of this axios instance's requests
axios.defaults.baseURL = 'http://154.49.211.66:4000/api'

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}
