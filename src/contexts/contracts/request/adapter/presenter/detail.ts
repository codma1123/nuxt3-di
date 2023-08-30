import { useRequestQueryStore } from "src/contexts/contracts/request/adapter/store";
import RequestDetail from "src/contexts/contracts/request/domain/detail";
import IRequestDetailPresenter from "src/contexts/contracts/request/interface/presenter/detail";
import { Nullable } from "src/core/nullable";

export default class RequestDetailPresenter implements IRequestDetailPresenter {
  private store = useRequestQueryStore();

  getState(): Nullable<RequestDetail> {
    return this.store.detail;
  }
}
