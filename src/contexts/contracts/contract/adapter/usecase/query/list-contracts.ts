import IListContractsProxy from "src/contexts/contracts/contract/interface/proxy/list-contracts";
import IContractQueryRepository from "src/contexts/contracts/contract/interface/repository/query";
import { IListContractsQueryUseCase, ListContractsQuery } from "src/contexts/contracts/contract/interface/usecase/query/list-contracts";

export default class ListContractsQueryUseCase implements IListContractsQueryUseCase {
  private repository: IContractQueryRepository;
  private proxy: IListContractsProxy;

  constructor(reposirory: IContractQueryRepository, proxy: IListContractsProxy) {
    this.repository = reposirory;
    this.proxy = proxy;
  }

  async execute(query: ListContractsQuery): Promise<void> {
    const state = await this.proxy.execute(query);
    this.repository.setSummary(state);
  }
}
