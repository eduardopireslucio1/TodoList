<template>
  <div class="w-full sm:w-1/w lg:w-1/3 mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div class="text-gray-500 font-medium">
        <h5>Lista de tarefas</h5>
        <p>Lista de tarefas</p>
      </div>
    </div>
    <form class="flex items-center px-4 bg-gray-300 h-15 rounded-sm mb-3">
      <input
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
    <div
      v-for="todo in todos"
      :key="todo.id"
      class="flex items-center justify-between bg-gray-300 rounded-sm px-4 h-15 mb-2"
    >
      <div>{{ todo.label }}</div>
    </div>
  </div>
</template>

<script>
import { $axios, config } from "@/assets/plugins/axios";
export default {
  name: "Home",

  data() {
    return {
      spinner: {
        todos: [],
        get_todos: false,
      },
    };
  },

  created() {
    this.getTodos();
  },

  methods: {
    getTodos() {
      $axios
        .get("v1/todos", config)
        .then((response) => {
          this.spinner.get_todos = true;
          this.todos = response.data.data;
          console.log(this.todos);
        })
        .finally(() => {
          this.spinner.get_todos = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
