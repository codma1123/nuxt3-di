import { ICommandUseCase } from "src/core/usecase";

export interface RemoveContractCommand {}

export default interface IRemoveContractUseCase extends ICommandUseCase<RemoveContractCommand> {}
