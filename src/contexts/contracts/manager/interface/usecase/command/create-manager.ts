import { ManagerRole } from "src/contexts/contracts/request/domain/manager-role";
import { Command, ICommandUseCase } from "src/core/usecase";

export interface CreateManagerCommand extends Command {
  name: string;
  email: string;
  phone_number: string;
  is_assigned: boolean;
  roles: Set<ManagerRole>;
}

export default interface ICreateManagerCommandUseCase extends ICommandUseCase<CreateManagerCommand> {}
