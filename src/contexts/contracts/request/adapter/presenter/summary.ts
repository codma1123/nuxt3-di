import { useRequestQueryStore } from "src/contexts/contracts/request/adapter/store";
import RequestSummary from "src/contexts/contracts/request/domain/summary";
import IRequestSummaryPresenter from "src/contexts/contracts/request/interface/presenter/summary";

export default class RequestSummaryPresenter implements IRequestSummaryPresenter {
  private store = useRequestQueryStore();

  getState(): RequestSummary[] {
    return this.store.summary;
  }
}
