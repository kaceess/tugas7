<template>
  <div id="app">
    <h1>Todo List</h1>
    <div class="todo-container">
      <input v-model="newTask" @keyup.enter="addNewTask" placeholder="Add a new task"/>
      <button @click="addNewTask">Add Task</button>
      <ul>
        <li v-for="(todo, index) in todos" :key="index" :class="{ completed: todo.completed }">
          <span @click="toggleTaskStatus(index)">{{ todo.task }}</span>
          <button @click="removeTask(index)">Delete</button>
        </li>
      </ul>
      <p>Total incomplete tasks: {{ incompleteTasks }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useTodoStore } from './stores/todoStore'

export default {
  setup() {
    const todoStore = useTodoStore()
    const newTask = ref('')

    const addNewTask = () => {
      if (newTask.value.trim()) {
        todoStore.addTodo(newTask.value)
        newTask.value = ''
      }
    }

    const removeTask = (index) => {
      todoStore.removeTodo(index)
    }

    const toggleTaskStatus = (index) => {
      todoStore.toggleTodoStatus(index)
    }

    return {
      newTask,
      addNewTask,
      removeTask,
      toggleTaskStatus,
      todos: todoStore.todos,
      incompleteTasks: todoStore.incompleteTodos
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #ffe4e1; /* Warna pink muda */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #2c3e50;
}

.todo-container {
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #2c3e50;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

input {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
  width: 60%;
  margin-bottom: 10px;
}

button {
  padding: 10px;
  font-size: 16px;
  margin-left: 5px;
  border: none;
  border-radius: 5px;
  background-color: #ff69b4; /* Warna pink terang */
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #ff1493; /* Warna pink lebih dalam saat hover */
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li span {
  cursor: pointer;
}

li.completed span {
  text-decoration: line-through;
}

li button {
  background-color: #ff5252; /* Warna merah untuk tombol delete */
}

li button:hover {
  background-color: #ff1744; /* Warna merah lebih dalam saat hover */
}

p {
  font-size: 1.2em;
  margin-top: 20px;
}
</style>
