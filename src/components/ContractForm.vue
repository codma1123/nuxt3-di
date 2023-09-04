<template>
  <ExpandableForm
    title="신규 계약 등록"
    ref="expandableForm"
    @submit="submit"
  >
    <VTextField
      label="공사명"
      v-model="contractFormState.construction_name"
    />
    <VTextField
      label="발주처 업체 ID"
      v-model="contractFormState.client_company_id"
    />
    <VTextField
      label="착공일"
      v-model="contractFormState.construction_start_date"
      type="date"
    />
    <VTextField
      label="준공일"
      v-model="contractFormState.construction_end_date"
      type="date"
      :rules="constructionDateRules"
    />

    <VTextField
      label="운반 시작일"
      v-model="contractFormState.transfer_start_date"
      type="date"
      :rules="transferDateRules"
    />

    <VTextField
      label="운반 종료일"
      type="date"
      v-model="contractFormState.transfer_end_date"
    />

    <VRow no-gutter>
      <VCol cols="7">
        <VTextField
          label="총 예상 물량"
          :suffix="suffix"
          v-model="contractFormState.expected_total_transfer_amount.amount"
          :rules="transferAmountRule"
        />
      </VCol>
      <VCol cols="5">
        <VSelect
          label="물량 단위"
          v-model="contractFormState.expected_total_transfer_amount.unit"
          :items="UNIT"
        />
      </VCol>
    </VRow>
    <VTextField
      label="운반 품목 목록"
      v-model="items"
    />
  </ExpandableForm>
</template>

<script setup lang="ts">
  import ExpandableForm from "src/components/ExpandableForm.vue";
  import ICreateContractCommandUseCase from "src/contexts/contracts/contract/interface/usecase/command/create-contract";
  import ICreateContractUseCase from "src/contexts/contracts/contract/interface/usecase/command/create-contract";
  import { dependencyMap } from "src/contexts/contracts/request/dependency";
  import { AmountUnit } from "src/contexts/contracts/request/domain/amount-unit";
  import ContractInformation from "src/contexts/contracts/request/domain/contract-information";

  const emits = defineEmits<{ (e: "submitSuccess"): void }>();

  const constructionDateRules = [
    () => new Date(contractFormState.construction_start_date).getTime() < new Date(contractFormState.construction_end_date).getTime() || "준공일은 착공일보다 빠르거나 같을 수 없습니다.",
  ];
  const transferDateRules = [
    () => new Date(contractFormState.transfer_start_date).getTime() < new Date(contractFormState.construction_end_date).getTime() || "준공일은 착공일보다 빠르거나 같을 수 없습니다.",
  ];
  const transferAmountRule = [(v: number) => v > 0 || "운반 물량의 값은 0이거나 음수일 수 없습니다."];

  const UNIT = Object.values(AmountUnit);

  const items = ref<string[]>([]);

  const expandableForm = ref<typeof ExpandableForm | null>(null);

  const createContract = inject<ICreateContractUseCase>(dependencyMap.ICreateContractCommandUseCase) as ICreateContractCommandUseCase;
  const suffix = computed(() => (contractFormState.expected_total_transfer_amount.unit === AmountUnit.Ton ? "(t)" : "(m3)"));

  const contractFormState = reactive<ContractInformation>({
    construction_name: "",
    client_company_id: "" as UUID,
    construction_start_date: new Date(),
    construction_end_date: new Date(),
    transfer_start_date: new Date(),
    transfer_end_date: new Date(),
    expected_total_transfer_amount: {
      amount: 0,
      unit: AmountUnit.Ton,
    },
    items: new Set<UUID>([]),
  });

  const submit = async () => {
    try {
      await createContract?.execute(contractFormState as any);
      emits("submitSuccess");
    } catch (e) {
      throw e;
    } finally {
      expandableForm.value?.blur();
    }
  };
</script>

<style scoped></style>
