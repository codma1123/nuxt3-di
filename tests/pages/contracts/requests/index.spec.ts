import { beforeEach, describe, vitest, test, expect } from "vitest";
import _index from "src/pages/contracts/requests/index.vue";
import { flushPromises, mount, shallowMount } from "@vue/test-utils";
import { dependencyMap } from "src/contexts/contracts/request/dependency";
import { createPinia, setActivePinia } from "pinia";
import IRequestSummaryPresenter from "src/contexts/contracts/request/interface/presenter/summary";
import IRequestDetailPresenter from "src/contexts/contracts/request/interface/presenter/detail";
import RequestDetail from "src/contexts/contracts/request/domain/detail";
import { Nullable } from "src/core/nullable";
import RequestSummary from "src/contexts/contracts/request/domain/summary";
import { CreateRequestCommand, ICreateRequestCommandUseCase } from "src/contexts/contracts/request/interface/usecase/command/create-request";
import uuid4 from "src/core/uuid";
import CompanySummary from "src/contexts/contracts/company/domain/summary";
import { createVuetify } from "vuetify/lib/framework.mjs";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import ICompanySummaryPresenter from "src/contexts/contracts/company/interface/presenter/summary";
import RefreshableSelect from "src/components/RefreshableSelect.vue";
import ExpandableForm from "src/components/ExpandableForm.vue";
import ManagerForm from "src/components/ManagerForm.vue";
import ManagerTable from "src/components/ManagerTable.vue";
import IContractSummaryPresenter from "src/contexts/contracts/contract/interface/presenter/summary";
import IManagerSummaryPresenter from "src/contexts/contracts/manager/interface/presenter/summary";
import ManagerSummary from "src/contexts/contracts/manager/domain/summary";
import { ManagerRole } from "src/contexts/contracts/request/domain/manager-role";
import IListManagersQueryUseCase, { ListManagersQuery } from "src/contexts/contracts/manager/interface/usecase/query/list-managers";
import { IListContractsQueryUseCase, ListContractsQuery } from "src/contexts/contracts/contract/interface/usecase/query/list-contracts";
import ContractSummary from "src/contexts/contracts/contract/domain/summary";
import { IListCompaniesQueryUseCase, ListCompaniesQuery } from "src/contexts/contracts/company/interface/usecase/query/list-companies";
import { Suspense } from "vue-demi";

class FakeCompanySummaryPresenter implements ICompanySummaryPresenter {
  getState(): CompanySummary[] {
    return [
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
    ];
  }
}

class FakeManagerSummaryPresenter implements IManagerSummaryPresenter {
  getState(): ManagerSummary[] {
    return [
      {
        name: "이준하",
        phone_number: "010-9922-0335",
        roles: new Set<ManagerRole>(["감리"]),
      },
      {
        name: "백세종",
        phone_number: "010-9922-0335",
        roles: new Set<ManagerRole>(["감리"]),
      },
      {
        name: "박소민",
        phone_number: "010-9922-0335",
        roles: new Set<ManagerRole>(["감리"]),
      },
      {
        name: "이준하",
        phone_number: "010-9922-0335",
        roles: new Set<ManagerRole>(["감리"]),
      },
      {
        name: "백세종",
        phone_number: "010-9922-0335",
        roles: new Set<ManagerRole>(["감리"]),
      },
      {
        name: "박소민",
        phone_number: "010-9922-0335",
        roles: new Set<ManagerRole>(["감리"]),
      },
    ];
  }
}

class FakeContractSummaryPresenter implements IContractSummaryPresenter {
  getState(): ContractSummary[] {
    return [
      {
        client_company_id: uuid4(),
        construction_name: "공사 1",
        construction_start_date: new Date(),
        construction_end_date: new Date(),
        transfer_start_date: new Date(),
        transfer_end_date: new Date(),
        expected_total_transfer_amount: {
          amount: 10,
          unit: "톤(t)",
        },
        items: new Set([uuid4()]),
      },
      {
        client_company_id: uuid4(),
        construction_name: "공사 2",
        construction_start_date: new Date(),
        construction_end_date: new Date(),
        transfer_start_date: new Date(),
        transfer_end_date: new Date(),
        expected_total_transfer_amount: {
          amount: 50,
          unit: "톤(t)",
        },
        items: new Set([uuid4()]),
      },
    ];
  }
}

class FakeRequestDetailPresenter implements IRequestDetailPresenter {
  getState(): Nullable<RequestDetail> {
    return null;
  }
}

class FakeRequestSummaryPresenter implements IRequestSummaryPresenter {
  getState(): RequestSummary[] {
    return [];
  }
}

class FakeCreateRequestUseCase implements ICreateRequestCommandUseCase {
  async execute(command: CreateRequestCommand): Promise<void> {
    console.log("create request command called", command);
  }
}

class FakeListCompaniesUseCase implements IListCompaniesQueryUseCase {
  async execute(query: ListCompaniesQuery): Promise<void> {
    console.log("업체 리스트 로드");
  }
}

class FakeListManagersUseCase implements IListManagersQueryUseCase {
  async execute(query: ListManagersQuery): Promise<void> {
    console.log("매니저 리스트 로드");
  }
}

class FakeListContractsUseCase implements IListContractsQueryUseCase {
  async execute(query: ListContractsQuery): Promise<void> {
    console.log("계약 리스트 로드");
  }
}

const mountSuspense = async (component: any, options?: any) => {
  const wrapper = mount(
    defineComponent({
      render() {
        return h(Suspense, null, {
          default: h(component),
          fallback: h("div", "fallback"),
        });
      },
    }),
    ...options
  );

  await flushPromises();
  return wrapper;
};

const vuetify = createVuetify({
  components,
  directives,
});

describe("contracts - requests index 페이지 테스트", () => {
  beforeEach(() => {
    vitest.unstubAllGlobals();
    setActivePinia(createPinia());
  });

  test("index 페이지 초기 상태", async () => {
    expect(_index).toBeTruthy();

    const component = mount(_index, {
      global: {
        provide: {
          [dependencyMap.IRequestDetailPresenter]: new FakeRequestDetailPresenter(),
          [dependencyMap.IRequestSummaryPresenter]: new FakeRequestSummaryPresenter(),
          [dependencyMap.ICompanySummaryPresenter]: new FakeCompanySummaryPresenter(),
          [dependencyMap.ICreateRequestCommandUseCase]: new FakeCreateRequestUseCase(),
          [dependencyMap.IListCompaniesQueryUseCase]: new FakeListCompaniesUseCase(),
          [dependencyMap.IManagerSummaryPresenter]: new FakeManagerSummaryPresenter(),
          [dependencyMap.IContractSummaryPresenter]: new FakeContractSummaryPresenter(),
          [dependencyMap.IListManagersQueryUseCase]: new FakeListManagersUseCase(),
          [dependencyMap.IListContractsQueryUseCase]: new FakeListContractsUseCase(),
        },
        mocks: {
          useRouter: () => ({}),
        },

        components: {
          RefreshableSelect,
          ExpandableForm,
          ManagerTable,
          ManagerForm,
        },

        plugins: [vuetify],
      },

      router: {},
    });

    await flushPromises();

    const vm = component.vm as any as {
      createRequest: ICreateRequestCommandUseCase;
      initialState: CompanySummary[];
      companies: string[];
      managers: string[];
    };

    console.log(component.html());
  });
});
