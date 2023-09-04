import { Command, ICommandUseCase } from "src/core/usecase";

export interface UnregistItemsCommand extends Command {
  id: UUID;
  items: Set<UUID>;
}

export default interface IUnregistItemsCommandUseCase extends ICommandUseCase<UnregistItemsCommand> {}
