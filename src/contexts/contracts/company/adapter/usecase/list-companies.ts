import IListCompaniesProxy from "src/contexts/contracts/company/interface/proxy/list-companies";
import { ICompanyQueryRepository } from "src/contexts/contracts/company/interface/repository/query";
import { IListCompaniesQueryUseCase, ListCompaniesQuery } from "src/contexts/contracts/company/interface/usecase/list-companies";

export default class ListCompaniesQueryUseCase implements IListCompaniesQueryUseCase {
  private repository: ICompanyQueryRepository;
  private proxy: IListCompaniesProxy;

  constructor(repository: ICompanyQueryRepository, proxy: IListCompaniesProxy) {
    this.repository = repository;
    this.proxy = proxy;
  }
  public async execute(query: ListCompaniesQuery): Promise<void> {
    // TODO: Validation Check for query DTO
    const state = await this.proxy.execute(query);
    this.repository.setSummary(state);
  }
}
