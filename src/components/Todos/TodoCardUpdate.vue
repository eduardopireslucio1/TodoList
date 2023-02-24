<template>
  <div class="flex items-center bg-gray-300 rounded-sm px-4 h-15 mb-2">
    <input
      v-model="localLabel"
      ref="label"
      type="text"
      placeholder="Digite o nome da lista..."
      class="bg-gray-300 placeholder-gray-500 text-gray-700 font-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring"
    />
    <div class="flex items-center ml-auto">
      <a
        href=""
        class="text-xs text-gray-900 mr-2 focus:outline-none"
        @click.stop.prevent="onCancel()"
        >Cancelar</a
      >
      <button
        @click.stop.prevent="onSave()"
        class="bg-blue-700 text-blue-100 text-xs font-semibold px-2.5 py-1 rounded focus:outline-none"
      >
        OK
      </button>
    </div>
  </div>
</template>

<script>
import { $axios, config } from "@/assets/plugins/axios";
export default {
  name: "TodoCardUpdate",

  inject: ["home"],

  props: {
    todo: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      localLabel: this.todo.label,
    };
  },

  mounted() {
    this.$refs.label.focus();
  },

  methods: {
    onCancel() {
      this.$emit("cancel");
    },

    onSave() {
      if (this.localLabel.trim() === "") {
        return;
      }
      const payload = {
        label: this.localLabel,
      };
      $axios
        .put(`v1/todos/${this.todo.id}`, payload, config)
        .then(() => {
          this.home.updateTodoLocal(this.todo, this.localLabel);
          this.onCancel();
        })
        .finally(() => {});
    },
  },
};
</script>

<style lang="scss" scoped></style>
