import { ICompanyQueryStore, useCompanyQueryStore } from "src/contexts/contracts/company/adapter/store";
import CompanyDetail from "src/contexts/contracts/company/domain/detail";
import CompanySummary from "src/contexts/contracts/company/domain/summary";
import { ICompanyQueryRepository } from "src/contexts/contracts/company/interface/repository/query";

export default class CompanyQueryRepository implements ICompanyQueryRepository {
	private store: ICompanyQueryStore = useCompanyQueryStore();
	public setSummary(summary: CompanySummary[]): void {
		this.store.setSummary(summary);
	}
	public setDetail(detail: CompanyDetail): void {
		this.store.setDetail(detail);
	}
}
