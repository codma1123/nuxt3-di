import { IRequestCommandRepository } from "src/contexts/contracts/request/interface/repository/command";
import { CreateRequestCommand, ICreateRequestCommandUseCase } from "src/contexts/contracts/request/interface/usecase/command/create-request";
import { commandValidateor } from "src/contexts/contracts/request/validate";

export class CreateRequestCommandUseCase implements ICreateRequestCommandUseCase {
  private repository: IRequestCommandRepository;

  constructor(repository: IRequestCommandRepository) {
    this.repository = repository;
  }

  public async execute(command: CreateRequestCommand): Promise<void> {
    commandValidateor(command);
    await this.repository.createRequest(command);
  }
}
