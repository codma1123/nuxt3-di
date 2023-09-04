import CompanySummary from "src/contexts/contracts/company/domain/summary";
import { ListCompaniesQuery } from "src/contexts/contracts/company/interface/usecase/command/list-companies";
import { IProxy } from "src/core/proxy";

export default interface IListCompaniesProxy extends IProxy<ListCompaniesQuery, CompanySummary[]> {}
