<template>
  <div class="relative inline-block text-left">
    <button
      @click.stop.prevent="toggle"
      type="button"
      :class="{ 'rounded-md': rounded, 'border border-gray-400': !naked }"
      class="flex items-center justify-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 shadow"
    >
      {{ text }}
      <svg
        v-if="!noIcon"
        class="w-4 h-4 ml-2"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
      <svg
        v-show="isOptions"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-list"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </svg>
    </button>
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
    </Transition>
    <div
      v-show="isOpen"
      class="origin-top-right absolite right-0 mt-0 mt-2 w-56"
    >
      <div class="py-1 rounded-md bg-white shadow-xs">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dropdown",

  props: {
    text: {
      type: String,
      default: "",
    },
    noIcon: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    naked: {
      type: Boolean,
      default: false,
    },
    isOptions: {
      type: Boolean,
      default: false,
    },
  },

  provide() {
    return {
      dropdown: this,
    };
  },

  data() {
    return {
      isOpen: false,
    };
  },

  watch: {
    isOpen(value) {
      if (value) {
        this.$root.$emit("dropdown::open", this);
      }
    },
  },

  created() {
    //this.$root.$on("dropdown::open", this.rootCloseListener);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.clickOutListener);
  },

  mounted() {
    document.addEventListener("click", this.clickOutListener);
  },

  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    close() {
      this.isOpen = false;
    },
    clickOutListener(evt) {
      if (!this.$el.contains(evt.target)) {
        this.close();
      }
    },
    rootCloseListener(vm) {
      if (vm !== this) {
        this.close();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
