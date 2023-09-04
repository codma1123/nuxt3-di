<template>
  <VContainer class="w-75 d-flex flex-column container">
    <RefreshableSelect
      :contents="compines"
      label="업체 목록"
      v-model="company"
      :loading="loading"
      @on-refresh="onRefreshCompanies"
      @add-new-content="(v) => initialState.push"
    />

    <RefreshableSelect
      :contents="contracts"
      label="계약 목록"
      v-model="contract"
      :loading="loading"
      @on-refresh="onRefreshCompanies"
      @add-new-content="(v) => initialState.push"
    />

    <ExpandableForm title="신규 업체 생성">
      <VTextField
        label="업체명"
        v-model="companyFormState.name"
      />

      <VTextField
        label="업체 주소"
        v-model="companyFormState.address"
      />

      <VTextField
        label="대표자명"
        v-model="companyFormState.representer_name"
      />

      <VTextField
        label="사업자등록번호"
        v-model="companyFormState.registration_number"
      />

      <VTextField
        label="사업자등록증 첨부파일 ID"
        v-model="companyFormState.registration_document_attachment_id"
      />

      <VTextField
        label="업체 전화번호"
        v-model="companyFormState.phone_number"
      />

      <VSelect
        multiple
        :items="COMPANY_ROLES"
        label="업체 역할 목록"
        v-model="companyFormState.roles"
        :rules="companyVaildateRules"
        required
      />
    </ExpandableForm>

    <ExpandableForm title="신규 공사 등록">
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
      />
      <VTextField
        label="준공일"
        v-model="contractFormState.construction_end_date"
        :rules="constructionDateRules"
      />
      <VTextField
        label="운반 시작일"
        v-model="contractFormState.transfer_start_date"
        :rules="transferDateRules"
      />

      <VTextField
        label="운반 종료일"
        v-model="contractFormState.transfer_end_date"
      />
      <VTextField
        label="총 예상 물량"
        v-model="contractFormState.expected_total_transfer_amount.amount"
        :rules="transferAmountRule"
      />
      <VSelect
        label="물량 단위"
        v-model="contractFormState.expected_total_transfer_amount.unit"
        :items="UNIT"
      />
      <VTextField
        label="운반 품목 목록"
        v-model="items"
      />
    </ExpandableForm>

    <ExpandableForm title="신규 관리자 등록">
      <VTextField
        label="관리자 이름"
        v-model="managerFormState.name"
      />
      <VTextField
        label="관리자 이메일 주소"
        v-model="managerFormState.email"
      />
      <VTextField
        label="전화번호"
        v-model="managerFormState.phone_number"
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
  </VContainer>

  <!-- <CreateRequest /> -->
</template>

<script setup lang="ts">
  import CompanySummary from "src/contexts/contracts/company/domain/summary";
  import ICompanyDetailPresenter from "src/contexts/contracts/company/interface/presenter/detail";
  import { dependencyMap } from "src/contexts/contracts/request/dependency";
  import { AmountUnit } from "src/contexts/contracts/request/domain/amount-unit";
  import CompanyInformation from "src/contexts/contracts/request/domain/company-information";
  import { CompanyRole } from "src/contexts/contracts/request/domain/company-role";
  import ContractInformation from "src/contexts/contracts/request/domain/contract-information";
  import ManagerInformation from "src/contexts/contracts/request/domain/manager-information";
  import { ManagerRole } from "src/contexts/contracts/request/domain/manager-role";
  import IRequestDetailPresenter from "src/contexts/contracts/request/interface/presenter/detail";
  import IRequestSummaryPresenter from "src/contexts/contracts/request/interface/presenter/summary";
  import { ICreateRequestCommandUseCase } from "src/contexts/contracts/request/interface/usecase/command/create-request";
  import uuid4 from "src/core/uuid";

  const detailPresenter = inject(dependencyMap.IRequestDetailPresenter) as IRequestDetailPresenter;
  const summaryPresenter = inject(dependencyMap.IRequestSummaryPresenter) as IRequestSummaryPresenter;
  const createRequest = inject(dependencyMap.ICreateRequestCommandUseCase) as ICreateRequestCommandUseCase;
  const contractPresenter = inject(dependencyMap.ICompanyDetailPresenter) as ICompanyDetailPresenter;

  const initialState = ref<CompanySummary[]>([
    {
      id: uuid4(),
      name: "이준하 컴퍼니",
      phone_number: "010-9922-0335",
    },
    {
      id: uuid4(),
      name: "백세종 컴퍼니",
      phone_number: "010-9922-0335",
    },
    {
      id: uuid4(),
      name: "박소민 컴퍼니",
      phone_number: "010-9922-0335",
    },
  ]);
  const compines = computed<string[]>(() => initialState.value.map((state) => state.name));
  const company = ref<string | null>(null);
  const selectedCompany = initialState.value.find((state) => state.name === company.value);

  const initialContracts = ["계약1", "계약2", "계약3"];
  const contracts = ref<string[]>(["계약1", "계약2", "계약3"]);
  const contract = ref<string | null>(null);

  const detail = computed(() => detailPresenter.getState());
  const summary = computed(() => summaryPresenter.getState());

  const loading = ref<boolean>(false);

  const onRefreshCompanies = () => {
    loading.value = true;
    setTimeout(() => (loading.value = false), 3000);
  };

  const onRefreshContacts = () => {
    loading.value = true;
    setTimeout(() => (loading.value = false), 3000);
  };

  const COMPANY_ROLES = Object.values(CompanyRole);
  const companyVaildateRules = [(v: CompanyRole[]) => v.length !== 0 || "업체 역할 목록이 비어있습니다."];
  const companyFormState = reactive<CompanyInformation>({
    name: "",
    address: "",
    representer_name: "",
    registration_number: "",
    registration_document_attachment_id: "" as UUID,
    phone_number: "",
    roles: [],
  });

  const constructionDateRules = [
    () => new Date(contractFormState.construction_start_date).getTime() < new Date(contractFormState.construction_end_date).getTime() || "준공일은 착공일보다 빠르거나 같을 수 없습니다.",
  ];
  const transferDateRules = [
    () => new Date(contractFormState.transfer_start_date).getTime() < new Date(contractFormState.construction_end_date).getTime() || "준공일은 착공일보다 빠르거나 같을 수 없습니다.",
  ];
  const transferAmountRule = [(v: number) => v > 0 || "운반 물량의 값은 0이거나 음수일 수 없습니다."];

  const UNIT = Object.values(AmountUnit);

  const items = ref<string[]>([]);
  const contractFormState = reactive<ContractInformation>({
    construction_name: "",
    client_company_id: "" as UUID,
    construction_start_date: new Date(),
    construction_end_date: new Date(),
    transfer_start_date: new Date(),
    transfer_end_date: new Date(),
    expected_total_transfer_amount: {
      amount: 0,
      unit: "입방미터(m3)",
    },
    items: new Set<UUID>([]),
  });

  const MANAGER_ROLES = Object.values(ManagerRole);
  const manager_roles = ref<ManagerRole[]>(["감리"]);
  const managerFormState = reactive<ManagerInformation>({
    name: "",
    email: "",
    phone_number: "",
    is_assigned: false,
    roles: new Set<ManagerRole>([]),
  });
</script>
<style scoped lang="scss">
  .container {
    max-width: 500px;
  }
</style>
