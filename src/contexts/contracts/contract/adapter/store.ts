import { defineStore } from "pinia";
import ContractSummary from "src/contexts/contracts/contract/domain/summary";

import IContractQueryRepository from "src/contexts/contracts/contract/interface/repository/query";
import { IQueryState } from "src/core/repository";

export interface ContractQueryState extends IQueryState {
  summary: ContractSummary[];
  // detail: Nullable<Contr>;
}

export const useContractQueryStore = defineStore<"contract", ContractQueryState, any, IContractQueryRepository>("contract", {
  state: (): ContractQueryState => ({
    summary: [],
    // detail: null,
  }),
  actions: {
    setSummary(summary: ContractSummary[]): void {
      this.summary = summary;
    },
  },
});
export type IContractQueryStore = ReturnType<typeof useContractQueryStore>;
