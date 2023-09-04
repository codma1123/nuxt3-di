import IManagerCommandRepository from "src/contexts/contracts/manager/interface/repository/commad";
import ICreateManagerCommandUseCase, { CreateManagerCommand } from "src/contexts/contracts/manager/interface/usecase/command/create-manager";

export default class CreateManagerCommandUseCase implements ICreateManagerCommandUseCase {
  private repository: IManagerCommandRepository;

  constructor(repository: IManagerCommandRepository) {
    this.repository = repository;
  }

  async execute(command: CreateManagerCommand): Promise<void> {
    await this.repository.createManager(command);
  }
}
