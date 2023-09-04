import { ICompanyCommandRepository } from "src/contexts/contracts/company/interface/repository/command";
import UnregistRolesCommandUseCase, { UnregistRolesCommand } from "src/contexts/contracts/company/interface/usecase/command/unregist-roles";

export default class RemoveCompanyRolesCommandUseCase implements UnregistRolesCommandUseCase {
  private repository: ICompanyCommandRepository;

  constructor(repository: ICompanyCommandRepository) {
    this.repository = repository;
  }

  public async execute(command: UnregistRolesCommand): Promise<void> {
    await this.repository.removeCompanyRoles(command);
  }
}
