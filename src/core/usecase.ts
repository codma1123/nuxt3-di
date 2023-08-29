import IDomainObject from "src/core/serializable";

export abstract class Command implements IDomainObject {
	abstract validate(): boolean;
	abstract serialize(): Json;
}
export interface ICommandUseCase<TCommand extends Command> {
	execute(command: TCommand): Promise<void>;
}

export abstract class Query implements IDomainObject {
	abstract validate(): boolean;
	abstract serialize(): Json;
}
export interface IQueryUseCase<TQuery extends Query> {
	execute(query: TQuery): Promise<void>;
}
