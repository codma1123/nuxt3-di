import ManagerSummary from "src/contexts/contracts/manager/domain/summary";
import { IQueryRepository } from "src/core/repository";

export default interface IManagerQueryRepository extends IQueryRepository {
  setSummary(summary: ManagerSummary[]): void;
}
