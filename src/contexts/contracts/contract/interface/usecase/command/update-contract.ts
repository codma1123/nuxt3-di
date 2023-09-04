import { ICommandUseCase } from "src/core/usecase";

export interface UpdateContractCommand {
  id: UUID;
}

export default interface IUpdateContractUseCase extends ICommandUseCase<UpdateContractCommand> {}
