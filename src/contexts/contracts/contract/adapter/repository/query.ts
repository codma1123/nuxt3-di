import { IContractQueryStore, useContractQueryStore } from "src/contexts/contracts/contract/adapter/store";
import ContractSummary from "src/contexts/contracts/contract/domain/summary";
import IContractQueryRepository from "src/contexts/contracts/contract/interface/repository/query";

export default class ContractQueryRepository implements IContractQueryRepository {
  private store: IContractQueryStore = useContractQueryStore();

  setSummary(state: ContractSummary[]): void {
    this.store.setSummary(state);
  }
}
