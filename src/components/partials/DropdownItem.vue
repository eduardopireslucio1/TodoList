<template>
  <Component
    :is="is"
    :href="localHref"
    :to="to"
    @click="onClick"
    class="block flex items-center w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text focus:bg-gray-100 focus:text-gray-900 cursor-pointer"
  >
    <slot />
  </Component>
</template>

<script>
export default {
  name: "DropdownItem",

  inject: ["dropdown"],

  data() {
    return {};
  },

  props: {
    href: {
      type: String,
      default: undefined,
    },
    to: {
      type: String,
      default: undefined,
    },
  },

  computed: {
    localHref() {
      if (typeof this.to !== "undefined") {
        return undefined;
      }

      return this.href;
    },
    is() {
      if (typeof this.to !== "undefined") {
        return "RouterLink";
      }

      if (typeof this.href !== "undefined") {
        return "a";
      } else {
        return "button";
      }
    },
  },

  methods: {
    onClick(evt) {
      this.$emit("click", evt);
      this.closeDropdown();
    },
    closeDropdown() {
      this.dropdown.close();
    },
  },
};
</script>

<style lang="scss" scoped></style>
