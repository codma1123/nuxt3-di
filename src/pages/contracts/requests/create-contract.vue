<template>
  <div>
    <p class="text-medium-emphasis">계약 선택</p>
    <VCardActions>
      <VSpacer />

      <VBtn
        icon
        class="mt-10 ml-5"
        @click="router.push('/contracts/requests/create-contract')"
      >
        다음
      </VBtn>
    </VCardActions>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: "request",
  });

  const router = useRouter();
</script>

<style scoped></style>
