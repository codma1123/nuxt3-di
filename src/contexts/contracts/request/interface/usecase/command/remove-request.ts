import { Command, ICommandUseCase, IQueryUseCase } from "src/core/usecase";

export interface RemoveRequestCommand extends Command {
  id: UUID;
}
export interface IRemoveRequestCommandUseCase extends ICommandUseCase<RemoveRequestCommand> {}
