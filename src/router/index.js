import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dimensoes from '../views/dimensoes.vue'
import addPerguntas from '../views/adicionarPerguntas.vue'
import editarPerguntas from '../views/editarPerguntas.vue'
import addDimensoes from '../views/adicionarDimensoes.vue'
import editarDimensoes from '../views/editarDimensoes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dimensoes',
    name: 'Dimensoes',
    component: Dimensoes
  },
  {
    path: '/adicionar-perguntas',
    name: 'adicionar-perguntas',
    component: addPerguntas
  },
  {
    path: '/editar-perguntas/:id',
    name: 'editar-perguntas',
    component: editarPerguntas
  },
  {
    path: '/adicionar-dimensoes',
    name: 'adicionar-dimensoes',
    component: addDimensoes
  },
  {
    path: '/editar-dimensoes/:id',
    name: 'editar-dimensoes',
    component: editarDimensoes
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
