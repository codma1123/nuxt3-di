import { IRequestCommandRepository } from "src/contexts/contracts/request/interface/repository/command";
import { IRemoveRequestCommandUseCase, RemoveRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/remove-request";

export default class RemoveRequestCommandUseCase implements IRemoveRequestCommandUseCase {
  private repository: IRequestCommandRepository;

  constructor(repository: IRequestCommandRepository) {
    this.repository = repository;
  }

  public async execute(command: RemoveRequestCommand): Promise<void> {
    await this.repository.removeRequest(command);
  }
}
