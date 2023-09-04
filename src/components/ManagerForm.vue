<template>
  <ExpandableForm
    title="신규 관리자 등록"
    @submit="submit"
  >
    <VTextField
      label="관리자 이름"
      v-model="managerFormState.name"
    />
    <VTextField
      label="관리자 이메일 주소"
      v-model="managerFormState.email"
      :rules="emailRules"
    />
    <VTextField
      label="전화번호"
      v-model="managerFormState.phone_number"
      :rules="phoneNumberRules"
    />
    <VSelect
      multiple
      :items="MANAGER_ROLES"
      label="관리자 역할"
      v-model="manager_roles"
    />
    <VCheckbox
      label="담당자 지정 여부"
      v-model="managerFormState.is_assigned"
    />
  </ExpandableForm>
</template>

<script setup lang="ts">
  import ICreateManagerCommandUseCase from "src/contexts/contracts/manager/interface/usecase/command/create-manager";
  import { dependencyMap } from "src/contexts/contracts/request/dependency";
  import ManagerInformation from "src/contexts/contracts/request/domain/manager-information";
  import { ManagerRole } from "src/contexts/contracts/request/domain/manager-role";

  const createManager = inject<ICreateManagerCommandUseCase>(dependencyMap.ICreateManagerCommandUseCase) as ICreateManagerCommandUseCase;

  const EMAIL_REGEX = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$/;
  const PHONE_REGEX = /^\d{2,3}-\d{3,4}-\d{4}$/;

  const MANAGER_ROLES = Object.values(ManagerRole);
  const manager_roles = ref<ManagerRole[]>(["감리"]);
  const managerFormState = reactive<ManagerInformation>({
    name: "",
    email: "",
    phone_number: "",
    is_assigned: false,
    roles: new Set<ManagerRole>([]),
  });

  const emailRules = [(v: string) => EMAIL_REGEX.test(v) || "유효하지 않은 이메일 형식입니다."];
  const phoneNumberRules = [(v: string) => PHONE_REGEX.test(v) || "유효하지 않은 전화번호 형식입니다."];

  const submit = async () => {
    await createManager.execute({ ...managerFormState });
  };
</script>

<style scoped></style>
