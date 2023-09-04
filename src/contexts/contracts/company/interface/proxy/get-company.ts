import CompanyDetail from "src/contexts/contracts/company/domain/detail";
import { GetCompanyQuery } from "src/contexts/contracts/company/interface/usecase/query/get-company";
import { IProxy } from "src/core/proxy";

export default interface IGetCompanyProxy extends IProxy<GetCompanyQuery, CompanyDetail> {}
