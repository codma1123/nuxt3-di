import { IQueryUseCase, Query } from "src/core/usecase";

export interface GetRequestQuery extends Query {
  id: UUID;
}
export interface IGetRequestQueryUseCase extends IQueryUseCase<GetRequestQuery> {}
