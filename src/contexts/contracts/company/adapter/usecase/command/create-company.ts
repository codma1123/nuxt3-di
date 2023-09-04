import { ICompanyCommandRepository } from "src/contexts/contracts/company/interface/repository/command";
import { CreateCompanyCommand, ICreateCompanyCommandUseCase } from "src/contexts/contracts/company/interface/usecase/command/create-company";

export default class CreateCompanyCommandUseCase implements ICreateCompanyCommandUseCase {
  private repository: ICompanyCommandRepository;

  constructor(repository: ICompanyCommandRepository) {
    this.repository = repository;
  }

  public async execute(command: CreateCompanyCommand): Promise<void> {
    // TODO: Validation Check for command DTO

    await this.repository.createCompany(command);
  }
}
