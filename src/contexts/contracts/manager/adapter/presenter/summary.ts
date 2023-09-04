import { useManagerQueryStore } from "src/contexts/contracts/manager/adapter/store";
import ManagerSummary from "src/contexts/contracts/manager/domain/summary";
import IManagerSummaryPresenter from "src/contexts/contracts/manager/interface/presenter/summary";

export default class ManagerSummaryPresenter implements IManagerSummaryPresenter {
  private store = useManagerQueryStore();

  getState(): ManagerSummary[] {
    return this.store.summary;
  }
}
