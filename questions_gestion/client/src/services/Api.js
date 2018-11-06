import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: 'http://esir-mobile.codeassist.io/api'
  })
}
