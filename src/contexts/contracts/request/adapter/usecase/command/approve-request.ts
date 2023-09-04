import { IRequestCommandRepository } from "src/contexts/contracts/request/interface/repository/command";
import IApproveRequestCommandUseCase, { ApproveRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/approve-request";

export default class ApproveRequestCommandUseCase implements IApproveRequestCommandUseCase {
  private repository: IRequestCommandRepository;

  constructor(repository: IRequestCommandRepository) {
    this.repository = repository;
  }

  async execute(command: ApproveRequestCommand): Promise<void> {
    await this.repository.approveRequest(command);
  }
}
