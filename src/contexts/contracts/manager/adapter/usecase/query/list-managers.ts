import IListManagersProxy from "src/contexts/contracts/manager/interface/proxy/list-managers";
import IManagerQueryRepository from "src/contexts/contracts/manager/interface/repository/query";
import IListManagersQueryUseCase, { ListManagersQuery } from "src/contexts/contracts/manager/interface/usecase/query/list-managers";

export default class ListManagersQueryUseCase implements IListManagersQueryUseCase {
  private repository: IManagerQueryRepository;
  private proxy: IListManagersProxy;

  constructor(repository: IManagerQueryRepository, proxy: IListManagersProxy) {
    this.repository = repository;
    this.proxy = proxy;
  }

  async execute(query: ListManagersQuery): Promise<void> {
    const state = await this.proxy.execute(query);
    this.repository.setSummary(state);
  }
}
