import { Command, ICommandUseCase } from "src/core/usecase";

export interface RemoveCompanyCommand extends Command {
  id: UUID;
}

export default interface IRemoveCompanyCommandUseCase extends ICommandUseCase<RemoveCompanyCommand> {}
