import { CreateContractCommand } from "src/contexts/contracts/contract/interface/usecase/command/create-contract";
import { RemoveContractCommand } from "src/contexts/contracts/contract/interface/usecase/command/remove-contract";
import { UpdateContractCommand } from "src/contexts/contracts/contract/interface/usecase/command/update-contract";
import { ICommandRepository } from "src/core/repository";

export default interface IContractCommandRepository extends ICommandRepository {
  createContract(command: CreateContractCommand): Promise<void>;
  removeContract(command: RemoveContractCommand): Promise<void>;
  updateContract(command: UpdateContractCommand): Promise<void>;
}
