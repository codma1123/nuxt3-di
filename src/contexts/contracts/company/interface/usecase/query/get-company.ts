import { IQueryUseCase, Query } from "src/core/usecase";

export interface GetCompanyQuery extends Query {
  id: UUID;
}

export default interface IGetCompanyQueryUseCase extends IQueryUseCase<GetCompanyQuery> {}
