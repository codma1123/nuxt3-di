import { CreateRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/create-request";
import { RemoveRequestCommand } from "src/contexts/contracts/request/interface/usecase/remove-request";
import { UpdateRequestCommand } from "src/contexts/contracts/request/interface/usecase/update-request";
import { ICommandRepository } from "src/core/repository";

export interface IRequestCommandRepository extends ICommandRepository {
  createRequest(command: CreateRequestCommand): Promise<void>;
  removeRequest(command: RemoveRequestCommand): Promise<void>;
  updateRequest(command: UpdateRequestCommand): Promise<void>;
}
