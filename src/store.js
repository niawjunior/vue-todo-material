import Vue from 'vue'
import Vuex from 'vuex'
import { database } from './firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: null,
    newTodo: '',
    load: true
  },
  getters: {
    getTodos: state => {
      return state.todos
    },
    getTodoByIndex: () => index => {
      return new Promise((resolve, reject) => {
        try {
          database
          .collection('Todos')
          .where('id', '==', index)
          .get()
          .then(snapshot => {
            const data = snapshot.docs.map(doc => {
              return doc.data()
            });
            resolve(data)
          })
        } catch(e) {
          reject(e)
        }
      })
    }
  },
  mutations: {
    SET_TODO(state) {
      database.collection('Todos').onSnapshot(doc => {
        let todos = [];
        doc.docs.map(doc => {
          todos.push(doc.data())
        })
        state.todos = todos
        state.load = false
      })
    },
    ADD_TODO(_, todo) {
      let key = database.collection('Todos').doc().id
      database.collection('Todos').doc(key).set({
        id: key,
        skill: todo
      })
    },
    REMOVE_TODO(_, key) {
      database.collection('Todos').doc(key).delete()
    },
    EDIT_TODO(_, todo) {
      database.collection('Todos').doc(todo.key).set({
        id: todo.key,
        skill: todo.newTodo
      })
    }
  },
  actions: {
    setTodos({ commit }){
      commit('SET_TODO')
    },
    addTodo({ commit }, todo){
      commit('ADD_TODO', todo)
    },
    removeTodo({ commit }, key){
      commit('REMOVE_TODO', key)
    },
    editTodo({ commit }, todo){
      commit('EDIT_TODO', todo)
    }
  }
})

