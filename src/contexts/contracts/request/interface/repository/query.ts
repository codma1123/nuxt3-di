import RequestDetail from "src/contexts/contracts/request/domain/detail";
import RequestSummary from "src/contexts/contracts/request/domain/summary";
import { IQueryRepository } from "src/core/repository";

export interface IRequestQueryRepository extends IQueryRepository {
  setSummary(summary: RequestSummary[]): void;
  setDetail(detail: RequestDetail): void;
}
