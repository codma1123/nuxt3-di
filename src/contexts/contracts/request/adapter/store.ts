import { defineStore } from "pinia";
import RequestDetail from "src/contexts/contracts/request/domain/detail";
import RequestSummary from "src/contexts/contracts/request/domain/summary";
import { IRequestQueryRepository } from "src/contexts/contracts/request/interface/repository/query";
import { Nullable } from "src/core/nullable";
import { IQueryState } from "src/core/repository";

export interface IRequestQueryState extends IQueryState {
  summary: RequestSummary[];
  detail: Nullable<RequestDetail>;
}

export const useRequestQueryStore = defineStore<"request", IRequestQueryState, any, IRequestQueryRepository>("request", {
  state: () => ({
    detail: null,
    summary: [],
  }),

  actions: {
    setDetail(detail) {
      this.detail = detail;
    },

    setSummary(summary) {
      this.summary = summary;
    },
  },
});

export type RequestQueryStore = ReturnType<typeof useRequestQueryStore>;
