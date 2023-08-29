import CompanyDetail from "src/contexts/contracts/company/domain/detail";
import CompanySummary from "src/contexts/contracts/company/domain/summary";
import { IQueryRepository } from "src/core/repository";

export interface ICompanyQueryRepository extends IQueryRepository {
	setSummary(summary: CompanySummary[]): void;
	setDetail(detail: CompanyDetail): void;
}
