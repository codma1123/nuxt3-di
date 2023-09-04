import { IRequestCommandRepository } from "src/contexts/contracts/request/interface/repository/command";
import IRejectRequestCommandUseCase, { RejectRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/reject-request";

export default class RejectRequestCommandUseCase implements IRejectRequestCommandUseCase {
  private repository: IRequestCommandRepository;

  constructor(repository: IRequestCommandRepository) {
    this.repository = repository;
  }

  public async execute(command: RejectRequestCommand): Promise<void> {
    await this.repository.rejectRequest(command);
  }
}
