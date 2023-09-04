import { ICompanyCommandRepository } from "src/contexts/contracts/company/interface/repository/command";
import IUpdateCompanyCommandUseCase, { UpdateCompanyCommand } from "src/contexts/contracts/company/interface/usecase/command/update-company";

export default class UpdateCompanyCommandUseCase implements IUpdateCompanyCommandUseCase {
  private repository: ICompanyCommandRepository;

  constructor(repository: ICompanyCommandRepository) {
    this.repository = repository;
  }

  public async execute(command: UpdateCompanyCommand): Promise<void> {
    await this.repository.updateCompany(command);
  }
}
