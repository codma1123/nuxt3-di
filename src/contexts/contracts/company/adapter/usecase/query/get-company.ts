import IGetCompanyProxy from "src/contexts/contracts/company/interface/proxy/get-company";
import { ICompanyQueryRepository } from "src/contexts/contracts/company/interface/repository/query";
import IGetCompanyQueryUseCase, { GetCompanyQuery } from "src/contexts/contracts/company/interface/usecase/query/get-company";

export default class GetCompanyQueryUseCase implements IGetCompanyQueryUseCase {
  private repository: ICompanyQueryRepository;
  private proxy: IGetCompanyProxy;

  constructor(repository: ICompanyQueryRepository, proxy: IGetCompanyProxy) {
    this.repository = repository;
    this.proxy = proxy;
  }

  async execute(query: GetCompanyQuery): Promise<void> {
    const state = await this.proxy.execute(query);
    this.repository.setDetail(state);
  }
}
