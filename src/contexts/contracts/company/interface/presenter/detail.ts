import CompanyDetail from "src/contexts/contracts/company/domain/detail";
import { Nullable } from "src/core/nullable";
import IPresenter from "src/core/presenter";

export default interface ICompanyDetailPresenter extends IPresenter<Nullable<CompanyDetail>> {}
