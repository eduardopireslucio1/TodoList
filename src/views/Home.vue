<template>
  <div class="w-full sm:w-1/w lg:w-1/3 mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div class="text-gray-500 font-medium">
        <h5>Lista de tarefas</h5>
        <p>Lista de tarefas</p>
      </div>
    </div>
    <form
      @submit.stop.prevent="createTodo"
      class="flex items-center px-4 bg-gray-300 h-15 rounded-sm mb-3"
    >
      <input
        v-model="newTodo"
        placeholder="Digite o nome da lista"
        type="text"
        class="bg-gray-300 placeholder-gray-500 text-gray-700 font-light focus:outline-none block w-full"
      />
      <button
        type="submit"
        class="text-blue-700 text-xs font-semibold focus:outline-none"
      >
        Adicionar
      </button>
    </form>
    <TodoCard
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @afterDeleting="afterDeleting"
    />
  </div>
</template>

<script>
import TodoCard from "@/components/Todos/TodoCard";
import { $axios, config } from "@/assets/plugins/axios";
export default {
  name: "Home",

  components: { TodoCard },

  data() {
    return {
      todos: [],
      newTodo: "",
      spinner: {
        get_todos: false,
      },
    };
  },

  created() {
    this.getTodos();
  },

  provide() {
    return {
      home: this,
    };
  },

  methods: {
    getTodos() {
      $axios
        .get("v1/todos", config)
        .then((response) => {
          this.spinner.get_todos = true;
          this.todos = response.data.data.map((o) => ({
            ...o,
            state: "show",
          }));
        })
        .finally(() => {
          this.spinner.get_todos = false;
        });
    },

    createTodo() {
      if (!this.newTodo) {
        return;
      }
      const payload = {
        label: this.newTodo,
      };

      $axios
        .post("v1/todos", payload, config)
        .then((response) => {
          this.todos.unshift({ ...response.data.data, state: "show" });
          this.newTodo = "";
        })
        .finally(() => {
          this.spinner.get_todos = false;
        });
    },

    updateTodoLocal(todo, label) {
      const idx = this.todos.findIndex((o) => o.id === todo.id);
      this.todos[idx].label = label;
    },

    afterDeleting(todo) {
      const idx = this.todos.findIndex((o) => o.id === todo.id);
      this.todos.splice(idx, 1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
