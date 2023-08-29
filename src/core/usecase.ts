export interface Command {}
export interface ICommandUseCase<TCommand extends Command> {
	execute(command: TCommand): Promise<void>;
}

export interface Query {}
export interface IQueryUseCase<TQuery extends Query> {
	execute(query: TQuery): Promise<void>;
}
