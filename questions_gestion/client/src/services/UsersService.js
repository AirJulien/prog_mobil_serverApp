import Api from '@/services/Api'

export default {
  fetchUsers () {
    return Api.get('/users')
  },
  fetchOneUser (id) {
    return Api.get('/users/' + id)
  },
  deleteUser (id) {
    return Api.get('/users/delete/' + id)
  },
  updateUser (params) {
    return Api.post('/users/update/' + params.id, params)
  },
  createUser (params) {
    return Api.post('/users/create', params)
  }
}
