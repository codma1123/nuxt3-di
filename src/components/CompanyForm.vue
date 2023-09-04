<template>
  <ExpandableForm
    ref="expandableForm"
    title="신규 업체 생성"
    @submit="submit"
  >
    <VTextField
      label="업체명*"
      v-model="companyFormState.name"
      :rules="[rules.required]"
    />

    <VTextField
      label="업체 주소*"
      v-model="companyFormState.address"
      :rules="[rules.required]"
      required
    />

    <VTextField
      label="대표자명*"
      v-model="companyFormState.representer_name"
      :rules="[rules.required]"
      required
    />

    <VTextField
      label="사업자등록번호*"
      v-model="companyFormState.registration_number"
      :rules="[rules.required]"
      required
    />

    <VTextField
      label="사업자등록증 첨부파일 ID*"
      v-model="companyFormState.registration_document_attachment_id"
      :rules="[rules.required]"
      required
    />

    <VTextField
      label="업체 전화번호"
      v-model="companyFormState.phone_number"
      :rules="[rules.required]"
      required
    />

    <VSelect
      multiple
      :items="COMPANY_ROLES"
      label="업체 역할 목록*"
      v-model="companyFormState.roles"
      :rules="companyVaildateRules"
      required
    />
    <small>*필수 입력 항목입니다.</small>
  </ExpandableForm>
</template>

<script setup lang="ts">
  import { CreateCompanyCommand, ICreateCompanyCommandUseCase } from "src/contexts/contracts/company/interface/usecase/command/create-company";
  import { dependencyMap } from "src/contexts/contracts/request/dependency";
  import CompanyInformation from "src/contexts/contracts/request/domain/company-information";
  import { CompanyRole } from "src/contexts/contracts/request/domain/company-role";
  import ExpandableForm from "src/components/ExpandableForm.vue";

  const expandableForm = ref<typeof ExpandableForm | null>(null);

  const COMPANY_ROLES = Object.values(CompanyRole);
  const companyVaildateRules = [(v: CompanyRole[]) => v.length !== 0 || "업체 역할 목록이 비어있습니다."];
  const createCompany = inject<ICreateCompanyCommandUseCase>(dependencyMap.ICreateCompanyCommandUseCase);

  const emits = defineEmits<{ (e: "submitSuccess"): void }>();

  const companyFormState = reactive<CompanyInformation>({
    name: "",
    address: "",
    representer_name: "",
    registration_number: "",
    registration_document_attachment_id: "" as UUID,
    phone_number: "",
    roles: [],
  });

  const rules = {
    required: (value: string) => !!value || "필수 항목입니다.",
  };

  const submit = async () => {
    try {
      await createCompany?.execute(companyFormState);
      emits("submitSuccess");
    } catch (e) {
      throw e;
    } finally {
      expandableForm.value?.blur();
    }
  };
</script>

<style scoped></style>
