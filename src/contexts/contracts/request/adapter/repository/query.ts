import { RequestQueryStore, useRequestQueryStore } from "src/contexts/contracts/request/adapter/store";
import RequestDetail from "src/contexts/contracts/request/domain/detail";
import RequestSummary from "src/contexts/contracts/request/domain/summary";
import { IRequestQueryRepository } from "src/contexts/contracts/request/interface/repository/query";

export class RequestQueryRepository implements IRequestQueryRepository {
  private store: RequestQueryStore = useRequestQueryStore();

  setSummary(summary: RequestSummary[]): void {
    this.store.setSummary(summary);
  }
  setDetail(detail: RequestDetail): void {
    this.store.setDetail(detail);
  }
}
