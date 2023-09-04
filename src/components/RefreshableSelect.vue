<template>
  <div class="d-flex align-center container mt-3 pl-5 pr-5">
    <VCombobox
      :label="label"
      :items="contents"
      v-model="modelValue"
      :loading="loading"
      menu-icon=""
      variant="underlined"
    >
    </VCombobox>
    <VBtn
      position="absolute"
      icon
      class="mb-6 ml-1"
      :style="{ right: '1rem' }"
      @click="emits('onRefresh')"
    >
      <VIcon>mdi-sync</VIcon>
    </VBtn>
  </div>
</template>

<script setup lang="ts" generic="T">
  interface RefreshableSelectProps {
    contents?: T[];
    modelValue: T;
    label: string;
    loading: boolean;
  }

  interface RefreshableSelectEmits {
    (e: "update:modelValue", arg: T): void;
    (e: "onRefresh"): void;
  }

  const props = defineProps<RefreshableSelectProps>();
  const emits = defineEmits<RefreshableSelectEmits>();

  const modelValue = computed({
    get() {
      return props.modelValue;
    },
    set(v: T) {
      emits("update:modelValue", v);
    },
  });
</script>

<style scoped lang="scss">
  .container {
    position: relative;
  }
</style>
