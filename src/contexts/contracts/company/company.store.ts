import { defineStore } from "pinia";
import CompanyDetail from "src/contexts/contracts/company/domain/detail";
import CompanySummary from "src/contexts/contracts/company/domain/summary";
import { ICompanyQueryRepository, ICompanyQueryState } from "src/contexts/contracts/company/interface/repository";

export const useCompanyStore = defineStore<"company", ICompanyQueryState, any, ICompanyQueryRepository>("company", {
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
export type ICompanyStore = ReturnType<typeof useCompanyStore>;
