import { ICompanyCommandRepository } from "src/contexts/contracts/company/interface/repository/command";
import IRegistRolesCommandUseCase, { RegistRolesCommand } from "src/contexts/contracts/company/interface/usecase/command/regist-roles";

export default class AddCompanyRolesCommandUseCase implements IRegistRolesCommandUseCase {
  private repository: ICompanyCommandRepository;

  constructor(repostiroy: ICompanyCommandRepository) {
    this.repository = repostiroy;
  }

  public async execute(command: RegistRolesCommand): Promise<void> {
    await this.repository.addCompanyRoles(command);
  }
}
