<template>
  <div class="slide-error">
    <div
      v-for="(error, i) in errorStore.slideErrors"
      :key="i"
    >
      {{ error.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useErrorStore } from "src/store/error";

  const errorStore = useErrorStore();
</script>

<style scoped lang="scss">
  .slide-error {
    position: fixed;
    right: 0;
    top: 0;
  }
</style>
