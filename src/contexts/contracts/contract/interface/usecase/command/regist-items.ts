import { Command, ICommandUseCase } from "src/core/usecase";

export interface RegistItemsCommand extends Command {
  id: UUID;
  items: Set<UUID>;
}

export default interface IRegistItemsCommandUseCase extends ICommandUseCase<RegistItemsCommand> {}
