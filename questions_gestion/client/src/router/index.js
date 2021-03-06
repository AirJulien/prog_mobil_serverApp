import Vue from 'vue'
import Router from 'vue-router'
import Question from '@/components/Question'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Question',
      component: Question
    },
    {
      path: '/questions',
      name: 'Question',
      component: Question
    }
  ]
})
