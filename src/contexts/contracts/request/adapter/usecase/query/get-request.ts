import IGetRequestProxy from "src/contexts/contracts/request/interface/proxy/get-request";
import { IRequestQueryRepository } from "src/contexts/contracts/request/interface/repository/query";
import { GetRequestQuery, IGetRequestQueryUseCase } from "src/contexts/contracts/request/interface/usecase/query/get-request";

export class GetRequestQueryUseCase implements IGetRequestQueryUseCase {
  private repository: IRequestQueryRepository;
  private proxy: IGetRequestProxy;

  constructor(repository: IRequestQueryRepository, proxy: IGetRequestProxy) {
    this.repository = repository;
    this.proxy = proxy;
  }

  public async execute(query: GetRequestQuery): Promise<void> {
    const state = await this.proxy.execute(query);
    this.repository.setDetail(state);
  }
}
