import { useContractQueryStore } from "src/contexts/contracts/contract/adapter/store";
import ContractSummary from "src/contexts/contracts/contract/domain/summary";
import IContractSummaryPresenter from "src/contexts/contracts/contract/interface/presenter/summary";

export default class ContractSummaryPresenter implements IContractSummaryPresenter {
  private store = useContractQueryStore();
  getState(): ContractSummary[] {
    return this.store.summary;
  }
}
