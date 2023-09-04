import { useManagerQueryStore } from "src/contexts/contracts/manager/adapter/store";
import ManagerSummary from "src/contexts/contracts/manager/domain/summary";
import IManagerQueryRepository from "src/contexts/contracts/manager/interface/repository/query";
import { ListManagersQuery } from "src/contexts/contracts/manager/interface/usecase/query/list-managers";

export default class ManagerQueryRepository implements IManagerQueryRepository {
  private store = useManagerQueryStore();

  setSummary(summary: ManagerSummary[]): void {
    this.store.setSummary(summary);
  }
}
