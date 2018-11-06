import Api from '@/services/Api'

export default {
  fetchQuestions () {
    return Api().get('/question')
  },

  fetchOneQuestion (id) {
    return Api().get('/question/' + id)
  },

  deleteQuestion (id) {
    return Api().get('/question/delete/' + id)
  },

  updateQuestion (params) {
    return Api().post('/question/update/' + params.id, params)
  },
  createQuestion (params) {
    return Api().post('/question/create', params)
  }
}
