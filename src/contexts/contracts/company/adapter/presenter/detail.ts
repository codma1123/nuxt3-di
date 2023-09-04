import { storeToRefs } from "pinia";
import { ICompanyQueryStore, useCompanyQueryStore } from "src/contexts/contracts/company/adapter/store";
import CompanyDetail from "src/contexts/contracts/company/domain/detail";
import ICompanyDetailPresenter from "src/contexts/contracts/company/interface/presenter/detail";
import { Nullable } from "src/core/nullable";

export default class CompanyDetailPresenter implements ICompanyDetailPresenter {
  private store: ICompanyQueryStore = useCompanyQueryStore();

  public getState(): Nullable<CompanyDetail> {
    return this.store.detail;
  }
}
