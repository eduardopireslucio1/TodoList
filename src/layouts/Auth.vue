<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <div class="w-full sm:w-1/2 lg:w-1/3 xl:w1-/4 mx-auto">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "Auth",
};
</script>

<style lang="scss" scoped></style>
