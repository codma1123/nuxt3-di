<template>
  <VLayout>
    <VContainer class="d-flex flex-column container">
      <!-- <h2>신규 서비스 생성</h2>
        <VDivider class="mt-5 mb-5" /> -->
      <slot></slot>
    </VContainer>
  </VLayout>
</template>
<style lang="scss" scoped>
  .container {
    max-width: 530px;
    justify-content: center;
    margin-top: 100px;
  }
</style>
