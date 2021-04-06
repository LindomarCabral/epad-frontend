import axios from 'axios'

export default ({app, router, Vue}) => {
  axios.defaults.baseURL = "http://191.252.193.209:3333/v1"
  Vue.prototype.$axios = axios
}
