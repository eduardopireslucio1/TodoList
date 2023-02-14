<template>
  <div class="flex items-center justify-center mb-8">
    <RouterLink :to="{ name: 'login' }" class="px-2 py-2 border-b-2 mx-4"
      >Login</RouterLink
    >
    <RouterLink :to="{ name: 'Register' }" class="px-2 py-2 border-b-2 mx-4"
      >Registrar</RouterLink
    >
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
