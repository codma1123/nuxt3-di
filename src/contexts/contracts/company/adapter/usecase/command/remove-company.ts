import { ICompanyCommandRepository } from "src/contexts/contracts/company/interface/repository/command";
import IRemoveCompanyCommandUseCase, { RemoveCompanyCommand } from "src/contexts/contracts/company/interface/usecase/command/remove-company";

export default class RemoveCompanyCommandUseCase implements IRemoveCompanyCommandUseCase {
  private repository: ICompanyCommandRepository;

  constructor(repository: ICompanyCommandRepository) {
    this.repository = repository;
  }

  public async execute(command: RemoveCompanyCommand): Promise<void> {
    await this.repository.removeCompany(command);
  }
}
