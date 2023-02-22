<template>
  <div>
    <TodoCardShow
      v-if="isShowing"
      :todo="todo"
      @update="changeStateToUpdate"
      @delete="changeStateToDelete"
    />
    <TodoCardUpdate v-if="isUpdating" :todo="todo" @cancel="changeStateToShow">
    </TodoCardUpdate>
    <TodoCardDelete
      v-if="isDeleting"
      :todo="todo"
      @cancel="changeStateToShow"
      @afterDeleting="afterDeleting"
    >
    </TodoCardDelete>
  </div>
</template>

<script>
import TodoCardShow from "@/components/Todos/TodoCardShow";
import TodoCardUpdate from "@/components/Todos/TodoCardUpdate";
import TodoCardDelete from "@/components/Todos/TodoCardDelete";
export default {
  name: "TodoCard",

  components: { TodoCardShow, TodoCardUpdate, TodoCardDelete },

  props: {
    todo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      todoCopy: () => ({}),
    };
  },

  created() {
    this.todoCopy = Object.assign({}, this.todo);
  },

  computed: {
    isShowing() {
      return this.todoCopy.state === "show";
    },

    isUpdating() {
      return this.todoCopy.state === "update";
    },

    isDeleting() {
      return this.todoCopy.state === "delete";
    },
  },

  methods: {
    changeStateToShow() {
      this.todoCopy.state = "show";
    },

    changeStateToUpdate() {
      this.todoCopy.state = "update";
    },

    changeStateToDelete() {
      this.todoCopy.state = "delete";
    },

    afterDeleting(todo) {
      this.$emit("afterDeleting", todo);
    },
  },
};
</script>

<style lang="scss" scoped></style>
