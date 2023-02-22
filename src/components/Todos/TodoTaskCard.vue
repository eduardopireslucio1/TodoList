<template>
  <div
    class="flex items-center px-4 py-3 border-b border-gray-400 last:border-b-0"
  >
    <div
      @click.stop.prevent="taskCopy.is_complete = !taskCopy.is_complete"
      class="text-green-500 cursor-pointer mr-2"
    >
      <svg
        v-if="taskCopy.is_complete"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-check-circle"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
        />
        <path
          d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"
        />
      </svg>
      <div v-else class="h-5 w-4 flex items-center justify-center">
        <div class="h-4 w-4 rounded-full border-2 border-gray-400" />
      </div>
    </div>

    <div class="w-full">
      <input
        v-model="taskCopy.label"
        @input="handleInput"
        type="text"
        placeholder="Digite a sua tarefa..."
        class="bg-gray-300 placeholder-gray-500 text-gray-700 font-light focus:outline-none block w-full appearance-none"
      />
    </div>
    <div
      @click.stop.prevent="deleteTask"
      class="ml-auto flex items-center justify-center"
    >
      <button class="focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
          />
          <path
            fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash";
import { $axios, config } from "@/assets/plugins/axios";
export default {
  name: "TodoTaskCard",

  props: {
    task: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      taskCopy: () => ({}),
    };
  },

  created() {
    this.taskCopy = Object.assign({}, this.task);
  },

  watch: {
    "taskCopy.is_complete"() {
      this.updateTask();
    },
  },

  methods: {
    updateTask() {
      if (!this.taskCopy.label) {
        return;
      }

      const payload = {
        label: this.taskCopy.label,
        is_complete: this.taskCopy.is_complete,
      };

      $axios.put(`v1/todo-tasks/${this.taskCopy.id}`, payload, config);
    },
    handleInput: debounce(function () {
      this.updateTask();
    }, 600),

    deleteTask() {
      $axios.delete(`v1/todo-tasks/${this.taskCopy.id}`, config);
    },
  },
};
</script>

<style lang="scss" scoped></style>
