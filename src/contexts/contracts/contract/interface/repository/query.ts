import ContractSummary from "src/contexts/contracts/contract/domain/query/summary";
import { IQueryRepository } from "src/core/repository";

export default interface IContractQueryRepository extends IQueryRepository {
  setSummary(state: ContractSummary[]): void;
}
