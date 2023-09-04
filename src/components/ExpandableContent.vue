<template>
  <VExpansionPanels>
    <VExpansionPanel
      elevation="0"
      :title="title"
    >
      <VExpansionPanelText>
        <VSheet class="pt-5">
          <slot></slot>
        </VSheet>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<script setup lang="ts">
  interface ExpandableFormProps {
    rules?: [];
    title: string;
  }

  const props = defineProps<ExpandableFormProps>();
</script>

<style scoped></style>
