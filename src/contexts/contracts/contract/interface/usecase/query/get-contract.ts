import { IQueryUseCase, Query } from "src/core/usecase";

export interface GetContractQuery extends Query {
  id: UUID;
}

export default interface IGetContractQuery extends IQueryUseCase<GetContractQuery> {}
