<template>
  <br /><br />
  <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
    <div v-if="spinner.get_todo" class="text-center">
      <svg
        aria-hidden="true"
        role="status"
        class="inline w-4 h-4 mr-3 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <template v-else>
      <div class="flex items-center mb-8 m-2">
        <router-link :to="{ name: 'index' }" class="-ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-left-circle"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
            />
          </svg>
        </router-link>

        <div class="text-gray-500 font-medium m-2">{{ this.todo.label }}</div>
      </div>

      <form
        @submit.stop.prevent="addTask"
        class="flex items-center px-4 bg-gray-900 h-15 rounded-sm border-l-2 border-green-400 mb-3"
      >
        <input
          v-model="newTask"
          type="text"
          placeholder="Adicione um novo item..."
          class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light focus:outline-none block w-full appearance-none"
        />

        <button
          class="text-green-400 text-xs font-semibold focus:outline-none"
          type="submit"
        >
          Adicionar
        </button>
      </form>

      <div v-if="todo.tasks.length" class="bg-gray-300 rounded-sm">
        <TodoTaskCard
          v-for="task in todo.tasks"
          :key="task.id"
          :task="task"
          @afterDelete="afterDelete"
        />
      </div>
      <div v-else class="text-center text-lg text-gray-600">
        Não há nenhuma tarefa.
      </div>
    </template>
  </div>
</template>

<script>
import TodoTaskCard from "@/components/Todos/TodoTaskCard";
import { $axios, config } from "@/assets/plugins/axios";
export default {
  name: "TodoTasks",

  components: { TodoTaskCard },

  data() {
    return {
      newTask: "",
      todo: {},
      spinner: {
        get_todo: true,
      },
    };
  },

  created() {
    this.getTodo();
  },

  methods: {
    getTodo() {
      this.spinner.get_todo = true;
      $axios
        .get(`v1/todos/${this.$route.params.id}`, config)
        .then((response) => {
          this.todo = response.data.data;
        })
        .finally(() => {
          this.spinner.get_todo = false;
        });
    },

    addTask() {
      if (!this.newTask) {
        return;
      }

      const payload = {
        label: this.newTask,
      };

      $axios
        .post(`v1/todos/${this.$route.params.id}/tasks`, payload, config)
        .then((response) => {
          this.todo.tasks.unshift(response.data.data);
          this.newTask = "";
        })
        .finally(() => {});
    },

    afterDelete(task) {
      const idx = this.todo.tasks.findIndex((o) => o.id === task.id);
      this.todo.tasks.splice(idx, 1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
