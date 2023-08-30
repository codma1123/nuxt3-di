import { IRequestCommandRepository } from "src/contexts/contracts/request/interface/repository/command";
import { CreateRequestCommand, ICreateRequestCommandUseCase } from "src/contexts/contracts/request/interface/usecase/command/create-request";

export class CreateRequestUseCase implements ICreateRequestCommandUseCase {
  private repository: IRequestCommandRepository;

  constructor(repository: IRequestCommandRepository) {
    this.repository = repository;
  }

  public async execute(command: CreateRequestCommand): Promise<void> {
    await this.repository.createRequest(command);
  }
}
