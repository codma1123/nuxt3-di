<template>
  <VSheet position="relative">
    <VBtn
      position="absolute"
      icon
      class="mb-5 ml-1"
      :style="{ right: '1rem' }"
      @click="emits('onRefresh')"
    >
      <VIcon>mdi-sync</VIcon>
    </VBtn>
    <VTable>
      <thead>
        <tr>
          <slot name="head"></slot>
        </tr>
      </thead>
      <tbody>
        <slot name="body"></slot>
      </tbody>
    </VTable>
  </VSheet>
  <VSheet height="10">
    <VProgressLinear
      v-if="props.loading"
      rounded
      height="3"
      indeterminate
    >
    </VProgressLinear>
  </VSheet>
</template>

<script setup lang="ts">
  interface RefreshableTableEmits {
    (e: "onRefresh"): void;
    (e: "onRemove"): void;
    (e: "onEdit"): void;
    (e: "update:modelValue", v: boolean): void;
  }

  interface RefreshableTableProps {
    loading: boolean;
  }

  const props = defineProps<RefreshableTableProps>();

  const emits = defineEmits<RefreshableTableEmits>();
</script>

<style scoped></style>
