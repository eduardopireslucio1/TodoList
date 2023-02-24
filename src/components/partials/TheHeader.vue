<template>
  <div>
    <nav
      class="flex items-center justify-between flex-wrap bg-gray-800 p-2 fixed w-full z-10 top-0"
    >
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <a
          class="text-white no-underline hover:text-white hover:no-underline"
          href="#"
        >
          <span class="text-2xl pl-2"
            ><i class="em em-grinning"></i> TodoList - Ultimate Edition
          </span>
        </a>
      </div>

      <div class="block lg:hidden">
        <button
          id="nav-toggle"
          class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div
        class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0"
        id="nav-content"
      ></div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
