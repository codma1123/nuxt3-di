<template>
  <VExpansionPanels
    v-model="modelValue"
    color=""
    ref="panel"
  >
    <VExpansionPanel
      elevation="0"
      :title="title"
    >
      <VExpansionPanelText>
        <VSheet class="pt-5">
          <VForm @submit.prevent="submit">
            <slot></slot>

            <VBtn
              block
              size="x-large"
              variant="flat"
              color="info"
              class="mt-10"
              rounded="lg"
              type="submit"
            >
              {{ title }}
            </VBtn>
          </VForm>
        </VSheet>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<script setup lang="ts">
  import { VExpansionPanel } from "vuetify/lib/components/index.mjs";
  import { SubmitEventPromise } from "vuetify/lib/framework.mjs";

  interface ExpandableFormProps {
    rules?: [];
    title: string;
  }

  interface ExpandableFormEmits {
    (e: "submit"): void;
  }

  const panel = ref<VExpansionPanel | null>(null);

  const props = defineProps<ExpandableFormProps>();
  const emits = defineEmits<ExpandableFormEmits>();

  const modelValue = ref<boolean>(false);

  const blur = () => {
    modelValue.value = false;
  };

  const submit = async (e: SubmitEventPromise) => {
    const { valid } = await e;

    if (valid) emits("submit");
  };

  defineExpose({
    blur,
  });
</script>

<style scoped></style>
