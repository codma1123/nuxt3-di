import IContractCommandRepository from "src/contexts/contracts/contract/interface/repository/command";
import ICreateContractCommandUseCase, { CreateContractCommand } from "src/contexts/contracts/contract/interface/usecase/command/create-contract";

export default class CreateContractCommandUseCase implements ICreateContractCommandUseCase {
  private repository: IContractCommandRepository;

  constructor(repository: IContractCommandRepository) {
    this.repository = repository;
  }

  async execute(command: CreateContractCommand): Promise<void> {
    await this.repository.createContract(command);
  }
}
