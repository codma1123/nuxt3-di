import { ApproveRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/approve-request";
import { CreateRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/create-request";
import { RejectRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/reject-request";
import { RemoveRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/remove-request";
import { UpdateRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/update-request";

import { ICommandRepository } from "src/core/repository";

export interface IRequestCommandRepository extends ICommandRepository {
  createRequest(command: CreateRequestCommand): Promise<void>;
  removeRequest(command: RemoveRequestCommand): Promise<void>;
  updateRequest(command: UpdateRequestCommand): Promise<void>;
  approveRequest(command: ApproveRequestCommand): Promise<void>;
  rejectRequest(command: RejectRequestCommand): Promise<void>;
}
