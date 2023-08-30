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

class FakeRequestDetailPresenter implements IRequestDetailPresenter {
  getState(): Nullable<RequestDetail> {
    console.log("detail 가로챘다.");
    return null;
  }
}

class FakeRequestSummaryPresenter implements IRequestSummaryPresenter {
  getState(): RequestSummary[] {
    console.log("summary 가로챘다.");
    return [];
  }
}

describe("index 페이지 테스트", () => {
  beforeEach(() => {
    vitest.unstubAllGlobals();
    setActivePinia(createPinia());
  });

  test("컴포넌트 마운트", () => {
    expect(_index).toBeTruthy();

    const component = shallowMount(_index, {
      global: {
        provide: {
          [dependencyMap.IRequestDetailPresenter]: new FakeRequestDetailPresenter(),
          [dependencyMap.IRequestSummaryPresenter]: new FakeRequestSummaryPresenter(),
        },
      },
    });
  });
});
