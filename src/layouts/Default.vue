<template>
  <TheHeader></TheHeader>
  <div class="px-3 py-10 md:px-10">
    <RouterView />
  </div>
</template>

<script>
import TheHeader from "@/components/partials/TheHeader";
export default {
  name: "Default",

  components: {
    TheHeader,
  },
};
</script>

<style lang="scss" scoped></style>
