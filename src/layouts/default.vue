<template>
  <VContainer class="d-flex flex-column container">
    <slot></slot>
  </VContainer>
</template>
<style lang="scss" scoped>
  .container {
    max-width: 530px;
    height: 100vh;
    justify-content: center;
  }
</style>
