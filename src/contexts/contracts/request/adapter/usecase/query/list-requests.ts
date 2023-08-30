import IListRequestsProxy from "src/contexts/contracts/request/interface/proxy/list-requests";
import { IRequestQueryRepository } from "src/contexts/contracts/request/interface/repository/query";
import { IListRequestsQueryUseCase, ListRequestsQuery } from "src/contexts/contracts/request/interface/usecase/query/list-requests";

export class ListRequestsQueryUseCase implements IListRequestsQueryUseCase {
  private repository: IRequestQueryRepository;
  private proxy: IListRequestsProxy;

  constructor(repository: IRequestQueryRepository, proxy: IListRequestsProxy) {
    this.repository = repository;
    this.proxy = proxy;
  }
  public async execute(query: ListRequestsQuery): Promise<void> {
    // TODO: Validation Check for query DTO

    const state = await this.proxy.execute(query);
    this.repository.setSummary(state);
  }
}
