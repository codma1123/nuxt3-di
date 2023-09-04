import { defineStore } from "pinia";
import CompanyDetail from "src/contexts/contracts/company/domain/detail";
import CompanySummary from "src/contexts/contracts/company/domain/summary";
import { ICompanyQueryRepository } from "src/contexts/contracts/company/interface/repository/query";
import { Nullable } from "src/core/nullable";
import { IQueryState } from "src/core/repository";

export interface ICompanyQueryState extends IQueryState {
  summary: CompanySummary[];
  detail: Nullable<CompanyDetail>;
}

export const useCompanyQueryStore = defineStore<"company", ICompanyQueryState, any, ICompanyQueryRepository>("company", {
  state: (): ICompanyQueryState => ({
    summary: [],
    detail: null,
  }),
  actions: {
    setSummary(summary: CompanySummary[]): void {
      this.summary = summary;
    },
    setDetail(detail: CompanyDetail): void {
      this.detail = detail;
    },
  },
});
export type ICompanyQueryStore = ReturnType<typeof useCompanyQueryStore>;
