import { Nullable } from "src/core/nullable";
import { IQueryUseCase, Query } from "src/core/usecase";

export interface ListRequestsQuery extends Query {
  offset: number;
  limit: Nullable<number>;
  search: Nullable<string>;
  order: Nullable<string>;
  desc: boolean;
}
export interface IListRequestsQueryUseCase extends IQueryUseCase<ListRequestsQuery> {}
