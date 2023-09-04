import { IQueryUseCase, Query } from "src/core/usecase";

export interface ListManagersQuery extends Query {}

export default interface IListManagersQueryUseCase extends IQueryUseCase<ListManagersQuery> {}
