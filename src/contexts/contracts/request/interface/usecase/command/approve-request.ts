import { Command, ICommandUseCase } from "src/core/usecase";

export interface ApproveRequestCommand extends Command {
  id: UUID;
}

export default interface IApproveRequestCommandUseCase extends ICommandUseCase<ApproveRequestCommand> {}
