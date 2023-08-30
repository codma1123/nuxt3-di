import { IRequestCommandRepository } from "src/contexts/contracts/request/interface/repository/command";
import IUpdateRequestCommandUseCase, { UpdateRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/update-request";
import { commandValidateor } from "src/contexts/contracts/request/validate";

export default class UpdateRequestCommandUseCase implements IUpdateRequestCommandUseCase {
  private repository: IRequestCommandRepository;

  constructor(repository: IRequestCommandRepository) {
    this.repository = repository;
  }

  public async execute(command: UpdateRequestCommand): Promise<void> {
    commandValidateor(command);
    await this.repository.updateRequest(command);
  }
}
