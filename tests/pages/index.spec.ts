import { beforeEach, describe, vitest, test, expect } from "vitest";
import _index from "src/pages/index.vue";
import { shallowMount } from "@vue/test-utils";
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

import { vuetify } from "tests/vuetify";

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
  async execute(command: CreateRequestCommand): Promise<void> {}
}

describe("index 페이지 테스트", () => {
  beforeEach(() => {
    vitest.unstubAllGlobals();
    setActivePinia(createPinia());
  });

  test("index 페이지 초기 상태", async () => {
    expect(_index).toBeTruthy();

    const component = shallowMount(_index, {
      global: {
        provide: {
          [dependencyMap.IRequestDetailPresenter]: new FakeRequestDetailPresenter(),
          [dependencyMap.IRequestSummaryPresenter]: new FakeRequestSummaryPresenter(),
          [dependencyMap.ICreateRequestCommandUseCase]: new FakeCreateRequestUseCase(),
        },
        mocks: {
          initialState: [
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
          ],
        },

        plugins: [vuetify],
      },
    });

    const vm = component.vm as any as {
      summary: RequestSummary[];
      detail: RequestDetail;
      createRequest: ICreateRequestCommandUseCase;
      initialState: CompanySummary[];
    };

    await vm.createRequest.execute({} as any);

    expect(vm.initialState.length).toBe(3);

    expect(vm.summary).toStrictEqual([]);
    expect(vm.detail).toBe(null);
  });
});
