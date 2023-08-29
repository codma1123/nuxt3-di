import { Query } from "src/core/usecase";

export interface IProxy<TQuery extends Query, TState> {
	execute(query: TQuery): Promise<TState>;
}
