import ContractSummary from "src/contexts/contracts/contract/domain/query/summary";
import { ListContractsQuery } from "src/contexts/contracts/contract/interface/usecase/query/list-contracts";
import { IProxy } from "src/core/proxy";

export default interface IListContractsProxy extends IProxy<ListContractsQuery, ContractSummary[]> {}
