import { ICompanyStore, useCompanyStore } from "src/contexts/contracts/company/company.store";
import CompanyDetail from "src/contexts/contracts/company/domain/detail";
import CompanySummary from "src/contexts/contracts/company/domain/summary";
import { ICompanyQueryRepository } from "src/contexts/contracts/company/interface/repository";

export default class CompanyQueryRepository implements ICompanyQueryRepository {
	protected store: ICompanyStore = useCompanyStore();
	setSummary(summary: CompanySummary[]): void {
		this.store.setSummary(summary);
	}
	setDetail(detail: CompanyDetail): void {
		this.store.setDetail(detail);
	}
}
