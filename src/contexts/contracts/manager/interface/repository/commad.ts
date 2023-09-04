import { CreateManagerCommand } from "src/contexts/contracts/manager/interface/usecase/command/create-manager";
import { ICommandRepository } from "src/core/repository";
export default interface IManagerCommandRepository extends ICommandRepository {
  createManager(command: CreateManagerCommand): Promise<void>;
}
