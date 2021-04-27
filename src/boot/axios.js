import axios from 'axios'

export default ({app, router, Vue}) => {
  axios.defaults.baseURL = "http://127.0.0.1:3333/v1"
  Vue.prototype.$axios = axios
}
