<template>
  <div>
    <!-- Company -->
    <VCardTitle>
      <VIcon
        size="x-small"
        class="mb-1"
        >mdi-domain</VIcon
      >
      업체
    </VCardTitle>
    <VCardSubtitle> 계약할 업체를 선택해주세요.</VCardSubtitle>
    <RefreshableSelect
      :contents="companies"
      :label="companies.length === 0 ? '업체 목록이 없습니다.' : '업체 목록'"
      v-model="company"
      :loading="companyLoading"
      @on-refresh="onRefreshCompanies"
    />
    <CompanyForm @submit-success="onRefreshCompanies" />

    <!-- <template v-if="!companies || companies.length === 0">
          <div class="text-right text-grey text-body-2">
            업체 목록이 없습니다.
            <span
              class="text-decoration-underline"
              @click="companyDialog = true"
            >
              업체를 새로 생성하세요.
            </span>
          </div>
        </template> -->

    <!-- Contract -->
    <VCardTitle class="mt-15">
      <VIcon
        size="x-small"
        class="mb-1"
        >mdi-file-sign</VIcon
      >
      계약
    </VCardTitle>
    <VCardSubtitle> 계약을 선택해주세요.</VCardSubtitle>
    <RefreshableSelect
      :contents="contracts"
      :label="contracts.length === 0 ? '계약 목록이 없습니다.' : '계약 목록'"
      v-model="contract"
      :loading="contractLoading"
      @on-refresh="onRefreshContacts"
    />
    <ContractForm @submit-success="onRefreshContacts" />

    <!-- Manager -->
    <VCardTitle class="mt-15">
      <VIcon
        size="x-small"
        class="mb-1"
        >mdi-account-multiple</VIcon
      >
      관리자
    </VCardTitle>
    <VCardSubtitle> 관리자를 설정해주세요. </VCardSubtitle>
    <ManagerTable />

    <ManagerForm />
    <VBtn
      block
      size="x-large"
      variant="flat"
      color="grey-darken-2"
      class="mt-10"
    >
      신규 서비스 생성
    </VBtn>
  </div>
</template>

<script setup lang="ts">
  import ICompanySummaryPresenter from "src/contexts/contracts/company/interface/presenter/summary";
  import IContractSummaryPresenter from "src/contexts/contracts/contract/interface/presenter/summary";
  import { dependencyMap } from "src/contexts/contracts/request/dependency";
  import { ICreateRequestCommandUseCase } from "src/contexts/contracts/request/interface/usecase/command/create-request";
  import { IListContractsQueryUseCase } from "src/contexts/contracts/contract/interface/usecase/query/list-contracts";
  import IListManagersQueryUseCase from "src/contexts/contracts/manager/interface/usecase/query/list-managers";
  import IManagerSummaryPresenter from "src/contexts/contracts/manager/interface/presenter/summary";
  import { Router } from ".nuxt/vue-router";
  import { IListCompaniesQueryUseCase } from "src/contexts/contracts/company/interface/usecase/query/list-companies";
  import { TransitionProps } from "nuxt/dist/app/compat/vue-demi";

  definePageMeta({
    layout: "request",
    pageTransition: { name: "slide-right", mode: "out-in" },
    middleware: (to, from) => {
      (to.meta.pageTransition as TransitionProps).name;
    },
  });

  const router: Router = useRouter();

  // company
  const listCompaniesUseCase = inject(dependencyMap.IListCompaniesQueryUseCase) as IListCompaniesQueryUseCase;
  const companySummaryPresenter = inject(dependencyMap.ICompanySummaryPresenter) as ICompanySummaryPresenter;
  const companies = computed<string[]>(() => companySummaryPresenter.getState().map((state) => state.name));
  const company = ref<string | null>(null);
  const companyLoading = ref<boolean>(false);

  // contract
  const listContractsUseCase = inject(dependencyMap.IListContractsQueryUseCase) as IListContractsQueryUseCase;
  const contractSummaryPresenter = inject(dependencyMap.IContractSummaryPresenter) as IContractSummaryPresenter;
  const contracts = computed<string[]>(() => contractSummaryPresenter.getState().map((state) => state.construction_name));
  const contract = ref<string | null>(null);
  const contractLoading = ref<boolean>(false);

  // manager
  const listManagersUseCase = inject(dependencyMap.IListManagersQueryUseCase) as IListManagersQueryUseCase;
  const managerSummaryPresenter = inject(dependencyMap.IManagerSummaryPresenter) as IManagerSummaryPresenter;
  const managers = computed(() => managerSummaryPresenter.getState());

  const createRequest = inject(dependencyMap.ICreateRequestCommandUseCase) as ICreateRequestCommandUseCase;
  const selectedCompany = companySummaryPresenter.getState().find((state) => state.name === company.value);
  const selectedContract = contractSummaryPresenter.getState().find((state) => state.construction_name === contract.value);

  const onRefreshCompanies = async () => {
    companyLoading.value = true;
    try {
      await listCompaniesUseCase.execute({
        offset: 0,
        limit: null,
        search: null,
        order: null,
        desc: false,
      });
    } finally {
      companyLoading.value = false;
    }
  };

  const onRefreshContacts = async () => {
    contractLoading.value = true;
    try {
      await listContractsUseCase.execute({
        offset: 0,
        limit: null,
        search: null,
        order: null,
        desc: false,
      });
    } finally {
      contractLoading.value = false;
    }
  };

  await useAsyncData(() => listManagersUseCase.execute({}), {
    lazy: true,
  });

  await useAsyncData(() =>
    listCompaniesUseCase.execute({
      offset: 0,
      limit: null,
      search: null,
      order: null,
      desc: false,
    })
  );

  await useAsyncData(() =>
    listContractsUseCase.execute({
      offset: 0,
      limit: null,
      search: null,
      order: null,
      desc: false,
    })
  );
</script>
<style scoped lang="scss">
  .container {
    max-width: 500px;
  }
</style>
