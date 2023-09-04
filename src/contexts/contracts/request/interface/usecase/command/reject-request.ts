import { Command, ICommandUseCase } from "src/core/usecase";

export interface RejectRequestCommand extends Command {
  id: UUID;
}

export default interface IRejectRequestCommandUseCase extends ICommandUseCase<RejectRequestCommand> {}
