import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [
      { skill: 'Angular'},
      { skill: 'Vue.js'},
      { skill: 'Frontend Developer'}
    ],
    newTodo: ''
  },
  getters: {
    getTodos: state => {
      return state.todos
    }
  },
  mutations: {
    ADD_TODO(state, todo) {
      state.todos.push({
        skill: todo
      })
    },
    REMOVE_TODO(state, key) {
      state.todos.splice(key, 1)
    }
  },
  actions: {
    addTodo({ commit }, todo){
      commit('ADD_TODO', todo)
    },
    removeTodo({ commit }, key){
      commit('REMOVE_TODO', key)
    }
  }
})