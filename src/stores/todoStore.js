import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: []
  }),
  actions: {
    addTodo(task) {
      this.todos.push({ task, completed: false })
    },
    removeTodo(index) {
      this.todos.splice(index, 1)
    },
    toggleTodoStatus(index) {
      this.todos[index].completed = !this.todos[index].completed
    }
  },
  getters: {
    incompleteTodos: (state) => state.todos.filter(todo => !todo.completed).length
  }
})
