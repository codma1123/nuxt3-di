import IContractCommandRepository from "src/contexts/contracts/contract/interface/repository/command";
import { UpdateContractCommand } from "src/contexts/contracts/contract/interface/usecase/command/update-contract";
import IUpdateRequestCommandUseCase, { UpdateRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/update-request";

export default class UpdateContractCommandUseCase implements IUpdateRequestCommandUseCase {
  private repository: IContractCommandRepository;

  constructor(repository: IContractCommandRepository) {
    this.repository = repository;
  }

  async execute(command: UpdateContractCommand): Promise<void> {
    await this.repository.updateContract(command);
  }
}
