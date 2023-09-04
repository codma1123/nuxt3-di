import IContractCommandRepository from "src/contexts/contracts/contract/interface/repository/command";
import IRemoveContractUseCase, { RemoveContractCommand } from "src/contexts/contracts/contract/interface/usecase/command/remove-contract";

export default class RemoveContractCommandUseCase implements IRemoveContractUseCase {
  private repository: IContractCommandRepository;

  constructor(repository: IContractCommandRepository) {
    this.repository = repository;
  }

  async execute(command: RemoveContractCommand): Promise<void> {
    await this.repository.removeContract(command);
  }
}
