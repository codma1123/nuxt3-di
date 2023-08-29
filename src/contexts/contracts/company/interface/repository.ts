import CompanyDetail from "src/contexts/contracts/company/domain/detail";
import CompanySummary from "src/contexts/contracts/company/domain/summary";
import { Nullable } from "src/core/nullable";
import { IQueryRepository, IQueryState } from "src/core/repository";

export interface ICompanyQueryState extends IQueryState {
	summary: CompanySummary[];
	detail: Nullable<CompanyDetail>;
}
export interface ICompanyQueryRepository extends IQueryRepository {
	setSummary(summary: CompanySummary[]): void;
	setDetail(detail: CompanyDetail): void;
}
